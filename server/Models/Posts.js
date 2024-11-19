import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    fileId: { type: String, required: true }, // GridFS file ID
    fileType: { type: String, required: true }, // MIME type
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Post', postSchema);
