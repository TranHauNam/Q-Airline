import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightSearchPage.css';

const FlightSearchPage = () => {
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
            
            navigate('/flight-results', { state: formattedData });
        } catch (error) {
            console.error('Error searching flights:', error);
        }
    };

    return (
        <div className="flight-search-page">
            <div className="search-container">
                <div className="search-header">
                    <h1>Search Flights</h1>
                    <p>Find the best flights for your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="search-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Flight Type</label>
                            <select
                                name="flightType"
                                value={searchData.flightType}
                                onChange={handleInputChange}
                            >
                                <option value="one-way">One Way</option>
                                <option value="round-trip">Round Trip</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Class</label>
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
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>From</label>
                            <input
                                type="text"
                                name="origin"
                                value={searchData.origin}
                                onChange={handleInputChange}
                                required
                                placeholder="City or Airport"
                            />
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <input
                                type="text"
                                name="destination"
                                value={searchData.destination}
                                onChange={handleInputChange}
                                required
                                placeholder="City or Airport"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Departure Date</label>
                            <input
                                type="date"
                                name="departureTime"
                                value={searchData.departureTime}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {searchData.flightType === 'round-trip' && (
                            <div className="form-group">
                                <label>Return Date</label>
                                <input
                                    type="date"
                                    name="returnTime"
                                    value={searchData.returnTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div className="passenger-count">
                        <div className="passenger-type">
                            <label>Adults</label>
                            <input
                                type="number"
                                name="adult"
                                min="1"
                                value={searchData.adult}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="passenger-type">
                            <label>Children</label>
                            <input
                                type="number"
                                name="children"
                                min="0"
                                value={searchData.children}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="passenger-type">
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
        </div>
    );
};

export default FlightSearchPage; 