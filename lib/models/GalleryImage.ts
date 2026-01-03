import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
    src: {
        type: String,
        required: [true, 'Please provide an image source URL'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['puppies', 'adults', 'facility'],
    },
    caption: {
        type: String,
        required: [true, 'Please provide a caption'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
