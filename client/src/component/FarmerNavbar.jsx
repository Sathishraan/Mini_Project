import React, { useState } from 'react';
import { FaBars, FaInstagram, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { navLinks } from '../constant';

const FarmerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const goToPosts = () => {
        navigate('/posts'); // Navigate to the posts page or Instagram-like page
    };

    return (
        <nav className="text-cyan-50 pt-2 relative">
            <div className="flex justify-between items-end px-10">
                <h3 className="text-4xl md:pl-20 font-palanquin font-bold text-brown-500">
                    AGRI TECH
                </h3>

                {/* Navigation Links */}
                <ul className="hidden md:flex md:pl-36 gap-14">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="text-lg font-montserrat">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Icons Section */}
                <div className="mt-1 cursor-pointer md:pr-16 flex space-x-9 text-xl">
                    <FaInstagram onClick={goToPosts} className="cursor-pointer" />
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
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="text-lg font-montserrat">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default FarmerNavbar;
