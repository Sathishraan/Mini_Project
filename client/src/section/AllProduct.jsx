import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fruits, nuts, vegetables } from '../assets/product/index.js';

const AllProduct = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('All Products');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:7007/auth/post');
                const postProducts = response.data.map((post) => ({
                    id: post._id,
                    name: post.caption,
                    price: post.price,
                    url: post.fileUrl.startsWith('http')
                        ? post.fileUrl
                        : `http://localhost:7007${post.fileUrl}`,
                    location: post.location || 'Farmer Post',
                    quantity: post.quantity, // Add quantity field
                }));
                setPosts(postProducts);

                // Combine the products (from fruits, vegetables, nuts, and fetched posts)
                const allProducts = [...fruits, ...vegetables, ...nuts, ...postProducts];
                setFilteredItems(allProducts);
                
                // Retrieve and update the filteredItems from localStorage on page load
                const storedItems = JSON.parse(localStorage.getItem('filteredItems')) || allProducts;
                setFilteredItems(storedItems);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleFilter = (category) => {
        let updatedItems = [];
        if (category === 'fruits') updatedItems = fruits;
        else if (category === 'vegetables') updatedItems = vegetables;
        else if (category === 'nuts') updatedItems = nuts;
        else if (category === 'posts') updatedItems = posts;
        else updatedItems = [...fruits, ...vegetables, ...nuts, ...posts];

        // Update the filteredItems based on current product availability
        const updatedItemsWithAvailability = updatedItems.map((item) => ({
            ...item,
            isOutOfStock: item.quantity === 0,
        }));

        setFilteredItems(updatedItemsWithAvailability);
        localStorage.setItem('filteredItems', JSON.stringify(updatedItemsWithAvailability));  // Persist to localStorage
    };

    const addToCart = (item) => {
        if (item.quantity <= 0) {
            alert('This item is out of stock.');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [
            ...cart,
            {
                ...item,
                id: `${item.name}-${cart.length}`,
                imageUrl: item.url,
            },
        ];

        // Reduce the quantity in filteredItems
        const updatedItems = filteredItems.map((product) =>
            product.id === item.id ? { ...product, quantity: product.quantity - 1 } : product
        );

        setFilteredItems(updatedItems);
        setPosts(posts.map((post) =>
            post.id === item.id ? { ...post, quantity: post.quantity - 1 } : post
        ));

        // Save the updated filteredItems and cart to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('filteredItems', JSON.stringify(updatedItems));  // Persist the updated items
        
        alert(`${item.name} has been added to your cart!`);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
            <div className="flex justify-center space-x-4 mb-8">
                <button onClick={() => handleFilter('all')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    All Products
                </button>
                <button onClick={() => handleFilter('fruits')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Fruits
                </button>
                <button onClick={() => handleFilter('vegetables')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Vegetables
                </button>
                <button onClick={() => handleFilter('nuts')} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Nuts
                </button>
                <button onClick={() => handleFilter('posts')} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Farmer Posts
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg p-4 flex flex-col items-center text-center shadow-lg ${item.quantity === 0 ? 'opacity-50' : ''
                            }`}
                    >
                        <img
                            src={item.url || item.image}
                            alt={item.name}
                            className={`w-32 h-32 object-cover mb-4 ${item.quantity === 0 ? 'filter blur-md' : ''}`}
                        />
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm mb-2">Price: ₹{item.price}</p>
                        <p className="text-sm mb-2">{item.location}</p>
                        <p className="text-sm mb-2">Quantity: {item.quantity > 0 ? `${item.quantity} kg` : 'Out of Stock'}</p>
                        <button
                            onClick={() => addToCart(item)}
                            className={`px-4 py-2 mt-auto rounded ${item.quantity === 0 ? 'bg-red-500 cursor-not-allowed font-semibold' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            disabled={item.quantity === 0}
                        >
                            {item.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProduct;
