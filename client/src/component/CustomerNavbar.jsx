import axios from 'axios';
import React, { useState } from 'react';
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchResultsDropdown from './SearchResultsDropdown'; // Import child component

const CustomerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Manage dropdown visibility

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsDropdownVisible(true); // Show dropdown when search starts

        try {
            const response = await axios.get(`http://localhost:7007/auth/searchuser?query=${searchQuery}`);
            setSearchResults(response.data);
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

    // Handle user connection
    const handleConnect = async (user) => {
        try {
            await axios.post('http://localhost:7007/auth/connect', {
                userId: 'currentUserId', // Replace with actual logged-in user ID
                connectedUserId: user._id,
            });
            alert(`Connected to ${user.username}`);
        } catch (error) {
            console.error('Connection error:', error.message);
        }
    };

    // Handle closing the dropdown
    const handleCloseDropdown = () => {
        setIsDropdownVisible(false); // Hide the dropdown when closed
    };

    // Handle search icon click
    const handleSearchIconClick = () => {
        setSearchQuery(''); // Reset the search query
        setSearchResults([]); // Clear the search results
        setIsDropdownVisible(false); // Hide the dropdown when search icon is clicked
    };

    return (
        <nav className="text-cyan-50 pt-2 relative">
            <div className="flex justify-between items-end px-10">
                <h3 className="text-4xl md:pl-20 font-palanquin font-bold text-brown-500">
                    AGRI TECH
                </h3>

                {/* Search Bar
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="p-2  border px-7 rounded-xl bg-white text-black focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch
                        onClick={handleSearchIconClick} // Reset state when search icon is clicked
                        className="absolute right-2 top-3 bg-white cursor-pointer text-black"
                    />
                </form> */}

                {/* Navigation Links */}
                <ul className="hidden md:flex md:pl-36 gap-14">
                    <li>
                        <a href="/search" className="text-lg font-montserrat">Shop</a>
                    </li>
                    <li>
                        <a href="#footer" className="text-lg font-montserrat">About</a>
                    </li>
                </ul>

                {/* Icons Section */}
                <div className="mt-1 cursor-pointer md:pr-16 flex space-x-9 text-xl">
                    <FaShoppingCart onClick={() => navigate('/cart')} className="cursor-pointer" />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </div>
            </div>

            {/* Search Results Dropdown */}
            {isDropdownVisible && searchResults.length > 0 && (
                <div className="pl-96">
                    <SearchResultsDropdown
                        searchResults={searchResults}
                        onConnect={handleConnect}
                        onClose={handleCloseDropdown}  // Pass handleCloseDropdown to close the dropdown
                    />
                </div>
            )}
        </nav>
    );
};

export default CustomerNavbar;
