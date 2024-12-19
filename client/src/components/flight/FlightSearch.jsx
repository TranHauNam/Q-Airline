import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightSearch.css';

const FlightSearch = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        origin: '',
        destination: '',
        departureTime: '',
        returnTime: '',
        flightType: 'one-way',
        classType: 'Economy',
        adult: 1,
        children: 0,
        infant: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...searchData,
                departureTime: new Date(searchData.departureTime).toISOString(),
                returnTime: searchData.returnTime 
                    ? new Date(searchData.returnTime).toISOString() 
                    : undefined,
                adult: parseInt(searchData.adult),
                children: parseInt(searchData.children),
                infant: parseInt(searchData.infant)
            };
            
            console.log('Formatted Search Data:', formattedData);
            navigate('/flight-results', { state: formattedData });
        } catch (error) {
            console.error('Error searching flights:', error);
        }
    };

    return (
        <div className="flight-search-container">
            <form onSubmit={handleSubmit} className="flight-search-form">
                <div className="flight-type-toggle">
                    <label>
                        <input
                            type="radio"
                            name="flightType"
                            value="one-way"
                            checked={searchData.flightType === 'one-way'}
                            onChange={handleInputChange}
                        />
                        One Way
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="flightType"
                            value="round-trip"
                            checked={searchData.flightType === 'round-trip'}
                            onChange={handleInputChange}
                        />
                        Round Trip
                    </label>
                </div>

                <div className="search-row">
                    <input
                        type="text"
                        name="origin"
                        placeholder="From"
                        value={searchData.origin}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="destination"
                        placeholder="To"
                        value={searchData.destination}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="search-row">
                    <input
                        type="date"
                        name="departureTime"
                        value={searchData.departureTime}
                        onChange={handleInputChange}
                        required
                    />
                    {searchData.flightType === 'round-trip' && (
                        <input
                            type="date"
                            name="returnTime"
                            value={searchData.returnTime}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                </div>

                <div className="search-row">
                    <select
                        name="classType"
                        value={searchData.classType}
                        onChange={handleInputChange}
                    >
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                    </select>
                </div>

                <div className="passengers-row">
                    <div>
                        <label>Adults</label>
                        <input
                            type="number"
                            name="adult"
                            min="1"
                            value={searchData.adult}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Children</label>
                        <input
                            type="number"
                            name="children"
                            min="0"
                            value={searchData.children}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Infants</label>
                        <input
                            type="number"
                            name="infant"
                            min="0"
                            value={searchData.infant}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="search-button">
                    Search Flights
                </button>
            </form>
        </div>
    );
};

export default FlightSearch; 