import React from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa'; // Import WhatsApp and Close icons

const SearchResultsDropdown = ({ searchResults, onConnect, onClose }) => {
    return (

        <ul className="absolute top-16 z-10 rounded-lg shadow-lg w-full max-w-md p-4 ">
            {/* Close button */}
            <div className="flex justify-end">
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={onClose} // Use onClose passed from parent to close the dropdown
                >
                    <FaTimes size={20} />
                </button>
            </div>

            {searchResults.length === 0 ? (
                <li className="p-2 text-center text-gray-500">No users found</li>
            ) : (
                searchResults.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between  items-center p-2 border-b"
                    >
                        <div>
                            <span className="font-bold">{user.username}</span>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <a
                                    href={`https://wa.me/${user.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-green-500 hover:underline"
                                >


                                </a>
                            </div>
                        </div>
                        <div
                            className="px-3 py-1 flex gap-3 text-white rounded-md cursor-pointer"
                            onClick={() => onConnect(user)}
                        >
                            <FaWhatsapp size={25} />
                            <p className="font-semibold">{user.phone}</p>
                        </div>
                    </li>
                ))
            )}
        </ul>

    );
};

export default SearchResultsDropdown;
