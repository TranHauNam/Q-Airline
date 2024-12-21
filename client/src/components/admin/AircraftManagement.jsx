import React, { useState } from 'react';
import { planeApi } from '../../services/modules/admin/plane/plane.api';
import './Admin.css';
const AircraftManagement = () => {
  const [plane, setPlane] = useState({
    code: '',
    manufacturer: '',
    economySeats: 0,
    premiumEconomySeats: 0,
    businessSeats: 0,
    firstSeats: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (plane.economySeats % 6 !== 0) {
        alert('Số ghế hạng phổ thông phải chia hết cho 6');
        return;
      }
      if (plane.premiumEconomySeats % 6 !== 0) {
        alert('Số ghế hạng phổ thông cao cấp phải chia hết cho 6');
        return;
      }
      if (plane.businessSeats % 4 !== 0) {
        alert('Số ghế hạng thương gia phải chia hết cho 4');
        return;
      }
      if (plane.firstSeats % 6 !== 0) {
        alert('Số ghế hạng nhất phải chia hết cho 6');
        return;
      }

      const response = await planeApi.addPlane(plane);
      alert(response.data.message);
      setPlane({
        code: '',
        manufacturer: '',
        economySeats: 0,
        premiumEconomySeats: 0,
        businessSeats: 0,
        firstSeats: 0
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2-admin'>Add new aircraft</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Aircraft code</label>
          <input
            type="text"
            value={plane.code}
            onChange={(e) => setPlane({...plane, code: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Manufacturer</label>
          <input
            type="text"
            value={plane.manufacturer}
            onChange={(e) => setPlane({...plane, manufacturer: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of economy class seats (divisible by 6)</label>
          <input
            type="number"
            value={plane.economySeats}
            onChange={(e) => setPlane({...plane, economySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of premium economy seats (divisible by 6)</label>
          <input
            type="number"
            value={plane.premiumEconomySeats}
            onChange={(e) => setPlane({...plane, premiumEconomySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of business class seats (divisible by 4)</label>
          <input
            type="number"
            value={plane.businessSeats}
            onChange={(e) => setPlane({...plane, businessSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of first class seats (divisible by 6)</label>
          <input
            type="number"
            value={plane.firstSeats}
            onChange={(e) => setPlane({...plane, firstSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <button type="submit" className="submit-button">Confirm more planes</button>
      </form>
    </div>
  );
};

export default AircraftManagement; 