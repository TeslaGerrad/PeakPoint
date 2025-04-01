import React, { useState } from 'react';
import './Reports.css';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const receipts = [
    { 
      id: 'RCP001', 
      date: '2024-03-15 14:30',
      amount: 450.00,
      items: 5,
      employee: 'John Doe',
      paymentType: 'Cash',
      status: 'Completed'
    },
    // Add more receipt data...
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Receipts</h2>
        <div className="report-actions">
          <select className="date-range">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
          <button className="export-btn">
            <i className="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      <div className="report-content">
        <div className="table-controls">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search receipts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Employee</th>
                <th>Payment Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map(receipt => (
                <tr key={receipt.id}>
                  <td>{receipt.id}</td>
                  <td>{receipt.date}</td>
                  <td>{formatZMW(receipt.amount)}</td>
                  <td>{receipt.items}</td>
                  <td>{receipt.employee}</td>
                  <td>{receipt.paymentType}</td>
                  <td>
                    <span className={`status-badge ${receipt.status.toLowerCase()}`}>
                      {receipt.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">
                      <i className="fas fa-print"></i>
                    </button>
                    <button className="action-btn">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receipts; 