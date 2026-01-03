'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiTrash2, FiPlus, FiImage } from 'react-icons/fi';
import ImageUpload from '@/components/ImageUpload';
import toast from 'react-hot-toast';

interface GalleryImage {
    _id: string;
    src: string;
    category: string;
    caption: string;
    date: string;
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [newImage, setNewImage] = useState({
        src: '',
        category: 'puppies',
        caption: ''
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/admin/gallery');
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            toast.error('Failed to load images');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const res = await fetch(`/api/admin/gallery/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                setImages(prev => prev.filter(img => img._id !== id));
                toast.success('Image deleted');
            } else {
                toast.error(data.error || 'Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Error deleting image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage.src) {
            toast.error('Please upload an image');
            return;
        }

        setUploading(true);
        try {
            const res = await fetch('/api/admin/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newImage),
            });
            const data = await res.json();

            if (data.success) {
                setImages(prev => [data.data, ...prev]);
                setNewImage({ src: '', category: 'puppies', caption: '' });
                toast.success('Image added successfully');
            } else {
                toast.error(data.error || 'Failed to add image');
            }
        } catch (error) {
            console.error('Error adding image:', error);
            toast.error('Error adding image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 text-gold hover:text-brown transition mb-4"
                >
                    <FiArrowLeft size={20} />
                    Back to Dashboard
                </Link>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-brown mb-2">Gallery Management</h1>
                        <p className="text-gray-600">Manage photos displayed in the gallery</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 sticky top-8">
                        <h2 className="text-xl font-bold text-brown mb-6 flex items-center gap-2">
                            <FiPlus className="text-gold" />
                            Add New Photo
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Photo <span className="text-red-500">*</span>
                                </label>
                                <ImageUpload
                                    value={newImage.src}
                                    onChange={(url) => setNewImage(prev => ({ ...prev, src: url }))}
                                    onRemove={() => setNewImage(prev => ({ ...prev, src: '' }))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newImage.category}
                                    onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold outline-none"
                                >
                                    <option value="puppies">Puppies</option>
                                    <option value="adults">Adult Dogs</option>
                                    <option value="facility">Our Facility</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Caption <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newImage.caption}
                                    onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                                    required
                                    placeholder="e.g. Playing in the garden"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full py-3 bg-gold text-dark font-bold rounded-xl hover:bg-amber-400 transition disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Add to Gallery'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading gallery...</div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-100">
                            <FiImage size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">No photos in gallery yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {images.map((img) => (
                                <div key={img._id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                                    <div className="relative aspect-video">
                                        <Image
                                            src={img.src}
                                            alt={img.caption}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <button
                                                onClick={() => handleDelete(img._id)}
                                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gold bg-brown/5 px-2 py-1 rounded">
                                                {img.category}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(img.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-brown truncate">{img.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
