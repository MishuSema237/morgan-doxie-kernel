'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { Suspense } from 'react';

const allPuppies = [
  { id: 1, name: 'Max', breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tag: 'Family Friendly', price: 180000, image: '/photos/3dogs_transparent_bg.png' },
  { id: 2, name: 'Luna', breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tag: 'Active', price: 220000, image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg' },
  { id: 3, name: 'Buddy', breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tag: 'Calm', price: 170000, image: '/photos/3dogs.jpg' },
  { id: 4, name: 'Rocky', breed: 'Pitbull', age: '12 weeks', gender: 'Male', tag: 'Energetic', price: 200000, image: '/photos/pitbull.png' },
  { id: 5, name: 'Bella', breed: 'Pitbull', age: '10 weeks', gender: 'Female', tag: 'Affectionate', price: 205000, image: '/photos/pitbull_sitting.png' },
];

function SelectPuppyContent() {
  const searchParams = useSearchParams();
  const breed = searchParams.get('breed') || 'All Breeds';
  const puppies = allPuppies.filter(p => breed === 'All Breeds' ? true : p.breed === breed);

  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
        </div>
      </header>

      <section className="h-[260px] bg-gradient-to-br from-brown via-brown/90 to-dark text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Select a {breed === 'All Breeds' ? 'Puppy' : breed}</h1>
          <p className="text-lg text-gold">Choose a specific puppy to reserve</p>
        </div>
      </section>

      <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {puppies.map((puppy) => (
              <div key={puppy.id} className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl transition">
                <div className="relative h-[260px]">
                  <Image src={puppy.image} alt={`${puppy.breed}`} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-xl font-bold text-brown">{puppy.name}</h3>
                    <span className="text-xs text-gold font-semibold">AVAILABLE</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{puppy.breed}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.age}</span>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.gender}</span>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.tag}</span>
                  </div>
                  <div className="text-xl font-bold text-brown mb-4">₦{puppy.price.toLocaleString('en-US')}</div>
                  <div className="flex gap-2">
                    <Link href={`/reserve-puppy?id=${puppy.id}`} className="flex-1 py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-sm font-semibold rounded-2xl text-center hover:scale-105 transition-transform">Select</Link>
                    <Link href={`/puppy-detail/${puppy.id}`} className="flex-1 py-3 bg-white text-brown border-2 border-gold text-sm font-semibold rounded-2xl text-center hover:bg-gold/10 transition">See Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}

export default function SelectPuppy() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SelectPuppyContent />
    </Suspense>
  );
}
