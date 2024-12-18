import React, { useState } from 'react';
import { FaBars, FaInstagram, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { navLinks } from '../constant';
import SearchResultsDropdown from './SearchResultsDropdown'; // Import child component
import axios from 'axios';

const FarmerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const response = await axios.get(`http://localhost:7007/auth/searchuser?query=${searchQuery}`);
            setSearchResults(response.data);
            setIsDropdownVisible(true);
        } catch (error) {
            console.error('Search error:', error.message);
            if (error.response && error.response.status === 404) {
                alert('User not found.');
            } else {
                alert('An error occurred. Please try again.');
            }
            setSearchResults([]);
        }
    };

    const handleConnect = (userId) => {
        // Implement the connect functionality
        console.log(`Connected to user ID: ${userId}`);
        alert(`You are now connected to user ID: ${userId}`);
        setIsDropdownVisible(false); // Close dropdown after connecting
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseDropdown = () => {
        setIsDropdownVisible(false);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const goToPosts = () => {
        navigate('/posts');
    };

    return (
        <nav className="text-cyan-50 pt-2 relative">
            <div className="flex justify-between items-end px-10">
                <h3 className="text-4xl md:pl-20 font-palanquin font-bold text-brown-500">
                    AGRI TECH
                </h3>

                <form onSubmit={handleSearch} className="relative ">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="p-2 border px-7 rounded-xl bg-white text-black focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <FaSearch className="absolute right-2 top-3 bg-white cursor-pointer text-black" />
                    </button>
                </form>

                <ul className="hidden md:flex md:pl-36 gap-14">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="text-lg font-montserrat">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-1 cursor-pointer md:pr-16 flex space-x-9 text-xl">
                    <FaInstagram onClick={goToPosts} className="cursor-pointer" />
                    <FaShoppingCart onClick={goToCart} className="cursor-pointer" />
                </div>

                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </div>
            </div>

            {isOpen && (
                <ul className="md:hidden absolute top-16 right-10 text-black rounded-lg shadow-lg h-auto p-5 flex flex-col z-50 items-end space-y-3 w-11/12">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="text-lg font-montserrat">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            {/* Search Results Dropdown */}
            {/* Search Results Dropdown */}
            {isDropdownVisible && searchResults.length > 0 && (
                <div className="absolute left-1/3 pb-0 transform -translate-x-1/2 mb-0  w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <SearchResultsDropdown
                        searchResults={searchResults}
                        onConnect={handleConnect}
                        onClose={handleCloseDropdown}
                    />
                </div>
            )}

        </nav>
    );
};

export default FarmerNavbar;
