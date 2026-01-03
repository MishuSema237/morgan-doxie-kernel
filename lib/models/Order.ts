import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IOrder extends Document {
    orderReference: string;

    // Customer Information
    customerName: string;
    customerEmail: string;
    customerPhone: string;

    // Puppy Details (embedded for historical record)
    puppyId: mongoose.Types.ObjectId;
    puppyDetails: {
        name: string;
        breed: string;
        age: string;
        gender: string;
        price: number;
        images: string[];
    };

    // Shipping Address
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };

    // Payment Information
    paymentMethod: string;
    depositPercentage: number;
    depositAmount: number;
    balanceAmount: number;
    totalAmount: number;
    depositPaid: boolean;
    depositPaidDate?: Date;
    fullPaymentPaid: boolean;
    fullPaymentDate?: Date;
    paymentProofUrls: string[];

    // Delivery Information
    deliveryMethod: 'pickup' | 'delivery_local' | 'delivery_international';
    deliveryFee: number;
    deliveryAddress?: string;
    estimatedDeliveryDate?: Date;
    actualDeliveryDate?: Date;
    trackingNumber?: string;

    // Status Management
    status: 'new' | 'pending' | 'confirmed' | 'awaiting_deposit' |
    'deposit_received' | 'awaiting_balance' | 'paid' |
    'ready_for_pickup' | 'in_transit' | 'delivered' |
    'completed' | 'cancelled';
    statusHistory: {
        status: string;
        changedBy: string;
        changedAt: Date;
        notes?: string;
    }[];

    // Communication
    customerNotes?: string;
    specialRequests?: string;
    internalNotes?: string;
    adminReplies: {
        message: string;
        sentBy: string;
        sentAt: Date;
        attachments?: string[];
    }[];

    // Add-ons
    vaccinated: boolean;
    microchipped: boolean;
    healthCertificate: boolean;

    // Cancellation/Refund
    cancellationReason?: string;
    refundAmount?: number;
    refundDate?: Date;

    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        orderReference: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        // Customer Information
        customerName: {
            type: String,
            required: true,
            index: true,
        },
        customerEmail: {
            type: String,
            required: true,
            index: true,
        },
        customerPhone: {
            type: String,
            required: true,
        },

        // Puppy Details
        puppyId: {
            type: Schema.Types.ObjectId,
            ref: 'Puppy',
            required: true,
        },
        puppyDetails: {
            name: { type: String, required: true },
            breed: { type: String, required: true },
            age: { type: String, required: true },
            gender: { type: String, required: true },
            price: { type: Number, required: true },
            images: [{ type: String }],
        },

        // Shipping Address
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String },
            country: { type: String, required: true },
        },

        // Payment Information
        paymentMethod: {
            type: String,
            required: true,
        },
        depositPercentage: {
            type: Number,
            required: true,
            default: 50,
        },
        depositAmount: {
            type: Number,
            required: true,
        },
        balanceAmount: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        depositPaid: {
            type: Boolean,
            default: false,
        },
        depositPaidDate: {
            type: Date,
        },
        fullPaymentPaid: {
            type: Boolean,
            default: false,
        },
        fullPaymentDate: {
            type: Date,
        },
        paymentProofUrls: [{
            type: String,
        }],

        // Delivery Information
        deliveryMethod: {
            type: String,
            enum: ['pickup', 'delivery_local', 'delivery_international'],
            required: true,
        },
        deliveryFee: {
            type: Number,
            default: 0,
        },
        deliveryAddress: {
            type: String,
        },
        estimatedDeliveryDate: {
            type: Date,
        },
        actualDeliveryDate: {
            type: Date,
        },
        trackingNumber: {
            type: String,
        },

        // Status Management
        status: {
            type: String,
            enum: [
                'new',
                'pending',
                'confirmed',
                'awaiting_deposit',
                'deposit_received',
                'awaiting_balance',
                'paid',
                'ready_for_pickup',
                'in_transit',
                'delivered',
                'completed',
                'cancelled',
            ],
            default: 'new',
            index: true,
        },
        statusHistory: [{
            status: { type: String, required: true },
            changedBy: { type: String, required: true },
            changedAt: { type: Date, required: true, default: Date.now },
            notes: { type: String },
        }],

        // Communication
        customerNotes: {
            type: String,
        },
        specialRequests: {
            type: String,
        },
        internalNotes: {
            type: String,
        },
        adminReplies: [{
            message: { type: String, required: true },
            sentBy: { type: String, required: true },
            sentAt: { type: Date, required: true, default: Date.now },
            attachments: [{ type: String }],
        }],

        // Add-ons
        vaccinated: {
            type: Boolean,
            default: false,
        },
        microchipped: {
            type: Boolean,
            default: false,
        },
        healthCertificate: {
            type: Boolean,
            default: true,
        },

        // Cancellation/Refund
        cancellationReason: {
            type: String,
        },
        refundAmount: {
            type: Number,
        },
        refundDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for performance
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ customerEmail: 1 });

// Prevent model overwrite on hot reload
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
