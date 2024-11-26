import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Load cart from localStorage or use state passed from previous page
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Calculate total cost
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0; // Ensure price is a number
            return total + price;
        }, 0);
    };

    // Handle removing item from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    // Handle buy button click for individual items
    const handleBuy = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
        navigate('/address'); // Redirect to address page
    };

    // Handle "Buy All" button click
    const handleBuyAll = () => {
        console.log('Buy All button clicked'); // Debugging log
        setCart([]); // Clear the cart state
        localStorage.removeItem('cart'); // Remove cart from localStorage
        console.log('Cart cleared and localStorage updated'); // Debugging log
        navigate('/address'); // Redirect to address page
    };
    
    // Handle "Back to Home" button click
    const backToHome = () => {
        navigate('/customerhome');
    };

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-customGreen">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-5 hover:bg-blue-600 text-sm md:text-base"
                onClick={backToHome}
            >
                BACK TO HOME
            </button>
            <div className="bg-gray-400 p-4 md:p-5 rounded-lg w-full max-w-3xl">
                <h1 className="text-2xl md:text-3xl font-bold bg-gray-400 text-center mb-5">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center bg-white p-3 rounded">No items in the cart.</p>
                ) : (
                    <>
                        <ul className="space-y-4 max-h-[60vh] bg-white md:max-h-[800px] overflow-y-auto">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex flex-col md:flex-row items-center p-4 bg-white shadow rounded-lg space-y-3 md:space-y-0"
                                >
                                    <span className="text-xl md:text-2xl bg-white text-blue-500 mr-0 md:mr-4">🛒</span>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg mb-2 md:mb-0 mr-0 md:mr-4"
                                    />
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-base md:text-lg bg-white font-semibold text-red-600">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <div className="text-base md:text-lg font-medium md:pr-10 bg-white text-green-600 ml-0 md:ml-auto">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </div>
                                    <div className="flex space-x-2 bg-white mt-3 md:mt-0">
                                        <button
                                            className="bg-red-500 text-white py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-red-600 text-sm md:text-base"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white py-1 px-2 md:py-2 md:px-8 rounded-lg hover:bg-blue-600 text-sm md:text-base"
                                            onClick={() => handleBuy(item.id)}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-5 p-4 bg-white rounded-lg shadow-md text-center">
                            <h2 className="text-xl md:text-2xl font-bold mb-3">Total: ${calculateTotal().toFixed(2)}</h2>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-sm md:text-base"
                                onClick={handleBuyAll}
                            >
                                Buy All
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
