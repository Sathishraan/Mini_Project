import mongoose from 'mongoose';

// Farmer User Schema
const fuserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the Farmer User model
const Fuser = mongoose.model('Fuser', fuserSchema);
export { Fuser };
