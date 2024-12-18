import { QRCodeCanvas } from 'qrcode.react'; // Correctly import as a named export
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';

const Address = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        zip: '',
    });

    const [paymentStep, setPaymentStep] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiGenerated, setUpiGenerated] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const upiId = 'sathishraana0701@okhdfcbank';
    const amount = '0'; // Set a sample amount for payment

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Access the passed state in Address component
    
    const totalAmount = location.state?.amount || 0; // Default to 0 if amount not passed


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.street || !formData.city || !formData.zip) {
            alert('Please fill in all required fields.');
            return;
        }

        setPaymentStep(true); // Proceed to payment step
    };

    const handlePaymentSubmit = () => {
        if (paymentMethod === 'Online') {
            setUpiGenerated(true); // Show QR code for online payment
        } else if (paymentMethod === 'COD') {
            setPaymentSuccess(true); // Directly show success for COD
            setTimeout(() => {
                navigate('/cart');
            }, 5000);
        }
    };

    const confirmOnlinePayment = () => {
        setPaymentSuccess(true); // Mark payment as successful
        setTimeout(() => {
            navigate('/cart'); // Redirect after confetti
        }, 5000);
    };

    return (
        <div className="p-6 md:mt-40 bg-white max-w-lg mx-auto rounded-lg shadow-lg">
            {!paymentStep ? (
                <>
                    <h2 className="text-2xl font-bold rounded-xl p-3 mb-4 text-center">
                        Enter your shipping address
                    </h2>
                    <form onSubmit={handleSubmit} className="bg-white">
                        <div className="bg-white mb-4">
                            <label htmlFor="street" className="block mb-1 bg-white font-semibold">
                                Street Address:
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                className="bg-white w-full p-2 border-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="bg-white mb-4">
                            <label htmlFor="city" className="block mb-1 bg-white font-semibold">
                                City:
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="bg-white w-full p-2 border-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="bg-white mb-4">
                            <label htmlFor="zip" className="block bg-white mb-1 font-semibold">
                                PIN Code:
                            </label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleInputChange}
                                className="bg-white w-full p-2 border-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                        >
                            Proceed to Payment
                        </button>
                    </form>
                </>
            ) : !paymentSuccess ? (
                <div className='bg-white   '>
                    <h2 className="text-xl font-bold text-center bg-white  mb-4">Select Payment Method</h2>
                    <div className="flex bg-white  flex-col space-y-10">
                        <button
                            className={`w-full py-2 bg-green-500 text-white font-semibold rounded-md ${paymentMethod === 'COD' ? 'ring-4 ring-green-700' : ''
                                }`}
                            onClick={() => setPaymentMethod('COD')}
                        >
                            Cash on Delivery
                        </button>
                        <button
                            className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-md ${paymentMethod === 'Online' ? 'ring-4 ring-blue-700' : ''
                                }`}
                            onClick={() => setPaymentMethod('Online')}
                        >
                            Online Payment
                        </button>

                    </div>
                    {paymentMethod && (

                        <div className='pt-8 bg-white'>  <button
                            onClick={handlePaymentSubmit}
                            className="mt-4 w-full py-2 bg-purple-500  hover:bg-purple-800 text-white font-semibold rounded-md"
                        >
                            Proceed
                        </button></div>

                    )}
                    {upiGenerated && paymentMethod === 'Online' && (
                        <div className="mt-6 text-center">
                            <h3 className="text-lg font-semibold mb-2">Scan to Pay</h3>
                            <QRCodeCanvas
                                value={`upi://pay?pa=${upiId}&pn=Sathish&mc=&tid=&tr=&tn=OrderPayment&am=${totalAmount}&cu=INR`}
                                size={200}
                                className="mx-auto"
                            />
                            <p className="mt-2">UPI ID: {upiId}</p>
                            <button
                                onClick={confirmOnlinePayment}
                                className="mt-4 py-2 px-6 bg-green-500 text-white rounded-md"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Confetti effect */}
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={300}
                        gravity={0.3}
                    />
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 p-6 rounded-lg shadow-xl text-center z-50">
                        <p className="text-xl font-semibold bg-white">Your order is placed!</p>

                    </div>
                </>
            )}
        </div>
    );
};

export default Address;
