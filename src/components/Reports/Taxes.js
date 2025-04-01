import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import './Reports.css';

const Taxes = () => {
  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const taxTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Tax Amount',
      data: [25000, 28000, 26500, 30000, 28500, 32000],
      borderColor: '#1e3c72',
      backgroundColor: 'rgba(30, 60, 114, 0.1)',
      tension: 0.4,
    }]
  };

  const taxDistribution = {
    labels: ['VAT', 'Service Tax', 'Tourism Levy', 'Other Taxes'],
    datasets: [{
      data: [45, 30, 15, 10],
      backgroundColor: [
        '#1e3c72',
        '#2a5298',
        '#3867c0',
        '#4b7ee8',
      ],
    }]
  };

  const taxes = [
    { 
      name: 'VAT', 
      rate: '16%',
      taxable: 250000,
      tax: 40000,
      transactions: 1580
    },
    { 
      name: 'Service Tax', 
      rate: '10%',
      taxable: 180000,
      tax: 18000,
      transactions: 1200
    },
    { 
      name: 'Tourism Levy', 
      rate: '5%',
      taxable: 150000,
      tax: 7500,
      transactions: 950
    },
    { 
      name: 'Other Taxes', 
      rate: 'Various',
      taxable: 100000,
      tax: 5000,
      transactions: 800
    },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Taxes</h2>
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
            <h3>Total Tax Collected</h3>
            <p>{formatZMW(70500)}</p>
          </div>
          <div className="summary-card">
            <h3>Taxable Amount</h3>
            <p>{formatZMW(680000)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Transactions</h3>
            <p>4,530</p>
          </div>
          <div className="summary-card">
            <h3>Average Tax Rate</h3>
            <p>10.37%</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Tax Distribution</h3>
            <Doughnut 
              data={taxDistribution}
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
            <h3>Tax Collection Trend</h3>
            <Line 
              data={taxTrendData}
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
                <th>Tax Type</th>
                <th>Rate</th>
                <th>Taxable Amount</th>
                <th>Tax Amount</th>
                <th>Transactions</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map(tax => (
                <tr key={tax.name}>
                  <td>{tax.name}</td>
                  <td>{tax.rate}</td>
                  <td>{formatZMW(tax.taxable)}</td>
                  <td>{formatZMW(tax.tax)}</td>
                  <td>{tax.transactions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Taxes; 