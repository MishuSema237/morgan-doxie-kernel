import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import { sendDepositReceivedEmail } from '@/lib/email';

// POST - Mark payment received
export async function POST(
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

        const paymentType = body.paymentType; // 'deposit' or 'balance'

        if (paymentType === 'deposit') {
            order.depositPaid = true;
            order.depositPaidDate = new Date();
            order.status = 'deposit_received';

            // Add to status history
            order.statusHistory.push({
                status: 'deposit_received',
                changedBy: body.changedBy || 'admin',
                changedAt: new Date(),
                notes: 'Deposit payment confirmed',
            });

            // Send confirmation email
            try {
                await sendDepositReceivedEmail(order);
            } catch (emailError) {
                console.error('Email error:', emailError);
            }
        } else if (paymentType === 'balance') {
            order.fullPaymentPaid = true;
            order.fullPaymentDate = new Date();
            order.status = 'paid';

            // Add to status history
            order.statusHistory.push({
                status: 'paid',
                changedBy: body.changedBy || 'admin',
                changedAt: new Date(),
                notes: 'Full payment confirmed',
            });
        }

        // Add payment proof URL if provided
        if (body.paymentProofUrl) {
            order.paymentProofUrls.push(body.paymentProofUrl);
        }

        await order.save();

        return NextResponse.json({
            success: true,
            data: order,
            message: 'Payment marked as received',
        });
    } catch (error: any) {
        console.error('Payment update error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update payment' },
            { status: 500 }
        );
    }
}
