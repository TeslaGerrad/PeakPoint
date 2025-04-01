import React, { useState } from 'react';
import './Items.css';

const AddDiscountModal = ({ isOpen, onClose }) => {
  const [discountData, setDiscountData] = useState({
    name: '',
    type: 'percentage',
    value: '',
    startDate: '',
    endDate: '',
    minOrderValue: '',
    maxDiscount: '',
    usageLimit: '',
    description: '',
    applicableItems: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle discount creation
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal compact">
        <div className="modal-header">
          <h3>Add New Discount</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={discountData.name}
                onChange={(e) => setDiscountData({...discountData, name: e.target.value})}
                placeholder="e.g., Happy Hour Special"
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={discountData.type}
                onChange={(e) => setDiscountData({...discountData, type: e.target.value})}
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (K)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Value</label>
              <input
                type="number"
                value={discountData.value}
                onChange={(e) => setDiscountData({...discountData, value: e.target.value})}
                min="0"
                step={discountData.type === 'percentage' ? '1' : '0.01'}
                placeholder={discountData.type === 'percentage' ? '0%' : 'K0.00'}
                required
              />
            </div>
            <div className="form-group">
              <label>Usage Limit</label>
              <input
                type="number"
                value={discountData.usageLimit}
                onChange={(e) => setDiscountData({...discountData, usageLimit: e.target.value})}
                min="0"
                placeholder="Leave empty for unlimited"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valid From</label>
              <input
                type="date"
                value={discountData.startDate}
                onChange={(e) => setDiscountData({...discountData, startDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Valid Until</label>
              <input
                type="date"
                value={discountData.endDate}
                onChange={(e) => setDiscountData({...discountData, endDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Min. Order Value (K)</label>
              <input
                type="number"
                value={discountData.minOrderValue}
                onChange={(e) => setDiscountData({...discountData, minOrderValue: e.target.value})}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Max Discount Amount (K)</label>
              <input
                type="number"
                value={discountData.maxDiscount}
                onChange={(e) => setDiscountData({...discountData, maxDiscount: e.target.value})}
                min="0"
                step="0.01"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={discountData.description}
              onChange={(e) => setDiscountData({...discountData, description: e.target.value})}
              placeholder="Brief description of the discount"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Applicable Items</label>
            <div className="checkbox-grid compact">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={discountData.applicableItems.includes('all')}
                  onChange={(e) => {
                    setDiscountData({
                      ...discountData,
                      applicableItems: e.target.checked ? ['all'] : []
                    });
                  }}
                />
                <span>All Items</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={discountData.applicableItems.includes('food')}
                  onChange={(e) => {
                    const newItems = e.target.checked
                      ? [...discountData.applicableItems, 'food']
                      : discountData.applicableItems.filter(item => item !== 'food');
                    setDiscountData({...discountData, applicableItems: newItems});
                  }}
                  disabled={discountData.applicableItems.includes('all')}
                />
                <span>Food</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={discountData.applicableItems.includes('beverages')}
                  onChange={(e) => {
                    const newItems = e.target.checked
                      ? [...discountData.applicableItems, 'beverages']
                      : discountData.applicableItems.filter(item => item !== 'beverages');
                    setDiscountData({...discountData, applicableItems: newItems});
                  }}
                  disabled={discountData.applicableItems.includes('all')}
                />
                <span>Beverages</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Create Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiscountModal; 