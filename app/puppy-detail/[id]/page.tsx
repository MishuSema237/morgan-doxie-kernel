'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaPhone, FaShareAlt, FaCheck, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Extended puppy data with more details
const puppyData: Record<number, any> = {
  1: {
    id: 1,
    breed: 'Golden Retriever',
    name: 'Max',
    age: '8 weeks',
    gender: 'Male',
    color: 'Golden',
    price: 180000,
    status: 'available',
    tag: 'Family Friendly',
    desc: 'Beautiful, healthy Golden Retriever puppy. Vaccinated, dewormed, and vet-checked. Great with kids. Max is a playful and friendly puppy who loves attention and enjoys playing with toys. He has a beautiful golden coat and a wonderful temperament.',
    image: '/photos/3dogs_transparent_bg.png',
    weight: '4.2kg',
    parentMale: 'Champion Thunder',
    parentFemale: 'Lady Sunshine',
    healthCert: true,
    firstVaccination: true,
    dewormed: true,
    microchip: true,
    temperamentTags: ['Family Friendly', 'Playful', 'Good with Kids', 'Energetic', 'Intelligent', 'Gentle'],
    paymentOptions: ['Cash', 'Bank Transfer', 'Installment Available'],
  },
  2: {
    id: 2,
    breed: 'German Shepherd',
    name: 'Luna',
    age: '10 weeks',
    gender: 'Female',
    color: 'Black & Tan',
    price: 220000,
    status: 'available',
    tag: 'Active',
    desc: 'Intelligent and loyal German Shepherd. Perfect for families who want a protective companion. Luna is highly trainable and has excellent bloodline.',
    image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg',
    weight: '5.1kg',
    parentMale: 'Guardian King',
    parentFemale: 'Princess Shadow',
    healthCert: true,
    firstVaccination: true,
    dewormed: true,
    microchip: true,
    temperamentTags: ['Active', 'Intelligent', 'Loyal', 'Protective', 'Trainable'],
    paymentOptions: ['Cash', 'Bank Transfer'],
  },
  3: {
    id: 3,
    breed: 'Labrador Retriever',
    name: 'Buddy',
    age: '6 weeks',
    gender: 'Male',
    color: 'Yellow',
    price: 170000,
    status: 'available',
    tag: 'Calm',
    desc: 'Friendly Labrador puppy with gentle temperament. Fully vaccinated and ready for a loving home. Buddy loves water and is very playful.',
    image: '/photos/3dogs.jpg',
    weight: '3.8kg',
    parentMale: 'Ocean Wave',
    parentFemale: 'Honey Bee',
    healthCert: true,
    firstVaccination: true,
    dewormed: true,
    microchip: true,
    temperamentTags: ['Calm', 'Friendly', 'Family Friendly', 'Playful', 'Gentle'],
    paymentOptions: ['Cash', 'Bank Transfer', 'Installment Available'],
  },
};

// Get similar puppies (excluding current)
const getSimilarPuppies = (currentId: number) => {
  return Object.values(puppyData).filter(p => p.id !== currentId).slice(0, 3);
};

export default function PuppyDetail({ params }: { params: { id: string } }) {
  const puppyId = parseInt(params.id);
  const puppy = puppyData[puppyId];
  const similarPuppies = getSimilarPuppies(puppyId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Generate image array (using same image multiple times for demo)
  const images = [puppy.image, puppy.image, puppy.image, puppy.image, puppy.image];

  if (!puppy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brown mb-4">Puppy Not Found</h1>
          <Link href="/available-puppies" className="text-gold hover:underline">
            View Available Puppies
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString('en-NG')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Home
            </Link>
            <Link href="/available-puppies" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Available Puppies
            </Link>
            <Link href="/breeds" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Breeds
            </Link>
            <Link href="/about-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              About Us
            </Link>
            <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Gallery
            </Link>
            <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Contact
            </Link>
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
            <Link href="/available-puppies" className="hover:text-gold transition">Available Puppies</Link>
            <span className="mx-2">/</span>
            <Link href={`/available-puppies?breed=${encodeURIComponent(puppy.breed)}`} className="hover:text-gold transition">{puppy.breed}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">#{puppy.breed.substring(0, 2).toUpperCase()}-00{puppy.id} {puppy.name}</span>
          </div>
        </div>
      </div>

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
                    alt={`${puppy.name} - ${puppy.breed}`}
                    fill
                    className="object-cover cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 hover:bg-white border-2 border-gold/30 rounded-full flex items-center justify-center text-brown hover:scale-110 transition-transform"
                  >
                    🔍
                  </button>
                </div>
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-6 gap-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square relative rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index 
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
                <p className="text-base text-gray-600 leading-relaxed mb-6">{puppy.desc}</p>
                <div className="text-xs text-gray-400 mt-6">
                  Last updated: {new Date().toLocaleDateString('en-NG')}
                </div>
              </div>

              {/* Parent Information */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Parent Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-gold/30 rounded-2xl p-6 bg-gold/5">
                    <div className="w-full h-48 bg-gradient-to-br from-gold via-brown to-dark rounded-xl mb-4"></div>
                    <h3 className="text-lg font-bold text-brown mb-2">Sire (Father)</h3>
                    <p className="text-base text-gray-600 mb-2">{puppy.parentMale}</p>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">Champion Bloodline</span>
                  </div>
                  <div className="border-2 border-gold/30 rounded-2xl p-6 bg-gold/5">
                    <div className="w-full h-48 bg-gradient-to-br from-gold via-brown to-dark rounded-xl mb-4"></div>
                    <h3 className="text-lg font-bold text-brown mb-2">Dam (Mother)</h3>
                    <p className="text-base text-gray-600 mb-2">{puppy.parentFemale}</p>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">Champion Bloodline</span>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Health & Medical Records</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Health Certificate', checked: puppy.healthCert },
                    { label: 'First Vaccination', checked: puppy.firstVaccination },
                    { label: 'Deworming Complete', checked: puppy.dewormed },
                    { label: 'Microchip Implanted', checked: puppy.microchip },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-gold/20 last:border-0">
                      <div className="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-base text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-2xl">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> All health records are documented and provided with your puppy. We provide a 30-day health guarantee.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Info Card & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Puppy Info Card */}
                <div className="bg-white border-2 border-brown rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-brown">{puppy.name}</h1>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      puppy.status === 'new' 
                        ? 'bg-brown text-white' 
                        : puppy.status === 'reserved'
                        ? 'bg-gray-500 text-white'
                        : 'bg-gold/20 text-brown border border-gold/30'
                    }`}>
                      {puppy.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Key Details */}
                  <div className="border-2 border-gold/30 rounded-2xl p-6 bg-gold/5 mb-6">
                    <div className="flex justify-between py-3 border-b border-gold/20">
                      <span className="text-sm text-gray-600">Breed:</span>
                      <span className="text-sm font-semibold text-brown">{puppy.breed}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gold/20">
                      <span className="text-sm text-gray-600">Age:</span>
                      <span className="text-sm font-semibold text-brown">{puppy.age}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gold/20">
                      <span className="text-sm text-gray-600">Gender:</span>
                      <span className="text-sm font-semibold text-brown">{puppy.gender}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gold/20">
                      <span className="text-sm text-gray-600">Color:</span>
                      <span className="text-sm font-semibold text-brown">{puppy.color}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-sm text-gray-600">Current Weight:</span>
                      <span className="text-sm font-semibold text-brown">{puppy.weight}</span>
                    </div>
                  </div>

                  {/* Temperament Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {puppy.temperamentTags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Section */}
                  <div className="border-2 border-brown rounded-2xl p-6 bg-gold/5 mb-6">
                    <div className="text-4xl font-bold text-gold mb-3">{formatPrice(puppy.price)}</div>
                    <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                      Includes: Health certificate, first vaccinations, deworming, microchip, starter food pack, blanket with mother&apos;s scent, training guide
                    </div>
                    <div className="text-xs text-gray-600">
                      Payment options: {puppy.paymentOptions.join(' | ')}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {puppy.status !== 'reserved' ? (
                    <div className="space-y-3 mb-6">
                      <Link
                        href={`https://wa.me/234XXXXXXXXX?text=I'm interested in ${puppy.name}, the ${puppy.breed} puppy (#${puppy.breed.substring(0, 2).toUpperCase()}-00${puppy.id})`}
                        className="block py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform"
                      >
                        <FaWhatsapp className="inline mr-2" />
                        Reserve on WhatsApp
                      </Link>
                      <Link
                        href="tel:+234XXXXXXXXX"
                        className="block py-4 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform"
                      >
                        <FaPhone className="inline mr-2" />
                        Call to Discuss
                      </Link>
                      <Link
                        href="/contact-us"
                        className="block py-4 bg-white text-brown border border-gold/30 text-center font-medium rounded-2xl hover:bg-gold/5 transition"
                      >
                        <FaCalendarAlt className="inline mr-2" />
                        Schedule a Visit
                      </Link>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `${puppy.name} - ${puppy.breed}`,
                              text: `Check out ${puppy.name}, a beautiful ${puppy.breed} puppy!`,
                              url: window.location.href,
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copied to clipboard!');
                          }
                        }}
                        className="w-full py-3 text-center text-sm text-gray-600 hover:text-gold transition"
                      >
                        <FaShareAlt className="inline mr-2" />
                        Share This Puppy
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 bg-gray-300 text-gray-500 border-2 border-gray-300 font-semibold rounded-2xl cursor-not-allowed"
                    >
                      Reserved
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
                    Lagos, Nigeria
                  </p>
                  <div className="px-4 py-2 bg-gold/10 border border-gold/30 rounded-xl text-xs text-gray-600">
                    Average response time: Within 2 hours
                  </div>
                </div>

                {/* Trust Box */}
                <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Verified Breeder</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Health Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">Lifetime Support</span>
                    </div>
                  </div>
                </div>

                {/* Recently Added */}
                <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                  <h3 className="text-base font-bold text-brown mb-4">Recently Added</h3>
                  <div className="space-y-4">
                    {similarPuppies.map((p) => (
                      <Link
                        key={p.id}
                        href={`/puppy-detail/${p.id}`}
                        className="flex gap-3 p-3 border border-gold/20 rounded-xl hover:bg-gold/5 transition group"
                      >
                        <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={p.image}
                            alt={p.breed}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-brown group-hover:text-gold transition text-sm">
                            {p.breed}
                          </div>
                          <div className="text-gold font-bold text-sm">{formatPrice(p.price)}</div>
                          <div className="text-xs text-gray-500 underline mt-1">View Details →</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Puppies Section */}
          {similarPuppies.length > 0 && (
            <div className="mt-16 pt-16 border-t-2 border-gold/30">
              <h2 className="text-3xl font-bold text-brown mb-8 text-center">
                Similar Puppies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarPuppies.map((p) => (
                  <Link
                    key={p.id}
                    href={`/puppy-detail/${p.id}`}
                    className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group"
                  >
                    <div className="relative h-[300px] overflow-hidden">
                      <Image
                        src={p.image}
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4 text-gold">Bullify Kennel</div>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">Premium dog breeding in Lagos, Nigeria. Healthy, happy puppies for loving families.</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-gray-300 hover:text-gold transition">Home</Link>
                <Link href="/available-puppies" className="text-sm text-gray-300 hover:text-gold transition">Available Puppies</Link>
                <Link href="/about-us" className="text-sm text-gray-300 hover:text-gold transition">About Us</Link>
                <Link href="/gallery" className="text-sm text-gray-300 hover:text-gold transition">Gallery</Link>
                <Link href="/contact-us" className="text-sm text-gray-300 hover:text-gold transition">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Contact Info</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="text-gold" />
                  <span>+234 XXX XXX XXXX</span>
                </div>
                <p className="mt-2">Lagos, Nigeria</p>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Newsletter</h3>
              <p className="text-sm text-gray-300 mb-2">Get updates on available puppies</p>
              <input type="email" placeholder="Your email address" className="w-full px-3 py-3 border border-gold/30 bg-brown/30 rounded-2xl mb-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gold" />
              <button className="w-full px-3 py-3 bg-gradient-to-r from-gold to-brown text-dark border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
          <div className="border-t border-gold/30 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <div>© 2024 Bullify Kennel. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gold transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-gold transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition"
          >
            ×
          </button>
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage]}
              alt={`${puppy.name} - Full size`}
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
              className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
            >
              →
            </button>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition ${
                  selectedImage === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

