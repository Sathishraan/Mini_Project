import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../component/AuthContext.jsx';
import './style/Productdetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const products = [
        { id: 1, name: 'TOMATO', price: '₹50.00', imageUrl: '/src/assets/image/tomato.jpg' },
        { id: 2, name: 'BRINJAL', price: '₹35.00', imageUrl: '/src/assets/image/brinjal.jpg' },
        { id: 3, name: 'ONION', price: '₹25.00', imageUrl: '/src/assets/image/onion.jpg' },
        { id: 4, name: 'POTATO', price: '₹40.00', imageUrl: '/src/assets/image/potato.jpg' },
        { id: 5, name: 'CHILLI', price: '₹30.00', imageUrl: '/src/assets/image/WhatsApp Image 2024-09-19 at 10.23.09.jpeg' },
        { id: 6, name: 'MANGO', price: '₹28.00', imageUrl: '/src/assets/image/mango.jpeg' },
        { id: 7, name: 'GRAPS', price: '₹22.00', imageUrl: '/src/assets/image/graps.jpeg' },
        { id: 8, name: 'CAPSICUM', price: '₹55.00', imageUrl: '/src/assets/image/cap.jpeg' },
    ];
    // Find the selected product by its ID
    const product = products.find((product) => product.id === parseInt(id));

    if (!product) {
        return <h2>Product not found</h2>;
    }

    // Handle the "Buy Now" button click
    const handleBuyNow = () => {

        navigate('/address');

    };

    // Filter out the current product to get recommended products
    const recommendedProducts = products.filter((p) => p.id !== product.id);

    return (
        <>

            <div className="product-details-container">
                <img src={product.imageUrl} alt={product.name} className="large-product-image" />
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <button className="buy--button" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Recommended Products Section */}
            <div className="recommended-products">
                <h3>Recommended Products</h3>
                <div className="recommended-grid">
                    {recommendedProducts.map((recommended) => (
                        <div key={recommended.id} className="recommended-product">
                            <img src={recommended.imageUrl} alt={recommended.name} className="recommended-image" />
                            <h4>{recommended.name}</h4>
                            <p>{recommended.price}</p>
                            <button onClick={() => navigate(`/product/${recommended.id}`)}>View Details</button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default ProductDetails;
