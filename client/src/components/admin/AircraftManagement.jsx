import React, { useState } from 'react';
import { planeApi } from '../../services/modules/admin/plane/plane.api';
import Dialog from '../common/Dialog';
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

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (plane.economySeats % 6 !== 0) {
        setDialog({
          isOpen: true,
          title: 'error',
          message: 'The number of economy class seats must be divisible by 6.',
          type: 'error'
        });
        return;
      }
      if (plane.premiumEconomySeats % 6 !== 0) {
        setDialog({
          isOpen: true,
          title: 'error',
          message: 'The number of premium economy seats must be divisible by 6.',
          type: 'error'
        });
        return;
      }
      if (plane.businessSeats % 4 !== 0) {
        setDialog({
          isOpen: true,
          title: 'error',
          message: 'The number of business class seats must be divisible by 4.',
          type: 'error'
        });
        return;
      }
      if (plane.firstSeats % 6 !== 0) {
        setDialog({
          isOpen: true,
          title: 'error',
          message: 'The number of first class seats must be divisible by 4.',
          type: 'error'
        });
        return;
      }

      const response = await planeApi.addPlane(plane);
      setDialog({
        isOpen: true,
        title: 'Success',
        message: 'New aircraft added successfully',
        type: 'success'
      });
      setPlane({
        code: '',
        manufacturer: '',
        economySeats: 0,
        premiumEconomySeats: 0,
        businessSeats: 0,
        firstSeats: 0
      });
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'error',
        message: error.response?.data?.message || 'Có error xảy ra khi thêm máy bay',
        type: 'error'
      });
    }
  };

  return (
    <div className="form-container">
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
          <label>Number of economy class seats </label>
          <input
            type="number"
            value={plane.economySeats}
            onChange={(e) => setPlane({...plane, economySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of premium economy seats </label>
          <input
            type="number"
            value={plane.premiumEconomySeats}
            onChange={(e) => setPlane({...plane, premiumEconomySeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of business class seats </label>
          <input
            type="number"
            value={plane.businessSeats}
            onChange={(e) => setPlane({...plane, businessSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of first class seats </label>
          <input
            type="number"
            value={plane.firstSeats}
            onChange={(e) => setPlane({...plane, firstSeats: parseInt(e.target.value)})}
            required
          />
        </div>
        <button type="submit" className="submit-button">Confirm more planes</button>
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

export default AircraftManagement; 