import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './ManagerPerformance.css';

const ManagerPerformanceOverview = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('week');

  // Sample managers data
  const managers = [
    {
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
    },
    {
      id: 2,
      name: "Lisa Wong",
      role: "Branch Manager",
      location: "Downtown Branch",
      performanceScore: 88,
      metrics: {
        salesTarget: 85,
        customerSatisfaction: 92,
        teamEfficiency: 88,
        inventoryAccuracy: 90
      },
      assignedPOS: ["Downtown POS"]
    },
    {
      id: 3,
      name: "David Miller",
      role: "Operations Manager",
      location: "Mall Branch",
      performanceScore: 92,
      metrics: {
        salesTarget: 90,
        customerSatisfaction: 94,
        teamEfficiency: 91,
        inventoryAccuracy: 93
      },
      assignedPOS: ["Mall Kiosk 1", "Mall Kiosk 2"]
    }
  ];

  // Sample data for the charts
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales Performance',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#0066cc',
      tension: 0.4
    }]
  };

  const barData = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    datasets: [{
      label: 'Team Performance',
      data: [65, 59, 80, 81],
      backgroundColor: ['#0066cc', '#00cc66', '#ff9900', '#ff3366']
    }]
  };

  const pieData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Delayed'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#00cc66', '#0066cc', '#ff9900', '#ff3366']
    }]
  };

  return (
    <div className="manager-performance-overview">
      <div className="overview-header">
        <h1>Manager Performance Overview</h1>
        <p className="subtitle">Track and analyze manager performance metrics</p>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Monthly Sales Trend</h3>
          <div className="chart-container">
            <Line 
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Team Performance</h3>
          <div className="chart-container">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Task Status</h3>
          <div className="chart-container">
            <Pie 
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="managers-grid">
        {managers.map(manager => (
          <div 
            key={manager.id} 
            className="manager-performance-card"
            onClick={() => navigate(`/dashboard/manager/performance/${manager.id}`)}
          >
            <div className="manager-header">
              <div className="header-info">
                <h3>{manager.name}</h3>
                <span className="role">{manager.role}</span>
                <span className="location">{manager.location}</span>
              </div>
              <div className="performance-score">
                <div className="score-circle">
                  <strong>{manager.performanceScore}%</strong>
                  <span>Score</span>
                </div>
              </div>
            </div>
            
            <div className="metrics-grid">
              {Object.entries(manager.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <strong>{value}%</strong>
                </div>
              ))}
            </div>

            <div className="assigned-pos">
              <div className="pos-tags">
                {manager.assignedPOS.map((pos, index) => (
                  <span key={index} className="pos-tag">{pos}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerPerformanceOverview; 