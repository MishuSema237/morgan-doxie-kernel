import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Breed from '@/lib/models/Breed';

// GET - List all breeds
export async function GET() {
    try {
        await dbConnect();
        const breeds = await Breed.find({}).sort({ name: 1 });

        return NextResponse.json({ success: true, data: breeds });
    } catch (error) {
        console.error('Error fetching breeds:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch breeds' },
            { status: 500 }
        );
    }
}

// POST - Create new breed
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const breed = await Breed.create(body);

        return NextResponse.json(
            { success: true, data: breed },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating breed:', error);

        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'Breed with this ID already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create breed' },
            { status: 500 }
        );
    }
}
