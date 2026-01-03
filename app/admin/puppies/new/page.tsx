'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiPlus, FiX } from 'react-icons/fi';

export default function NewPuppyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        breed: '',
        age: '',
        dob: '', // New
        gender: 'male',
        price: 0,
        description: '',
        images: [''],
        status: 'available' as 'available' | 'reserved' | 'sold' | 'new',
        color: '',
        tags: [''],
        isFeatured: false,
        dadName: '', // New
        momName: '', // New
        healthDetails: [''], // New
        pedigree: '', // New
        temperament: [''], // New
    });

    const [breeds, setBreeds] = useState<any[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const res = await fetch('/api/admin/breeds');
                const data = await res.json();
                setBreeds(data);
            } catch (error) {
                console.error('Error fetching breeds:', error);
            }
        };
        fetchBreeds();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty images, tags, healthDetails, temperament
        const cleanData = {
            ...formData,
            images: formData.images.filter(img => img.trim() !== ''),
            tags: formData.tags.filter(tag => tag.trim() !== ''),
            healthDetails: formData.healthDetails.filter(h => h.trim() !== ''),
            temperament: formData.temperament.filter(t => t.trim() !== ''),
        };

        try {
            const response = await fetch('/api/admin/puppies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/admin/puppies');
            } else {
                alert(data.error || 'Failed to create puppy');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error creating puppy:', error);
            alert('Error creating puppy');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                    value,
        }));
    };

    const handleArrayChange = (field: 'images' | 'tags' | 'healthDetails' | 'temperament', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayField = (field: 'images' | 'tags' | 'healthDetails' | 'temperament') => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayField = (field: 'images' | 'tags' | 'healthDetails' | 'temperament', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/puppies"
                    className="inline-flex items-center gap-2 text-gold hover:text-brown transition mb-4"
                >
                    <FiArrowLeft size={20} />
                    Back to Puppies
                </Link>
                <h1 className="text-3xl font-bold text-brown mb-2">Add New Puppy</h1>
                <p className="text-gray-600">Create a new puppy listing</p>
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
                                    Breed <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="">Select Breed</option>
                                    {breeds.map((breed) => (
                                        <option key={breed._id} value={breed.name}>
                                            {breed.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Age (Auto-calc or Manual) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., 8 weeks"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    placeholder="e.g., Black & Tan"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
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
                                placeholder="Describe the puppy's personality, characteristics..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition resize-none"
                            />
                        </div>
                    </div>

                    {/* Quick Stats / Credibility */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2">
                            Detailed Info (Credibility)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Dad's Name</label>
                                <input
                                    type="text"
                                    name="dadName"
                                    value={formData.dadName}
                                    onChange={handleChange}
                                    placeholder="e.g. Champion Duke"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mom's Name</label>
                                <input
                                    type="text"
                                    name="momName"
                                    value={formData.momName}
                                    onChange={handleChange}
                                    placeholder="e.g. Lady Bella"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Pedigree / Registry</label>
                                <input
                                    type="text"
                                    name="pedigree"
                                    value={formData.pedigree}
                                    onChange={handleChange}
                                    placeholder="e.g. AKC Registered, FCI"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Array Fields: Images, Tags, Health, Temperament */}
                    {[
                        { label: 'Images', field: 'images' as const, ph: 'https://example.com/image.jpg', type: 'url' },
                        { label: 'Health Details', field: 'healthDetails' as const, ph: 'e.g. Vaccinated', type: 'text' },
                        { label: 'Temperament', field: 'temperament' as const, ph: 'e.g. Playful', type: 'text' },
                        { label: 'Tags', field: 'tags' as const, ph: 'e.g. Best Seller', type: 'text' },
                    ].map((section) => (
                        <div key={section.field} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2 flex-1">
                                    {section.label}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => addArrayField(section.field)}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    <FiPlus size={16} />
                                    Add {section.label}
                                </button>
                            </div>

                            {formData[section.field].map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type={section.type}
                                        value={item}
                                        onChange={(e) => handleArrayChange(section.field, index, e.target.value)}
                                        placeholder={section.ph}
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                    />
                                    {formData[section.field].length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayField(section.field, index)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Status & Price */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-brown border-b-2 border-gold/20 pb-2">
                            Status & Pricing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="available">Available</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="sold">Sold</option>
                                    <option value="new">New</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 text-gold border-2 border-gray-300 rounded focus:ring-gold"
                            />
                            <label htmlFor="isFeatured" className="text-sm font-semibold text-gray-700">
                                Mark as Featured
                            </label>
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
                            {loading ? 'Creating...' : 'Create Puppy'}
                        </button>
                        <Link
                            href="/admin/puppies"
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
