import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesOverview.css';

const SalesOverview = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('today');
  const [selectedTerminal, setSelectedTerminal] = useState('all');
  const [viewType, setViewType] = useState('all'); // 'all', 'terminal', 'cashier'

  // Sample terminals data
  const terminals = [
    { id: 1, name: 'Main Store POS', location: 'Main Branch' },
    { id: 2, name: 'Express Checkout', location: 'Downtown' },
    { id: 3, name: 'Self-Service Kiosk', location: 'Mall Branch' },
  ];

  const formatZMW = (amount) => {
    return `ZMW ${amount.toFixed(2)}`;
  };

  const salesData = {
    today: {
      totalSales: 12500.75,
      transactions: 145,
      averageTicket: 86.21,
      topSeller: 'John Doe',
      bestPerformingPos: 'Main Store POS'
    }
  };

  const recentTransactions = [
    {
      id: 1,
      time: '15:30',
      pos: 'Main Store POS',
      cashier: 'John Doe',
      items: 5,
      total: 250.75,
      paymentType: 'Card'
    },
    // Add more transactions
  ];

  // Filter sales data based on selected terminal and date range
  const getFilteredData = () => {
    let data = { ...salesData.today }; // Default to today's data
    
    if (selectedTerminal !== 'all') {
      // Filter data for specific terminal
      data = {
        ...data,
        totalSales: data.totalSales * 0.4, // Example: Adjust values for terminal
        transactions: Math.floor(data.transactions * 0.4),
        averageTicket: data.averageTicket,
      };
    }
    
    return data;
  };

  const filteredData = getFilteredData();

  return (
    <div className="sales-overview-container">
      <div className="sales-overview-header">
        <div className="header-left">
          <h1>Sales Overview</h1>
          <div className="view-filters">
            <button 
              className={`view-btn ${viewType === 'all' ? 'active' : ''}`}
              onClick={() => setViewType('all')}
            >
              All Sales
            </button>
            <button 
              className={`view-btn ${viewType === 'terminal' ? 'active' : ''}`}
              onClick={() => setViewType('terminal')}
            >
              By Terminal
            </button>
            <button 
              className={`view-btn ${viewType === 'cashier' ? 'active' : ''}`}
              onClick={() => setViewType('cashier')}
            >
              By Cashier
            </button>
          </div>
        </div>
        <div className="header-filters">
          <select
            value={selectedTerminal}
            onChange={(e) => setSelectedTerminal(e.target.value)}
            className="terminal-select"
          >
            <option value="all">All Terminals</option>
            {terminals.map(terminal => (
              <option key={terminal.id} value={terminal.id}>
                {terminal.name}
              </option>
            ))}
          </select>
          <div className="date-filter">
            <button 
              className={`filter-btn ${dateRange === 'today' ? 'active' : ''}`}
              onClick={() => setDateRange('today')}
            >
              Today
            </button>
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
          </div>
        </div>
        <button 
          className="new-sale-btn"
          onClick={() => navigate('/dashboard/pos/terminals')}
        >
          <i className="fas fa-plus"></i>
          New Sale
        </button>
      </div>

      {viewType === 'terminal' ? (
        <div className="terminal-cards">
          {terminals.map(terminal => (
            <div 
              key={terminal.id} 
              className="terminal-card"
              onClick={() => navigate(`/dashboard/pos/sales/${terminal.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="terminal-header">
                <h3>{terminal.name}</h3>
                <span className="location">{terminal.location}</span>
              </div>
              <div className="terminal-stats">
                <div className="stat-item">
                  <span>Sales</span>
                  <strong>{formatZMW(4500.75)}</strong>
                </div>
                <div className="stat-item">
                  <span>Transactions</span>
                  <strong>45</strong>
                </div>
                <div className="stat-item">
                  <span>Average</span>
                  <strong>{formatZMW(100.02)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="sales-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-cash-register"></i>
              </div>
              <div className="stat-info">
                <h3>Total Sales</h3>
                <p className="stat-value">{formatZMW(filteredData.totalSales)}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-receipt"></i>
              </div>
              <div className="stat-info">
                <h3>Transactions</h3>
                <p className="stat-value">{filteredData.transactions}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <div className="stat-info">
                <h3>Average Ticket</h3>
                <p className="stat-value">{formatZMW(filteredData.averageTicket)}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="stat-info">
                <h3>Top Seller</h3>
                <p className="stat-value">{filteredData.topSeller}</p>
              </div>
            </div>
          </div>

          <div className="sales-content">
            <div className="recent-transactions">
              <h2>Recent Transactions</h2>
              <div className="transactions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>POS Terminal</th>
                      <th>Cashier</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.time}</td>
                        <td>{transaction.pos}</td>
                        <td>{transaction.cashier}</td>
                        <td>{transaction.items}</td>
                        <td>{formatZMW(transaction.total)}</td>
                        <td>
                          <span className={`payment-badge ${transaction.paymentType.toLowerCase()}`}>
                            {transaction.paymentType}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn">
                            <i className="fas fa-print"></i>
                          </button>
                          <button className="action-btn">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesOverview; 