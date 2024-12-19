import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import flightService from '../services/flightService';
import './FlightResultPage.css';
import SelectSeat from '../components/flight/SelectSeat';

const FlightResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSeatSelection, setShowSeatSelection] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const searchFlights = async () => {
            if (!location.state) {
                setError('No search criteria provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await flightService.searchFlights(location.state);
                    setFlights(response.flights);
            } catch (err) {
                console.error('Search error:', err);
                setError(err.message || 'Failed to search flights');
            } finally {
                setLoading(false);
            }
        };

        searchFlights();
    }, [location.state]);

    const handleModifySearch = () => {
        navigate(-1);
    };

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    // Progress bar component
    const ProgressBar = () => (
        <div className="progress-bar">
            <div className="progress-step active">1 FLIGHTS</div>
            <div className="progress-step">2 JOURNEY DETAILS</div>
            <div className="progress-step">3 REVIEW & PAYMENT</div>
        </div>
    );

    // Journey summary component
    const JourneySummary = () => (
        <div className="journey-summary">
            <div className="journey-info">
                <div className="airport-code">
                    <div>{location.state.origin}</div>
                    <div className="date">{location.state.departureTime}</div>
                </div>
                <div className="flight-direction">
                    <span>Departure</span>
                    <div className="direction-line"></div>
                </div>
                <div className="airport-code">
                    <div>{location.state.destination}</div>
                    <div className="date">FRI, 20 DEC 24</div>
                </div>
            </div>
            <button onClick={handleModifySearch} className="modify-booking">
                Modify Booking
            </button>
        </div>
    );

    // Flight card component
    const FlightCard = ({ flight }) => {
        // Format thời gian từ ISO string
        const formatTime = (isoString) => {
            return new Date(isoString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        };

        // Format giá tiền
        const formatPrice = (price) => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        };

        const handleSelectFlight = (classType) => {
            navigate('/booking', { 
                state: { 
                    flight,
                    selectedClass: classType
                }
            });
        };

        return (
            <div className="flight-card">
                <div className="flight-header">
                    <div className="flight-number">
                        <span>{flight.flightNumber}</span>
                        <span className="airline">{flight.planeCode}</span>
                    </div>
                    <div className="flight-time">
                        <div className="time-info">
                            <div className="time">{formatTime(flight.departureTime)}</div>
                            <div className="airport">{flight.origin}</div>
                        </div>
                        <div className="duration">
                            <div className="duration-time">{flight.duration}</div>
                            <div className="duration-line"></div>
                        </div>
                        <div className="time-info">
                            <div className="time">
                                {formatTime(new Date(new Date(flight.departureTime).getTime() + 
                                    parseInt(flight.duration.split('h')[0]) * 60 * 60 * 1000 + 
                                    parseInt(flight.duration.split('h')[1].split('m')[0]) * 60 * 1000))}
                            </div>
                            <div className="airport">{flight.destination}</div>
                        </div>
                    </div>
                </div>
                <div className="flight-options">
                    <div className="option economy">
                        <div className="class-header">
                            <span>ECONOMY</span>
                            <span className="seats-left">
                                {flight.availableSeatsEconomy} seats left at this fare
                            </span>
                        </div>
                        <div className="price">{formatPrice(flight.priceEconomy)}</div>
                        <button className="select-button" onClick={() => handleSelectFlight('Economy')}>Select</button>
                    </div>
                    <div className="option premium-economy">
                        <div className="class-header">
                            <span>PREMIUM ECONOMY</span>
                            <span className="seats-left">
                                {flight.availableSeatsPremiumEconomy} seats left at this fare
                            </span>
                        </div>
                        <div className="price">{formatPrice(flight.pricePremiumEconomy)}</div>
                        <button className="select-button" onClick={() => handleSelectFlight('Premium Economy')}>Select</button>
                    </div>
                    <div className="option business">
                        <div className="class-header">
                            <span>BUSINESS</span>
                            <span className="seats-left">
                                {flight.availableSeatsBusiness} seats left at this fare
                            </span>
                        </div>
                        <div className="price">{formatPrice(flight.priceBusiness)}</div>
                        <button className="select-button" onClick={() => handleSelectFlight('Business')}>Select</button>
                    </div>
                    <div className="option first">
                        <div className="class-header">
                            <span>FIRST</span>
                            <span className="seats-left">
                                {flight.availableSeatsFirst} seats left at this fare
                            </span>
                        </div>
                        <div className="price">{formatPrice(flight.priceFirst)}</div>
                        <button className="select-button" onClick={() => handleSelectFlight('First')}>Select</button>
                    </div>
                </div>
                <div className="flight-details">
                    <button className="view-details">View Flight Details</button>
                    <div className="flight-info">
                        <span>Aircraft: {flight.planeCode}</span>
                    </div>
                </div>
                <button 
                    className="select-button" 
                    onClick={() => setShowSeatSelection(true)}
                >
                    Select
                </button>

                {showSeatSelection && (
                    <div className="seat-selection-modal">
                        <SelectSeat 
                            selectedSeats={selectedSeats}
                            onSelectSeat={handleSeatSelect}
                        />
                    </div>
                )}
            </div>
        );
    };

    if (loading) return (
            <div className="loading-state">
                <div className="spinner"></div>
                <p>Searching for flights...</p>
            </div>
        );

    if (error) return (
            <div className="error-state">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={handleModifySearch}>Modify Search</button>
            </div>
        );

    return (
        <div className="flight-result-page">
            <ProgressBar />
            <div className="result-container">
                <JourneySummary />
                <div className="results-header">
                    <h2>{flights.length} Flights found for your trip</h2>
                    <div className="filters">
                        <button className="filter-button">Duration ▼</button>
                        <button className="filter-button">Filter</button>
                                </div>
                            </div>
                <div className="flights-list">
                    {flights.map((flight, index) => (
                        <FlightCard key={index} flight={flight} />
                    ))}
                            </div>
            </div>
        </div>
    );
};

export default FlightResultPage; 