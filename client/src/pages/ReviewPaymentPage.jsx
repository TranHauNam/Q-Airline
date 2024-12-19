import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewPaymentPage.css';

const ReviewPaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, selectedClass, selectedSeats, passengerDetails, addOns } = location.state || {};
    const [selectedPayment, setSelectedPayment] = useState('credit');

    // Format tiền tệ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Tính tổng tiền dịch vụ bổ sung
    const calculateAddOnsTotal = () => {
        let total = 0;
        if (addOns.extraBaggage) total += 30;
        if (addOns.meal) total += 15;
        if (addOns.insurance) total += 20;
        if (addOns.priorityBoarding) total += 10;
        return total;
    };

    // Tính tổng tiền
    const calculateTotal = () => {
        const basePrice = flight[`price${selectedClass.replace(/\s+/g, '')}`];
        const addOnsTotal = calculateAddOnsTotal();
        const taxes = basePrice * 0.1;
        return basePrice + addOnsTotal + taxes;
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const handleConfirmPayment = () => {
        // Xử lý thanh toán ở đây
        console.log('Processing payment...');
    };

    // Progress bar component
    const ProgressBar = () => (
        <div className="progress-bar">
            <div className="progress-step">1 FLIGHTS</div>
            <div className="progress-step">2 JOURNEY DETAILS</div>
            <div className="progress-step active">3 REVIEW & PAYMENT</div>
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

    return (
        <div className="booking-page">
            <ProgressBar />
            
            <div className="booking-container">
                <FlightSummary />

                <div className="booking-content">
                    <div className="review-payment-content">
                        {/* Left Column - Booking Review */}
                        <div className="booking-review">
                            <h2>Review Your Booking</h2>

                            {/* Flight Details */}
                            <div className="review-section">
                                <h3>Flight Details</h3>
                                <div className="flight-info">
                                    <div className="info-row">
                                        <span>Flight Number:</span>
                                        <span>{flight.flightNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Route:</span>
                                        <span>{flight.origin} → {flight.destination}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Date:</span>
                                        <span>{new Date(flight.departureTime).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Time:</span>
                                        <span>{new Date(flight.departureTime).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Class:</span>
                                        <span>{selectedClass}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Selected Seats:</span>
                                        <span>{selectedSeats.join(', ')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Details */}
                            <div className="review-section">
                                <h3>Passenger Information</h3>
                                <div className="passenger-info">
                                    <div className="info-row">
                                        <span>Full Name:</span>
                                        <span>{`${passengerDetails.title} ${passengerDetails.firstName} ${passengerDetails.lastName}`}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Date of Birth:</span>
                                        <span>{new Date(passengerDetails.dateOfBirth).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Passport:</span>
                                        <span>{passengerDetails.passportNumber}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Contact:</span>
                                        <span>{passengerDetails.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Phone:</span>
                                        <span>{passengerDetails.phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Services */}
                            <div className="review-section">
                                <h3>Additional Services</h3>
                                <div className="services-info">
                                    {Object.entries(addOns).map(([service, isSelected]) => (
                                        isSelected && (
                                            <div key={service} className="info-row">
                                                <span>{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span>{formatPrice(
                                                    service === 'extraBaggage' ? 30 :
                                                    service === 'meal' ? 15 :
                                                    service === 'insurance' ? 20 :
                                                    service === 'priorityBoarding' ? 10 : 0
                                                )}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment */}
                        <div className="payment-section">
                            <div className="payment-summary">
                                <h3>Payment Summary</h3>
                                <div className="price-breakdown">
                                    <div className="price-row">
                                        <span>Base Fare</span>
                                        <span>{formatPrice(flight[`price${selectedClass.replace(/\s+/g, '')}`])}</span>
                                    </div>
                                    {calculateAddOnsTotal() > 0 && (
                                        <div className="price-row">
                                            <span>Additional Services</span>
                                            <span>{formatPrice(calculateAddOnsTotal())}</span>
                                        </div>
                                    )}
                                    <div className="price-row">
                                        <span>Taxes & Fees</span>
                                        <span>{formatPrice(flight[`price${selectedClass.replace(/\s+/g, '')}`] * 0.1)}</span>
                                    </div>
                                    <div className="price-row total">
                                        <span>Total Amount</span>
                                        <span>{formatPrice(calculateTotal())}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-methods">
                                <h3>Payment Method</h3>
                                <div className="payment-options">
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit"
                                            checked={selectedPayment === 'credit'}
                                            onChange={handlePaymentChange}
                                        />
                                        <div className="option-content">
                                            <img src="/icons/credit-card.png" alt="Credit Card" />
                                            <span>Credit/Debit Card</span>
                                        </div>
                                    </label>

                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="banking"
                                            checked={selectedPayment === 'banking'}
                                            onChange={handlePaymentChange}
                                        />
                                        <div className="option-content">
                                            <img src="/icons/bank.png" alt="Internet Banking" />
                                            <span>Internet Banking</span>
                                        </div>
                                    </label>

                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="ewallet"
                                            checked={selectedPayment === 'ewallet'}
                                            onChange={handlePaymentChange}
                                        />
                                        <div className="option-content">
                                            <img src="/icons/ewallet.png" alt="E-Wallet" />
                                            <span>E-Wallet</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button 
                                className="confirm-payment-button"
                                onClick={handleConfirmPayment}
                            >
                                Confirm and Pay {formatPrice(calculateTotal())}
                            </button>
                        </div>
                    </div>

                    <div className="booking-actions">
                        <button 
                            className="back-button"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                        <button 
                            className="next-button"
                            onClick={handleConfirmPayment}
                        >
                            Confirm and Pay {formatPrice(calculateTotal())}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPaymentPage; 