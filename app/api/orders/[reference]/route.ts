import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';

// GET - Get order by reference (public tracking)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
) {
    try {
        const { reference } = await params;

        await dbConnect();
        const order = await Order.findOne({ orderReference: reference });

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Return sanitized data (no internal notes)
        const sanitizedOrder = {
            ...order.toObject(),
            internalNotes: undefined,
        };

        return NextResponse.json({
            success: true,
            data: sanitizedOrder,
        });
    } catch (error: any) {
        console.error('Order fetch error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch order' },
            { status: 500 }
        );
    }
}
