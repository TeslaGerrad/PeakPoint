import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Reports.css';
import { useNavigate } from 'react-router-dom';

const SalesSummary = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last7days');
  const [summaryData, setSummaryData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageSale: 0,
    salesTrend: [],
    categoryDistribution: [],
    paymentMethods: []
  });

  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  useEffect(() => {
    const fetchSummaryData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate an API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulated data
        setSummaryData({
          totalSales: 265000,
          totalOrders: 1856,
          totalCustomers: 946,
          averageSale: 142.78,
          salesTrend: [30000, 45000, 38000, 50000, 47000, 55000],
          categoryDistribution: [35, 25, 20, 15, 5],
          paymentMethods: [40, 35, 20, 5]
        });
      } catch (error) {
        console.error('Error fetching summary data:', error);
        // Handle error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaryData();
  }, [dateRange]); // Re-fetch when date range changes

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales 2024',
      data: summaryData.salesTrend,
      borderColor: '#1e3c72',
      backgroundColor: 'rgba(30, 60, 114, 0.1)',
      tension: 0.4,
    }]
  };

  if (isLoading) {
    return (
      <div className="report-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading report data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales Summary</h2>
        <div className="report-actions">
          <select 
            className="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="export-btn">
            <i className="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      <div className="report-content">
        <div className="stats-cards">
          <div className="stat-card clickable" onClick={() => navigate('/dashboard/reports/sales-by-item')}>
            <div className="stat-icon">
              <i className="fas fa-box"></i>
            </div>
            <div className="stat-details">
              <h3>Sales by Item</h3>
              <p className="stat-value">1,245</p>
              <p className="stat-description">Items sold this month</p>
            </div>
            <i className="fas fa-chevron-right nav-arrow"></i>
          </div>

          <div className="stat-card clickable" onClick={() => navigate('/dashboard/reports/sales-category')}>
            <div className="stat-icon">
              <i className="fas fa-tags"></i>
            </div>
            <div className="stat-details">
              <h3>Sales Category</h3>
              <p className="stat-value">5</p>
              <p className="stat-description">Active categories</p>
            </div>
            <i className="fas fa-chevron-right nav-arrow"></i>
          </div>

          <div className="stat-card clickable" onClick={() => navigate('/dashboard/reports/sales-by-employee')}>
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-details">
              <h3>Sales by Employee</h3>
              <p className="stat-value">8</p>
              <p className="stat-description">Active employees</p>
            </div>
            <i className="fas fa-chevron-right nav-arrow"></i>
          </div>

          <div className="stat-card clickable" onClick={() => navigate('/dashboard/reports/sales-by-payment')}>
            <div className="stat-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <div className="stat-details">
              <h3>Payment Types</h3>
              <p className="stat-value">4</p>
              <p className="stat-description">Payment methods</p>
            </div>
            <i className="fas fa-chevron-right nav-arrow"></i>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card large">
            <h3>Sales Trend</h3>
            <Line 
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
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

          <div className="charts-row">
            <div className="chart-card">
              <h3>Sales by Category</h3>
              <Doughnut 
                data={{
                  labels: ['Food', 'Beverages', 'Snacks', 'Desserts', 'Others'],
                  datasets: [{
                    data: summaryData.categoryDistribution,
                    backgroundColor: [
                      '#1e3c72',
                      '#2a5298',
                      '#3867c0',
                      '#4b7ee8',
                      '#6495ed',
                    ],
                  }]
                }}
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
              <h3>Payment Methods</h3>
              <Doughnut 
                data={{
                  labels: ['Cash', 'Credit Card', 'Mobile Payment', 'Other'],
                  datasets: [{
                    data: summaryData.paymentMethods,
                    backgroundColor: [
                      '#1e3c72',
                      '#2a5298',
                      '#3867c0',
                      '#4b7ee8',
                    ],
                  }]
                }}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary; 