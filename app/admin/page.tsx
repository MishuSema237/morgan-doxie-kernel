'use client';

import Link from 'next/link';

export default function Admin() {
  return (
    <div className="min-h-screen bg-white">
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition">Bullify Kennel</Link>
          <div className="text-sm text-gray-600">Admin</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-brown mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Placeholder. We will wire this to manage site data.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-2 border-gold/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brown mb-2">Breeds</h2>
            <p className="text-sm text-gray-600 mb-4">Add/edit breeds, stats, images, care, temperament.</p>
            <button className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold">Open</button>
          </div>
          <div className="border-2 border-gold/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brown mb-2">Puppies</h2>
            <p className="text-sm text-gray-600 mb-4">Add/edit puppies, names, prices, status, photos.</p>
            <button className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold">Open</button>
          </div>
          <div className="border-2 border-gold/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brown mb-2">Content</h2>
            <p className="text-sm text-gray-600 mb-4">Home, About, Gallery, Contact content & assets.</p>
            <button className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold">Open</button>
          </div>
          <div className="border-2 border-gold/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brown mb-2">Reservations</h2>
            <p className="text-sm text-gray-600 mb-4">View reservations, verify payments, update status.</p>
            <button className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold">Open</button>
          </div>
          <div className="border-2 border-gold/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brown mb-2">Settings</h2>
            <p className="text-sm text-gray-600 mb-4">Banks, WhatsApp, pricing defaults, hero assets.</p>
            <button className="px-4 py-2 bg-gold text-dark border-2 border-gold rounded-2xl text-sm font-semibold">Open</button>
          </div>
        </div>
      </main>
    </div>
  );
}




