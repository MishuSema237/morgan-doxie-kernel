import mongoose from 'mongoose';

const BreedSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please provide a unique ID'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide the breed name'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    size: {
        type: String,
        required: [true, 'Please provide a size description'],
    },
    energy: {
        type: String,
        required: [true, 'Please provide an energy level'],
    },
    withKids: {
        type: String,
        required: [true, 'Please provide a compatibility description for kids'],
    },
    grooming: {
        type: String,
        required: [true, 'Please provide grooming requirements'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: String,
        required: [true, 'Please provide pricing information'],
    },
    available: {
        type: Number,
        default: 0,
    },
    sizeCategory: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: [true, 'Please provide a size category'],
    },
    temperament: {
        type: String,
        enum: ['family', 'active', 'calm', 'guard'],
        required: [true, 'Please provide a temperament'],
    },
    // New Credibility Fields
    lifespan: {
        type: String, // e.g., "12-15 years"
    },
    origin: {
        type: String, // e.g., "Germany"
    },
    weightRange: {
        type: String, // e.g., "16-32 lbs"
    },
    history: {
        type: String, // Brief history paragraph
    }
});

export default mongoose.models.Breed || mongoose.model('Breed', BreedSchema);
