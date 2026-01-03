import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import PuppyDetailView from '@/components/PuppyDetailClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/dbConnect';
import Puppy from '@/lib/models/Puppy';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getPuppy(id: string) {
  try {
    await dbConnect();
    const puppy = await Puppy.findById(id).lean();
    if (!puppy) return null;
    return JSON.parse(JSON.stringify(puppy));
  } catch (error) {
    return null;
  }
}

async function getSimilarPuppies(breed: string, currentId: string) {
  try {
    await dbConnect();
    let puppies = await Puppy.find({
      breed: breed,
      _id: { $ne: currentId },
      status: { $in: ['available', 'new'] }
    }).limit(3).lean();

    // If not enough same breed, fill with others
    if (puppies.length < 3) {
      const otherPuppies = await Puppy.find({
        _id: { $ne: currentId, $nin: puppies.map((p: any) => p._id) },
        status: { $in: ['available', 'new'] }
      }).limit(3 - puppies.length).lean();
      puppies = [...puppies, ...otherPuppies];
    }

    return JSON.parse(JSON.stringify(puppies));
  } catch (error) {
    return [];
  }
}

export default async function PuppyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const puppy = await getPuppy(id);

  if (!puppy) {
    notFound();
  }

  const similarPuppies = await getSimilarPuppies(puppy.breed, puppy._id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb - Optional, but useful context */}
      <div className="bg-white border-b-2 border-gold/30 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gold transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/available-puppies" className="hover:text-gold transition">Available Puppies</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600 font-semibold">{puppy.breed} - {puppy.gender}</span>
          </div>
        </div>
      </div>

      <PuppyDetailView puppy={puppy} similarPuppies={similarPuppies} />

      <Footer />

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}
