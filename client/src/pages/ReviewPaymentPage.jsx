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
                    <div className="review-payment-wrapper">
                        {/* Left Column - Booking Review */}
                        <div className="review-details">
                            <div className="review-section">
                                <h3>Flight Details</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Flight Number</label>
                                        <span>{flight.flightNumber}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Route</label>
                                        <span>{flight.origin} → {flight.destination}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Date</label>
                                        <span>{new Date(flight.departureTime).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Time</label>
                                        <span>{new Date(flight.departureTime).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Class</label>
                                        <span>{selectedClass}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Selected Seats</label>
                                        <span>{selectedSeats.join(', ')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="review-section">
                                <h3>Passenger Information</h3>
                                <div className="info-grid">
                                    <div className="info-item full-width">
                                        <label>Full Name</label>
                                        <span>{`${passengerDetails.title} ${passengerDetails.firstName} ${passengerDetails.lastName}`}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Date of Birth</label>
                                        <span>{new Date(passengerDetails.dateOfBirth).toLocaleDateString()}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Passport</label>
                                        <span>{passengerDetails.passportNumber}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <span>{passengerDetails.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Phone</label>
                                        <span>{passengerDetails.phone}</span>
                                    </div>
                                </div>
                            </div>

                            {Object.values(addOns).some(value => value) && (
                                <div className="review-section">
                                    <h3>Additional Services</h3>
                                    <div className="services-grid">
                                        {Object.entries(addOns).map(([service, isSelected]) => (
                                            isSelected && (
                                                <div key={service} className="service-item">
                                                    <span className="service-name">
                                                        {service.replace(/([A-Z])/g, ' $1').trim()}
                                                    </span>
                                                    <span className="service-price">
                                                        {formatPrice(
                                                            service === 'extraBaggage' ? 30 :
                                                            service === 'meal' ? 15 :
                                                            service === 'insurance' ? 20 :
                                                            service === 'priorityBoarding' ? 10 : 0
                                                        )}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Payment */}
                        <div className="payment-details">
                            <div className="payment-section">
                                <h3>Payment Summary</h3>
                                <div className="price-breakdown">
                                    <div className="price-item">
                                        <label>Base Fare ({selectedClass})</label>
                                        <span>{formatPrice(flight[`price${selectedClass.replace(/\s+/g, '')}`])}</span>
                                    </div>
                                    {calculateAddOnsTotal() > 0 && (
                                        <div className="price-item">
                                            <label>Additional Services</label>
                                            <span>{formatPrice(calculateAddOnsTotal())}</span>
                                        </div>
                                    )}
                                    <div className="price-item">
                                        <label>Taxes & Fees</label>
                                        <span>{formatPrice(flight[`price${selectedClass.replace(/\s+/g, '')}`] * 0.1)}</span>
                                    </div>
                                    <div className="price-item total">
                                        <label>Total Amount</label>
                                        <span>{formatPrice(calculateTotal())}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-methods">
                                <h3>Payment Method</h3>
                                <div className="payment-options">
                                    {[
                                        { value: 'credit', label: 'Credit/Debit Card', icon: 'credit-card.png' },
                                        { value: 'banking', label: 'Internet Banking', icon: 'bank.png' },
                                        { value: 'ewallet', label: 'E-Wallet', icon: 'ewallet.png' }
                                    ].map(method => (
                                        <label key={method.value} className="payment-option">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={method.value}
                                                checked={selectedPayment === method.value}
                                                onChange={handlePaymentChange}
                                            />
                                            <div className="option-content">
                                                <img src={`/icons/${method.icon}`} alt={method.label} />
                                                <span>{method.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
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