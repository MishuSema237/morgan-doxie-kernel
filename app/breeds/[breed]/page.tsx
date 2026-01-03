import dbConnect from '@/lib/dbConnect';
import Breed from '@/lib/models/Breed';
import BreedDetailClient from '@/components/BreedDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getBreed(breedId: string) {
  await dbConnect();
  const breed = await Breed.findOne({ id: breedId }).lean();
  return breed ? JSON.parse(JSON.stringify(breed)) : null;
}

export default async function BreedDetail({ params }: { params: { breed: string } }) {
  const breed = await getBreed(params.breed);

  if (!breed) {
    notFound();
  }

  return <BreedDetailClient breed={breed} />;
}
