import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import { sendDepositReceivedEmail } from '@/lib/email';

// GET - Get single order
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await dbConnect();
        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        console.error('Order fetch error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PUT - Update order
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await dbConnect();
        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        // Track status changes
        if (body.status && body.status !== order.status) {
            order.statusHistory.push({
                status: body.status,
                changedBy: body.changedBy || 'admin',
                changedAt: new Date(),
                notes: body.statusNotes,
            });
        }

        // Update fields
        Object.assign(order, body);
        await order.save();

        return NextResponse.json({
            success: true,
            data: order,
            message: 'Order updated successfully',
        });
    } catch (error: any) {
        console.error('Order update error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update order' },
            { status: 500 }
        );
    }
}

// DELETE - Delete order
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await dbConnect();
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error: any) {
        console.error('Order delete error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete order' },
            { status: 500 }
        );
    }
}
