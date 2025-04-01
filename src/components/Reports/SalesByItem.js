import React, { useState } from 'react';
import './Reports.css';

const SalesByItem = () => {
  const [sortBy, setSortBy] = useState('quantity');

  const items = [
    { id: 1, name: 'Chicken & Chips', quantity: 856, revenue: 42800, avgPrice: 50 },
    { id: 2, name: 'Coca Cola 500ml', quantity: 743, revenue: 11145, avgPrice: 15 },
    { id: 3, name: 'Fish & Chips', quantity: 654, revenue: 32700, avgPrice: 50 },
    { id: 4, name: 'Burger Combo', quantity: 521, revenue: 36470, avgPrice: 70 },
    // Add more items...
  ];

  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales by Item</h2>
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
            <input type="text" placeholder="Search items..." />
          </div>
          <select 
            className="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="quantity">Sort by Quantity</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity Sold</th>
                <th>Total Revenue</th>
                <th>Average Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatZMW(item.revenue)}</td>
                  <td>{formatZMW(item.avgPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesByItem; 