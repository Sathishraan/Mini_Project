import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css';

const Product = () => {
  const products = [
    { id: 1, name: 'TOMATO', price: '₹50.00', imageUrl: '/home/tomato.jpg' },
    { id: 2, name: 'BRINJAL', price: '₹35.00', imageUrl: '/home/brinjal.jpg' },
    { id: 3, name: 'ONION', price: '₹25.00', imageUrl: '/home/onion.jpg' },
    { id: 4, name: 'POTATO', price: '₹40.00', imageUrl: '/home/potato.jpg' },
    { id: 5, name: 'CHILLI', price: '₹30.00', imageUrl: '/home/WhatsApp Image 2024-09-19 at 10.23.09.jpeg' },
    { id: 6, name: 'MANGO', price: '₹28.00', imageUrl: '/home/mango.jpeg' },
    { id: 7, name: 'GRAPS', price: '₹22.00', imageUrl: '/home/graps.jpeg' },
    { id: 8, name: 'CAPSICUM', price: '₹55.00', imageUrl: '/home/cap.jpeg' },
  ];
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return savedCart;
  };

  const addToCart = (product) => {
    const cart = loadCart();
    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-list-wrapper">
      <div className="product-display-container">
        {products.map((product) => (
          <div key={product.id} className="grid-item-containerr">
            <img src={product.imageUrl} alt={product.name} className="grid-itemm" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
            <div className="button-group">
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
              <button
                className="buy-now-button"
                onClick={() => handleBuyNow(product.id)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {message && (
        <div className="cart-message">
          <p>{message}</p>
          <button onClick={goToCart} className="go-to-cart-button">
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
