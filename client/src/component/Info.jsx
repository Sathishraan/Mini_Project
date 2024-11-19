import React from 'react';
import { FaLock, FaMapMarkerAlt, FaShippingFast, FaUndoAlt } from 'react-icons/fa'; // Import icons from react-icons
import './style/info.css'; // Import your CSS file

const Info = () => {
    return (
        <div className="info-section  " >
            <div className="info-item">
                <FaUndoAlt size={32} /> {/* Icon for return policy */}
                <h4>Return policy</h4>
                <p>Money back guarantee</p>
            </div>

            <div className="info-item">
                <FaShippingFast size={32} /> {/* Icon for free shipping */}
                <h4>Free shipping</h4>
                <p>On all orders over $60.00</p>
            </div>

            <div className="info-item">
                <FaMapMarkerAlt size={32} /> {/* Icon for store locator */}
                <h4>Store locator</h4>
                <p>Find your nearest store</p>
            </div>

            <div className="info-item">
                <FaLock size={32} /> {/* Icon for secure payment */}
                <h4>Secure payment</h4>
                <p>Your money is 100% secure</p>
            </div>
        </div>
    );
};

export default Info;
