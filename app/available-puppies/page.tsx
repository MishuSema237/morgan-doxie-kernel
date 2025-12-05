'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaFilter, FaSort, FaTh, FaList, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample puppy data - would come from database
const allPuppies = [
  { id: 1, breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tag: 'Family Friendly', price: 180000, desc: 'Beautiful, healthy Golden Retriever puppy. Vaccinated, dewormed, and vet-checked. Great with kids.', image: '/photos/3dogs_transparent_bg.png', status: 'new', color: 'Golden' },
  { id: 2, breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tag: 'Active', price: 220000, desc: 'Intelligent and loyal German Shepherd. Perfect for families who want a protective companion.', image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', status: 'available', color: 'Black & Tan' },
  { id: 3, breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tag: 'Calm', price: 170000, desc: 'Friendly Labrador puppy with gentle temperament. Fully vaccinated and ready for a loving home.', image: '/photos/3dogs.jpg', status: 'new', color: 'Yellow' },
  { id: 4, breed: 'Rottweiler', age: '12 weeks', gender: 'Male', tag: 'Protective', price: 250000, desc: 'Strong and confident Rottweiler puppy. Well-socialized and trained. Excellent guard dog.', image: '/photos/pitbull.png', status: 'available', color: 'Black & Tan' },
  { id: 5, breed: 'Poodle', age: '9 weeks', gender: 'Female', tag: 'Smart', price: 200000, desc: 'Elegant toy poodle with exceptional intelligence. Hypoallergenic coat perfect for families with allergies.', image: '/photos/pitbull_sitting.png', status: 'reserved', color: 'Apricot' },
  { id: 6, breed: 'Beagle', age: '7 weeks', gender: 'Female', tag: 'Curious', price: 160000, desc: 'Adorable Beagle puppy with wonderful temperament. Curious and friendly, excellent with children.', image: '/photos/3dogs_transparent_bg.png', status: 'new', color: 'Tri-color' },
  { id: 7, breed: 'Siberian Husky', age: '11 weeks', gender: 'Male', tag: 'Energetic', price: 280000, desc: 'Stunning Siberian Husky with striking blue eyes. Energetic and social, perfect for active families.', image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', status: 'available', color: 'Gray & White' },
  { id: 8, breed: 'Cocker Spaniel', age: '8 weeks', gender: 'Female', tag: 'Gentle', price: 190000, desc: 'Sweet Cocker Spaniel with silky coat. Affectionate and gentle, wonderful companion for all ages.', image: '/photos/3dogs.jpg', status: 'available', color: 'Golden' },
  { id: 9, breed: 'Bulldog', age: '9 weeks', gender: 'Male', tag: 'Calm', price: 240000, desc: 'Adorable English Bulldog with classic features. Calm temperament, perfect for apartment living.', image: '/photos/pitbull.png', status: 'new', color: 'Brindle' },
  { id: 10, breed: 'Shih Tzu', age: '7 weeks', gender: 'Male', tag: 'Affectionate', price: 210000, desc: 'Adorable Shih Tzu puppy, perfect lap dog. Very affectionate and great for apartments.', image: '/photos/pitbull_sitting.png', status: 'new', color: 'Gold & White' },
  { id: 11, breed: 'Maltese', age: '6 weeks', gender: 'Male', tag: 'Gentle', price: 195000, desc: 'Elegant Maltese puppy with snow-white coat. Gentle and playful, excellent for families and seniors.', image: '/photos/3dogs_transparent_bg.png', status: 'available', color: 'White' },
  { id: 12, breed: 'Yorkshire Terrier', age: '8 weeks', gender: 'Female', tag: 'Confident', price: 175000, desc: 'Tiny Yorkshire Terrier with big personality. Confident and energetic, perfect for apartment living.', image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', status: 'available', color: 'Blue & Gold' },
];

const breeds = ['All Breeds', 'Golden Retriever', 'German Shepherd', 'Labrador Retriever', 'Rottweiler', 'Poodle', 'Beagle', 'Siberian Husky', 'Cocker Spaniel', 'Bulldog', 'Shih Tzu', 'Maltese', 'Yorkshire Terrier'];
const ageRanges = ['Any Age', 'Puppies (0-6 months)', 'Young (6-12 months)', 'Adult (1 year+)'];
const genders = ['Any Gender', 'Male', 'Female'];
const priceRanges = ['Any Price', '₦50,000 - ₦100,000', '₦100,000 - ₦200,000', '₦200,000 - ₦300,000', '₦300,000+'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Age: Youngest First'];

export default function AvailablePuppies() {
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

  // Filter puppies
  let filteredPuppies = allPuppies.filter(puppy => {
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
      const ageA = parseInt(a.age);
      const ageB = parseInt(b.age);
      return ageA - ageB;
    }
    return 0; // Newest stays in original order
  });

  // Pagination
  const totalPages = Math.ceil(filteredPuppies.length / puppiesPerPage);
  const startIndex = (currentPage - 1) * puppiesPerPage;
  const paginatedPuppies = filteredPuppies.slice(startIndex, startIndex + puppiesPerPage);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString('en-NG')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as home page */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/available-puppies" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Available Puppies
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
            </Link>
            <Link href="/breeds" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Breeds
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Available Puppies</h1>
          <p className="text-xl text-gold mb-6">Find your perfect companion from our current litters</p>
          <Link href="/breeds" className="inline-block px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-2xl hover:bg-white/20 hover:scale-105 transition-transform text-base font-semibold">
            Browse by Breed →
          </Link>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <div className="bg-white border-b-2 border-gold/30 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/breeds" className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold hover:bg-gold/90 transition">
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
                  className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${
                    viewMode === 'grid' 
                      ? 'border-gold bg-gold text-white' 
                      : 'border-gold/30 text-brown hover:border-gold'
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${
                    viewMode === 'list' 
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
                key={puppy.id} 
                className={`bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group ${
                  viewMode === 'list' ? 'flex flex-row max-h-[300px]' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' 
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
                  <Image 
                    src={puppy.image} 
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
                      <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.tag}</span>
                    </div>
                    <div className="text-2xl font-bold mb-4 text-gold">{formatPrice(puppy.price)}</div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">{puppy.desc}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {puppy.status !== 'reserved' ? (
                      <>
                        <Link 
                          href={`https://wa.me/234XXXXXXXXX?text=I'm interested in this ${puppy.breed} puppy`}
                          className="py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                        >
                          <FaWhatsapp /> Reserve on WhatsApp
                        </Link>
                        <Link 
                          href={`/puppy-detail/${puppy.id}`} 
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
                        Reserved
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
                      className={`w-10 h-10 border-2 rounded-2xl flex items-center justify-center transition ${
                        currentPage === page
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

      {/* Footer - Same as home page */}
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

