import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
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

// Export the User model
const userModel = mongoose.model('User', userSchema);
export { userModel as User };

// models/Address.js


