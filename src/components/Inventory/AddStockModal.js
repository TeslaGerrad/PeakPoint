import React, { useState } from 'react';
import './Inventory.css';

const AddStockModal = ({ isOpen, onClose, inventory }) => {
  const [stockData, setStockData] = useState({
    itemId: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle stock addition
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal compact">
        <div className="modal-header">
          <h3>Add Stock</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-group">
            <label>Item</label>
            <select
              value={stockData.itemId}
              onChange={(e) => setStockData({...stockData, itemId: e.target.value})}
              required
            >
              <option value="">Select Item</option>
              {inventory.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (Current: {item.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={stockData.quantity}
              onChange={(e) => setStockData({...stockData, quantity: e.target.value})}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={stockData.date}
              onChange={(e) => setStockData({...stockData, date: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={stockData.notes}
              onChange={(e) => setStockData({...stockData, notes: e.target.value})}
              rows="3"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal; 