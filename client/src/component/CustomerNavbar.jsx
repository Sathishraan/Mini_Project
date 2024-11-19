import React, { useState } from 'react';
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CustomerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const goToSearch = () => {
        navigate('/search');
    };

    return (
        <nav className="text-cyan-50 pt-2 relative">
            <div className="flex justify-between items-end px-10">
                <h3 className="text-4xl md:pl-20 font-palanquin font-bold text-brown-500">
                    AGRI TECH
                </h3>

                {/* Navigation Links */}
                <ul className="hidden md:flex md:pl-36 gap-14">
                    <li>
                        <a href="/shop" className="text-lg font-montserrat">Shop</a>
                    </li>
                    <li>
                        <a href="/about" className="text-lg font-montserrat">About</a>
                    </li>
                </ul>

                {/* Icons Section */}
                <div className="mt-1 cursor-pointer md:pr-16 flex space-x-9 text-xl">
                    <FaSearch onClick={goToSearch} className="cursor-pointer" />
                    <FaShoppingCart onClick={goToCart} className="cursor-pointer" />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden absolute top-16 right-10 text-black rounded-lg shadow-lg h-auto p-5 flex flex-col z-50 items-end space-y-3 w-11/12">
                    <li>
                        <a href="/shop" className="text-lg font-montserrat">Shop</a>
                    </li>
                    <li>
                        <a href="/about" className="text-lg font-montserrat">About</a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default CustomerNavbar;
