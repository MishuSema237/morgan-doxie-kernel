import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GalleryImage from '@/lib/models/GalleryImage';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        await dbConnect();
        const images = await GalleryImage.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch images' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const isAuthenticated = await isAdminAuthenticated();
        if (!isAuthenticated) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await request.json();

        const image = await GalleryImage.create(body);

        return NextResponse.json({ success: true, data: image }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create image' }, { status: 500 });
    }
}
