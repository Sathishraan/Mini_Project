import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext'; // Import useAuth hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Call the useAuth hook function here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:7007/auth/login', { email, password });
      if (res.data.status) {
        setMessage('Login successful!');
        setMessageType('success');

        // Use login function to save user data in context
        login(res.data.user);

        setTimeout(() => {
          setMessage('');
          navigate('/customerhome');
        }, 2000);
      } else {
        setMessage(res.data.message || 'Login failed. Please try again.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Password or Username is incorrect. Please check it!');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 2000); // Clear message after timeout
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-center text-4xl font-bold  bg-white text-gray-700 mb-6">Customer LOGIN</h2>

      {message && (
        <div className={`fixed top-4 right-6 px-4 py-2 rounded shadow-lg text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="  bg-white space-y-4">
        <div className="  bg-white space-y-2">
          <label htmlFor="email" className="block  bg-white font-semibold text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border-2  bg-white border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className=" bg-white space-y-2">
          <label htmlFor="password" className="block font-semibold  bg-white text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border-2  bg-white border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        <div className="text-center  bg-white mt-4">
          <Link to="/forgotPassword" className="text-blue-500  bg-white hover:underline">Forgot Password?</Link>
        </div>
        <p className="text-center mt-4  bg-white text-gray-600">
          Don't have an account? <Link to="/signin" className="text-blue-500   bg-white hover:underline">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
