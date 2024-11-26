import React, { useState } from 'react';
import axios from 'axios';

const SearchResult = ({ users }) => {
    const [searchResults, setSearchResults] = useState(users);

    const handleConnect = async (user) => {
        try {
            await axios.post('http://localhost:7007/auth/connect', {
                userId: 'currentUserId', // Replace with logged-in user ID
                connectedUserId: user._id,
            });
            alert(`Connected to ${user.username}`);
        } catch (error) {
            console.error('Connection error:', error.message);
        }
    };

    return (
        <div>
            {searchResults.map((user) => (
                <div key={user._id} className="user-card">
                    <p>{user.username}</p>
                    <button
                        onClick={() => handleConnect(user)}
                        className="connect-button"
                    >
                        Connect
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchResult;
