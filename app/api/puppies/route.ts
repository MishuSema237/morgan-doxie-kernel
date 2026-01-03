import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Puppy from '@/lib/models/Puppy';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        // Fetch all puppies, let frontend filter
        const puppies = await Puppy.find({}).sort({ createdAt: -1 });
        return NextResponse.json(puppies);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
