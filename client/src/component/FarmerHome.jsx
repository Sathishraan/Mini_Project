import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';
import FarmerNavbar from './FarmerNavbar';
import Categories from './Categories';
import Footer from './Footer';
import Info from './Info';
import Product from './Product';

const FarmerHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(user || null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setUserData(parsedUser); // Keep userData updated if needed elsewhere.
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('user');

        logout();
        navigate('/login')
        setUserData(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleBuyNowClick = (item) => {
        // Extract only necessary properties
        const product = {
            name: item.name,
            price: item.price,
            image: item.image,
        };

        console.log('Navigating with:', product); // Debug
        navigate('/buynow');
    };


    const fruit = [
        { name: 'Apple', image: '/src/assets/image/fr1.jpg' },
        { name: 'Banana', image: '/src/assets/image/fr2.jpg' },
        { name: 'Orange', image: '/src/assets/image/fr3.jpg' },
        { name: 'Strawberry', image: '/src/assets/image/fr4.jpg' },
    ];

    return (
        <div className="w-full h-auto bg-customGreen relative">
            <FarmerNavbar />

            {/* Sidebar Toggle */}
            <div className="absolute top-4 right-6 cursor-pointer" onClick={toggleSidebar}>
                <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform">
                    {userData?.name ? userData.name[0] : 'U'}
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="absolute top-16 right-6 bg-white text-black p-4 rounded-lg shadow-lg w-80 z-10">
                    <button className="text-xl font-bold mb-4 float-right" onClick={toggleSidebar}>✖</button>
                    <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                    <p><strong>Name:</strong> {userData?.name || 'Unknown User'}</p>
                    <p><strong>Email:</strong> {userData?.email || 'No email provided'}</p>

                    <button
                        className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Hero Section */}
            <div className="md:pt-3 md:pl-16 max-sm:pt-3">
                <div className="relative">
                    <img
                        src="/src/assets/image/healthy-vegetables-wooden-table.jpg"
                        alt="home image"
                        className="lg:h-[700px] lg:w-[1460px] md:rounded-3xl sm:h-[200px] sm:w-[410px] sm:mt-5 sm:pl-5 object-cover"
                    />
                </div>
            </div>

            {/* Info Section */}
            <div className="md:mt-8">
                <Info />
            </div>

            {/* Today's Special Offers */}
            <div className="w-full">
                <h1 className="text-cyan-50 md:text-6xl font-bold md:pt-14 md:pl-96 max-sm:pt-6 max-sm:text-3xl max-sm:pl-16">TODAY'S SPECIAL OFFERS</h1>
                <p className="text-cyan-50 md:text-4xl md:pl-[680px] md:pt-7 max-sm:pt-4 max-sm:pl-16">Don't miss it</p>

                <div className="md:pt-10 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {fruit.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 border-2 border-gray-300 rounded-lg shadow-md cursor-pointer  relative"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-auto md:w-[330px] md:h-[300px] rounded-3xl max-sm:w-[220px] max-sm:h-[220px] object-cover"
                            />


                        </div>
                    ))}
                </div>

            </div>

            <Categories />
            <Product />
            <Footer />
        </div>
    );
};

export default FarmerHome;
