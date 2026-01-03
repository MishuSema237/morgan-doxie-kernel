'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCheck, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PuppyDetailView({ puppy, similarPuppies }: { puppy: any, similarPuppies: any[] }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Generate image array
    const images = puppy.images && puppy.images.length > 0 ? puppy.images : ['/photos/placeholder-dog.png'];

    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString('en-NG')}`;
    };

    const handleBuyNow = () => {
        addToCart(puppy);
        router.push('/order/confirmation');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header & Breadcrumb managed in parent or standard layout, but we can keep simplified breadcrumb here if wanted, 
          or assume Layout wraps it. The previous code had the header inside. 
          For consistency with other pages refactored, I will rely on the page wrapper to render header or just render content here.
          The previous file rendered Header manually. I should probably include it or assume Layout.
          The Layout.tsx has nothing but children. So I should render the Header here or in the Page.
          I'll render content only here, and let Page handle Header if needed, but since this is the "View",
          I'll include the main content section.
      */}

            {/* Main Content */}
            <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left Column - Gallery & Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Photo Gallery */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden">
                                <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-br from-gold via-brown to-dark">
                                    {puppy.status === 'new' && (
                                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-brown text-white text-xs font-bold rounded-full">
                                            NEW
                                        </div>
                                    )}
                                    <Image
                                        src={images[selectedImage]}
                                        alt={`${puppy.breed}`}
                                        fill
                                        className="object-cover cursor-zoom-in"
                                        onClick={() => setIsLightboxOpen(true)}
                                    />
                                    <button
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 hover:bg-white border-2 border-gold/30 rounded-full flex items-center justify-center text-brown hover:scale-110 transition-transform"
                                    >
                                        <FaSearchPlus size={20} />
                                    </button>
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="grid grid-cols-6 gap-2">
                                        {images.map((img: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`aspect-square relative rounded-lg overflow-hidden border-2 transition ${selectedImage === index
                                                    ? 'border-gold'
                                                    : 'border-gold/30 hover:border-gold/50'
                                                    }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="16vw"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold text-brown mb-6">About This Puppy</h2>
                                <p className="text-base text-gray-600 leading-relaxed mb-6">{puppy.description || puppy.desc}</p>
                                <div className="text-xs text-gray-400 mt-6">
                                    Last updated: {new Date(puppy.updatedAt || Date.now()).toLocaleDateString('en-NG')}
                                </div>
                            </div>

                            {/* New Credibility Info - Parents & Pedigree */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold text-brown mb-6">Lineage & Temperament</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {puppy.dadName && (
                                        <div className="bg-gold/5 p-4 rounded-xl border border-gold/10">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Sire (Dad)</span>
                                            <p className="text-lg font-bold text-brown">{puppy.dadName}</p>
                                        </div>
                                    )}
                                    {puppy.momName && (
                                        <div className="bg-gold/5 p-4 rounded-xl border border-gold/10">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Dam (Mom)</span>
                                            <p className="text-lg font-bold text-brown">{puppy.momName}</p>
                                        </div>
                                    )}
                                    {puppy.pedigree && (
                                        <div className="col-span-1 md:col-span-2 bg-gold/5 p-4 rounded-xl border border-gold/10">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Pedigree</span>
                                            <p className="text-base font-semibold text-brown">{puppy.pedigree}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Temperament Tags */}
                                {puppy.temperament && puppy.temperament.length > 0 && (
                                    <div className="mt-6">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-3">Temperament</span>
                                        <div className="flex flex-wrap gap-2">
                                            {puppy.temperament.map((t: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-white border border-brown/20 text-brown rounded-full text-sm font-medium shadow-sm">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Health Information - Expanded */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold text-brown mb-6">Health Promise</h2>
                                <div className="space-y-4">
                                    {/* Static Checks */}
                                    {[
                                        { label: 'Health Certificate', checked: true },
                                        { label: 'First Vaccination', checked: true },
                                        { label: 'Deworming Complete', checked: true },
                                        { label: 'Microchip Implanted', checked: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 py-3 border-b border-gold/20 last:border-0">
                                            <div className="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white">
                                                <FaCheck className="text-xs" />
                                            </div>
                                            <span className="text-base text-gray-700">{item.label}</span>
                                        </div>
                                    ))}

                                    {/* Dynamic Health Details */}
                                    {puppy.healthDetails && puppy.healthDetails.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gold/20">
                                            <h3 className="text-sm font-bold text-brown mb-2">Specific Health Notes:</h3>
                                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                {puppy.healthDetails.map((detail: string, i: number) => (
                                                    <li key={i}>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-2xl">
                                    <p className="text-sm text-gray-600">
                                        <strong>Vet Checked:</strong> Every puppy undergoes a comprehensive nose-to-tail exam before going home.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info Card & Actions */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Puppy Info Card */}
                            <div className="bg-white border-2 border-brown rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold text-brown">{puppy.breed}</h1>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${puppy.status === 'new'
                                        ? 'bg-brown text-white'
                                        : (puppy.status === 'reserved' || puppy.status === 'sold')
                                            ? 'bg-gray-500 text-white'
                                            : 'bg-gold/20 text-brown border border-gold/30'
                                        }`}>
                                        {puppy.status.toUpperCase()}
                                    </span>
                                </div>

                                {/* Key Details */}
                                <div className="border-2 border-gold/30 rounded-2xl p-6 bg-gold/5 mb-6">
                                    <div className="flex justify-between py-3 border-b border-gold/20">
                                        <span className="text-sm text-gray-600">Age:</span>
                                        <span className="text-sm font-semibold text-brown">{puppy.age}</span>
                                    </div>
                                    {/* DOB if available */}
                                    {puppy.dob && (
                                        <div className="flex justify-between py-3 border-b border-gold/20">
                                            <span className="text-sm text-gray-600">Birth Date:</span>
                                            <span className="text-sm font-semibold text-brown">
                                                {new Date(puppy.dob).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between py-3 border-b border-gold/20">
                                        <span className="text-sm text-gray-600">Gender:</span>
                                        <span className="text-sm font-semibold text-brown">{puppy.gender}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gold/20">
                                        <span className="text-sm text-gray-600">Color:</span>
                                        <span className="text-sm font-semibold text-brown">{puppy.color}</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {puppy.tags && puppy.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Price Section */}
                                <div className="border-2 border-brown rounded-2xl p-6 bg-gold/5 mb-6">
                                    <div className="text-4xl font-bold text-gold mb-3">{formatPrice(puppy.price)}</div>
                                    <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                                        Includes: Health certificate, first vaccinations, deworming, microchip, starter food pack.
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {(puppy.status === 'available' || puppy.status === 'new') ? (
                                    <div className="space-y-3 mb-6">
                                        <button
                                            onClick={handleBuyNow}
                                            className="w-full py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-center font-bold text-lg rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <FaShoppingCart className="text-gold" />
                                            Buy Now
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full py-4 bg-gray-300 text-gray-500 border-2 border-gray-300 font-semibold rounded-2xl cursor-not-allowed"
                                    >
                                        {puppy.status === 'sold' ? 'Sold' : 'Reserved'}
                                    </button>
                                )}
                            </div>

                            {/* Breeder Contact Card */}
                            <div className="bg-white border-2 border-gold/30 rounded-3xl p-6 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-gold to-brown rounded-full mx-auto mb-4"></div>
                                <h3 className="text-lg font-bold text-brown mb-1">Bullify Kennel</h3>
                                <p className="text-sm text-gray-600 mb-1">Premium Dog Breeder</p>
                                <p className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-1">
                                    <FaMapMarkerAlt className="text-gold" />
                                    Your Location
                                </p>
                            </div>
                        </div>
                        {/* End of Right Column */}
                    </div>
                </div>
                {/* End of Main Grid */}

                {/* Similar Puppies Section */}
                {similarPuppies.length > 0 && (
                    <div className="mt-16 pt-16 border-t-2 border-gold/30">
                        <h2 className="text-3xl font-bold text-brown mb-8 text-center">
                            Similar Puppies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {similarPuppies.map((p) => (
                                <Link
                                    key={p._id || p.id}
                                    href={`/puppy-detail/${p._id || p.id}`}
                                    className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group"
                                >
                                    <div className="relative h-[300px] overflow-hidden">
                                        <Image
                                            src={p.images && p.images[0] ? p.images[0] : '/photos/placeholder-dog.png'}
                                            alt={p.breed}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-brown group-hover:text-gold transition mb-2">
                                            {p.breed}
                                        </h3>
                                        <div className="text-gold font-bold text-xl mb-4">{formatPrice(p.price)}</div>
                                        <div className="text-sm text-gray-600">{p.age} • {p.gender}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>\r\n            </section>\r\n\r\n            {/* Lightbox Modal */}\r\n            {isLightboxOpen && (
            <div
                className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
                onClick={() => setIsLightboxOpen(false)}
            >
                <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="absolute top-4 right-4 text-white p-2 hover:scale-110 transition z-50"
                >
                    <FaTimes size={32} />
                </button>
                <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <Image
                        src={images[selectedImage]}
                        alt={`${puppy.breed} - Full size`}
                        width={1200}
                        height={1200}
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition hover:scale-110"
                    >
                        <FaChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                        className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition hover:scale-110"
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>
            </div>\r\n            )}\r\n        </div>
    );
}


