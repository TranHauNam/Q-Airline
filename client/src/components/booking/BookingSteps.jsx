import React from 'react';

const BookingSteps = ({ currentStep }) => (
    <div className="booking-steps">
        {[
            { number: 1, title: 'Select Seats' },
            { number: 2, title: 'Passenger Details' },
            { number: 3, title: 'Add-ons' }
        ].map(step => (
            <div key={step.number} className={`step ${currentStep === step.number ? 'active' : ''}`}>
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
            </div>
        ))}
    </div>
);

export default BookingSteps; 