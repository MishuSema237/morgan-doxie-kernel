import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Puppy from '@/lib/models/Puppy';
import { isAdminAuthenticated } from '@/lib/auth';

// GET - Get single puppy
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const puppy = await Puppy.findById(id);

        if (!puppy) {
            return NextResponse.json(
                { success: false, error: 'Puppy not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: puppy });
    } catch (error) {
        console.error('Error fetching puppy:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch puppy' },
            { status: 500 }
        );
    }
}

// PUT - Update puppy
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

        // Remove _id from body
        delete body._id;

        const puppy = await Puppy.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!puppy) {
            return NextResponse.json(
                { success: false, error: 'Puppy not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: puppy });
    } catch (error: any) {
        console.error('Error updating puppy:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update puppy' },
            { status: 500 }
        );
    }
}

// DELETE - Delete puppy
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
        const puppy = await Puppy.findByIdAndDelete(id);

        if (!puppy) {
            return NextResponse.json(
                { success: false, error: 'Puppy not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Puppy deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting puppy:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete puppy' },
            { status: 500 }
        );
    }
}
