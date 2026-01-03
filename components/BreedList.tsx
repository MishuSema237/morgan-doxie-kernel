'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Breed {
    _id: string;
    id: string; // The text slug ID (e.g., 'golden-retriever')
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

interface BreedListProps {
    initialBreeds: Breed[];
}

export default function BreedList({ initialBreeds }: BreedListProps) {
    const [sizeFilter, setSizeFilter] = useState('all');
    const [temperamentFilter, setTemperamentFilter] = useState('all');

    const filteredBreeds = initialBreeds.filter(breed => {
        const sizeMatch = sizeFilter === 'all' || breed.sizeCategory === sizeFilter;
        const tempMatch = temperamentFilter === 'all' || breed.temperament === temperamentFilter;
        return sizeMatch && tempMatch;
    });

    return (
        <>
            {/* Filter Bar */}
            <div className="bg-white border-b-2 border-gold/30 py-6 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-8 flex flex-wrap items-center gap-6">
                    <span className="text-base font-semibold text-brown">Filter by:</span>
                    <div className="flex flex-wrap gap-2 border-r-2 border-gold/30 pr-6">
                        <button
                            onClick={() => setSizeFilter('all')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${sizeFilter === 'all'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            All Sizes
                        </button>
                        <button
                            onClick={() => setSizeFilter('small')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${sizeFilter === 'small'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Small
                        </button>
                        <button
                            onClick={() => setSizeFilter('medium')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${sizeFilter === 'medium'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Medium
                        </button>
                        <button
                            onClick={() => setSizeFilter('large')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${sizeFilter === 'large'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Large
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setTemperamentFilter('all')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${temperamentFilter === 'all'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            All Temperaments
                        </button>
                        <button
                            onClick={() => setTemperamentFilter('family')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${temperamentFilter === 'family'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Family Dogs
                        </button>
                        <button
                            onClick={() => setTemperamentFilter('active')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${temperamentFilter === 'active'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setTemperamentFilter('calm')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${temperamentFilter === 'calm'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Calm
                        </button>
                        <button
                            onClick={() => setTemperamentFilter('guard')}
                            className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${temperamentFilter === 'guard'
                                ? 'border-gold bg-gold text-dark'
                                : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                }`}
                        >
                            Guard Dogs
                        </button>
                    </div>
                    <span className="ml-auto text-sm text-gray-600">Showing {filteredBreeds.length} {filteredBreeds.length === 1 ? 'breed' : 'breeds'}</span>
                </div>
            </div>

            {/* Breed Grid */}
            <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredBreeds.map((breed) => (
                            <div key={breed._id} className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl transition">
                                {breed.available > 0 && (
                                    <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-brown text-white text-xs font-semibold rounded-full">
                                        {breed.available} Puppy{breed.available > 1 ? 'ies' : ''} Available
                                    </div>
                                )}
                                <div className="relative h-[350px]">
                                    <Image
                                        src={breed.image}
                                        alt={breed.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-brown mb-4">{breed.name}</h3>
                                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gold/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border border-gold/30 rounded"></div>
                                            <div>
                                                <div className="text-xs text-gray-600">SIZE</div>
                                                <div className="text-sm font-semibold text-brown">{breed.size}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border border-gold/30 rounded"></div>
                                            <div>
                                                <div className="text-xs text-gray-600">ENERGY</div>
                                                <div className="text-sm font-semibold text-brown">{breed.energy}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border border-gold/30 rounded"></div>
                                            <div>
                                                <div className="text-xs text-gray-600">WITH KIDS</div>
                                                <div className="text-sm font-semibold text-brown">{breed.withKids}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border border-gold/30 rounded"></div>
                                            <div>
                                                <div className="text-xs text-gray-600">GROOMING</div>
                                                <div className="text-sm font-semibold text-brown">{breed.grooming}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{breed.description}</p>
                                    <div className="text-xl font-bold text-brown mb-4">{breed.price}</div>
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/breeds/${breed.id}`}
                                            className="py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform"
                                        >
                                            Learn More About This Breed
                                        </Link>
                                        <Link
                                            href={`/available-puppies?breed=${encodeURIComponent(breed.name)}`}
                                            className="py-3 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition"
                                        >
                                            View Available {breed.name}s
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
