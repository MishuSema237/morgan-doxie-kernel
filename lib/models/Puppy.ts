import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPuppy extends Document {
    breed: string;
    age: string;
    dob?: Date;
    gender: string;
    price: number;
    description: string;
    images: string[];
    status: 'available' | 'reserved' | 'sold' | 'new';
    color: string;
    tags: string[];
    isFeatured?: boolean;
    dadName?: string;
    momName?: string;
    healthDetails?: string[];
    pedigree?: string;
    temperament?: string[];
}

const puppySchema = new Schema<IPuppy>(
    {
        breed: { type: String, required: true },
        age: { type: String, required: true },
        dob: { type: Date }, // New: Date of Birth for precise age
        gender: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        images: [{ type: String }],
        status: {
            type: String,
            enum: ['available', 'reserved', 'sold', 'new'],
            default: 'available'
        },
        color: { type: String },
        tags: [{ type: String }],
        isFeatured: { type: Boolean, default: false },

        // New Credibility Fields
        dadName: { type: String },
        momName: { type: String },
        healthDetails: [{ type: String }], // Array of health checks e.g. "Vaccinated", "Vet Checked"
        pedigree: { type: String }, // Info about lineage or registry
        temperament: [{ type: String }] // e.g. ["Playful", "Calm"]
    },
    { timestamps: true }
);

// Prevent overwrite on hot reload
const Puppy: Model<IPuppy> = mongoose.models.Puppy || mongoose.model<IPuppy>('Puppy', puppySchema);

export default Puppy;
