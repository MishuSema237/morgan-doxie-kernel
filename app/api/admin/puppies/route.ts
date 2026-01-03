import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Puppy from '@/lib/models/Puppy';

// GET - List all puppies
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const breed = searchParams.get('breed');

        // Build filter
        const filter: any = {};
        if (status) filter.status = status;
        if (breed) filter.breed = new RegExp(breed, 'i');

        const puppies = await Puppy.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: puppies });
    } catch (error) {
        console.error('Error fetching puppies:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch puppies' },
            { status: 500 }
        );
    }
}

// POST - Create new puppy
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        const puppy = await Puppy.create(body);

        return NextResponse.json(
            { success: true, data: puppy },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating puppy:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create puppy' },
            { status: 500 }
        );
    }
}
