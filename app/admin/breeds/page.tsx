'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

interface Breed {
    _id: string;
    id: string;
    name: string;
    image: string;
    size: string;
    energy: string;
    withKids: string;
    grooming: string;
    description: string;
    price: string;
    available: number;
    sizeCategory: string;
    temperament: string;
}

export default function BreedsPage() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchBreeds();
    }, []);

    const fetchBreeds = async () => {
        try {
            const response = await fetch('/api/admin/breeds');
            const data = await response.json();
            if (data.success) {
                setBreeds(data.data);
            }
        } catch (error) {
            console.error('Error fetching breeds:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this breed?')) return;

        try {
            const response = await fetch(`/api/admin/breeds/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBreeds(breeds.filter(breed => breed.id !== id));
                setDeleteId(null);
            } else {
                alert('Failed to delete breed');
            }
        } catch (error) {
            console.error('Error deleting breed:', error);
            alert('Error deleting breed');
        }
    };

    const filteredBreeds = breeds.filter(breed =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        breed.temperament.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading breeds...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brown mb-2">Breeds Management</h1>
                    <p className="text-gray-600">Manage dachshund breeds, stats, and information</p>
                </div>
                <Link
                    href="/admin/breeds/new"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-dark font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                    <FiPlus size={20} />
                    Add New Breed
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search breeds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                    />
                </div>
            </div>

            {/* Breeds Grid */}
            {filteredBreeds.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
                    <p className="text-gray-500">No breeds found. Add your first breed to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBreeds.map((breed) => (
                        <div
                            key={breed._id}
                            className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gold hover:shadow-lg transition-all"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={breed.image}
                                    alt={breed.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <Link
                                        href={`/admin/breeds/${breed.id}/edit`}
                                        className="p-2 bg-white rounded-lg hover:bg-gold transition-colors"
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(breed.id)}
                                        className="p-2 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-brown mb-2">{breed.name}</h3>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Size:</span>
                                        <span className="font-semibold text-brown">{breed.size}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Energy:</span>
                                        <span className="font-semibold text-brown">{breed.energy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Temperament:</span>
                                        <span className="font-semibold text-brown capitalize">{breed.temperament}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Available:</span>
                                        <span className="font-semibold text-brown">{breed.available}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-lg font-bold text-gold">{breed.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
