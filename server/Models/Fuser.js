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
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression to validate phone numbers (10 digits)
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
});

// Export the Farmer User model
const Fuser = mongoose.model('Fuser', fuserSchema);
export { Fuser };
