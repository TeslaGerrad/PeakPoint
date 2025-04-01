import React, { useState } from 'react';
import './Customers.css';

const AddCustomerModal = ({ isOpen, onClose }) => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle customer addition
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal compact">
        <div className="modal-header">
          <h3>Add Customer</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={customerData.name}
              onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={customerData.address}
              onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={customerData.notes}
              onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
              rows="2"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal; 