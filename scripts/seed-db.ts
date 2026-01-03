
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const seedPuppies = [
    { breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tags: ['Family Friendly'], price: 180000, description: 'Beautiful, healthy Golden Retriever puppy. Vaccinated, dewormed, and vet-checked. Great with kids.', images: ['/photos/3dogs_transparent_bg.png'], status: 'available', color: 'Golden', isFeatured: true },
    { breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tags: ['Active'], price: 220000, description: 'Intelligent and loyal German Shepherd. Perfect for families who want a protective companion.', images: ['/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg'], status: 'available', color: 'Black & Tan' },
    { breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tags: ['Calm'], price: 170000, description: 'Friendly Labrador puppy with gentle temperament. Fully vaccinated and ready for a loving home.', images: ['/photos/3dogs.jpg'], status: 'available', color: 'Yellow' },
    { breed: 'Rottweiler', age: '12 weeks', gender: 'Male', tags: ['Protective'], price: 250000, description: 'Strong and confident Rottweiler puppy. Well-socialized and trained. Excellent guard dog.', images: ['/photos/pitbull.png'], status: 'available', color: 'Black & Tan' },
    { breed: 'Poodle', age: '9 weeks', gender: 'Female', tags: ['Smart'], price: 200000, description: 'Elegant toy poodle with exceptional intelligence. Hypoallergenic coat perfect for families with allergies.', images: ['/photos/pitbull_sitting.png'], status: 'reserved', color: 'Apricot' },
    { breed: 'Beagle', age: '7 weeks', gender: 'Female', tags: ['Curious'], price: 160000, description: 'Adorable Beagle puppy with wonderful temperament. Curious and friendly, excellent with children.', images: ['/photos/3dogs_transparent_bg.png'], status: 'available', color: 'Tri-color' },
    { breed: 'Siberian Husky', age: '11 weeks', gender: 'Male', tags: ['Energetic'], price: 280000, description: 'Stunning Siberian Husky with striking blue eyes. Energetic and social, perfect for active families.', images: ['/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg'], status: 'available', color: 'Gray & White' },
    { breed: 'Cocker Spaniel', age: '8 weeks', gender: 'Female', tags: ['Gentle'], price: 190000, description: 'Sweet Cocker Spaniel with silky coat. Affectionate and gentle, wonderful companion for all ages.', images: ['/photos/3dogs.jpg'], status: 'available', color: 'Golden' },
    { breed: 'Bulldog', age: '9 weeks', gender: 'Male', tags: ['Calm'], price: 240000, description: 'Adorable English Bulldog with classic features. Calm temperament, perfect for apartment living.', images: ['/photos/pitbull.png'], status: 'available', color: 'Brindle' },
    { breed: 'Shih Tzu', age: '7 weeks', gender: 'Male', tags: ['Affectionate'], price: 210000, description: 'Adorable Shih Tzu puppy, perfect lap dog. Very affectionate and great for apartments.', images: ['/photos/pitbull_sitting.png'], status: 'available', color: 'Gold & White' },
    { breed: 'Maltese', age: '6 weeks', gender: 'Male', tags: ['Gentle'], price: 195000, description: 'Elegant Maltese puppy with snow-white coat. Gentle and playful, excellent for families and seniors.', images: ['/photos/3dogs_transparent_bg.png'], status: 'available', color: 'White' },
    { breed: 'Yorkshire Terrier', age: '8 weeks', gender: 'Female', tags: ['Confident'], price: 175000, description: 'Tiny Yorkshire Terrier with big personality. Confident and energetic, perfect for apartment living.', images: ['/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg'], status: 'available', color: 'Blue & Gold' },
];

const puppySchema = new mongoose.Schema(
    {
        breed: { type: String, required: true },
        age: { type: String, required: true },
        gender: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        images: [{ type: String }],
        status: { type: String, default: 'available' },
        color: { type: String },
        tags: [{ type: String }],
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Puppy = mongoose.models.Puppy || mongoose.model('Puppy', puppySchema);

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected.');

        console.log('Clearing existing puppies (optional, removing for safety just check count)...');
        // await Puppy.deleteMany({}); // Uncomment to clear
        const count = await Puppy.countDocuments();
        if (count > 0) {
            console.log(`Database already has ${count} puppies. Skipping seed.`);
        } else {
            console.log('Seeding puppies...');
            await Puppy.insertMany(seedPuppies);
            console.log('Seeded successfully.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding:', error);
        process.exit(1);
    }
}

seed();
