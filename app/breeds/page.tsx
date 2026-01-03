import dbConnect from '@/lib/dbConnect';
import Breed from '@/lib/models/Breed';
import BreedList from '@/components/BreedList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getBreeds() {
  await dbConnect();
  const breeds = await Breed.find({}).sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(breeds));
}

export default async function Breeds() {
  const breeds = await getBreeds();

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Dog Breeds We Specialize In</h1>
          <p className="text-xl text-gold">Learn about the breeds we carefully raise and find your perfect match</p>
        </div>
      </section>

      <BreedList initialBreeds={breeds} />

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
            Contact Us for Advice
          </Link>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}
