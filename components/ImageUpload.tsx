'use client';

import { useState } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    label?: string;
    required?: boolean;
}

export default function ImageUpload({ value, onChange, onRemove, label, required }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File too large. Maximum size is 5MB.');
            return;
        }

        setUploading(true);
        const loadingToast = toast.loading('Uploading image...');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                onChange(data.url);
                toast.success('Image uploaded successfully!', { id: loadingToast });
            } else {
                toast.error(data.error || 'Failed to upload image', { id: loadingToast });
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Error uploading image', { id: loadingToast });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {value ? (
                <div className="relative group">
                    <div className="relative h-48 w-full border-2 border-gray-200 rounded-xl overflow-hidden">
                        <Image
                            src={value}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <label className="p-2 bg-white rounded-lg hover:bg-gold transition-colors cursor-pointer shadow-lg">
                            <FiUpload size={16} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                        {onRemove && (
                            <button
                                type="button"
                                onClick={onRemove}
                                className="p-2 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                            >
                                <FiX size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-gold transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                    <FiImage className="text-gray-400 mb-2" size={48} />
                    <span className="text-sm text-gray-600 mb-1">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                    </span>
                    <span className="text-xs text-gray-500">JPEG, PNG, WebP, GIF (Max 5MB)</span>
                </label>
            )}
        </div>
    );
}
