import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectSeat from '../components/flight/SelectSeat';
import ProgressBar from '../components/booking/ProgressBar';
import FlightSummary from '../components/booking/FlightSummary';
import PassengerForm from '../components/booking/PassengerForm';
import AddOns from '../components/booking/AddOns';
import BookingSteps from '../components/booking/BookingSteps';
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

    const handleAddOnChange = (name) => {
        setAddOns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

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
                return (
                    <PassengerForm 
                        passengerDetails={passengerDetails}
                        setPassengerDetails={setPassengerDetails}
                    />
                );
            case 3:
                return (
                    <AddOns 
                        addOns={addOns}
                        handleAddOnChange={handleAddOnChange}
                    />
                );
            default:
                return null;
        }
    };

    const handleNextStep = () => {
        if (currentStep === 3) {
            console.log('Flight data before navigation:', flight);
            
            navigate('/review-payment', {
                state: {
                    flight: flight,
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
                <FlightSummary flight={flight} selectedClass={selectedClass} />

                <div className="booking-content">
                    <BookingSteps currentStep={currentStep} />
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