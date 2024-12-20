import React from 'react';
import './AddOns.css';

const AddOns = ({ addOns, handleAddOnChange }) => {
    const addOnsList = [
        {
            id: 'extraBaggage',
            title: 'Extra Baggage',
            description: 'Add extra 23kg checked baggage',
            price: '$30',
            icon: 'baggage.jpg'
        },
        {
            id: 'meal',
            title: 'Special Meal',
            description: 'Pre-order your preferred meal',
            price: '$15',
            icon: 'meal.jpg'
        },
        {
            id: 'insurance',
            title: 'Travel Insurance',
            description: 'Comprehensive travel protection',
            price: '$20',
            icon: 'insurance.jpg'
        },
        {
            id: 'priorityBoarding',
            title: 'Priority Boarding',
            description: 'Board first and settle in comfortably',
            price: '$10',
            icon: 'priority.jpg'
        }
    ];

    return (
        <div className="add-ons-section">
            <h3>Additional Services</h3>
            <div className="add-ons-grid">
                {addOnsList.map(addon => (
                    <div key={addon.id} className="add-on-item">
                        <div className="add-on-content">
                            <div className="add-on-icon">
                                <img src={`/icons/${addon.icon}`} alt={addon.title} />
                            </div>
                            <div className="add-on-info">
                                <h4>{addon.title}</h4>
                                <p>{addon.description}</p>
                                <span className="price">{addon.price}</span>
                            </div>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={addOns[addon.id]}
                                onChange={() => handleAddOnChange(addon.id)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddOns; 