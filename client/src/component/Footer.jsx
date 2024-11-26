// Footer.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState(''); // State to store the email/feedback

    const handleInputChange = (event) => {
        setEmail(event.target.value); // Update email state with input value
    };

    const handleSendClick = () => {
        if (email.trim()) {
            alert(`Feedback sent: ${email}`);
            setEmail(''); // Clear the input field after sending
        } else {
            alert('Please enter your feedback before sending.');
        }
    };

    return (
        <footer
            id="footer"
            className="text-white py-10 md:mt-16 px-5 max-w-full bg-white mx-auto rounded-lg"
        >
            <div className="grid gap-10 space-x-20 md:pl-20 bg-white md:grid-cols-4">
                {/* Newsletter Subscription */}
                <div className="col-span-full bg-white p-5 rounded-lg text-center">
                    <h2 className="text-4xl text-black bg-white font-bold">
                        Subscribe to newsletter
                    </h2>
                    <div className="flex md:pt-8 bg-white justify-center mt-2">
                        <input
                            type="email"
                            placeholder="Enter your feedback"
                            value={email} // Bind state to input value
                            onChange={handleInputChange} // Handle input change
                            className="p-2 text-black border-2 bg-white rounded-l-md outline-none"
                        />
                        <button
                            onClick={handleSendClick} // Handle send button click
                            className="p-2 bg-green-600 text-black rounded-r-md cursor-pointer"
                        >
                            <i className="fas fa-paper-plane bg-green-600 text-black"></i>
                        </button>
                    </div>
                </div>

                {/* Company Info */}
                <div className="text-black bg-white">
                    <h3 className="text-2xl font-cursive bg-white">Ogenix</h3>
                    <p className="mt-2 bg-white">
                        We're Providing Everyday Fresh and Quality Products.
                    </p>
                    <div className="flex space-x-4 mt-3 text-2xl bg-white">
                        <i className="fab fa-twitter cursor-pointer bg-white"></i>
                        <i className="fab fa-facebook cursor-pointer bg-white"></i>
                        <i className="fab fa-pinterest cursor-pointer bg-white"></i>
                        <i className="fab fa-instagram cursor-pointer bg-white"></i>
                    </div>
                </div>

                {/* Explore Section */}
                <div className="text-black bg-white">
                    <h4 className="text-lg bg-white">Explore</h4>
                    <ul className="list-none mt-2 bg-white space-y-1">
                        <li className="cursor-pointer bg-white">About Company</li>
                        <li className="cursor-pointer bg-white">Our Services</li>
                        <li className="cursor-pointer bg-white">Become a Seller</li>
                        <li className="cursor-pointer bg-white">New Products</li>
                        <li className="cursor-pointer bg-white">Contact</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="text-black bg-white">
                    <h4 className="text-lg bg-white">Contact</h4>
                    <p className="mt-2 bg-white">
                        GCT opposite, Thadagam Road, Coimbatore - 641013
                    </p>
                    <p className="mt-1 bg-white">Phone: +91 8925315954</p>
                    <p className="mt-1 bg-white">Email: agritech@gmail.com</p>
                </div>
            </div>

            {/* Footer Bottom Links */}
            <div className="border-t text-black bg-white border-white mt-5 pt-5 flex flex-col md:flex-row items-center justify-between text-center">
                <p className="bg-white">&copy; Copyright 2023 by Ogenix WP</p>
                <div className="flex bg-white space-x-4 mt-3 md:mt-0">
                    <a href="#" className="hover:underline bg-white">
                        Terms & Conditions
                    </a>
                    <a href="#" className="hover:underline bg-white">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:underline bg-white">
                        Support
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
