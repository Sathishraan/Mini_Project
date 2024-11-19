// Address model (Address.js)
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});

export const Address = mongoose.model('Address', addressSchema); // ES6 style
