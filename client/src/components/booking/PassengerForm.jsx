import React from 'react';

const PassengerForm = ({ passengerDetails, setPassengerDetails }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassengerDetails(prev => ({
            ...prev,
            [name]: value
        }));
        console.log('Passenger Details:', passengerDetails);
    };

    return (
        <div className="passenger-details-form">
            <h3>Passenger Information</h3>
            <div className="form-grid">
                <div className="form-group">
                    <label>Title</label>
                    <select 
                        style={{ margin: '8px 0px' }}
                        name="title" 
                        value={passengerDetails.title}
                        onChange={handleInputChange}
                    >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                    </select>
                </div>
                {/* Các trường input khác */}
                {[
                    { label: 'First Name', name: 'firstName', type: 'text' },
                    { label: 'Last Name', name: 'lastName', type: 'text' },
                    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                    { label: 'Nationality', name: 'nationality', type: 'text' },
                    { label: 'Passport Number', name: 'passportNumber', type: 'text' },
                    { label: 'Passport Expiry Date', name: 'passportExpiry', type: 'date' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Phone Number', name: 'phone', type: 'tel' }
                ].map(field => (
                    <div key={field.name} className="form-group">
                        <label>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={passengerDetails[field.name]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassengerForm; 