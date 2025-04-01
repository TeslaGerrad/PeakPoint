import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './ManagerReports.css';

const ManagerReports = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedReport, setSelectedReport] = useState('sales');

  // Sample manager data with assigned POS
  const manager = {
    id: 1,
    name: "Robert Chen",
    assignedPOS: [
      { id: 1, name: "Main Store POS", location: "Main Branch" },
      { id: 2, name: "Express Checkout", location: "Downtown" }
    ]
  };

  // Sample report data
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: manager.assignedPOS.map((pos, index) => ({
      label: pos.name,
      data: Array(7).fill(0).map(() => Math.floor(Math.random() * 5000) + 1000),
      borderColor: index === 0 ? '#0066cc' : '#00cc66',
      backgroundColor: index === 0 ? 'rgba(0, 102, 204, 0.1)' : 'rgba(0, 204, 102, 0.1)',
      fill: true
    }))
  };

  const categoryData = {
    labels: ['Food', 'Beverages', 'Snacks', 'Desserts'],
    datasets: manager.assignedPOS.map((pos, index) => ({
      label: pos.name,
      data: Array(4).fill(0).map(() => Math.floor(Math.random() * 2000) + 500),
      backgroundColor: index === 0 ? '#0066cc' : '#00cc66',
      borderRadius: 6
    }))
  };

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: 'chart-line' },
    { id: 'items', name: 'Items Report', icon: 'box' },
    { id: 'categories', name: 'Categories', icon: 'tags' },
    { id: 'transactions', name: 'Transactions', icon: 'receipt' }
  ];

  return (
    <div className="manager-reports-container">
      <div className="reports-header">
        <div className="header-left">
          <h1>Terminal Reports</h1>
          <p className="subtitle">View reports for your assigned terminals</p>
        </div>
        <div className="header-right">
          <div className="date-filter">
            <button 
              className={`filter-btn ${dateRange === 'week' ? 'active' : ''}`}
              onClick={() => setDateRange('week')}
            >
              This Week
            </button>
            <button 
              className={`filter-btn ${dateRange === 'month' ? 'active' : ''}`}
              onClick={() => setDateRange('month')}
            >
              This Month
            </button>
            <button 
              className={`filter-btn ${dateRange === 'quarter' ? 'active' : ''}`}
              onClick={() => setDateRange('quarter')}
            >
              This Quarter
            </button>
          </div>
        </div>
      </div>

      <div className="report-types">
        {reportTypes.map(type => (
          <button
            key={type.id}
            className={`report-type-btn ${selectedReport === type.id ? 'active' : ''}`}
            onClick={() => setSelectedReport(type.id)}
          >
            <i className={`fas fa-${type.icon}`}></i>
            {type.name}
          </button>
        ))}
      </div>

      <div className="terminals-overview">
        {manager.assignedPOS.map(pos => (
          <div key={pos.id} className="terminal-summary-card">
            <div className="terminal-header">
              <h3>{pos.name}</h3>
              <span className="location">{pos.location}</span>
            </div>
            <div className="terminal-stats">
              <div className="stat-item">
                <span>Today's Sales</span>
                <strong>ZMW {(Math.random() * 5000 + 1000).toFixed(2)}</strong>
              </div>
              <div className="stat-item">
                <span>Transactions</span>
                <strong>{Math.floor(Math.random() * 50 + 20)}</strong>
              </div>
              <div className="stat-item">
                <span>Avg. Sale</span>
                <strong>ZMW {(Math.random() * 100 + 50).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reports-content">
        <div className="chart-card large">
          <h3>Sales Comparison</h3>
          <div className="chart-wrapper">
            <Line 
              data={salesData}
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
                    grid: {
                      display: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card large">
          <h3>Category Sales by Terminal</h3>
          <div className="chart-wrapper">
            <Bar 
              data={categoryData}
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
                    grid: {
                      display: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports; 