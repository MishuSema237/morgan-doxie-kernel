'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

interface Puppy {
    _id: string;
    breed: string;
    age: string;
    gender: string;
    price: number;
    description: string;
    images: string[];
    status: 'available' | 'reserved' | 'sold' | 'new';
    color: string;
    tags: string[];
    isFeatured?: boolean;
}

const statusColors = {
    available: 'bg-green-100 text-green-800 border-green-300',
    reserved: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    sold: 'bg-gray-100 text-gray-800 border-gray-300',
    new: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function PuppiesPage() {
    const [puppies, setPuppies] = useState<Puppy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchPuppies();
    }, [statusFilter]);

    const fetchPuppies = async () => {
        try {
            const url = statusFilter === 'all'
                ? '/api/admin/puppies'
                : `/api/admin/puppies?status=${statusFilter}`;

            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setPuppies(data.data);
            }
        } catch (error) {
            console.error('Error fetching puppies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this puppy?')) return;

        try {
            const response = await fetch(`/api/admin/puppies/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPuppies(puppies.filter(puppy => puppy._id !== id));
            } else {
                alert('Failed to delete puppy');
            }
        } catch (error) {
            console.error('Error deleting puppy:', error);
            alert('Error deleting puppy');
        }
    };

    const filteredPuppies = puppies.filter(puppy =>
        puppy.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading puppies...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brown mb-2">Puppies Management</h1>
                    <p className="text-gray-600">Manage puppy listings, prices, and availability</p>
                </div>
                <Link
                    href="/admin/puppies/new"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-dark font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                    <FiPlus size={20} />
                    Add New Puppy
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by breed, color, gender..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                    />
                </div>

                <div className="relative">
                    <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition appearance-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                        <option value="new">New</option>
                    </select>
                </div>
            </div>

            {/* Puppies Grid */}
            {filteredPuppies.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
                    <p className="text-gray-500">No puppies found. Add your first puppy to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPuppies.map((puppy) => (
                        <div
                            key={puppy._id}
                            className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gold hover:shadow-lg transition-all"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100">
                                {puppy.images && puppy.images.length > 0 ? (
                                    <img
                                        src={puppy.images[0]}
                                        alt={`${puppy.breed} puppy`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}

                                <div className="absolute top-3 left-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${statusColors[puppy.status]}`}>
                                        {puppy.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3 flex gap-2">
                                    <Link
                                        href={`/admin/puppies/${puppy._id}/edit`}
                                        className="p-2 bg-white rounded-lg hover:bg-gold transition-colors"
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(puppy._id)}
                                        className="p-2 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>

                                {puppy.isFeatured && (
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-3 py-1 bg-gold text-dark rounded-full text-xs font-semibold">
                                            ⭐ Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-brown mb-2">{puppy.breed}</h3>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Age:</span>
                                        <span className="font-semibold text-brown">{puppy.age}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Gender:</span>
                                        <span className="font-semibold text-brown capitalize">{puppy.gender}</span>
                                    </div>
                                    {puppy.color && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Color:</span>
                                            <span className="font-semibold text-brown">{puppy.color}</span>
                                        </div>
                                    )}
                                </div>

                                {puppy.tags && puppy.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {puppy.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-2xl font-bold text-gold">${puppy.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
