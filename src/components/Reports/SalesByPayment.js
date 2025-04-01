import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Reports.css';

const SalesByPayment = () => {
  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const paymentData = {
    labels: ['Cash', 'Credit Card', 'Mobile Money', 'Bank Transfer', 'Other'],
    datasets: [{
      label: 'Sales Amount',
      data: [85000, 65000, 45000, 25000, 15000],
      backgroundColor: '#1e3c72',
    }]
  };

  const paymentDistribution = {
    labels: ['Cash', 'Credit Card', 'Mobile Money', 'Bank Transfer', 'Other'],
    datasets: [{
      data: [36, 28, 19, 11, 6],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
        '#6495ed',
      ],
    }]
  };

  const payments = [
    { type: 'Cash', count: 850, amount: 85000, avgTransaction: 100 },
    { type: 'Credit Card', count: 520, amount: 65000, avgTransaction: 125 },
    { type: 'Mobile Money', count: 450, amount: 45000, avgTransaction: 100 },
    { type: 'Bank Transfer', count: 125, amount: 25000, avgTransaction: 200 },
    { type: 'Other', count: 75, amount: 15000, avgTransaction: 200 },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales by Payment Type</h2>
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
        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total Sales</h3>
            <p>{formatZMW(235000)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Transactions</h3>
            <p>2,020</p>
          </div>
          <div className="summary-card">
            <h3>Average Transaction</h3>
            <p>{formatZMW(116.34)}</p>
          </div>
          <div className="summary-card">
            <h3>Payment Methods</h3>
            <p>5</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Payment Method Distribution</h3>
            <Doughnut 
              data={paymentDistribution}
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
            <h3>Sales by Payment Method</h3>
            <Bar 
              data={paymentData}
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
                <th>Payment Type</th>
                <th>Transaction Count</th>
                <th>Total Amount</th>
                <th>Average Transaction</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.type}>
                  <td>{payment.type}</td>
                  <td>{payment.count}</td>
                  <td>{formatZMW(payment.amount)}</td>
                  <td>{formatZMW(payment.avgTransaction)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesByPayment; 