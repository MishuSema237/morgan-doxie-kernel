'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaSearch } from 'react-icons/fa';

// Gallery images data
const galleryImages = [
  { id: 1, src: '/photos/3dogs_transparent_bg.png', category: 'puppies', caption: 'Golden Retriever Puppies', date: '2024-01-15' },
  { id: 2, src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'puppies', caption: 'Playful Puppies', date: '2024-01-20' },
  { id: 3, src: '/photos/3dogs.jpg', category: 'adults', caption: 'Adult Dogs', date: '2024-02-01' },
  { id: 4, src: '/photos/pitbull.png', category: 'puppies', caption: 'Pitbull Puppy', date: '2024-02-10' },
  { id: 5, src: '/photos/pitbull_sitting.png', category: 'adults', caption: 'Sitting Pretty', date: '2024-02-15' },
  { id: 6, src: '/photos/3dogs_transparent_bg.png', category: 'puppies', caption: 'Group Photo', date: '2024-02-20' },
  { id: 7, src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'facility', caption: 'Our Kennel', date: '2024-03-01' },
  { id: 8, src: '/photos/3dogs.jpg', category: 'puppies', caption: 'Happy Puppies', date: '2024-03-05' },
  { id: 9, src: '/photos/pitbull.png', category: 'adults', caption: 'Adult Dog Portrait', date: '2024-03-10' },
  { id: 10, src: '/photos/pitbull_sitting.png', category: 'puppies', caption: 'New Litter', date: '2024-03-15' },
  { id: 11, src: '/photos/3dogs_transparent_bg.png', category: 'facility', caption: 'Play Area', date: '2024-03-20' },
  { id: 12, src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'puppies', caption: 'Best Friends', date: '2024-04-01' },
];

const categories = [
  { id: 'all', label: 'All Photos', count: galleryImages.length },
  { id: 'puppies', label: 'Puppies', count: galleryImages.filter(img => img.category === 'puppies').length },
  { id: 'adults', label: 'Adult Dogs', count: galleryImages.filter(img => img.category === 'adults').length },
  { id: 'facility', label: 'Our Facility', count: galleryImages.filter(img => img.category === 'facility').length },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    setLightboxOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    } else {
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[nextIndex].id);
    }
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
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
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

      {/* Page Header */}
      <section className="h-[400px] bg-gradient-to-br from-brown via-brown/90 to-dark text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-gold">Beautiful moments from our kennel and happy families</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="bg-white border-b-2 border-gold/30 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 border-2 rounded-2xl font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'border-gold bg-gold text-dark'
                    : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/30 bg-white hover:shadow-2xl transition-all ${
                  index % 7 === 0 || index % 7 === 3 ? 'md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(image.id)}
              >
                <div className={`relative ${
                  index % 7 === 0 || index % 7 === 3 ? 'h-[600px]' : 'h-[300px]'
                }`}>
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <div className="font-semibold text-sm mb-1">{image.caption}</div>
                      <div className="text-xs opacity-80">{new Date(image.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white border-2 border-gold/30 rounded-full flex items-center justify-center text-brown opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaSearch />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 text-gray-600">
            Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Want to See More?</h2>
          <p className="text-lg text-gold mb-8">
            Follow us on Instagram for daily updates and behind-the-scenes content
          </p>
          <Link 
            href="https://instagram.com/bullifykennel" 
            className="inline-block px-8 py-4 bg-gold text-dark border-2 border-gold text-base font-semibold rounded-2xl hover:bg-gold/90 hover:scale-105 transition-transform"
          >
            Follow Us on Instagram
          </Link>
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
      {lightboxOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition z-50"
          >
            ×
          </button>
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {filteredImages.find(img => img.id === selectedImage) && (
              <>
                <Image
                  src={filteredImages.find(img => img.id === selectedImage)!.src}
                  alt={filteredImages.find(img => img.id === selectedImage)!.caption}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
                >
                  ←
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
                >
                  →
                </button>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                  <div className="font-semibold mb-1">
                    {filteredImages.find(img => img.id === selectedImage)!.caption}
                  </div>
                  <div className="text-sm opacity-80">
                    {new Date(filteredImages.find(img => img.id === selectedImage)!.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {filteredImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.id)}
                className={`w-2 h-2 rounded-full transition ${
                  selectedImage === img.id ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

