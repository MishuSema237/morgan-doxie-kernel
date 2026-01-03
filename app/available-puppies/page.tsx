import Link from 'next/link';
import { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import PuppyBrowser from '@/components/PuppyBrowser';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/dbConnect';
import Breed from '@/lib/models/Breed';
import Puppy from '@/lib/models/Puppy';

async function getData() {
  await dbConnect();
  const [puppies, breeds] = await Promise.all([
    Puppy.find({}).sort({ createdAt: -1 }).lean(),
    Breed.find({}).select('name').sort({ name: 1 }).lean()
  ]);

  return {
    puppies: JSON.parse(JSON.stringify(puppies)),
    breeds: JSON.parse(JSON.stringify(breeds))
  };
}

export default async function AvailablePuppies() {
  const { puppies, breeds } = await getData();

  // Create breed names array for filter
  const breedNames = ['All Breeds', ...breeds.map((b: any) => b.name)];

  return (
    <div className="min-h-screen bg-white">
      <Header />

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

      {/* Client Component for filtering/listing */}
      <Suspense fallback={
        <div className="py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-gray-600">Loading puppies...</div>
          </div>
        </div>
      }>
        <PuppyBrowser initialPuppies={puppies} breeds={breedNames} />
      </Suspense>

      <Footer />
    </div>
  );
}
