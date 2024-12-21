import React from 'react';
import './Dialog.css';

const Dialog = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        <div className={`dialog-header ${type}`}>
          <h3>{title}</h3>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="dialog-body">
          <p>{message}</p>
        </div>
        <div className="dialog-footer">
          <button className="dialog-button" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog; 