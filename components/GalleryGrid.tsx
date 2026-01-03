'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface GalleryImage {
    _id: string;
    src: string;
    category: string;
    caption: string;
    date: string;
}

interface GalleryGridProps {
    initialImages: GalleryImage[];
}

const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'puppies', label: 'Puppies' },
    { id: 'adults', label: 'Adult Dogs' },
    { id: 'facility', label: 'Our Facility' },
];

export default function GalleryGrid({ initialImages }: GalleryGridProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    const filteredImages = selectedCategory === 'all'
        ? initialImages
        : initialImages.filter(img => img.category === selectedCategory);

    const openLightbox = (imageId: string) => {
        setSelectedImageId(imageId);
        setLightboxOpen(true);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (selectedImageId === null) return;
        const currentIndex = filteredImages.findIndex(img => img._id === selectedImageId);
        if (currentIndex === -1) return;

        if (direction === 'prev') {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
            setSelectedImageId(filteredImages[prevIndex]._id);
        } else {
            const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
            setSelectedImageId(filteredImages[nextIndex]._id);
        }
    };

    const selectedImage = filteredImages.find(img => img._id === selectedImageId);

    return (
        <>
            {/* Filter Tabs */}
            <div className="bg-white border-b-2 border-gold/30 py-6 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((cat) => {
                            const count = cat.id === 'all'
                                ? initialImages.length
                                : initialImages.filter(img => img.category === cat.id).length;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-3 border-2 rounded-2xl font-semibold transition ${selectedCategory === cat.id
                                        ? 'border-gold bg-gold text-dark'
                                        : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                                        }`}
                                >
                                    {cat.label}
                                    <span className="ml-2 text-xs opacity-70">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-12 px-6 bg-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {filteredImages.map((image) => (
                            <div
                                key={image._id}
                                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/20 bg-white hover:shadow-2xl transition-all mb-4"
                                onClick={() => openLightbox(image._id)}
                            >
                                <div className="relative">
                                    <Image
                                        src={image.src}
                                        alt={image.caption}
                                        width={500}
                                        height={500}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div className="text-white">
                                            <div className="font-semibold text-sm mb-1">{image.caption}</div>
                                            <div className="text-xs opacity-80">
                                                {new Date(image.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white border-2 border-gold/30 rounded-full flex items-center justify-center text-brown opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaSearch />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white hover:scale-110 transition z-50 p-2"
                    >
                        <FaTimes size={32} />
                    </button>
                    <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.caption}
                            width={1200}
                            height={1200}
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            onClick={() => navigateImage('prev')}
                            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition hover:scale-110"
                        >
                            <FaChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => navigateImage('next')}
                            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition hover:scale-110"
                        >
                            <FaChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                            <div className="font-semibold mb-1">
                                {selectedImage.caption}
                            </div>
                            <div className="text-sm opacity-80">
                                {new Date(selectedImage.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {filteredImages.map((img) => (
                            <button
                                key={img._id}
                                onClick={() => setSelectedImageId(img._id)}
                                className={`w-2 h-2 rounded-full transition ${selectedImage._id === img._id ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
