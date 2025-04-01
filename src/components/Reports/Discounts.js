import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Reports.css';

const Discounts = () => {
  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const discountData = {
    labels: ['Staff Discount', 'Happy Hour', 'Loyalty Points', 'Promo Code', 'Special Offer'],
    datasets: [{
      label: 'Total Discount Amount',
      data: [15000, 22000, 18500, 12000, 9500],
      backgroundColor: '#1e3c72',
    }]
  };

  const discountDistribution = {
    labels: ['Staff Discount', 'Happy Hour', 'Loyalty Points', 'Promo Code', 'Special Offer'],
    datasets: [{
      data: [20, 28, 24, 15, 13],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
        '#6495ed',
      ],
    }]
  };

  const discounts = [
    { 
      name: 'Staff Discount', 
      count: 320, 
      totalAmount: 15000, 
      avgDiscount: 46.88,
      percentage: '15%'
    },
    { 
      name: 'Happy Hour', 
      count: 450, 
      totalAmount: 22000, 
      avgDiscount: 48.89,
      percentage: '20%'
    },
    { 
      name: 'Loyalty Points', 
      count: 380, 
      totalAmount: 18500, 
      avgDiscount: 48.68,
      percentage: '10%'
    },
    { 
      name: 'Promo Code', 
      count: 240, 
      totalAmount: 12000, 
      avgDiscount: 50.00,
      percentage: '25%'
    },
    { 
      name: 'Special Offer', 
      count: 190, 
      totalAmount: 9500, 
      avgDiscount: 50.00,
      percentage: '30%'
    },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Discounts</h2>
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
            <h3>Total Discounts</h3>
            <p>{formatZMW(77000)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Transactions</h3>
            <p>1,580</p>
          </div>
          <div className="summary-card">
            <h3>Average Discount</h3>
            <p>{formatZMW(48.73)}</p>
          </div>
          <div className="summary-card">
            <h3>Discount Rate</h3>
            <p>18.5%</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Discount Distribution</h3>
            <Doughnut 
              data={discountDistribution}
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
            <h3>Discount Amounts</h3>
            <Bar 
              data={discountData}
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
                <th>Discount Type</th>
                <th>Usage Count</th>
                <th>Total Amount</th>
                <th>Average Discount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map(discount => (
                <tr key={discount.name}>
                  <td>{discount.name}</td>
                  <td>{discount.count}</td>
                  <td>{formatZMW(discount.totalAmount)}</td>
                  <td>{formatZMW(discount.avgDiscount)}</td>
                  <td>{discount.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Discounts; 