import { useLocation } from 'react-router-dom';

const BuyNow = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Retrieve passed product details

    if (!product) {
        return <p>Product details not found!</p>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-green-600 mb-8">
                Limited Time Offer - Today Only!
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10 bg-white p-6 rounded-lg shadow-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-72 h-72 object-cover rounded-lg"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">{product.name}</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        This is a special offer available only for today! Hurry up and grab this
                        amazing deal.
                    </p>
                    <p className="text-2xl font-bold text-red-500">Price: {product.price}</p>
                    <p className="mt-2 text-yellow-500 text-lg">Limited Stock Available!</p>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
