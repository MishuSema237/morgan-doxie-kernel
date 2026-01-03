'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaWhatsapp, FaTh, FaList, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PuppyBrowser({ initialPuppies, breeds }: { initialPuppies: any[], breeds: string[] }) {
    const router = useRouter();
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const breedParam = typeof window === 'undefined' ? null : searchParams.get('breed');
    const initialBreed = (breedParam && breeds.includes(breedParam)) ? breedParam : 'All Breeds';

    const [breedFilter, setBreedFilter] = useState(initialBreed);
    const [ageFilter, setAgeFilter] = useState('Any Age');
    const [genderFilter, setGenderFilter] = useState('Any Gender');
    const [priceFilter, setPriceFilter] = useState('Any Price');
    const [sortBy, setSortBy] = useState('Newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const puppiesPerPage = 12;

    const ageRanges = ['Any Age', 'Puppies (0-6 months)', 'Young (6-12 months)', 'Adult (1 year+)'];
    const genders = ['Any Gender', 'Male', 'Female'];
    const priceRanges = ['Any Price', '₦50,000 - ₦100,000', '₦100,000 - ₦200,000', '₦200,000 - ₦300,000', '₦300,000+'];
    const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Age: Youngest First'];

    // Filter puppies
    let filteredPuppies = initialPuppies.filter(puppy => {
        if (breedFilter !== 'All Breeds' && puppy.breed !== breedFilter) return false;
        if (genderFilter !== 'Any Gender' && puppy.gender !== genderFilter) return false;
        if (priceFilter !== 'Any Price') {
            if (priceFilter === '₦50,000 - ₦100,000' && (puppy.price < 50000 || puppy.price > 100000)) return false;
            if (priceFilter === '₦100,000 - ₦200,000' && (puppy.price < 100000 || puppy.price > 200000)) return false;
            if (priceFilter === '₦200,000 - ₦300,000' && (puppy.price < 200000 || puppy.price > 300000)) return false;
            if (priceFilter === '₦300,000+' && puppy.price < 300000) return false;
        }
        return true;
    });

    // Sort puppies
    filteredPuppies = [...filteredPuppies].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Age: Youngest First') {
            const getAgeNum = (ageStr: string) => parseInt(ageStr) || 0;
            return getAgeNum(a.age) - getAgeNum(b.age);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first by default
    });

    // Pagination
    const totalPages = Math.ceil(filteredPuppies.length / puppiesPerPage);
    const startIndex = (currentPage - 1) * puppiesPerPage;
    const paginatedPuppies = filteredPuppies.slice(startIndex, startIndex + puppiesPerPage);

    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString('en-NG')}`;
    };

    const handleBuyNow = (puppy: any) => {
        addToCart(puppy);
        router.push('/order/confirmation');
    };

    return (
        <>
            {/* Filter & Sort Bar */}
            <div className="bg-white border-b-2 border-gold/30 py-4 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="/breeds" className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold hover:bg-gold/90 transition text-center">
                                Browse All Breeds
                            </Link>
                            <select
                                value={breedFilter}
                                onChange={(e) => { setBreedFilter(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 border-2 border-gold/30 rounded-2xl bg-white text-brown text-sm font-medium focus:outline-none focus:border-gold cursor-pointer"
                            >
                                {breeds.map(breed => (
                                    <option key={breed} value={breed}>{breed}</option>
                                ))}
                            </select>
                            <select
                                value={ageFilter}
                                onChange={(e) => { setAgeFilter(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 border-2 border-gold/30 rounded-2xl bg-white text-brown text-sm font-medium focus:outline-none focus:border-gold cursor-pointer"
                            >
                                {ageRanges.map(age => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                            <select
                                value={genderFilter}
                                onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 border-2 border-gold/30 rounded-2xl bg-white text-brown text-sm font-medium focus:outline-none focus:border-gold cursor-pointer"
                            >
                                {genders.map(gender => (
                                    <option key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
                            <select
                                value={priceFilter}
                                onChange={(e) => { setPriceFilter(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 border-2 border-gold/30 rounded-2xl bg-white text-brown text-sm font-medium focus:outline-none focus:border-gold cursor-pointer"
                            >
                                {priceRanges.map(price => (
                                    <option key={price} value={price}>{price}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-brown hidden lg:block">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 border-2 border-gold/30 rounded-2xl bg-white text-brown text-sm font-medium focus:outline-none focus:border-gold cursor-pointer"
                            >
                                {sortOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${viewMode === 'grid'
                                            ? 'border-gold bg-gold text-white'
                                            : 'border-gold/30 text-brown hover:border-gold'
                                        }`}
                                >
                                    <FaTh />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${viewMode === 'list'
                                            ? 'border-gold bg-gold text-white'
                                            : 'border-gold/30 text-brown hover:border-gold'
                                        }`}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-base text-gray-600 mb-8 font-semibold">
                        Showing {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'}
                    </div>

                    {/* Puppy Grid */}
                    <div className={viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
                        : 'flex flex-col gap-8 mb-12'
                    }>
                        {paginatedPuppies.map((puppy) => (
                            <div
                                key={puppy._id || puppy.id}
                                className={`bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group ${viewMode === 'list' ? 'flex flex-row max-h-[300px]' : ''
                                    }`}
                            >
                                <div className={`relative overflow-hidden ${viewMode === 'list'
                                        ? 'w-1/3 h-[300px]'
                                        : 'h-[400px]'
                                    }`}>
                                    {puppy.status === 'new' && (
                                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-brown text-white text-xs font-bold rounded-full">
                                            NEW
                                        </div>
                                    )}
                                    {puppy.status === 'reserved' && (
                                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                                            RESERVED
                                        </div>
                                    )}
                                    {puppy.status === 'sold' && (
                                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                                            SOLD
                                        </div>
                                    )}
                                    <Image
                                        src={puppy.images && puppy.images.length > 0 ? puppy.images[0] : '/photos/placeholder-dog.png'}
                                        alt={`${puppy.breed} puppy`}
                                        fill
                                        className="object-cover"
                                        sizes={viewMode === 'list' ? "33vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                                    />
                                    {/* Thumbnail strip - placeholder for multiple images */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent flex items-end pb-2 px-2 gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex-1 h-16 bg-white/20 border border-white/30 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`p-6 ${viewMode === 'list' ? 'w-2/3 flex flex-col justify-between' : ''}`}>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-brown group-hover:text-gold transition">{puppy.breed}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
                                            <span>{puppy.age}</span>
                                            <span>|</span>
                                            <span>{puppy.gender}</span>
                                            <span>|</span>
                                            <span>{puppy.color}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {puppy.tags && puppy.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="text-2xl font-bold mb-4 text-gold">{formatPrice(puppy.price)}</div>
                                        <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">{puppy.description || puppy.desc}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {puppy.status === 'available' || puppy.status === 'new' ? (
                                            <>
                                                <button
                                                    onClick={() => handleBuyNow(puppy)}
                                                    className="py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                                >
                                                    Buy Now
                                                </button>
                                                <Link
                                                    href={`/puppy-detail/${puppy._id}`}
                                                    className="py-3 bg-white text-brown border-2 border-gold text-sm font-semibold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform text-center"
                                                >
                                                    View Details
                                                </Link>
                                            </>
                                        ) : (
                                            <button
                                                disabled
                                                className="py-3 bg-gray-300 text-gray-500 border-2 border-gray-300 text-sm font-semibold rounded-2xl cursor-not-allowed"
                                            >
                                                {puppy.status === 'sold' ? 'Sold' : 'Reserved'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mb-12">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 border-2 border-gold/30 rounded-2xl flex items-center justify-center hover:border-gold transition disabled:opacity-50 disabled:cursor-not-allowed text-brown"
                            >
                                <FaChevronLeft />
                            </button>
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${currentPage === page
                                                    ? 'border-gold bg-gold text-white font-bold'
                                                    : 'border-gold/30 text-brown hover:border-gold'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <span key={page} className="px-2 text-gray-400">...</span>;
                                }
                                return null;
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 border-2 border-gold/30 rounded-2xl flex items-center justify-center hover:border-gold transition disabled:opacity-50 disabled:cursor-not-allowed text-brown"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="bg-white border-2 border-gold/30 rounded-3xl p-12 text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-brown mb-4">
                            Can&apos;t Find What You&apos;re Looking For?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            We have new litters regularly. Contact us about upcoming puppies or specific breeds you&apos;re interested in.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/contact-us"
                                className="px-8 py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-base font-semibold rounded-2xl hover:scale-105 transition-transform"
                            >
                                Contact Us About Future Litters
                            </Link>
                            <Link
                                href="/contact-us"
                                className="px-8 py-4 bg-white text-brown border-2 border-gold text-base font-semibold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform"
                            >
                                Join Our Waiting List
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
