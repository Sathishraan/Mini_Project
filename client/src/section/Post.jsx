import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        caption: '',
        file: null,
        price: '',
        location: '',
        quantity: 1, // Default quantity
    });
    axios.defaults.withCredentials = true;

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:7007/auth/post');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewPost((prevPost) => ({ ...prevPost, file: e.target.files[0] }));
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!newPost.caption || !newPost.file || !newPost.price || !newPost.location) {
            console.error('Caption, file, price, or location is missing');
            return;
        }

        const formData = new FormData();
        formData.append('caption', newPost.caption);
        formData.append('file', newPost.file);
        formData.append('price', newPost.price);
        formData.append('location', newPost.location);
        formData.append('quantity', newPost.quantity);

        try {
            await axios.post('http://localhost:7007/auth/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setNewPost({ caption: '', file: null, price: '', location: '', quantity: 1 });
            fetchPosts();
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:7007/auth/post/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="post-container p-4">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

            <form onSubmit={handlePostSubmit} className="mb-6">
                <textarea
                    name="caption"
                    value={newPost.caption}
                    onChange={handleInputChange}
                    placeholder="Write a caption..."
                    className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newPost.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={newPost.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={newPost.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity (kg)"
                    className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 bg-white rounded p-2 mb-4"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add Post
                </button>
            </form>

            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post-item border-b border-gray-300 py-4">
                            <p className="text-lg font-semibold">{post.caption}</p>
                            <p className="text-gray-600">${post.price}</p>
                            <p className="text-gray-600">📍 {post.location}</p>
                            <p className="text-gray-600">Quantity: {post.quantity} kg</p>
                            <button
                                onClick={() => handleDeletePost(post._id)}
                                className="mt-2 text-red-600 flex items-center"
                            >
                                <FaTrash className="mr-1" /> Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default Post;
