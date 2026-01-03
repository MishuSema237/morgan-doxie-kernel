import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import Puppy from '@/lib/models/Puppy';
import { generateOrderReference, calculatePaymentAmounts } from '@/lib/orderUtils';
import { sendOrderConfirmationEmail, sendNewOrderAlertEmail } from '@/lib/email';

// POST - Create new order
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        // Validate required fields
        const requiredFields = [
            'customerName',
            'customerEmail',
            'customerPhone',
            'puppyId',
            'shippingAddress',
            'paymentMethod',
            'deliveryMethod',
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Get puppy details
        const puppy = await Puppy.findById(body.puppyId);
        if (!puppy) {
            return NextResponse.json(
                { success: false, error: 'Puppy not found' },
                { status: 404 }
            );
        }

        // Check if puppy is available
        if (puppy.status !== 'available' && puppy.status !== 'new') {
            return NextResponse.json(
                { success: false, error: 'Puppy is not available for reservation' },
                { status: 400 }
            );
        }

        // Generate order reference
        const orderCount = await Order.countDocuments();
        const orderReference = generateOrderReference(orderCount);

        // Calculate payment amounts
        const depositPercentage = body.depositPercentage || parseInt(process.env.DEFAULT_DEPOSIT_PERCENTAGE || '50');
        const deliveryFee = body.deliveryFee || 0;
        const totalAmount = puppy.price + deliveryFee;
        const { depositAmount, balanceAmount } = calculatePaymentAmounts(totalAmount, depositPercentage);

        // Create order
        const order = await Order.create({
            orderReference,

            // Customer info
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone,

            // Puppy details (embedded)
            puppyId: puppy._id,
            puppyDetails: {
                name: puppy.breed, // Using breed as name for now
                breed: puppy.breed,
                age: puppy.age,
                gender: puppy.gender,
                price: puppy.price,
                images: puppy.images,
            },

            // Shipping
            shippingAddress: body.shippingAddress,

            // Payment
            paymentMethod: body.paymentMethod,
            depositPercentage,
            depositAmount,
            balanceAmount,
            totalAmount,

            // Delivery
            deliveryMethod: body.deliveryMethod,
            deliveryFee,
            deliveryAddress: body.deliveryAddress,

            // Status
            status: 'new',
            statusHistory: [{
                status: 'new',
                changedBy: 'system',
                changedAt: new Date(),
                notes: 'Order created',
            }],

            // Communication
            customerNotes: body.customerNotes,
            specialRequests: body.specialRequests,

            // Add-ons
            vaccinated: body.vaccinated || false,
            microchipped: body.microchipped || false,
            healthCertificate: body.healthCertificate !== false, // Default true
        });

        // Update puppy status to reserved
        await Puppy.findByIdAndUpdate(puppy._id, { status: 'reserved' });

        // Send confirmation emails
        try {
            await sendOrderConfirmationEmail(order);
            await sendNewOrderAlertEmail(order);
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the order creation if email fails
        }

        return NextResponse.json({
            success: true,
            data: order,
            message: 'Order created successfully',
        });
    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}

// GET - Track order by reference (public)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get('reference');

        if (!reference) {
            return NextResponse.json(
                { success: false, error: 'Order reference is required' },
                { status: 400 }
            );
        }

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
            internalNotes: undefined, // Hide internal notes from customer
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
