import React from 'react';
import './style/categories.css'; // Make sure to create and link the CSS file

const categories = [
    {
        id: 1,
        name: 'Vegetables',
        imageUrl: '/src/assets/image/vege.jpg',
        description: 'When nothing prevents our to we like best be.',
    },
    {
        id: 2,
        name: 'Fresh fruits',
        imageUrl: '/src/assets/image/blueberry.jpg',
        description: 'When nothing prevents our to we like best be.',
    },
    {
        id: 3,
        name: 'Spices',
        imageUrl: '/src/assets/image/spices.jpg',
        description: 'When nothing prevents our to we like best be.',
    },
    {
        id: 4,
        name: 'Dried products',
        imageUrl: '/src/assets/image/nuts.jpg',
        description: 'When nothing prevents our to we like best be.',


    },

];

const Categories = () => {
    return (
        <div className="categories-container">
            <h1 className="categories-title">OUR CATEGORIES</h1>
            <h2 className="categories-title">What we're offering to customers</h2>
            <div className="categories-grid">
                {categories.map(category => (
                    <div key={category.id} className="category-card">
                        <div className="image-container">
                            <img src={category.imageUrl} alt={category.name} className="category-image" />
                        </div>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
