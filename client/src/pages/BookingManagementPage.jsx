import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingManagementPage.css';

const BookingManagementPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
            if (!userId) {
                navigate('/login');
                return;
            }

            const response = await fetch(`/api/booking/user/${userId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Could not fetch bookings');
            }

            setBookings(data.bookings);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            const response = await fetch(`/api/booking/cancel/${bookingId}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Could not cancel booking');
            }

            // Refresh bookings list
            fetchBookings();
            alert('Booking cancelled successfully');
        } catch (err) {
            alert(err.message);
        }
    };

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

    if (loading) {
        return (
            <div className="booking-management-page">
                <div className="loading">Loading your bookings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="booking-management-page">
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="booking-management-page">
            <div className="page-header">
                <h1>My Bookings</h1>
                <p>Manage your flight bookings</p>
            </div>

            <div className="bookings-container">
                {bookings.length === 0 ? (
                    <div className="no-bookings">
                        <h2>No bookings found</h2>
                        <p>You haven't made any bookings yet.</p>
                        <button onClick={() => navigate('/search')} className="search-flights-btn">
                            Search Flights
                        </button>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <div className="booking-code">
                                    Booking Code: <span>{booking.bookingCode}</span>
                                </div>
                                <div className="booking-status">
                                    Status: <span className={booking.status.toLowerCase()}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flight-details">
                                {/* Departure Flight */}
                                <div className="flight-section">
                                    <h3>Departure Flight</h3>
                                    <div className="flight-info">
                                        <div className="route">
                                            <span>{booking.departurePrivateInformation.origin}</span>
                                            <span className="arrow">→</span>
                                            <span>{booking.departurePrivateInformation.destination}</span>
                                        </div>
                                        <div className="details">
                                            <div>Flight: {booking.departurePrivateInformation.flightNumber}</div>
                                            <div>Date: {formatDate(booking.departurePrivateInformation.departureTime)}</div>
                                            <div>Seats: {booking.departurePrivateInformation.seatsBooked.join(', ')}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Return Flight - if exists */}
                                {booking.returnPrivateInformation && (
                                    <div className="flight-section">
                                        <h3>Return Flight</h3>
                                        <div className="flight-info">
                                            <div className="route">
                                                <span>{booking.returnPrivateInformation.origin}</span>
                                                <span className="arrow">→</span>
                                                <span>{booking.returnPrivateInformation.destination}</span>
                                            </div>
                                            <div className="details">
                                                <div>Flight: {booking.returnPrivateInformation.flightNumber}</div>
                                                <div>Date: {formatDate(booking.returnPrivateInformation.departureTime)}</div>
                                                <div>Seats: {booking.returnPrivateInformation.seatsBooked.join(', ')}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="booking-footer">
                                <div className="price-info">
                                    <span>Total Price:</span>
                                    <span className="total-price">{formatPrice(booking.totalPrice)}</span>
                                </div>
                                <div className="booking-actions">
                                    <button 
                                        className="cancel-btn"
                                        onClick={() => handleCancelBooking(booking._id)}
                                        disabled={!booking.canCancel}
                                    >
                                        Cancel Booking
                                    </button>
                                    <button 
                                        className="view-btn"
                                        onClick={() => navigate(`/booking/${booking._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingManagementPage; 