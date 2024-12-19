import React, { useState } from 'react';
import FlightSearch from '../components/flight/FlightSearch';
import './FlightSearchPage.css';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const FlightSearchPage = () => {
  const [activeTab, setActiveTab] = useState('oneWay'); // oneWay or roundTrip

  return (
    <div className="flight-search-page">
      <Header />
      
      <div className="search-container">
        <div className="search-header">
          <h1>Tìm Kiếm Chuyến Bay</h1>
          <div className="flight-type-tabs">
            <button 
              className={`tab-btn ${activeTab === 'oneWay' ? 'active' : ''}`}
              onClick={() => setActiveTab('oneWay')}
            >
              Một chiều
            </button>
            <button 
              className={`tab-btn ${activeTab === 'roundTrip' ? 'active' : ''}`}
              onClick={() => setActiveTab('roundTrip')}
            >
              Khứ hồi
            </button>
          </div>
        </div>

        <div className="search-content">
          <FlightSearch isRoundTrip={activeTab === 'roundTrip'} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlightSearchPage; 