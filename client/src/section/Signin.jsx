import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../component/AuthContext';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        axios.post('http://localhost:7007/auth/signup', { username, email, password })
            .then(res => {
                if (res.data.status) {
                    Cookies.set('user', JSON.stringify({ name: username, email }), { expires: 7 });
                    login({ name: username, email });
                    setMessage('Registered successfully!');
                    setMessageType('success');
                    setTimeout(() => {
                        setMessage('');
                        navigate('/login');
                    }, 2000);
                } else {
                    setMessage(res.data.message || 'Signup failed. Please try again.');
                    setMessageType('error');
                    setTimeout(() => setMessage(''), 2000);
                }
            })
            .catch(() => {
                setMessage('An error occurred. Please try again.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 2000);
            });
    };

    return (
        <div className="bg-white pt-10 mt-20 p-8   rounded-lg w-full max-w-md mx-auto shadow-md">
            <h2 className="text-center text-4xl font-bold bg-white text-gray-800 mb-6">CUSTOMER SIGNUP</h2>
            {message && (
                <div className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex  bg-white flex-col space-y-6">
                <div className="flex  bg-white flex-col">
                    <label htmlFor="username" className="text-gray-700 bg-white">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="p-2 mt-1 border-2 bg-white rounded-md"
                        required
                    />
                </div>
                <div className="flex  bg-white flex-col">
                    <label htmlFor="email" className="text-gray-700 bg-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-2 mt-1 border-2 bg-white rounded-md"
                        required
                    />
                </div>
                <div className="flex bg-white flex-col">
                    <label htmlFor="password" className="text-gray-700 bg-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-2 mt-1 border-2 bg-white rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>

                <p className="text-center mt-4  bg-white text-gray-600">
                    Don't have an account? <Link to="/login" className="text-blue-500   bg-white hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signin;
