import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import './BookingConfirmationPage.css';

const BookingConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, flightDetails, passengerDetails, selectedClass, selectedSeats, addOns } = location.state || {};

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    console.log('Location State Booking Confirmation:', location.state);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (!booking || !flightDetails) {
        return (
            <div className="booking-confirmation-error">
                <div className="error-content">
                    <div className="error-icon">⚠️</div>
                    <h2>Booking Information Not Found</h2>
                    <p>We couldn't find the booking information you're looking for.</p>
                    <button onClick={() => navigate('/')} className="return-button">
                        Return to Flight Search
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-confirmation-page">
            <Header />
            <div className="confirmation-container">
                <div className="confirmation-header">
                    <div className="success-icon">✓</div>
                    <h1>Booking Confirmed!</h1>
                    <div className="booking-reference">
                        <span>Booking Reference:</span>
                        <strong>{booking.bookingCode}</strong>
                    </div>
                    <p className="confirmation-message">
                        Thank you for choosing Q-Airline. Your booking has been confirmed and your tickets are ready.
                    </p>
                </div>

                <div className="confirmation-content">
                    <div className="confirmation-section bc-flight-details">
                        <h2>Flight Details</h2>
                        <div className="flight-card">
                            <div className="flight-header">
                                <div className="flight-route">
                                    <span className="flight-number">{flightDetails.flightNumber}</span>
                                    <div className="route-display">
                                        <div className="origin">
                                            <span className="city">{flightDetails.origin}</span>
                                            <span className="time">{formatDate(flightDetails.departureTime)}</span>
                                        </div>
                                        <div className="flight-path">
                                            <div className="line"></div>
                                            <span className="plane-icon">✈</span>
                                        </div>
                                        <div className="destination">
                                            <span className="city">{flightDetails.destination}</span>
                                            <span className="time">{formatDate(flightDetails.arrivalTime)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flight-info-grid">
                                <div className="info-item">
                                    <label>Class</label>
                                    <span>{selectedClass}</span>
                                </div>
                                <div className="info-item">
                                    <label>Seat(s)</label>
                                    <span>{selectedSeats.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="confirmation-section passenger-details">
                        <h2>Passenger Information</h2>
                        <div className="passenger-card">
                            <div className="passenger-info-grid">
                                <div className="info-item full-width">
                                    <label>Full Name</label>
                                    <span>{`${passengerDetails.title} ${passengerDetails.firstName} ${passengerDetails.lastName}`}</span>
                                </div>
                                <div className="info-item">
                                    <label>Date of Birth</label>
                                    <span>{new Date(passengerDetails.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                                <div className="info-item">
                                    <label>Passport Number</label>
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
                    </div>

                    {addOns && Object.values(addOns).some(value => value) && (
                        <div className="confirmation-section additional-services">
                            <h2>Additional Services</h2>
                            <div className="services-card">
                                <div className="services-grid">
                                    {Object.entries(addOns).map(([service, isSelected]) => (
                                        isSelected && (
                                            <div key={service} className="service-item">
                                                <span className="service-icon">
                                                    {service === 'extraBaggage' ? '🧳' :
                                                     service === 'meal' ? '🍽️' :
                                                     service === 'insurance' ? '🛡️' : '✈️'}
                                                </span>
                                                <div className="service-details">
                                                    <span className="service-name">
                                                        {service === 'extraBaggage' ? 'Extra Baggage' :
                                                         service === 'meal' ? 'Special Meal' :
                                                         service === 'insurance' ? 'Travel Insurance' :
                                                         'Priority Boarding'}
                                                    </span>
                                                    <span className="service-price">
                                                        {formatPrice(
                                                            service === 'extraBaggage' ? 300000 :
                                                            service === 'meal' ? 150000 :
                                                            service === 'insurance' ? 200000 :
                                                            service === 'priorityBoarding' ? 100000 : 0
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="confirmation-section payment-summary">
                        <h2>Payment Summary</h2>
                        <div className="payment-card">
                            <div className="price-breakdown">
                                <div className="price-item">
                                    <span>Base Fare</span>
                                    <span>{formatPrice(location.state.basePrice)}</span>
                                </div>
                                <div className="price-item">
                                    <span>Taxes & Fees</span>
                                    <span>{formatPrice(location.state.taxes)}</span>
                                </div>
                                {addOns && Object.values(addOns).some(value => value) && (
                                    <div className="price-item">
                                        <span>Additional Services</span>
                                        <span>{formatPrice(location.state.addOnsTotal)}</span>
                                    </div>
                                )}
                                <div className="price-item total">
                                    <span>Total Amount</span>
                                    <span>{formatPrice(location.state.totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <button onClick={() => window.print()} className="print-button">
                        <span className="icon">🖨️</span>
                        Print Ticket
                    </button>
                    <button onClick={() => navigate('/my-bookings')} className="manage-button">
                        <span className="icon">📋</span>
                        Manage Booking
                    </button>
                </div>

                <div className="confirmation-footer">
                    <p>A confirmation email has been sent to {passengerDetails.email}</p>
                    <p>For any assistance, please contact our support team</p>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationPage; 