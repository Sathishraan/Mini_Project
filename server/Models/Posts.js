import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Post', postSchema);
