import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './Reports.css';

const SalesByEmployee = () => {
  const [sortBy, setSortBy] = useState('sales');

  const formatZMW = (value) => {
    return `K${value.toLocaleString('en-ZM')}`;
  };

  const employees = [
    { id: 1, name: 'John Doe', sales: 45600, transactions: 312, avgSale: 146.15, hours: 160 },
    { id: 2, name: 'Jane Smith', sales: 38900, transactions: 278, avgSale: 139.93, hours: 152 },
    { id: 3, name: 'Mike Johnson', sales: 42300, transactions: 295, avgSale: 143.39, hours: 168 },
    { id: 4, name: 'Sarah Wilson', sales: 36700, transactions: 245, avgSale: 149.80, hours: 144 },
    { id: 5, name: 'Tom Brown', sales: 39800, transactions: 286, avgSale: 139.16, hours: 156 },
  ];

  const performanceData = {
    labels: employees.map(emp => emp.name),
    datasets: [
      {
        label: 'Sales',
        data: employees.map(emp => emp.sales),
        backgroundColor: '#1e3c72',
      },
      {
        label: 'Transactions',
        data: employees.map(emp => emp.transactions * 100), // Scaled for visualization
        backgroundColor: '#2a5298',
      }
    ]
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales by Employee</h2>
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
            <h3>Top Performer</h3>
            <p>{employees[0].name}</p>
            <small>{formatZMW(employees[0].sales)}</small>
          </div>
          <div className="summary-card">
            <h3>Average Sales per Employee</h3>
            <p>{formatZMW(40660)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Hours Worked</h3>
            <p>780</p>
          </div>
          <div className="summary-card">
            <h3>Sales per Hour</h3>
            <p>{formatZMW(260.51)}</p>
          </div>
        </div>

        <div className="chart-section">
          <h3>Employee Performance</h3>
          <Bar 
            data={performanceData}
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
                    callback: value => value >= 1000 ? formatZMW(value) : value/100
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
                <th>Employee</th>
                <th>Total Sales</th>
                <th>Transactions</th>
                <th>Average Sale</th>
                <th>Hours Worked</th>
                <th>Sales/Hour</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{formatZMW(emp.sales)}</td>
                  <td>{emp.transactions}</td>
                  <td>{formatZMW(emp.avgSale)}</td>
                  <td>{emp.hours}</td>
                  <td>{formatZMW(emp.sales / emp.hours)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesByEmployee; 