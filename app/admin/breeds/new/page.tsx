'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import ImageUpload from '@/components/ImageUpload';

export default function NewBreedPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: '',
        size: '',
        energy: '',
        withKids: '',
        grooming: '',
        description: '',
        price: '',
        available: 0,
        sizeCategory: 'medium',
        temperament: 'family',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/admin/breeds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/admin/breeds');
            } else {
                alert(data.error || 'Failed to create breed');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error creating breed:', error);
            alert('Error creating breed');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'available' ? parseInt(value) || 0 : value,
        }));
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/breeds"
                    className="inline-flex items-center gap-2 text-gold hover:text-brown transition mb-4"
                >
                    <FiArrowLeft size={20} />
                    Back to Breeds
                </Link>
                <h1 className="text-3xl font-bold text-brown mb-2">Add New Breed</h1>
                <p className="text-gray-600">Create a new dachshund breed listing</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Breed ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., miniature-dachshund"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                                <p className="text-xs text-gray-500 mt-1">Unique identifier (lowercase, use hyphens)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Breed Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Miniature Dachshund"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Breed Image <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    onRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
                                />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 text-sm">URL</span>
                                    </div>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Or paste an image URL here"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Describe the breed characteristics..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition resize-none"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2">
                            Breed Stats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Size Description <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., 8-9 inches tall"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Size Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="sizeCategory"
                                    value={formData.sizeCategory}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Energy Level <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="energy"
                                    value={formData.energy}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Moderate"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Temperament <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="temperament"
                                    value={formData.temperament}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="family">Family</option>
                                    <option value="active">Active</option>
                                    <option value="calm">Calm</option>
                                    <option value="guard">Guard</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    With Kids <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="withKids"
                                    value={formData.withKids}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Great with kids"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Grooming <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="grooming"
                                    value={formData.grooming}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Weekly brushing"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Availability */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2">
                            Pricing & Availability
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., $1,200 - $1,800"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Available Puppies
                                </label>
                                <input
                                    type="number"
                                    name="available"
                                    value={formData.available}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-dark font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiSave size={20} />
                            {loading ? 'Creating...' : 'Create Breed'}
                        </button>
                        <Link
                            href="/admin/breeds"
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gold transition-all text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
