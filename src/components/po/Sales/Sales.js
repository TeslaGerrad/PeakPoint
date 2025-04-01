import React, { useState } from 'react';
import './Sales.css';

const Sales = () => {
  const [sales] = useState([
    {
      id: 'S001',
      date: '2024-03-20T15:30:00',
      cashier: 'John Doe',
      location: 'Main Street Branch',
      items: 5,
      total: 110.78,
      status: 'Completed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'S002',
      date: '2024-03-20T14:25:00',
      cashier: 'Jane Smith',
      location: 'Downtown Branch',
      items: 3,
      total: 85.50,
      status: 'Completed',
      paymentMethod: 'Cash'
    },
    // Add more sales...
  ]);

  const formatDate = (date) => new Date(date).toLocaleString();
  const formatZMW = (amount) => `ZMW ${amount.toFixed(2)}`;

  return (
    <div className="sales-container">
      <div className="sales-header">
        <div className="header-left">
          <h1>POS Sales</h1>
          <p className="subtitle">View all sales transactions</p>
        </div>
      </div>

      <div className="sales-filters">
        <div className="filter-group">
          <input 
            type="date" 
            className="filter-input"
            placeholder="Start Date"
          />
          <input 
            type="date" 
            className="filter-input"
            placeholder="End Date"
          />
        </div>
        <div className="filter-group">
          <select className="filter-input">
            <option value="">All Locations</option>
            <option value="main">Main Street Branch</option>
            <option value="downtown">Downtown Branch</option>
          </select>
          <select className="filter-input">
            <option value="">All Cashiers</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </select>
        </div>
        <button className="filter-button">
          <i className="fas fa-filter"></i>
          Apply Filters
        </button>
      </div>

      <div className="sales-table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Sale #</th>
              <th>Date</th>
              <th>Cashier</th>
              <th>Location</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{formatDate(sale.date)}</td>
                <td>{sale.cashier}</td>
                <td>{sale.location}</td>
                <td>{sale.items}</td>
                <td>{formatZMW(sale.total)}</td>
                <td>{sale.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${sale.status.toLowerCase()}`}>
                    {sale.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-view">
                      <i className="fas fa-eye"></i>
                      View
                    </button>
                    <button className="btn-print">
                      <i className="fas fa-print"></i>
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales; 