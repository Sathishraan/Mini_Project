import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams(); // Extract token from URL

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:7007/auth/resetPassword/${token}`, { password })
            .then(res => {
                if (res.data.status) {
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
        <div className="flex flex-col items-center justify-center h-screen ">
            <h2 className="text-2xl font-bold  text-gray-800 mb-6">RESET PASSWORD</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="bg-white mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-white bg-white mb-2">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition">
                    Submit
                </button>
                {error && <div className="text-center bg-white text-red-600 mt-4 text-sm">{error}</div>}
            </form>
        </div>
    );
};

export default ResetPassword;
