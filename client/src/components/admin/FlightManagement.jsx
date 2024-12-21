import React, { useState, useEffect } from 'react';
import { flightApi } from '../../services/modules/admin/flight/flight.api';
import { planeApi } from '../../services/modules/admin/plane/plane.api';
import './Admin.css';
import Dialog from '../common/Dialog';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Fetch danh sách máy bay khi component mount
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await planeApi.getAllPlanes();
        setPlanes(response.data.planes);
      } catch (error) {
        console.error('Error fetching planes:', error);
        setError('Không thể tải danh sách máy bay');
      }
    };
    fetchPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await flightApi.addFlight(flight);
      setDialog({
        isOpen: true,
        title: 'Thành công',
        message: 'Thêm chuyến bay mới thành công',
        type: 'success'
      });
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
      setDialog({
        isOpen: true,
        title: 'Lỗi',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi thêm chuyến bay',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
   {/* <h2 className='h2-admin'>Add new flight</h2> */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Flight number</label>
          <input
            type="text"
            value={flight.flightNumber}
            onChange={(e) => setFlight({...flight, flightNumber: e.target.value})}
            required
            placeholder="Example: VN123"
          />
        </div>

        <div className="form-group">
          <label>Plane</label>
          <select
            value={flight.planeCode}
            onChange={(e) => setFlight({...flight, planeCode: e.target.value})}
            required
          >
            <option value="">Select plane</option>
            {planes.map((plane) => (
              <option key={plane._id} value={plane.code}>
                {plane.code} - {plane.manufacturer} 
                ({plane.economySeats + plane.premiumEconomySeats + plane.businessSeats + plane.firstSeats} ghế)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Departure point</label>
          <input
            type="text"
            value={flight.origin}
            onChange={(e) => setFlight({...flight, origin: e.target.value})}
            required
            placeholder="Example: Hanoi (HAN)"
          />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            value={flight.destination}
            onChange={(e) => setFlight({...flight, destination: e.target.value})}
            required
            placeholder="Example: Ho Chi Minh City (SGN)"
          />
        </div>
        <div className="form-group">
          <label>Departure time</label>
          <input
            type="datetime-local"
            value={flight.departureTime}
            onChange={(e) => setFlight({...flight, departureTime: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="string"
            value={flight.duration}
            onChange={(e) => setFlight({...flight, duration: parseInt(e.target.value)})}
            required
            placeholder="For example: 1H20"
          />
        </div>
        <div className="form-group">
          <label>Economy class fare</label>
          <input
            type="number"
            value={flight.priceEconomy}
            onChange={(e) => setFlight({...flight, priceEconomy: parseInt(e.target.value)})}
            required
            placeholder="Enter price (VND)"
          />
        </div>
        <div className="form-group">
          <label>Premium Economy class fare</label>
          <input
            type="number"
            value={flight.pricePremiumEconomy}
            onChange={(e) => setFlight({...flight, pricePremiumEconomy: parseInt(e.target.value)})}
            required
            placeholder="Enter price (VND)"
          />
        </div>
        <div className="form-group">
          <label>Business class fares</label>
          <input
            type="number"
            value={flight.priceBusiness}
            onChange={(e) => setFlight({...flight, priceBusiness: parseInt(e.target.value)})}
            required
            placeholder="Enter price (VND)"
          />
        </div>
        <div className="form-group">
          <label>First class fare</label>
          <input
            type="number"
            value={flight.priceFirst}
            onChange={(e) => setFlight({...flight, priceFirst: parseInt(e.target.value)})}
            required
            placeholder="Enter price (VND)"
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add flight'}
        </button>
      </form>
      <Dialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </div>
  );
};

export default FlightManagement;