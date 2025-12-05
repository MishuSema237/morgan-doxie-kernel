'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaWhatsapp, FaCheck, FaHome, FaUsers, FaShieldAlt, FaHeart } from 'react-icons/fa';

const breedData: Record<string, any> = {
  'golden-retriever': {
    name: 'Golden Retriever',
    image: '/photos/3dogs_transparent_bg.png',
    tags: ['Family Friendly', 'Medium Size', 'High Energy'],
    stats: {
      size: 'Large',
      energy: 'High',
      withKids: 'Excellent',
      grooming: 'Medium',
      lifespan: '10-12 years',
      trainability: 'Very Easy',
    },
    description: 'The Golden Retriever is a large-sized breed of dog. They were named retriever because of their ability to retrieve shot game undamaged due to their soft mouth. Golden Retrievers have an instinctive love of water, and are easy to train to basic or advanced obedience standards.',
    temperament: 'Friendly, Reliable, Trustworthy. Golden Retrievers are known for their friendly, tolerant attitude and are great family pets. They\'re even-tempered and intelligent, making them excellent companions.',
    care: [
      'Daily exercise of 1-2 hours',
      'Regular brushing 2-3 times per week',
      'Training should start early and be consistent',
      'Socialization with people and other dogs is important',
      'Mental stimulation through games and activities',
    ],
    idealFor: [
      'Active families with children',
      'First-time dog owners',
      'Homes with yards or access to parks',
      'People who enjoy outdoor activities',
    ],
    considerations: [
      'Requires regular exercise',
      'Needs mental stimulation',
      'Regular grooming required',
      'Can be prone to hip dysplasia',
    ],
    price: 'From ₦180,000',
  },
  'german-shepherd': {
    name: 'German Shepherd',
    image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg',
    tags: ['Guard Dog', 'Large Size', 'High Energy'],
    stats: {
      size: 'Large',
      energy: 'High',
      withKids: 'Very Good',
      grooming: 'Medium',
      lifespan: '9-13 years',
      trainability: 'Very Easy',
    },
    description: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. They are strong, loyal, and highly intelligent. They are used in many roles including police work, military work, and as service dogs.',
    temperament: 'Confident, Courageous, Smart. German Shepherds are known for their loyalty, courage, and protective instincts. They form strong bonds with their families and are excellent guard dogs.',
    care: [
      'Daily exercise of 1-2 hours',
      'Regular brushing weekly',
      'Early training and socialization crucial',
      'Mental stimulation through work or training',
      'Consistent leadership needed',
    ],
    idealFor: [
      'Active families',
      'Security-conscious owners',
      'People with experience with large dogs',
      'Homes with space for exercise',
    ],
    considerations: [
      'Requires experienced handler',
      'Needs plenty of exercise',
      'Early socialization essential',
      'Can be protective of family',
    ],
    price: 'From ₦220,000',
  },
  'labrador': {
    name: 'Labrador Retriever',
    image: '/photos/3dogs.jpg',
    tags: ['Family Friendly', 'Large Size', 'High Energy'],
    stats: {
      size: 'Large',
      energy: 'High',
      withKids: 'Excellent',
      grooming: 'Low',
      lifespan: '10-12 years',
      trainability: 'Very Easy',
    },
    description: 'The Labrador Retriever is a medium-large breed, popular for its friendly nature and versatility. They are America\'s most popular dog breed and excel in many roles including service dogs, therapy dogs, and family pets.',
    temperament: 'Friendly, Active, Outgoing. Labradors are known for their good nature and eagerness to please. They are outgoing and make friends with everyone they meet.',
    care: [
      'Daily exercise of 1-2 hours',
      'Minimal grooming required',
      'Early training recommended',
      'Socialization important',
      'Mental stimulation through activities',
    ],
    idealFor: [
      'Active families',
      'First-time owners',
      'Families with children',
      'People who enjoy outdoor activities',
    ],
    considerations: [
      'High energy levels',
      'Can be prone to obesity',
      'Requires regular exercise',
      'May have separation anxiety if left alone',
    ],
    price: 'From ₦170,000',
  },
  'pitbull': {
    name: 'Pitbull',
    image: '/photos/pitbull.png',
    tags: ['Active', 'Medium Size', 'High Energy'],
    stats: {
      size: 'Medium',
      energy: 'High',
      withKids: 'Good',
      grooming: 'Low',
      lifespan: '12-16 years',
      trainability: 'Easy',
    },
    description: 'The Pitbull is a strong, muscular dog with a loyal and affectionate nature when properly trained and socialized. Despite misconceptions, well-bred and trained Pitbulls make excellent family pets.',
    temperament: 'Loyal, Affectionate, Strong. Pitbulls are known for their loyalty and affection toward their families. With proper training and socialization, they are gentle and loving companions.',
    care: [
      'Daily exercise of 1-2 hours',
      'Minimal grooming',
      'Consistent training and socialization',
      'Early training essential',
      'Regular mental and physical stimulation',
    ],
    idealFor: [
      'Experienced dog owners',
      'Active individuals or families',
      'Homes with yards',
      'People willing to commit to training',
    ],
    considerations: [
      'Requires responsible ownership',
      'Needs consistent training',
      'May face breed restrictions in some areas',
      'Requires socialization',
    ],
    price: 'From ₦200,000',
  },
};

export default function BreedDetail() {
  const params = useParams();
  const breedId = params?.breed as string;
  const breed = breedData[breedId] || breedData['golden-retriever'];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryImages = [
    breed.image,
    '/photos/pitbull_sitting.png',
    '/photos/3dogs.jpg',
    '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      if (!lightboxOpen) {
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
      }
    }, 3000);
    return () => clearInterval(id);
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
                {breed.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-sm rounded-full font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(breed.stats).map(([key, value]) => (
              <div key={key} className="bg-gold/5 border-2 border-gold/30 rounded-2xl p-4 text-center">
                <div className="text-xs text-gray-600 mb-2 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-base font-bold text-brown">{value as string}</div>
              </div>
            ))}
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
                <p className="text-base text-gray-700 leading-relaxed mb-4">{breed.description}</p>
                <h3 className="text-xl font-bold text-brown mb-3 mt-6">Temperament</h3>
                <p className="text-base text-gray-700 leading-relaxed">{breed.temperament}</p>
              </div>

              {/* Auto-swiping gallery */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-0 overflow-hidden">
                <div 
                  className="relative h-[300px] lg:h-[380px] cursor-pointer group"
                  onClick={openLightbox}
                >
                  <Image
                    key={galleryImages[galleryIndex]}
                    src={galleryImages[galleryIndex]}
                    alt={`${breed.name} photo ${galleryIndex + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      Click to view fullscreen
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {galleryImages.map((_, i) => (
                      <span key={i} className={`w-2 h-2 rounded-full transition ${i === galleryIndex ? 'bg-gold' : 'bg-white/70'}`}></span>
                    ))}
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
                      alt={`${breed.name} photo ${galleryIndex + 1}`}
                      width={1200}
                      height={1200}
                      className="max-w-full max-h-full object-contain"
                    />
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl"
                    >
                      →
                    </button>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`w-2 h-2 rounded-full transition ${
                            i === galleryIndex ? 'bg-gold' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Care Requirements */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Care Requirements</h2>
                <div className="space-y-3">
                  {breed.care.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white flex-shrink-0 mt-0.5">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-base text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6 flex items-center gap-2">
                  <FaHeart className="text-gold" />
                  Ideal For
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {breed.idealFor.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gold/5 rounded-2xl">
                      <FaCheck className="text-gold mt-1 flex-shrink-0" />
                      <span className="text-base text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Considerations */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Important Considerations</h2>
                <div className="space-y-3">
                  {breed.considerations.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-gold rounded">
                      <span className="text-base text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="bg-white border-2 border-gold rounded-3xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Starting Price</div>
                  <div className="text-3xl font-bold text-brown">{breed.price}</div>
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
                <Link href="/breeds" className="text-sm text-gray-300 hover:text-gold transition">Breeds</Link>
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
    </div>
  );
}

