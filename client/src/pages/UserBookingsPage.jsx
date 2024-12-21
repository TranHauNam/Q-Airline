import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserBookingsPage.css';
import Header from '../components/common/Header';

const UserBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const canCancelBooking = (booking) => {
        if (booking.bookingStatus !== "Confirmed") return false;

        const now = new Date();
        const departureTime = new Date(booking.departurePrivateInformation.departureTime);
        const timeDifference = departureTime.getTime() - now.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        return hoursDifference >= 12;
    };

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    navigate('/sign');
                    return;
                }

                const user = JSON.parse(userStr);
                if (!user || !user.id) {
                    navigate('/sign');
                    return;
                }

                const response = await fetch(`/api/booking/user/${user.id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Cannot get booking information');
                }
                console.log("data", data);
                setBookings(data.bookings);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [navigate]);

    const handleCancelBooking = async (bookingCode) => {
        try {
            if (!window.confirm('Are you sure you want to cancel this booking?')) {
                return;
            }

            const response = await fetch(`/api/booking/cancel/${bookingCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Cannot cancel booking');
            }

            // Update the bookings list with the updated booking from response
            setBookings(bookings.map(booking => 
                booking.bookingCode === bookingCode 
                    ? { ...booking, bookingStatus: "Canceled" } 
                    : booking
            ));
            setShowModal(false);
            alert('Booking cancelled successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
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

    const BookingDetailsModal = ({ booking, onClose, onCancel }) => {
        if (!booking) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Booking Details</h2>
                        <button className="close-button" onClick={onClose}>&times;</button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="booking-status-section">
                            <div className="status-header">
                                <h3>Booking Code: {booking.bookingCode}</h3>
                                <span className={`booking-status ${booking.bookingStatus}`}>
                                    {booking.bookingStatus === 'Confirmed' ? 'Confirmed' : 'Cancelled'}
                                </span>
                            </div>
                            <p className="booking-date">Booked on {formatDate(booking.createdAt)}</p>
                        </div>

                        <div className="flight-section">
                            <h3>Flight Information</h3>
                            <div className="flight-details-modal">
                                <div className="flight-info-item">
                                    <h4>Departure Flight</h4>
                                    <p><strong>Flight Number:</strong> {booking.departurePrivateInformation.flightNumber}</p>
                                    <p><strong>From:</strong> {booking.departurePrivateInformation.origin}</p>
                                    <p><strong>To:</strong> {booking.departurePrivateInformation.destination}</p>
                                    <p><strong>Departure:</strong> {formatDate(booking.departurePrivateInformation.departureTime)}</p>
                                    <p><strong>Seat(s):</strong> {booking.departurePrivateInformation.seatsBooked.join(', ')}</p>
                                </div>

                                {booking.returnPrivateInformation.length > 0 && (
                                    <div className="flight-info-item">
                                        <h4>Return Flight</h4>
                                        <p><strong>Flight Number:</strong> {booking.returnPrivateInformation.flightNumber}</p>
                                        <p><strong>From:</strong> {booking.returnPrivateInformation.origin}</p>
                                        <p><strong>To:</strong> {booking.returnPrivateInformation.destination}</p>
                                        <p><strong>Departure:</strong> {formatDate(booking.returnPrivateInformation.departureTime)}</p>
                                        <p><strong>Seat(s):</strong> {booking.returnPrivateInformation.seatsBooked.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {booking.additionalService && (
                            <div className="services-section">
                                <h3>Additional Services</h3>
                                <div className="service-tags">
                                    {booking.additionalService.split(',').map((service, index) => (
                                        <span key={index} className="service-tag">{service.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="price-section">
                            <h3>Price Details</h3>
                            <div className="price-details">
                                <div className="price-row">
                                    <span>Base Fare</span>
                                    <span>{formatPrice(booking.totalPrice * 0.8)}</span>
                                </div>
                                <div className="price-row">
                                    <span>Taxes & Fees</span>
                                    <span>{formatPrice(booking.totalPrice * 0.2)}</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total Amount</span>
                                    <span>{formatPrice(booking.totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        {canCancelBooking(booking) && (
                            <button 
                                className="cancel-button"
                                onClick={() => onCancel(booking.bookingCode)}
                            >
                                Cancel Booking
                            </button>
                        )}
                        <button className="close-button-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flight-result-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flight-result-page">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <p>{error}</p>
                    <button onClick={() => navigate('/')} className="return-home-btn">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flight-result-page">
            <Header />
            <div className="bookings-container">
                <div className="page-header">
                    <h1>My Bookings</h1>
                    <p>View and manage your flight bookings</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="no-bookings-container">
                        <div className="no-bookings-content">
                            <div className="no-bookings-icon">✈️</div>
                            <h2>No Bookings Found</h2>
                            <p>Start your journey by booking a flight today!</p>
                            <button onClick={() => navigate('/')} className="book-now-btn">
                                Search Flights
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bookings-content">
                        <div className="bookings-header">
                            <h2>{bookings.length} Bookings Found</h2>
                            <div className="booking-filters">
                                <select className="filter-select" defaultValue="all">
                                    <option value="all">All Bookings</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="bookings-list">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="booking-card">
                                    <div className="booking-header">
                                        <div className="booking-info">
                                            <div className="booking-code">
                                                <h3>Booking Code: <span>{booking.bookingCode}</span></h3>
                                                <span className={`booking-status ${booking.bookingStatus}`}>
                                                    {booking.bookingStatus === 'Confirmed' ? 'Confirmed' : 'Cancelled'}
                                                </span>
                                            </div>
                                            <div className="booking-date">
                                                Booked on {formatDate(booking.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ub-flight-details">
                                        <div className="departure-flight">
                                            <div className="flight-header">
                                                <h4>Departure Flight</h4>
                                                <span className="flight-number">{booking.departurePrivateInformation.flightNumber}</span>
                                            </div>
                                            <div className="flight-info">
                                                <div className="route-info">
                                                    <div className="origin">
                                                        <span className="city">{booking.departurePrivateInformation.origin}</span>
                                                    </div>
                                                    <div className="flight-path">
                                                        <span className="plane-icon">✈️</span>
                                                    </div>
                                                    <div className="destination">
                                                        <span className="city">{booking.departurePrivateInformation.destination}</span>
                                                    </div>
                                                </div>
                                                <div className="flight-details-grid">
                                                    <div className="detail-item">
                                                        <label>Class</label>
                                                        <span>{booking.classType}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <label>Seat(s)</label>
                                                        <span>{booking.departurePrivateInformation.seatsBooked.join(', ')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {booking.returnPrivateInformation.length > 0 && (
                                            <div className="return-flight">
                                                <div className="flight-header">
                                                    <h4>Return Flight</h4>
                                                    <span className="flight-number">{booking.returnPrivateInformation.flightNumber}</span>
                                                </div>
                                                <div className="flight-info">
                                                    <div className="route-info">
                                                        <div className="origin">
                                                            <span className="city">{booking.returnPrivateInformation.origin}</span>
                                                        </div>
                                                        <div className="flight-path">
                                                            <span className="plane-icon">✈️</span>
                                                        </div>
                                                        <div className="destination">
                                                            <span className="city">{booking.returnPrivateInformation.destination}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flight-details-grid">
                                                        <div className="detail-item">
                                                            <label>Class</label>
                                                            <span>{booking.classType}</span>
                                                        </div>
                                                        <div className="detail-item">
                                                            <label>Seat(s)</label>
                                                            <span>{booking.returnPrivateInformation.seatsBooked.join(', ')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {booking.additionalService && (
                                        <div className="additional-services">
                                            <h4>Additional Services</h4>
                                            <div className="service-tags">
                                                {booking.additionalService.split(',').map((service, index) => (
                                                    <span key={index} className="service-tag">{service.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="booking-footer">
                                        <div className="price-info">
                                            <span>Total Price</span>
                                            <span className="total-price">{formatPrice(booking.totalPrice)}</span>
                                        </div>
                                        <div className="booking-actions">
                                            <button 
                                                className="details-button"
                                                onClick={() => {
                                                    setSelectedBooking(booking);
                                                    setShowModal(true);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <BookingDetailsModal 
                    booking={selectedBooking}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedBooking(null);
                    }}
                    onCancel={handleCancelBooking}
                />
            )}
        </div>
    );
};

export default UserBookingsPage; 