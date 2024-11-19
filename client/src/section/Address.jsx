import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Address = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/';

    // State for form data
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        zip: ''
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the form is valid before submitting
        if (!formData.street || !formData.city || !formData.zip) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Submit form data to backend
            const response = await axios.post('http://localhost:7007/auth/address', formData);

            if (response.status === 200) {
                // Show the order placed popup
                setOrderPlaced(true);
                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            } else {
                alert("Failed to submit address.");
            }
        } catch (error) {
            console.error("Error submitting address:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                alert(`Error: ${error.response.data.error || 'An error occurred'}`);
            } else if (error.request) {
                console.error("Request data:", error.request);
                alert("No response received from the server.");
            } else {
                alert("Error in setting up the request.");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 max-w-lg mx-auto rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Enter your shipping address</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="street" className="block mb-1 font-semibold">Street Address:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block mb-1 font-semibold">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="zip" className="block mb-1 font-semibold">PIN Code:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                >
                    Complete Address
                </button>
            </form>

            {orderPlaced && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 p-6 rounded-lg shadow-xl text-center z-50">
                    <p className="text-lg font-semibold text-green-600">Your order is placed!</p>
                </div>
            )}
        </div>
    );
};

export default Address;
