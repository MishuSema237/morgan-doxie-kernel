'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaWhatsapp, FaCheck, FaHeart } from 'react-icons/fa';

interface BreedProps {
    breed: {
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
    };
}

export default function BreedDetailClient({ breed }: BreedProps) {
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // Use breed image as main gallery image
    const galleryImages = [breed.image];

    useEffect(() => {
        if (galleryImages.length > 1) {
            const id = setInterval(() => {
                if (!lightboxOpen) {
                    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
                }
            }, 3000);
            return () => clearInterval(id);
        }
    }, [galleryImages.length, lightboxOpen]);

    const openLightbox = () => {
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        } else {
            setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
                    <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/" className="text-base font-medium text-dark hover:text-gold transition">Home</Link>
                        <Link href="/available-puppies" className="text-base font-medium text-dark hover:text-gold transition">Available Puppies</Link>
                        <Link href="/breeds" className="text-base font-medium text-dark hover:text-gold transition">Breeds</Link>
                        <Link href="/about-us" className="text-base font-medium text-dark hover:text-gold transition">About Us</Link>
                        <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition">Gallery</Link>
                        <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition">Contact</Link>
                    </nav>
                    <Link href="https://wa.me/234XXXXXXXXX" className="btn-whatsapp hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
                        <FaWhatsapp className="text-lg" /> WhatsApp
                    </Link>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="bg-white border-b-2 border-gold/30 py-4">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-gold transition">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/breeds" className="hover:text-gold transition">Breeds</Link>
                        <span className="mx-2">/</span>
                        <span className="text-brown">{breed.name}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-12 px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="relative h-[320px] lg:h-[420px] rounded-3xl overflow-hidden">
                        <Image
                            src={breed.image}
                            alt={breed.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-brown mb-4">{breed.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-sm rounded-full font-semibold">
                                    {breed.sizeCategory} Size
                                </span>
                                <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-sm rounded-full font-semibold capitalize">
                                    {breed.temperament}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gold/5 border-2 border-gold/30 rounded-2xl p-4 text-center">
                            <div className="text-xs text-gray-600 mb-2 uppercase">Size</div>
                            <div className="text-base font-bold text-brown">{breed.size}</div>
                        </div>
                        <div className="bg-gold/5 border-2 border-gold/30 rounded-2xl p-4 text-center">
                            <div className="text-xs text-gray-600 mb-2 uppercase">Energy</div>
                            <div className="text-base font-bold text-brown">{breed.energy}</div>
                        </div>
                        <div className="bg-gold/5 border-2 border-gold/30 rounded-2xl p-4 text-center">
                            <div className="text-xs text-gray-600 mb-2 uppercase">With Kids</div>
                            <div className="text-base font-bold text-brown">{breed.withKids}</div>
                        </div>
                        <div className="bg-gold/5 border-2 border-gold/30 rounded-2xl p-4 text-center">
                            <div className="text-xs text-gray-600 mb-2 uppercase">Grooming</div>
                            <div className="text-base font-bold text-brown">{breed.grooming}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold text-brown mb-4">About {breed.name}s</h2>
                                <p className="text-base text-gray-700 leading-relaxed">{breed.description}</p>
                            </div>

                            {/* Gallery */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-0 overflow-hidden">
                                <div
                                    className="relative h-[300px] lg:h-[380px] cursor-pointer group"
                                    onClick={openLightbox}
                                >
                                    <Image
                                        src={galleryImages[galleryIndex]}
                                        alt={`${breed.name} photo`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                            Click to view fullscreen
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lightbox Modal */}
                            {lightboxOpen && (
                                <div
                                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
                                    onClick={closeLightbox}
                                >
                                    <button
                                        onClick={closeLightbox}
                                        className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition z-50 w-12 h-12 flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                    <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                        <Image
                                            src={galleryImages[galleryIndex]}
                                            alt={`${breed.name} photo`}
                                            width={1200}
                                            height={1200}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Price Card */}
                            <div className="bg-white border-2 border-gold rounded-3xl p-6 sticky top-24">
                                <div className="text-center mb-6">
                                    <div className="text-sm text-gray-600 mb-2">Starting Price</div>
                                    <div className="text-3xl font-bold text-brown">{breed.price}</div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        {breed.available > 0 ? (
                                            <span className="text-green-600 font-semibold">{breed.available} Available</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Currently Unavailable</span>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={`/available-puppies?breed=${encodeURIComponent(breed.name)}`}
                                    className="block w-full py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform mb-3"
                                >
                                    View Available {breed.name}s
                                </Link>
                                <Link
                                    href={`/select-puppy?breed=${encodeURIComponent(breed.name)}`}
                                    className="block w-full py-4 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition"
                                >
                                    Reserve {breed.name}
                                </Link>
                            </div>

                            {/* Quick Contact */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                                <h3 className="text-lg font-bold text-brown mb-4">Have Questions?</h3>
                                <p className="text-sm text-gray-600 mb-4">Our team is here to help you find the perfect puppy.</p>
                                <Link
                                    href="https://wa.me/234XXXXXXXXX"
                                    className="block w-full py-3 bg-whatsapp text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform mb-2"
                                >
                                    <FaWhatsapp className="inline mr-2" />
                                    WhatsApp Us
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="block w-full py-3 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Welcome a {breed.name}?</h2>
                    <p className="text-lg text-gold mb-8">
                        Browse our available {breed.name} puppies or contact us to learn more
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/available-puppies"
                            className="px-8 py-4 bg-gold text-dark border-2 border-gold text-base font-semibold rounded-2xl hover:bg-gold/90 hover:scale-105 transition-transform"
                        >
                            View Available Puppies
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 text-base font-semibold rounded-2xl hover:bg-white/20 hover:scale-105 transition-transform"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp Button */}
            <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
                <FaWhatsapp className="text-2xl" />
            </Link>
        </div>
    );
}
