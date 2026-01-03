import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import { sendCustomEmail, sendPaymentDetailsEmail } from '@/lib/email';

// POST - Send email to customer
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

        const { message, subject, attachments, emailType } = body;

        let emailSent = false;

        // Send appropriate email based on type
        if (emailType === 'payment_details') {
            emailSent = await sendPaymentDetailsEmail(order, message, attachments);
        } else {
            emailSent = await sendCustomEmail(order, message, subject, attachments);
        }

        if (!emailSent) {
            return NextResponse.json(
                { success: false, error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // Log the communication
        order.adminReplies.push({
            message,
            sentBy: body.sentBy || 'admin',
            sentAt: new Date(),
            attachments: attachments?.map((a: any) => a.filename) || [],
        });

        await order.save();

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
        });
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
