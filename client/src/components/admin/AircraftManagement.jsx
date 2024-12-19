import React, { useState } from 'react';
import { planeApi } from '../../services/modules/admin/plane/plane.api';

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
      <h2>Thêm máy bay mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã máy bay</label>
          <input
            type="text"
            value={plane.code}
            onChange={(e) => setPlane({...plane, code: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Hãng sản xuất</label>
          <input
            type="text"
            value={plane.manufacturer}
            onChange={(e) => setPlane({...plane, manufacturer: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Số ghế hạng phổ thông</label>
          <input
            type="number"
            value={plane.economySeats}
            onChange={(e) => setPlane({...plane, economySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Số ghế hạng phổ thông cao cấp</label>
          <input
            type="number"
            value={plane.premiumEconomySeats}
            onChange={(e) => setPlane({...plane, premiumEconomySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Số ghế hạng thương gia</label>
          <input
            type="number"
            value={plane.businessSeats}
            onChange={(e) => setPlane({...plane, businessSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Số ghế hạng nhất</label>
          <input
            type="number"
            value={plane.firstSeats}
            onChange={(e) => setPlane({...plane, firstSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <button type="submit" className="submit-button">Thêm máy bay</button>
      </form>
    </div>
  );
};

export default AircraftManagement; 