import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Reports.css';

const SalesByModifier = () => {
  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const modifierData = {
    labels: ['Extra Cheese', 'Large Size', 'Extra Spicy', 'No Ice', 'Extra Sauce'],
    datasets: [{
      label: 'Revenue',
      data: [12500, 18000, 8500, 5000, 7500],
      backgroundColor: '#1e3c72',
    }]
  };

  const modifiers = [
    { name: 'Extra Cheese', count: 250, revenue: 12500, avgPrice: 50 },
    { name: 'Large Size', count: 360, revenue: 18000, avgPrice: 50 },
    { name: 'Extra Spicy', count: 170, revenue: 8500, avgPrice: 50 },
    { name: 'No Ice', count: 100, revenue: 5000, avgPrice: 50 },
    { name: 'Extra Sauce', count: 150, revenue: 7500, avgPrice: 50 },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales by Modifier</h2>
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
        <div className="chart-section">
          <h3>Modifier Revenue Distribution</h3>
          <Bar 
            data={modifierData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => formatZMW(value)
                  }
                }
              }
            }}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Modifier</th>
                <th>Usage Count</th>
                <th>Revenue</th>
                <th>Average Price</th>
              </tr>
            </thead>
            <tbody>
              {modifiers.map(mod => (
                <tr key={mod.name}>
                  <td>{mod.name}</td>
                  <td>{mod.count}</td>
                  <td>{formatZMW(mod.revenue)}</td>
                  <td>{formatZMW(mod.avgPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesByModifier; 