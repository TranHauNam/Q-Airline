import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import flightService from '../services/flightService';
import ProgressBar from '../components/flight/results/ProgressBar';
import JourneySummary from '../components/flight/results/JourneySummary';
import FlightCard from '../components/flight/results/FlightCard';
import NoFlightsFound from '../components/flight/results/NoFlightsFound';
import './FlightResultPage.css';

const FlightResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log('API Response:', response);
                
                if (response && response.flights) {
                    setFlights(response.flights);
                } else {
                    setFlights([]);
                }
                setError(null);
            } catch (err) {
                console.error('Search error:', err);
                setError(err.message || 'Failed to search flights');
                setFlights([]);
            } finally {
                setLoading(false);
            }
        };

        searchFlights();
    }, [location.state]);

    const handleModifySearch = () => {
        navigate(-1);
    };

    return (
        <div className="flight-result-page">
            <div className="flight-results-container">
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Searching for flights...</p>
                    </div>
                ) : error ? (
                    <NoFlightsFound searchData={location.state} />
                ) : flights.length === 0 ? (
                    <NoFlightsFound searchData={location.state} />
                ) : (
                    <div className="results-content">
                        <ProgressBar />
                        <div className="result-container">
                            <JourneySummary 
                                origin={location.state.origin}
                                destination={location.state.destination}
                                departureTime={location.state.departureTime}
                                onModify={handleModifySearch}
                            />
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
                )}
            </div>
        </div>
    );
};

export default FlightResultPage; 