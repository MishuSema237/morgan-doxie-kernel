
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GalleryImage from '../lib/models/GalleryImage';
import Breed from '../lib/models/Breed';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

const galleryImages = [
    { src: '/photos/3dogs_transparent_bg.png', category: 'puppies', caption: 'Golden Retriever Puppies', date: '2024-01-15' },
    { src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'puppies', caption: 'Playful Puppies', date: '2024-01-20' },
    { src: '/photos/3dogs.jpg', category: 'adults', caption: 'Adult Dogs', date: '2024-02-01' },
    { src: '/photos/pitbull.png', category: 'puppies', caption: 'Pitbull Puppy', date: '2024-02-10' },
    { src: '/photos/pitbull_sitting.png', category: 'adults', caption: 'Sitting Pretty', date: '2024-02-15' },
    { src: '/photos/3dogs_transparent_bg.png', category: 'puppies', caption: 'Group Photo', date: '2024-02-20' },
    { src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'facility', caption: 'Our Kennel', date: '2024-03-01' },
    { src: '/photos/3dogs.jpg', category: 'puppies', caption: 'Happy Puppies', date: '2024-03-05' },
    { src: '/photos/pitbull.png', category: 'adults', caption: 'Adult Dog Portrait', date: '2024-03-10' },
    { src: '/photos/pitbull_sitting.png', category: 'puppies', caption: 'New Litter', date: '2024-03-15' },
    { src: '/photos/3dogs_transparent_bg.png', category: 'facility', caption: 'Play Area', date: '2024-03-20' },
    { src: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', category: 'puppies', caption: 'Best Friends', date: '2024-04-01' },
];

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

async function seedContent() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Clear existing content
        await GalleryImage.deleteMany({});
        await Breed.deleteMany({});
        console.log('Cleared existing content collections');

        // Insert new content
        const createdImages = await GalleryImage.insertMany(galleryImages);
        console.log(`Created ${createdImages.length} gallery images`);

        const createdBreeds = await Breed.insertMany(breeds);
        console.log(`Created ${createdBreeds.length} breeds`);

        console.log('Content seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding content:', error);
        process.exit(1);
    }
}

seedContent();
