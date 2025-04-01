import React, { useState } from 'react';
import './Taxes.css';

const Taxes = () => {
  const [taxRates, setTaxRates] = useState([
    {
      id: 1,
      name: 'Standard VAT',
      rate: 16,
      default: true,
      active: true,
      description: 'Standard VAT rate for most goods and services'
    },
    {
      id: 2,
      name: 'Zero Rate',
      rate: 0,
      default: false,
      active: true,
      description: 'For exempt goods and services'
    },
    {
      id: 3,
      name: 'Tourism Levy',
      rate: 2,
      default: false,
      active: true,
      description: 'Additional tax for tourism related services'
    }
  ]);

  const [showAddTax, setShowAddTax] = useState(false);
  const [newTax, setNewTax] = useState({
    name: '',
    rate: '',
    description: '',
    active: true,
    default: false
  });

  const handleToggleTax = (taxId) => {
    setTaxRates(rates =>
      rates.map(tax =>
        tax.id === taxId
          ? { ...tax, active: !tax.active }
          : tax
      )
    );
  };

  const handleSetDefault = (taxId) => {
    setTaxRates(rates =>
      rates.map(tax => ({
        ...tax,
        default: tax.id === taxId
      }))
    );
  };

  const handleAddTax = (e) => {
    e.preventDefault();
    const tax = {
      id: taxRates.length + 1,
      ...newTax,
      rate: parseFloat(newTax.rate)
    };
    setTaxRates([...taxRates, tax]);
    setShowAddTax(false);
    setNewTax({ name: '', rate: '', description: '', active: true, default: false });
  };

  return (
    <div className="taxes-container">
      <div className="page-header">
        <h2>Tax Settings</h2>
        <p>Manage tax rates and categories</p>
      </div>

      <div className="tax-content">
        <div className="tax-header">
          <div className="tax-summary">
            <div className="summary-item">
              <span className="summary-label">Default Rate</span>
              <span className="summary-value">
                {taxRates.find(tax => tax.default)?.rate || 0}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Active Rates</span>
              <span className="summary-value">
                {taxRates.filter(tax => tax.active).length}
              </span>
            </div>
          </div>
          <button 
            className="add-tax-btn"
            onClick={() => setShowAddTax(true)}
          >
            <i className="fas fa-plus"></i>
            Add Tax Rate
          </button>
        </div>

        <div className="tax-rates-list">
          {taxRates.map(tax => (
            <div key={tax.id} className="tax-rate-card">
              <div className="tax-rate-header">
                <div className="tax-rate-title">
                  <h3>{tax.name}</h3>
                  {tax.default && (
                    <span className="default-badge">
                      <i className="fas fa-star"></i>
                      Default
                    </span>
                  )}
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={tax.active}
                    onChange={() => handleToggleTax(tax.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="tax-rate-details">
                <div className="rate-value">{tax.rate}%</div>
                <p className="rate-description">{tax.description}</p>
              </div>

              <div className="tax-rate-actions">
                {!tax.default && (
                  <button 
                    className="set-default-btn"
                    onClick={() => handleSetDefault(tax.id)}
                  >
                    Set as Default
                  </button>
                )}
                <button className="edit-btn">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="delete-btn">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddTax && (
        <div className="modal-overlay" onClick={() => setShowAddTax(false)}>
          <div className="tax-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Tax Rate</h3>
              <button className="close-btn" onClick={() => setShowAddTax(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddTax} className="tax-form">
              <div className="form-group">
                <label>Tax Name</label>
                <input
                  type="text"
                  value={newTax.name}
                  onChange={(e) => setNewTax({...newTax, name: e.target.value})}
                  required
                  placeholder="e.g., Sales Tax"
                />
              </div>
              <div className="form-group">
                <label>Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTax.rate}
                  onChange={(e) => setNewTax({...newTax, rate: e.target.value})}
                  required
                  placeholder="e.g., 16"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTax.description}
                  onChange={(e) => setNewTax({...newTax, description: e.target.value})}
                  placeholder="Describe when this tax rate applies"
                />
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={newTax.default}
                    onChange={(e) => setNewTax({...newTax, default: e.target.checked})}
                  />
                  Set as default tax rate
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowAddTax(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Tax Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxes; 