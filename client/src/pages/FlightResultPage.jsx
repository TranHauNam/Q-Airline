import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightResultPage.css';

const FlightResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams, results } = location.state || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectFlight = (departureFlight, returnFlight = null) => {
    navigate('/booking', {
      state: {
        searchParams,
        selectedFlights: {
          departure: departureFlight,
          return: returnFlight
        }
      }
    });
  };

  const renderFlightCard = (flight, type) => {
    return (
      <div className="flight-card" key={flight.flightNumber}>
        <div className="flight-header">
          <span className="flight-number">Chuyến bay: {flight.flightNumber}</span>
          <span className="plane-code">Máy bay: {flight.planeCode}</span>
        </div>
        
        <div className="flight-main">
          <div className="flight-route">
            <div className="origin">
              <h3>{flight.origin}</h3>
              <p>{formatDateTime(flight.departureTime)}</p>
            </div>
            
            <div className="flight-duration">
              <span className="duration">{flight.duration}</span>
              <div className="flight-line">
                <span className="plane-icon">✈</span>
              </div>
            </div>
            
            <div className="destination">
              <h3>{flight.destination}</h3>
              <p>{formatDateTime(new Date(new Date(flight.departureTime).getTime() + parseDuration(flight.duration)))}</p>
            </div>
          </div>

          <div className="flight-details">
            <div className="seat-info">
              <p>Hạng: {searchParams.classType}</p>
              <p>Ghế trống: {getAvailableSeats(flight, searchParams.classType)}</p>
            </div>
            
            <div className="price-info">
              <p className="total-price">{formatPrice(flight.totalPrice)}</p>
              <button 
                onClick={() => handleSelectFlight(
                  type === 'departure' ? flight : results.departureFlights[0], 
                  type === 'return' ? flight : null
                )}
                className="select-btn"
              >
                Chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getAvailableSeats = (flight, classType) => {
    switch (classType) {
      case 'Economy':
        return flight.availableSeatsEconomy;
      case 'Premium Economy':
        return flight.availableSeatsPremiumEconomy;
      case 'Business':
        return flight.availableSeatsBusiness;
      case 'First':
        return flight.availableSeatsFirst;
      default:
        return 0;
    }
  };

  const parseDuration = (durationStr) => {
    const [hours, minutes] = durationStr.replace(/[^0-9]/g, ' ').trim().split(' ');
    return (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000;
  };

  if (!results || !searchParams) {
    return <div className="no-results">Không có dữ liệu chuyến bay</div>;
  }

  return (
    <div className="flight-results">
      <div className="search-summary">
        <h2>Kết quả tìm kiếm</h2>
        <div className="search-details">
          <p>{searchParams.origin} → {searchParams.destination}</p>
          <p>
            {searchParams.adult} người lớn
            {searchParams.children > 0 && `, ${searchParams.children} trẻ em`}
            {searchParams.infant > 0 && `, ${searchParams.infant} em bé`}
          </p>
          <p>Hạng ghế: {searchParams.classType}</p>
        </div>
      </div>

      <div className="flights-container">
        <div className="departure-flights">
          <h3>Chuyến đi</h3>
          {results.departureFlights.map(flight => renderFlightCard(flight, 'departure'))}
        </div>

        {searchParams.flightType === 'round-trip' && results.returnFlights.length > 0 && (
          <div className="return-flights">
            <h3>Chuyến về</h3>
            {results.returnFlights.map(flight => renderFlightCard(flight, 'return'))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResultPage; 