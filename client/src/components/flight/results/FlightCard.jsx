import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime, formatPrice } from '../../../utils/formatters';

const FlightCard = ({ flight }) => {
    const navigate = useNavigate();

    const handleSelectFlight = (classType) => {
        console.log('Original Flight Data:', flight);
        console.log('Selected Class:', classType);

        const priceKeys = {
            'ECONOMY': 'priceEconomy',
            'PREMIUM ECONOMY': 'pricePremiumEconomy', 
            'BUSINESS': 'priceBusiness',
            'FIRST': 'priceFirst'
        };

        const selectedPrice = flight[priceKeys[classType]];
        console.log('Selected Price:', selectedPrice);

        const mappedFlight = {
            ...flight,
            priceECONOMY: flight.priceEconomy,
            pricePREMIUMECONOMY: flight.pricePremiumEconomy,
            priceBUSINESS: flight.priceBusiness,
            priceFIRST: flight.priceFirst
        };

        console.log('Mapped Flight:', mappedFlight);

        navigate('/booking', { 
            state: { 
                flight: mappedFlight,
                selectedClass: classType,
                basePrice: selectedPrice
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

                        <div className='date'>{new Date(flight.departureTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>

                        <div className="airport">{flight.origin}</div>
                    </div>
                    <div className="duration">
                        <div className="duration-time">{flight.duration}</div>
                        <div className="duration-line"></div>
                    </div>
                    <div className="time-info">
                        <div className="time">
                            {formatTime(flight.arrivalTime)}
                        </div>
                        <div className='date'>{new Date(flight.arrivalTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        <div className="airport">{flight.destination}</div>
                    </div>
                </div>
            </div>
            <div className="flight-options">
                {[
                    { type: 'ECONOMY', class: 'economy', seats: flight.availableSeatsEconomy, price: flight.priceEconomy },
                    { type: 'PREMIUM ECONOMY', class: 'premium-economy', seats: flight.availableSeatsPremiumEconomy, price: flight.pricePremiumEconomy },
                    { type: 'BUSINESS', class: 'business', seats: flight.availableSeatsBusiness, price: flight.priceBusiness },
                    { type: 'FIRST', class: 'first', seats: flight.availableSeatsFirst, price: flight.priceFirst }
                ].map((option) => (
                    <div key={option.type} className={`option ${option.class}`}>
                        <div className="class-header">
                            <span>{option.type}</span>
                            <span className="seats-left">
                                {option.seats} seats left at this fare
                            </span>
                        </div>
                        <div className="price">{formatPrice(option.price)}</div>
                        <button 
                            className="select-button" 
                            onClick={() => handleSelectFlight(option.type)}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
            <div className="flight-details">
                <button className="view-details">View Flight Details</button>
                {/* <div className="flight-info">
                    <span>Aircraft: {flight.planeCode}</span>
                </div> */}
            </div>
        </div>
    );
};

export default FlightCard; 