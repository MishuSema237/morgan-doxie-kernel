import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Breed from '@/lib/models/Breed';
import { isAdminAuthenticated } from '@/lib/auth';

// GET - Get single breed
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const breed = await Breed.findOne({ id });

        if (!breed) {
            return NextResponse.json(
                { success: false, error: 'Breed not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: breed });
    } catch (error) {
        console.error('Error fetching breed:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch breed' },
            { status: 500 }
        );
    }
}

// PUT - Update breed
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAuthenticated = await isAdminAuthenticated();
        if (!isAuthenticated) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        // Remove _id from body to prevent immutable field error
        delete body._id;

        const breed = await Breed.findOneAndUpdate(
            { id },
            body,
            { new: true, runValidators: true }
        );

        if (!breed) {
            return NextResponse.json(
                { success: false, error: 'Breed not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: breed });
    } catch (error: any) {
        console.error('Error updating breed:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update breed' },
            { status: 500 }
        );
    }
}

// DELETE - Delete breed
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAuthenticated = await isAdminAuthenticated();
        if (!isAuthenticated) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const breed = await Breed.findOneAndDelete({ id });

        if (!breed) {
            return NextResponse.json(
                { success: false, error: 'Breed not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Breed deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting breed:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete breed' },
            { status: 500 }
        );
    }
}
