import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import './Reports.css';

const SalesCategory = () => {
  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const categoryData = {
    labels: ['Food', 'Beverages', 'Snacks', 'Desserts', 'Others'],
    datasets: [{
      data: [85000, 45000, 32000, 28000, 15000],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
        '#6495ed',
      ],
    }]
  };

  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Food',
        data: [12000, 15000, 13000, 14000, 16000, 18000, 17000],
        backgroundColor: '#1e3c72',
      },
      {
        label: 'Beverages',
        data: [6000, 7000, 6500, 7500, 8000, 9000, 8500],
        backgroundColor: '#2a5298',
      },
      {
        label: 'Snacks',
        data: [4500, 5000, 4800, 5200, 5500, 6000, 5800],
        backgroundColor: '#3867c0',
      }
    ]
  };

  const categories = [
    { name: 'Food', sales: 85000, items: 1245, avgPrice: 68.27 },
    { name: 'Beverages', sales: 45000, items: 2150, avgPrice: 20.93 },
    { name: 'Snacks', sales: 32000, items: 1680, avgPrice: 19.05 },
    { name: 'Desserts', sales: 28000, items: 890, avgPrice: 31.46 },
    { name: 'Others', sales: 15000, items: 456, avgPrice: 32.89 },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales by Category</h2>
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
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Category Distribution</h3>
            <Doughnut 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }}
            />
          </div>
          <div className="chart-card">
            <h3>Weekly Trend by Category</h3>
            <Bar 
              data={trendData}
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
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Sales</th>
                <th>Items Sold</th>
                <th>Average Price</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.name}>
                  <td>{cat.name}</td>
                  <td>{formatZMW(cat.sales)}</td>
                  <td>{cat.items.toLocaleString()}</td>
                  <td>{formatZMW(cat.avgPrice)}</td>
                  <td>{((cat.sales / 205000) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesCategory; 