import dbConnect from '@/lib/dbConnect';
import GalleryImage from '@/lib/models/GalleryImage';
import GalleryGrid from '@/components/GalleryGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getGalleryImages() {
  await dbConnect();
  const images = await GalleryImage.find({}).sort({ date: -1 }).lean();
  return JSON.parse(JSON.stringify(images));
}

export default async function Gallery() {
  const galleryImages = await getGalleryImages();

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-gold">Beautiful moments from our kennel and happy families</p>
        </div>
      </section>

      <GalleryGrid initialImages={galleryImages} />

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

      <Footer />

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}
