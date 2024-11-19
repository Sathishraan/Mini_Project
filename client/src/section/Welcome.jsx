import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleLoginn = () => {
        navigate('/farmersign');
    };

    return (
        <div className=" font-sans min-h-screen flex flex-col items-center">
            <div className="pt-20  text-center">
                <h1 className="text-4xl font-bold uppercase  text-black shadow-lg">WELCOME TO AGRI TECH</h1>
                <h4 className="mt-5 text-xl font-semibold text-black ">FRESH FRUITS AND VEGETABLES FROM FARMER HOUSE</h4>
            </div>

            <div className="flex justify-center my-10 gap-10">
                <img src="/src/assets/image/customer.png" alt="Customer" className="h-48 w-48 rounded-full shadow-lg" />
                <img src="/src/assets/image/farmeravatar.png" alt="Farmer" className="h-48 w-48 rounded-full shadow-lg" />
            </div>

            <div className="flex  items-center gap-16 mt-10">
                <button
                    className="bg-green-700 text-white font-semibold py-2 px-3 rounded-lg hover:bg-lime-500 shadow-md transition ease-in-out duration-300"
                    onClick={handleLogin}
                >
                    CUSTOMER LOGIN
                </button>
                <button
                    className="bg-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-lime-500 shadow-md transition ease-in-out duration-300"
                    onClick={handleLoginn}
                >
                    FARMER LOGIN
                </button>
            </div>
        </div>
    );
};

export default Welcome;
