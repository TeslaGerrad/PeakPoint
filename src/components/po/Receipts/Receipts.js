import React, { useState } from 'react';
import './Receipts.css';

const POSReceipts = () => {
  const [receipts] = useState([
    {
      id: 'R001',
      date: '2024-03-20T15:30:00',
      cashier: 'John Doe',
      location: 'Main Street Branch',
      total: 110.78,
      status: 'Completed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'R002',
      date: '2024-03-20T14:25:00',
      cashier: 'Jane Smith',
      location: 'Downtown Branch',
      total: 85.50,
      status: 'Completed',
      paymentMethod: 'Cash'
    },
    // Add more receipts...
  ]);

  const formatDate = (date) => new Date(date).toLocaleString();
  const formatZMW = (amount) => `ZMW ${amount.toFixed(2)}`;

  return (
    <div className="receipts-container">
      <div className="receipts-header">
        <h1>POS Receipts</h1>
        <p className="subtitle">View and print transaction receipts</p>
      </div>

      <div className="receipts-table-container">
        <table className="receipts-table">
          <thead>
            <tr>
              <th>Receipt #</th>
              <th>Date</th>
              <th>Cashier</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.id}>
                <td>{receipt.id}</td>
                <td>{formatDate(receipt.date)}</td>
                <td>{receipt.cashier}</td>
                <td>{receipt.location}</td>
                <td>{formatZMW(receipt.total)}</td>
                <td>{receipt.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${receipt.status.toLowerCase()}`}>
                    {receipt.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-view">
                      <i className="fas fa-eye"></i>
                      View
                    </button>
                    <button className="btn-print">
                      <i className="fas fa-print"></i>
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default POSReceipts; 