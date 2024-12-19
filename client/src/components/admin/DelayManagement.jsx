import React, { useState } from 'react';
import { flightApi } from '../../services/modules/admin/flight/flight.api';

const DelayManagement = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [newDepartureTime, setNewDepartureTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await flightApi.changeDepartureTime(flightNumber, { newDepartureTime });
      alert(response.data.message);
      setFlightNumber('');
      setNewDepartureTime('');
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h2>Cập nhật thời gian khởi hành</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Số hiệu chuyến bay</label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Thời gian khởi hành mới</label>
          <input
            type="datetime-local"
            value={newDepartureTime}
            onChange={(e) => setNewDepartureTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Cập nhật</button>
      </form>
    </div>
  );
};

export default DelayManagement; 