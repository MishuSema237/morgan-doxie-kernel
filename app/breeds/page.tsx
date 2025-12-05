'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCheck } from 'react-icons/fa';

const breeds = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    image: '/photos/3dogs_transparent_bg.png',
    size: 'Large',
    energy: 'High',
    withKids: 'Excellent',
    grooming: 'Medium',
    description: 'Intelligent, friendly, and devoted. Golden Retrievers are excellent family dogs known for their gentle temperament and love of play. Great with children and easy to train.',
    price: 'From ₦180,000',
    available: 3,
    sizeCategory: 'large',
    temperament: 'family',
  },
  {
    id: 'german-shepherd',
    name: 'German Shepherd',
    image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg',
    size: 'Large',
    energy: 'High',
    withKids: 'Very Good',
    grooming: 'Medium',
    description: 'Confident, courageous, and smart. German Shepherds are loyal protectors and working dogs. Excellent for families seeking security and a devoted companion. Highly trainable.',
    price: 'From ₦220,000',
    available: 2,
    sizeCategory: 'large',
    temperament: 'guard',
  },
  {
    id: 'labrador',
    name: 'Labrador Retriever',
    image: '/photos/3dogs.jpg',
    size: 'Large',
    energy: 'High',
    withKids: 'Excellent',
    grooming: 'Low',
    description: 'Friendly, outgoing, and high-spirited. Labradors are America\'s most popular breed for good reason. They\'re versatile, energetic, and perfect for active families.',
    price: 'From ₦170,000',
    available: 1,
    sizeCategory: 'large',
    temperament: 'family',
  },
  {
    id: 'pitbull',
    name: 'Pitbull',
    image: '/photos/pitbull.png',
    size: 'Medium',
    energy: 'High',
    withKids: 'Good',
    grooming: 'Low',
    description: 'Loyal, affectionate, and strong. Pitbulls are misunderstood but make wonderful family pets with proper training. They are devoted to their families.',
    price: 'From ₦200,000',
    available: 2,
    sizeCategory: 'medium',
    temperament: 'active',
  },
];

const sizes = ['all', 'small', 'medium', 'large'];
const temperaments = ['all', 'family', 'active', 'calm', 'guard'];

export default function Breeds() {
  const [sizeFilter, setSizeFilter] = useState('all');
  const [temperamentFilter, setTemperamentFilter] = useState('all');

  const filteredBreeds = breeds.filter(breed => {
    const sizeMatch = sizeFilter === 'all' || breed.sizeCategory === sizeFilter;
    const tempMatch = temperamentFilter === 'all' || breed.temperament === temperamentFilter;
    return sizeMatch && tempMatch;
  });

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
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
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

      {/* Page Header */}
      <section className="h-[400px] bg-gradient-to-br from-brown via-brown/90 to-dark text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Dog Breeds We Specialize In</h1>
          <p className="text-xl text-gold">Learn about the breeds we carefully raise and find your perfect match</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b-2 border-gold/30 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap items-center gap-6">
          <span className="text-base font-semibold text-brown">Filter by:</span>
          <div className="flex flex-wrap gap-2 border-r-2 border-gold/30 pr-6">
            <button
              onClick={() => setSizeFilter('all')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                sizeFilter === 'all'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              All Sizes
            </button>
            <button
              onClick={() => setSizeFilter('small')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                sizeFilter === 'small'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => setSizeFilter('medium')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                sizeFilter === 'medium'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setSizeFilter('large')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                sizeFilter === 'large'
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
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                temperamentFilter === 'all'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              All Temperaments
            </button>
            <button
              onClick={() => setTemperamentFilter('family')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                temperamentFilter === 'family'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              Family Dogs
            </button>
            <button
              onClick={() => setTemperamentFilter('active')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                temperamentFilter === 'active'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTemperamentFilter('calm')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                temperamentFilter === 'calm'
                  ? 'border-gold bg-gold text-dark'
                  : 'border-gold/30 text-brown hover:border-gold hover:bg-gold/10'
              }`}
            >
              Calm
            </button>
            <button
              onClick={() => setTemperamentFilter('guard')}
              className={`px-4 py-2 border-2 rounded-2xl text-sm font-semibold transition ${
                temperamentFilter === 'guard'
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
              <div key={breed.id} className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl transition">
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
                      href="/available-puppies"
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

      {/* Not Sure Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-brown mb-4">Not Sure Which Breed is Right for You?</h2>
          <p className="text-base text-gray-600 mb-8">
            Take our 2-minute quiz to get personalized breed recommendations based on your lifestyle.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-base font-semibold rounded-2xl hover:scale-105 transition-transform"
          >
            Take the Breed Quiz
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

