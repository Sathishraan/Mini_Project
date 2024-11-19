import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Product = () => {
    const products = [
        { id: 1, name: 'TOMATO', price: '₹50.00', imageUrl: '/src/assets/image/tomato.jpg' },
        { id: 2, name: 'BRINJAL', price: '₹35.00', imageUrl: '/src/assets/image/brinjal.jpg' },
        { id: 3, name: 'ONION', price: '₹25.00', imageUrl: '/src/assets/image/onion.jpg' },
        { id: 4, name: 'POTATO', price: '₹40.00', imageUrl: '/src/assets/image/potato.jpg' },
        { id: 5, name: 'CHILLI', price: '₹30.00', imageUrl: '/src/assets/image/WhatsApp Image 2024-09-19 at 10.23.09.jpeg' },
        { id: 6, name: 'MANGO', price: '₹28.00', imageUrl: '/src/assets/image/mango.jpeg' },
        { id: 7, name: 'GRAPES', price: '₹22.00', imageUrl: '/src/assets/image/graps.jpeg' },
        { id: 8, name: 'CAPSICUM', price: '₹55.00', imageUrl: '/src/assets/image/cap.jpeg' },
    ];

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('cart', JSON.stringify([...cart, product]));
        setMessage(`${product.name} added to cart!`);
        setTimeout(() => setMessage(''), 2000);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const handleBuyNow = (productId) => {
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            window.location.reload();
        }
    }, [location.pathname]);

    return (
        <div className="flex md:pt-20 flex-col items-center py-6 px-4">
            <div className="w-full max-w-screen-xl">
                <ScrollMenu>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="snap-start bg-white rounded-lg shadow-lg p-3 m-2 transform transition-transform hover:scale-105 
                            w-48 sm:w-44 md:w-50 lg:w-66"
                        >
                            <img src={product.imageUrl} alt={product.name} className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md mb-4" />
                            <div className="text-center">
                                <h2 className="text-sm sm:text-md md:text-lg font-semibold text-gray-900">{product.name}</h2>
                                <p className="text-gray-700 font-medium">{product.price}</p>
                            </div>
                            <div className="mt-4 flex justify-between space-x-2">
                                <button
                                    className="flex items-center justify-center bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-green-600 transition-colors"
                                    onClick={() => addToCart(product)}
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1 sm:mr-2" /> Add to Cart
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-600 transition-colors"
                                    onClick={() => handleBuyNow(product.id)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </ScrollMenu>
            </div>
            {message && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-md shadow-md transition-all">
                    <p>{message}</p>
                    <button onClick={goToCart} className="mt-2 bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-md">
                        Go to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;
