import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fruits, nuts, vegetables } from '../assets/product/index.js';

const AllProduct = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [posts, setPosts] = useState([]); // State to hold posts
    const [title, setTitle] = useState('All Products'); // State for the title

    // Fetch posts from the backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:7007/auth/post');
                const postProducts = response.data.map((post) => ({
                    name: post.caption,
                    price: post.price,
                    url: `http://localhost:7007/${post.fileUrl}`, // Adjust path as needed
                    location: 'Farmer Post', // Static location for posts
                }));
                setPosts(postProducts);
                setFilteredItems([...fruits, ...vegetables, ...nuts, ...postProducts]); // Combine all products
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleFilter = (category) => {
        if (category === 'fruits') {
            setFilteredItems(fruits);
            setTitle('Fruits');
        } else if (category === 'vegetables') {
            setFilteredItems(vegetables);
            setTitle('Vegetables');
        } else if (category === 'nuts') {
            setFilteredItems(nuts);
            setTitle('Nuts');
        } else if (category === 'posts') {
            setFilteredItems(posts);
            setTitle('Farmer Posts');
        } else {
            setFilteredItems([...fruits, ...vegetables, ...nuts, ...posts]);
            setTitle('All Products');
        }
    };

    return (
        <div className="p-6">
            {/* Filter Title */}
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

            {/* Filter Buttons */}
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

            {/* Items Display */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                {filteredItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col items-center text-center shadow-lg">
                        <img src={item.url} alt={item.name} className="h-32 w-32 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-black">Price: ₹{item.price}</p>
                        <p className="text-black">Location: {item.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProduct;