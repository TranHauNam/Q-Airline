import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectSeat from '../components/flight/SelectSeat';
import './BookingPage.css';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, selectedClass } = location.state || {};
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [passengerDetails, setPassengerDetails] = useState({
        title: 'Mr',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
        email: '',
        phone: ''
    });
    const [addOns, setAddOns] = useState({
        extraBaggage: false,
        meal: false,
        insurance: false,
        priorityBoarding: false
    });

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    const handlePassengerChange = (e) => {
        const { name, value } = e.target;
        setPassengerDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddOnChange = (name) => {
        setAddOns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    // Passenger Details Form Component
    const PassengerDetailsForm = () => {
        // Tạo một state riêng cho form
        const [formData, setFormData] = useState(passengerDetails);

        // Xử lý thay đổi input
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        // Cập nhật state chính khi form thay đổi
        useEffect(() => {
            setPassengerDetails(formData);
        }, [formData]);

        return (
            <div className="passenger-details-form">
                <h3>Passenger Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Title</label>
                        <select 
                            style={{ margin: '8px 0px' }}
                            name="title" 
                            value={formData.title}
                            onChange={handleInputChange}
                        >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Passport Number</label>
                        <input
                            type="text"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Passport Expiry Date</label>
                        <input
                            type="date"
                            name="passportExpiry"
                            value={formData.passportExpiry}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Add-ons Component
    const AddOns = () => (
        <div className="add-ons-section">
            <h3>Additional Services</h3>
            <div className="add-ons-grid">
                <div className="add-on-item">
                    <div className="add-on-content">
                        <img src="/icons/baggage.png" alt="Extra Baggage" />
                        <div className="add-on-info">
                            <h4>Extra Baggage</h4>
                            <p>Add extra 23kg checked baggage</p>
                            <span className="price">$30</span>
                        </div>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={addOns.extraBaggage}
                            onChange={() => handleAddOnChange('extraBaggage')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="add-on-item">
                    <div className="add-on-content">
                        <img src="/icons/meal.png" alt="In-flight Meal" />
                        <div className="add-on-info">
                            <h4>Special Meal</h4>
                            <p>Pre-order your preferred meal</p>
                            <span className="price">$15</span>
                        </div>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={addOns.meal}
                            onChange={() => handleAddOnChange('meal')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="add-on-item">
                    <div className="add-on-content">
                        <img src="/icons/insurance.png" alt="Travel Insurance" />
                        <div className="add-on-info">
                            <h4>Travel Insurance</h4>
                            <p>Comprehensive travel protection</p>
                            <span className="price">$20</span>
                        </div>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={addOns.insurance}
                            onChange={() => handleAddOnChange('insurance')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="add-on-item">
                    <div className="add-on-content">
                        <img src="/icons/priority.png" alt="Priority Boarding" />
                        <div className="add-on-info">
                            <h4>Priority Boarding</h4>
                            <p>Board first and settle in comfortably</p>
                            <span className="price">$10</span>
                        </div>
                    </div>
                    <label className="toggle">
                        <input
                            type="checkbox"
                            checked={addOns.priorityBoarding}
                            onChange={() => handleAddOnChange('priorityBoarding')}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );

    // Thêm vào renderStepContent
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="seat-selection-section">
                        <SelectSeat 
                            selectedSeats={selectedSeats}
                            onSelectSeat={handleSeatSelect}
                        />
                    </div>
                );
            case 2:
                return <PassengerDetailsForm />;
            case 3:
                return <AddOns />;
            default:
                return null;
        }
    };

    // Progress bar component
    const ProgressBar = () => (
        <div className="progress-bar">
            <div className="progress-step">1 FLIGHTS</div>
            <div className="progress-step active">2 JOURNEY DETAILS</div>
            <div className="progress-step">3 REVIEW & PAYMENT</div>
        </div>
    );

    // Flight Summary component
    const FlightSummary = () => (
        <div className="flight-summary">
            <h2>Flight Details</h2>
            <div className="flight-info">
                <div className="flight-route">
                    <span>{flight.origin}</span>
                    <span className="arrow">→</span>
                    <span>{flight.destination}</span>
                </div>
                <div className="flight-details">
                    <div>Flight: {flight.flightNumber}</div>
                    <div>Class: {selectedClass}</div>
                    <div>Date: {new Date(flight.departureTime).toLocaleDateString()}</div>
                    <div>Time: {new Date(flight.departureTime).toLocaleTimeString()}</div>
                </div>
            </div>
        </div>
    );

    const handleNextStep = () => {
        if (currentStep === 3) {
            navigate('/review-payment', {
                state: {
                    flight,
                    selectedClass,
                    selectedSeats,
                    passengerDetails,
                    addOns
                }
            });
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="booking-page">
            <ProgressBar />
            
            <div className="booking-container">
                <FlightSummary />

                <div className="booking-content">
                    <div className="booking-steps">
                        <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
                            <div className="step-number">1</div>
                            <div className="step-title">Select Seats</div>
                        </div>
                        <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <div className="step-title">Passenger Details</div>
                        </div>
                        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <div className="step-title">Add-ons</div>
                        </div>
                    </div>

                    {renderStepContent()}

                    <div className="booking-actions">
                        <button 
                            className="back-button"
                            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 1}
                        >
                            Back
                        </button>
                        <button 
                            className="next-button"
                            onClick={handleNextStep}
                            disabled={currentStep === 1 && selectedSeats.length === 0}
                        >
                            {currentStep === 3 ? 'Continue to Payment' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage; 