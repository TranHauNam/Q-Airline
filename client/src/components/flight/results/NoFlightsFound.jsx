import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import JourneySummary from './JourneySummary';
import image from '../../../assets/images/not_found.png'

const NoFlightsFound = ({ searchData }) => {
    const navigate = useNavigate();
    
    console.log('Search Data in NoFlightsFound:', searchData);
    
    if (!searchData) {
        return null;
    }

    return (
        <div className="results-content">
            <ProgressBar />
            <div className="result-container">
                <JourneySummary 
                    origin={searchData.origin || ''}
                    destination={searchData.destination || ''}
                    departureTime={searchData.departureTime || ''}
                    onModify={() => navigate(-1)}
                />
                <div className="no-results-content">
                    <img 
                        src={image} 
                        alt="No flights found" 
                        className="no-flights-image"
                    />
                    <h2>No Flights Found</h2>
                    <p>We couldn't find any flights matching your search criteria.</p>
                    <div className="no-flights-suggestions">
                        <h3>Suggestions:</h3>
                        <ul>
                            <li>Try different dates</li>
                            <li>Check for alternative airports nearby</li>
                            <li>Consider flexible dates</li>
                        </ul>
                    </div>
                    <button 
                        className="modify-search-button"
                        onClick={() => navigate(-1)}
                    >
                        Modify Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoFlightsFound; 