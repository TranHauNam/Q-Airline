import React from 'react';

const FlightSummary = ({ flight, selectedClass }) => (
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

export default FlightSummary; 