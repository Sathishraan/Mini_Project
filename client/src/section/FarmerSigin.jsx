import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FarmerSign = () => {
    const [username, setUsername] = useState('');
    const [farmerid, setFarmerid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(''); // New state for phone
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();

    const validateFarmerID = (id) => {
        const regex = /^[a-zA-Z]{3}[a-zA-Z0-9]*f$/;
        return regex.test(id);
    };

    const validatePhone = (phoneNumber) => {
        const regex = /^[6-9]\d{9}$/; // Regex for Indian phone numbers starting with 6-9 and 10 digits long
        return regex.test(phoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (!validateFarmerID(farmerid)) {
            setMessage('Farmer ID is invalid');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        if (!validatePhone(phone)) {
            setMessage('Phone number is invalid');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        axios.post('http://localhost:7007/auth/farmersign', { username, email, password, phone })
            .then(res => {
                if (res.data.status) {
                    // Set the cookie properly
                    Cookies.set('user', JSON.stringify({ username, email }), { expires: 7 });
                    
                    // Display success message and navigate
                    setMessage('Registered successfully!');
                    setMessageType('success');
                    setTimeout(() => {
                        setMessage('');
                        navigate('/farmerlogin');
                    }, 2000);
                } else {
                    setMessage(res.data.message || 'Signup failed. Please try again.');
                    setMessageType('error');
                    setTimeout(() => setMessage(''), 3000);
                }
            })
            .catch(err => {
                setMessage('An error occurred. Please try again.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 3000);
            });
    };

    return (
        <div className="bg-white mt-20 p-8 rounded-lg w-full max-w-md mx-auto shadow-lg">
            <h2 className="text-center text-xl bg-white font-bold text-gray-800 mb-6">FARMER SIGNUP</h2>

            {message && (
                <div className={`fixed top-4 right-4 p-4 rounded-md text-white shadow-lg ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white space-y-4">
                <div className='bg-white '>
                    <label htmlFor="username" className="block bg-white  text-gray-700 text-sm font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border-2  bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className='bg-white '>
                    <label htmlFor="farmerid" className="block text-gray-700 bg-white  text-sm font-medium mb-2">Farmer_ID</label>
                    <input
                        type="text"
                        id="farmerid"
                        value={farmerid}
                        onChange={(e) => setFarmerid(e.target.value)}
                        placeholder="Farmer_ID"
                        className="w-full px-4 py-2 border-2 border-gray-300  bg-white  rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div  className='bg-white '> 
                    <label htmlFor="email" className="block text-gray-700 bg-white  text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 border-2 bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className='bg-white '>
                    <label htmlFor="password" className="block bg-white  text-gray-700 text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border-2 bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className='bg-white '>
                    <label htmlFor="phone" className="block bg-white  text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 border-2 bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    Submit
                </button>
                <p className="text-center mt-4 text-sm bg-white  text-gray-600">Have an Account? <Link to="/farmerlogin" className="text-blue-500 bg-white  hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default FarmerSign;
