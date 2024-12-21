import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmationPage.css';

const BookingConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, flightDetails, passengerDetails, selectedClass, selectedSeats, addOns } = location.state || {};

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (!booking || !flightDetails) {
        return (
            <div className="booking-confirmation">
                <div className="error-message">
                    Không tìm thấy thông tin đặt vé
                </div>
                <button onClick={() => navigate('/')} className="return-button">
                    Quay lại trang tìm kiếm
                </button>
            </div>
        );
    }

    return (
        <div className="booking-confirmation">
            <div className="confirmation-header">
                <div className="success-icon">✓</div>
                <h1>Booking Successful!</h1>
                <p className="booking-code">Booking Code: <span>{booking.bookingCode}</span></p>
            </div>

            <div className="confirmation-content">
                <div className="confirmation-section flight-info">
                    <h2>Flight Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Flight Number</label>
                            <span>{flightDetails.flightNumber}</span>
                        </div>
                        <div className="info-item">
                            <label>Flight Route</label>
                            <span>{flightDetails.origin} → {flightDetails.destination}</span>
                        </div>
                        <div className="info-item">
                            <label>Departure Date</label>
                            <span>{formatDate(flightDetails.departureTime)}</span>
                        </div>
                        <div className="info-item">
                            <label>Class</label>
                            <span>{selectedClass}</span>
                        </div>
                        <div className="info-item">
                            <label>Seat Number</label>
                            <span>{selectedSeats.join(', ')}</span>
                        </div>
                    </div>
                </div>

                <div className="confirmation-section passenger-info">
                    <h2>Passenger Information</h2>
                    <div className="info-grid">
                        <div className="info-item full-width">
                            <label>Name</label>
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
                            <label>Phone Number</label>
                            <span>{passengerDetails.phone}</span>
                        </div>
                    </div>
                </div>

                {addOns && Object.values(addOns).some(value => value) && (
                    <div className="confirmation-section addons-info">
                        <h2>Additional Services</h2>
                        <div className="addons-grid">
                            {Object.entries(addOns).map(([service, isSelected]) => (
                                isSelected && (
                                    <div key={service} className="addon-item">
                                        <span className="addon-name">
                                            {service === 'extraBaggage' ? 'Extra Baggage' :
                                             service === 'meal' ? 'Special Meal' :
                                             service === 'insurance' ? 'Travel Insurance' :
                                             'Priority Boarding'}
                                        </span>
                                        <span className="addon-price">
                                            {formatPrice(
                                                service === 'extraBaggage' ? 300000 :
                                                service === 'meal' ? 150000 :
                                                service === 'insurance' ? 200000 :
                                                service === 'priorityBoarding' ? 100000 : 0
                                            )}
                                        </span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                <div className="confirmation-section payment-info">
                    <h2>Payment Information</h2>
                    <div className="payment-details">
                        <div className="payment-item">
                            <span>Ticket Price ({selectedClass})</span>
                            <span>{formatPrice(booking.totalPrice)}</span>
                        </div>
                        <div className="payment-item total">
                            <span>Total</span>
                            <span>{formatPrice(booking.totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="confirmation-actions">
                <button 
                    onClick={() => window.print()} 
                    className="print-button"
                >
                    Print Ticket
                </button>
                <button 
                    onClick={() => navigate('/manage-booking')} 
                    className="manage-button"
                >
                    Manage Booking
                </button>
                <button 
                    onClick={() => navigate('/')} 
                    className="return-button"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationPage; 