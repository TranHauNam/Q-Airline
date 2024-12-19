import React, { useState, useEffect } from 'react';
import { flightApi } from '../../services/modules/admin/flight/flight.api';
import { planeApi } from '../../services/modules/admin/plane/plane.api';

const FlightManagement = () => {
  const [flight, setFlight] = useState({
    flightNumber: '',
    planeCode: '',
    origin: '',
    destination: '',
    departureTime: '',
    duration: '',
    priceEconomy: 0,
    pricePremiumEconomy: 0,
    priceBusiness: 0,
    priceFirst: 0
  });

  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await planeApi.getAllPlanes();
        setPlanes(response.data.planes);
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };
    fetchPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await flightApi.addFlight(flight);
      alert(response.data.message);
      setFlight({
        flightNumber: '',
        planeCode: '',
        origin: '',
        destination: '',
        departureTime: '',
        duration: '',
        priceEconomy: 0,
        pricePremiumEconomy: 0,
        priceBusiness: 0,
        priceFirst: 0
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm chuyến bay mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Số hiệu chuyến bay</label>
          <input
            type="text"
            value={flight.flightNumber}
            onChange={(e) => setFlight({...flight, flightNumber: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Máy bay</label>
          <select
            value={flight.planeCode}
            onChange={(e) => setFlight({...flight, planeCode: e.target.value})}
            required
          >
            <option value="">Chọn máy bay</option>
            {planes.map(plane => (
              <option key={plane.code} value={plane.code}>
                {plane.code} - {plane.manufacturer}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Điểm khởi hành</label>
          <input
            type="text"
            value={flight.origin}
            onChange={(e) => setFlight({...flight, origin: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Điểm đến</label>
          <input
            type="text"
            value={flight.destination}
            onChange={(e) => setFlight({...flight, destination: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Thời gian khởi hành</label>
          <input
            type="datetime-local"
            value={flight.departureTime}
            onChange={(e) => setFlight({...flight, departureTime: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Thời gian bay (phút)</label>
          <input
            type="number"
            value={flight.duration}
            onChange={(e) => setFlight({...flight, duration: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá vé hạng phổ thông</label>
          <input
            type="number"
            value={flight.priceEconomy}
            onChange={(e) => setFlight({...flight, priceEconomy: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá vé hạng phổ thông cao cấp</label>
          <input
            type="number"
            value={flight.pricePremiumEconomy}
            onChange={(e) => setFlight({...flight, pricePremiumEconomy: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá vé hạng thương gia</label>
          <input
            type="number"
            value={flight.priceBusiness}
            onChange={(e) => setFlight({...flight, priceBusiness: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá vé hạng nhất</label>
          <input
            type="number"
            value={flight.priceFirst}
            onChange={(e) => setFlight({...flight, priceFirst: parseInt(e.target.value)})}
            required
          />
        </div>
        <button type="submit" className="submit-button">Thêm chuyến bay</button>
      </form>
    </div>
  );
};

export default FlightManagement; 