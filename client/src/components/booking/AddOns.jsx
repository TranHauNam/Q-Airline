import React from 'react';

const AddOns = ({ addOns, handleAddOnChange }) => {
    const addOnsList = [
        {
            id: 'extraBaggage',
            title: 'Extra Baggage',
            description: 'Add extra 23kg checked baggage',
            price: '$30',
            icon: 'baggage.png'
        },
        {
            id: 'meal',
            title: 'Special Meal',
            description: 'Pre-order your preferred meal',
            price: '$15',
            icon: 'meal.png'
        },
        {
            id: 'insurance',
            title: 'Travel Insurance',
            description: 'Comprehensive travel protection',
            price: '$20',
            icon: 'insurance.png'
        },
        {
            id: 'priorityBoarding',
            title: 'Priority Boarding',
            description: 'Board first and settle in comfortably',
            price: '$10',
            icon: 'priority.png'
        }
    ];

    return (
        <div className="add-ons-section">
            <h3>Additional Services</h3>
            <div className="add-ons-grid">
                {addOnsList.map(addon => (
                    <div key={addon.id} className="add-on-item">
                        <div className="add-on-content">
                            <img src={`/icons/${addon.icon}`} alt={addon.title} />
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