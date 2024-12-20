import React from 'react';

const JourneySummary = ({ origin, destination, departureTime, onModify }) => (
    <div className="journey-summary">
        <div className="journey-info">
            <div className="airport-code">
                <div>{origin}</div>
                <div className="date">{departureTime}</div>
            </div>
            <div className="flight-direction">
                <span>Departure</span>
                <div className="direction-line"></div>
            </div>
            <div className="airport-code">
                <div>{destination}</div>
                <div className="date">FRI, 20 DEC 24</div>
            </div>
        </div>
        <button onClick={onModify} className="modify-booking">
            Modify Booking
        </button>
    </div>
);

export default JourneySummary; 