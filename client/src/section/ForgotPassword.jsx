import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:7007/auth/forgotpassword', { email })
            .then(res => {
                if (res.data.status) {
                    alert("Check your email for the reset password link");
                    navigate('/login');
                } else {
                    setError('Something went wrong, please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                setError('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center bg-white text-black text-2xl font-bold mb-6">FORGOT PASSWORD</h2>
                <form onSubmit={handleSubmit} className=" bg-white space-y-4">
                    <div className="flex  bg-white flex-col">
                        <label htmlFor="email" className="text-black bg-white mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-black font-semibold rounded hover:bg-blue-700 transition">
                        Send Reset Link
                    </button>
                    {error && <div className=" text-center text-red-600 mt-4">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
