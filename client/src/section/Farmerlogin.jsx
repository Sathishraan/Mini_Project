import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Farmerlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Reset message

        try {
            const res = await axios.post('http://localhost:7007/auth/farmerlogin', { email, password });
            if (res.data.status) {
                // Show success message
                setMessage('Login successful!');
                setMessageType('success');

                setTimeout(() => {
                    setMessage('');
                    navigate('/farmerhome');
                }, 2000);
            } else {
                setMessage(res.data.message || 'Login failed. Please try again.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 2000); // Auto-hide after 2 seconds
            }
        } catch (err) {
            setMessage('Password or Username is incorrect. Please check it!');
            setMessageType('error');
            setTimeout(() => setMessage(''), 2000); // Auto-hide after 2 seconds
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md  bg-white mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold text-gray-700  bg-white mb-6">Farmer LOGIN</h2>

            {message && (
                <div className={`fixed top-4 right-6 px-4 py-2 rounded shadow-md text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 bg-white ">
                    <label htmlFor="email" className="block font-semibold bg-white  text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3 py-2 border bg-white  border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />


                    <label htmlFor="password" className="block bg-white  font-semibold text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 border bg-white  border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />



                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                    <div className="text-center bg-white  mt-4">
                        <Link to="/forgotPassword" className="text-blue-500 bg-white  hover:underline">Forgot Password?</Link>
                    </div>
                    <p className="text-center mt-4 bg-white  text-gray-600">
                        Don't have an account? <Link to="/farmersign" className="text-blue-500  bg-white hover:underline">Signup</Link>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Farmerlogin;
