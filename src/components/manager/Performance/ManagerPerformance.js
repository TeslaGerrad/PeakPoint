import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import './ManagerPerformance.css';

const ManagerPerformance = () => {
  const { managerId } = useParams();
  const [dateRange, setDateRange] = useState('week');

  // Sample manager data
  const manager = {
    id: 1,
    name: "Robert Chen",
    role: "Store Manager",
    location: "Main Branch",
    performanceScore: 95,
    metrics: {
      salesTarget: 92,
      customerSatisfaction: 98,
      teamEfficiency: 94,
      inventoryAccuracy: 96
    },
    assignedPOS: ["Main Store POS", "Express Checkout"]
  };

  // Sample data for charts
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [4500, 5200, 4800, 5800, 4900, 6200, 5500],
        borderColor: '#0066cc',
        backgroundColor: 'rgba(0, 102, 204, 0.1)',
        fill: true,
      }
    ]
  };

  const metricsData = {
    labels: ['Sales Target', 'Customer Satisfaction', 'Team Efficiency', 'Inventory Accuracy'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [92, 98, 94, 96],
        backgroundColor: '#0066cc',
        borderRadius: 6,
      }
    ]
  };

  return (
    <div className="manager-performance-container">
      <div className="performance-header">
        <div className="header-left">
          <h1>Manager Performance</h1>
          <div className="manager-info">
            <h2>{manager.name}</h2>
            <p className="role">{manager.role} - {manager.location}</p>
          </div>
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

      <div className="performance-metrics">
        <div className="metric-card main">
          <div className="metric-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="metric-info">
            <h3>Overall Performance</h3>
            <p className="metric-value">{manager.performanceScore}%</p>
          </div>
        </div>

        {Object.entries(manager.metrics).map(([key, value]) => (
          <div key={key} className="metric-card">
            <div className="metric-icon">
              <i className={`fas fa-${
                key === 'salesTarget' ? 'bullseye' :
                key === 'customerSatisfaction' ? 'smile' :
                key === 'teamEfficiency' ? 'users' : 'boxes'
              }`}></i>
            </div>
            <div className="metric-info">
              <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
              <p className="metric-value">{value}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Sales Performance</h3>
          <div className="chart-wrapper">
            <Line 
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
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

        <div className="chart-card">
          <h3>Performance Metrics</h3>
          <div className="chart-wrapper">
            <Bar 
              data={metricsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
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

      <div className="assigned-pos-section">
        <h3>Assigned POS Terminals</h3>
        <div className="pos-cards">
          {manager.assignedPOS.map((pos, index) => (
            <div key={index} className="pos-performance-card">
              <div className="pos-header">
                <h4>{pos}</h4>
                <span className="status active">Active</span>
              </div>
              <div className="pos-metrics">
                <div className="pos-metric">
                  <span>Daily Sales</span>
                  <strong>ZMW 4,500</strong>
                </div>
                <div className="pos-metric">
                  <span>Transactions</span>
                  <strong>45</strong>
                </div>
                <div className="pos-metric">
                  <span>Avg. Transaction</span>
                  <strong>ZMW 100</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerPerformance; 