import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserBookingsPage.css';
import Header from '../components/common/Header';

const UserBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                                                <span className={`booking-status ${booking.status}`}></span>
                                            </div>
                                            <div className="booking-date">
                                                Booked on {formatDate(booking.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flight-details">
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
                                            {(
                                                <button 
                                                    className="cancel-button"
                                                    onClick={() => navigate(`/booking/${booking._id}/cancel`)}
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                            <button 
                                                className="details-button"
                                                onClick={() => navigate(`/booking/${booking._id}`)}
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
        </div>
    );
};

export default UserBookingsPage; 