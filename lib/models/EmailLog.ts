import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IEmailLog extends Document {
    orderId: mongoose.Types.ObjectId;
    orderReference: string;
    recipient: string;
    recipientName: string;
    subject: string;
    template: string;
    status: 'sent' | 'failed' | 'bounced';
    sentAt: Date;
    errorMessage?: string;
    attachments?: string[];
}

const EmailLogSchema = new Schema<IEmailLog>(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
            index: true,
        },
        orderReference: {
            type: String,
            required: true,
            index: true,
        },
        recipient: {
            type: String,
            required: true,
        },
        recipientName: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        template: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['sent', 'failed', 'bounced'],
            default: 'sent',
        },
        sentAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        errorMessage: {
            type: String,
        },
        attachments: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);

// Indexes
EmailLogSchema.index({ sentAt: -1 });
EmailLogSchema.index({ status: 1 });

// Prevent model overwrite on hot reload
const EmailLog: Model<IEmailLog> = mongoose.models.EmailLog || mongoose.model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;
