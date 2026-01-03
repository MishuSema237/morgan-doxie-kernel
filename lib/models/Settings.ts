import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISettings extends Document {
    currency: string;
    currencySymbol: string;
    currencyPosition: 'before' | 'after';
}

const SettingsSchema = new Schema<ISettings>(
    {
        currency: {
            type: String,
            required: true,
            default: 'NGN',
            enum: ['USD', 'GBP', 'EUR', 'NGN', 'JPY', 'CAD', 'AUD'],
        },
        currencySymbol: {
            type: String,
            required: true,
            default: '₦',
        },
        currencyPosition: {
            type: String,
            enum: ['before', 'after'],
            default: 'before',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite on hot reload
const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
