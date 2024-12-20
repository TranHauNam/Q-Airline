import React, { useState, useEffect } from 'react';
import { flightApi } from '../../services/modules/admin/flight/flight.api';
import { postApi } from '../../services/modules/admin/post/post.api';

const DelayManagement = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [newDepartureTime, setNewDepartureTime] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await flightApi.getAllFlights();
        setFlights(response.data.flights);
      } catch (error) {
        setError('Không thể tải danh sách chuyến bay');
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
    const oldTimeStr = new Date(oldTime).toLocaleString('vi-VN');
    const newTimeStr = new Date(newTime).toLocaleString('vi-VN');
    
    const content = `Thông báo thay đổi giờ bay:\n\nChuyến bay ${flight.flightNumber} (${flight.origin} - ${flight.destination})\nThời gian cũ: ${oldTimeStr}\nThời gian mới: ${newTimeStr}\n\nQuý khách vui lòng theo dõi thông tin và sắp xếp thời gian phù hợp. Xin lỗi quý khách vì sự bất tiện này.`;

    try {
      await postApi.createPost({
        title: `Thông báo thay đổi giờ bay - Chuyến bay ${flight.flightNumber}`,
        content: content,
        postType: 'Thông báo',
        image: 'https://example.com/delay-notification.jpg' // Thay bằng ảnh thích hợp
      });
    } catch (error) {
      console.error('Lỗi khi tạo thông báo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const oldDepartureTime = selectedFlight.departureTime;
      const response = await flightApi.changeDepartureTime(flightNumber, { newDepartureTime });
      
      // Tạo thông báo về việc delay
      await createDelayNotification(selectedFlight, oldDepartureTime, newDepartureTime);
      
      alert('Cập nhật thời gian bay và tạo thông báo thành công');
      setFlightNumber('');
      setNewDepartureTime('');
      setSelectedFlight(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cập nhật thời gian khởi hành</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chọn chuyến bay</label>
          <select
            value={flightNumber}
            onChange={handleFlightSelect}
            required
          >
            <option value="">-- Chọn chuyến bay --</option>
            {flights.map((flight) => (
              <option key={flight._id} value={flight.flightNumber}>
                {flight.flightNumber} - {flight.origin} đến {flight.destination} 
                ({new Date(flight.departureTime).toLocaleString('vi-VN')})
              </option>
            ))}
          </select>
        </div>

        {selectedFlight && (
          <div className="form-group">
            <label>Thời gian khởi hành mới</label>
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
          {loading ? 'Đang cập nhật...' : 'Cập nhật'}
        </button>
      </form>
    </div>
  );
};

export default DelayManagement; 