import React, { useState, useEffect } from 'react';
import { flightApi } from '../../services/modules/admin/flight/flight.api';
import { postApi } from '../../services/modules/admin/post/post.api';
import './Admin.css';
import Dialog from '../common/Dialog';

const DelayManagement = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [newDepartureTime, setNewDepartureTime] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await flightApi.getAllFlights();
        setFlights(response.data.flights);
      } catch (error) {
        setError('Unable to load flight list');
      }
    };
    fetchFlights();
  }, []);

  const handleFlightSelect = (e) => {
    const flight = flights.find(f => f.flightNumber === e.target.value);
    setFlightNumber(e.target.value);
    setSelectedFlight(flight);
    if (flight) {
      setNewDepartureTime(new Date(flight.departureTime).toISOString().slice(0, 16));
    }
  };

  const createDelayNotification = async (flight, oldTime, newTime) => {
    const oldTimeStr = new Date(oldTime).toLocaleString('en-US');
    const newTimeStr = new Date(newTime).toLocaleString('en-US');
    
    const content = `Delay notification:\n\nFlight ${flight.flightNumber} (${flight.origin} - ${flight.destination})\nOld time: ${oldTimeStr}\nNew time: ${newTimeStr}\n\nPlease keep track of the information and arrange your time accordingly. We apologize for the inconvenience.`;

    try {
      await postApi.createPost({
        title: `Delay notification - Flight ${flight.flightNumber}`,
        content: content,
        postType: 'Notification',
        image: 'https://example.com/delay-notification.jpg' // Replace with appropriate image
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const oldDepartureTime = selectedFlight.departureTime;
      const response = await flightApi.changeDepartureTime(flightNumber, { newDepartureTime });
      
      await createDelayNotification(selectedFlight, oldDepartureTime, newDepartureTime);
      
      setDialog({
        isOpen: true,
        title: 'Thành công',
        message: 'Cập nhật thời gian bay và tạo thông báo thành công',
        type: 'success'
      });
      setFlightNumber('');
      setNewDepartureTime('');
      setSelectedFlight(null);
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'Lỗi',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thời gian bay',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* <h2 className='h2-admin'>Update Departure Time</h2> */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Flight</label>
          <select
            value={flightNumber}
            onChange={handleFlightSelect}
            required
          >
            <option value="">-- Select Flight --</option>
            {flights.map((flight) => (
              <option key={flight._id} value={flight.flightNumber}>
                {flight.flightNumber} - {flight.origin} to {flight.destination} 
                ({new Date(flight.departureTime).toLocaleString('en-US')})
              </option>
            ))}
          </select>
        </div>

        {selectedFlight && (
          <div className="form-group">
            <label>New Departure Time</label>
            <input
              type="datetime-local"
              value={newDepartureTime}
              onChange={(e) => setNewDepartureTime(e.target.value)}
              required
            />
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !selectedFlight}
        >
          {loading ? 'Updating...' : 'Update'}
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

export default DelayManagement; 