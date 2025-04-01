import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './POSList.css';

const POSList = () => {
  const navigate = useNavigate();
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedPOS, setSelectedPOS] = useState(null);
  const [availableCashiers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'active' },
  ]);

  const [pointOfSales, setPointOfSales] = useState([
    {
      id: 1,
      name: "Main Store POS",
      location: "Main Street Branch",
      status: "active",
      lastActive: "2024-03-20 15:30",
      dailySales: 1250.00,
      cashier: "John Doe",
      transactionsToday: 48,
      averageTransaction: 26.04
    },
    {
      id: 2,
      name: "Express Checkout",
      location: "Downtown Branch",
      status: "active",
      lastActive: "2024-03-20 15:25",
      dailySales: 850.00,
      cashier: "Jane Smith",
      transactionsToday: 32,
      averageTransaction: 26.56
    },
    {
      id: 3,
      name: "Self-Service Kiosk",
      location: "Mall Branch",
      status: "inactive",
      lastActive: "2024-03-20 14:15",
      dailySales: 425.00,
      cashier: "Unattended",
      transactionsToday: 17,
      averageTransaction: 25.00
    }
  ]);

  const handleViewPOS = (posId) => {
    navigate(`/dashboard/pos/items/${posId}`);
  };

  const handleManage = (pos) => {
    setSelectedPOS(pos);
    setShowManageModal(true);
  };

  const handleAssignCashier = (cashierId) => {
    // Here you would typically make an API call to update the POS terminal
    console.log(`Assigning cashier ${cashierId} to POS ${selectedPOS.id}`);
    // Update the local state
    const updatedPOS = {
      ...selectedPOS,
      cashier: availableCashiers.find(c => c.id === cashierId).name
    };
    setSelectedPOS(updatedPOS);
  };

  const handleToggleStatus = (pos) => {
    const newStatus = pos.status === 'active' ? 'inactive' : 'active';
    const updatedPOS = {
      ...pos,
      status: newStatus
    };

    // Update the POS list with the new status
    setPointOfSales(pointOfSales.map(p => 
      p.id === pos.id ? updatedPOS : p
    ));

    // If this POS is currently selected in the manage modal, update it there too
    if (selectedPOS && selectedPOS.id === pos.id) {
      setSelectedPOS(updatedPOS);
    }
  };

  const handleDeactivatePOS = () => {
    if (window.confirm(`Are you sure you want to ${selectedPOS.status === 'active' ? 'deactivate' : 'activate'} this POS terminal?`)) {
      handleToggleStatus(selectedPOS);
      setShowManageModal(false);
    }
  };

  // Helper function for currency formatting
  const formatZMW = (amount) => {
    return `ZMW ${amount.toFixed(2)}`;
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [availableManagers] = useState([
    { id: 1, name: 'Robert Chen', email: 'robert@example.com', role: 'Store Manager' },
    { id: 2, name: 'Lisa Wong', email: 'lisa@example.com', role: 'Branch Manager' },
    { id: 3, name: 'David Miller', email: 'david@example.com', role: 'Operations Manager' },
  ]);
  const [newTerminal, setNewTerminal] = useState({
    name: '',
    location: '',
    cashier: '',
    manager: '',
    status: 'active'
  });

  const handleAddTerminal = () => {
    if (!newTerminal.name || !newTerminal.location) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the terminal
    const newPOS = {
      id: Date.now(), // temporary ID generation
      ...newTerminal,
      lastActive: new Date().toLocaleString(),
      dailySales: 0,
      transactionsToday: 0,
      averageTransaction: 0
    };

    // Update local state
    setPointOfSales([...pointOfSales, newPOS]);
    setShowAddModal(false);
    setNewTerminal({ name: '', location: '', cashier: '', manager: '', status: 'active' });
  };

  // Update the add button click handler
  const handleAddClick = () => {
    setShowAddModal(true);
  };

  // Add these helper functions
  const getActiveTerminals = () => pointOfSales.filter(pos => pos.status === 'active').length;
  const getInactiveTerminals = () => pointOfSales.filter(pos => pos.status === 'inactive').length;
  const getTotalSales = () => pointOfSales.reduce((sum, pos) => sum + pos.dailySales, 0);
  const getTotalTransactions = () => pointOfSales.reduce((sum, pos) => sum + pos.transactionsToday, 0);

  return (
    <div className="pos-list-container">
      <div className="pos-list-header">
        <div className="header-left">
          <h1>Point of Sale Terminals</h1>
          <p className="subtitle">Manage and monitor your POS terminals</p>
        </div>
        <div className="header-actions">
          <button className="refresh-button">
            <i className="fas fa-sync-alt"></i>
            Refresh Status
          </button>
          <button 
            className="add-pos-button"
            onClick={handleAddClick}
          >
            <i className="fas fa-plus"></i>
            Add New Terminal
          </button>
        </div>
      </div>

      <div className="pos-stats">
        <div className="stat-box">
          <div className="stat-icon active">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Active Terminals</h3>
            <p className="stat-value">{getActiveTerminals()}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon inactive">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Inactive Terminals</h3>
            <p className="stat-value">{getInactiveTerminals()}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>Total Sales Today</h3>
            <p className="stat-value">{formatZMW(getTotalSales())}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-info">
            <h3>Total Transactions</h3>
            <p className="stat-value">{getTotalTransactions()}</p>
          </div>
        </div>
      </div>

      <div className="pos-grid">
        {pointOfSales.map(pos => (
          <div key={pos.id} className="pos-card">
            <div className="pos-header">
              <div className="pos-title">
                <h3>{pos.name}</h3>
                <div className="pos-location">{pos.location}</div>
              </div>
              <span className={`status-badge ${pos.status}`}>
                {pos.status}
              </span>
            </div>

            <div className="pos-operator">
              <div className="operator-name">{pos.cashier}</div>
              <div className="last-active">Last Active: {pos.lastActive}</div>
            </div>

            <div className="pos-metrics">
              <div className="metric">
                <span className="metric-label">Daily Sales</span>
                <strong className="metric-value">{formatZMW(pos.dailySales)}</strong>
              </div>
              <div className="metric">
                <span className="metric-label">Transactions</span>
                <strong className="metric-value">{pos.transactionsToday}</strong>
              </div>
              <div className="metric">
                <span className="metric-label">Average</span>
                <strong className="metric-value">{formatZMW(pos.averageTransaction)}</strong>
              </div>
            </div>

            <div className="pos-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleViewPOS(pos.id)}
              >
                Open POS
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleManage(pos)}
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {showManageModal && selectedPOS && (
        <div className="manage-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Manage POS Terminal</h2>
              <button 
                className="close-button"
                onClick={() => setShowManageModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="pos-details">
                <h3>{selectedPOS.name}</h3>
                <p className="location"><i className="fas fa-map-marker-alt"></i> {selectedPOS.location}</p>
                <p className="status">
                  <i className={`fas fa-${selectedPOS.status === 'active' ? 'check' : 'times'}-circle`}></i>
                  Status: {selectedPOS.status}
                </p>
              </div>

              <div className="cashier-section">
                <h3>Assign Cashier</h3>
                <div className="cashier-grid">
                  {availableCashiers.map(cashier => (
                    <div 
                      key={cashier.id}
                      className={`cashier-card ${cashier.name === selectedPOS.cashier ? 'active' : ''}`}
                      onClick={() => handleAssignCashier(cashier.id)}
                    >
                      <div className="cashier-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="cashier-info">
                        <h4>{cashier.name}</h4>
                        <p>{cashier.email}</p>
                        <span className={`status-badge ${cashier.status}`}>
                          {cashier.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button 
                  className={`deactivate-button ${selectedPOS.status === 'inactive' ? 'activate' : ''}`}
                  onClick={handleDeactivatePOS}
                >
                  <i className={`fas fa-${selectedPOS.status === 'active' ? 'power-off' : 'power-on'}`}></i>
                  {selectedPOS.status === 'active' ? 'Deactivate' : 'Activate'} POS Terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Terminal Modal */}
      {showAddModal && (
        <div className="manage-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Terminal</h2>
              <button 
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Terminal Name *</label>
                <input
                  type="text"
                  value={newTerminal.name}
                  onChange={(e) => setNewTerminal({
                    ...newTerminal,
                    name: e.target.value
                  })}
                  placeholder="Enter terminal name"
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={newTerminal.location}
                  onChange={(e) => setNewTerminal({
                    ...newTerminal,
                    location: e.target.value
                  })}
                  placeholder="Enter location"
                />
              </div>

              <div className="form-group">
                <label>Assign Cashier</label>
                <select
                  value={newTerminal.cashier}
                  onChange={(e) => setNewTerminal({
                    ...newTerminal,
                    cashier: e.target.value
                  })}
                >
                  <option value="">Select a cashier</option>
                  {availableCashiers.map(cashier => (
                    <option 
                      key={cashier.id} 
                      value={cashier.name}
                      disabled={cashier.status === 'inactive'}
                    >
                      {cashier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Assign Manager</label>
                <select
                  value={newTerminal.manager}
                  onChange={(e) => setNewTerminal({
                    ...newTerminal,
                    manager: e.target.value
                  })}
                >
                  <option value="">Select a manager</option>
                  {availableManagers.map(manager => (
                    <option 
                      key={manager.id} 
                      value={manager.name}
                    >
                      {manager.name} - {manager.role}
                    </option>
                  ))}
                </select>
              </div>

              {newTerminal.manager && (
                <div className="selected-manager">
                  <div className="manager-preview">
                    <div className="manager-avatar">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="manager-info">
                      <h4>{newTerminal.manager}</h4>
                      <p>{availableManagers.find(m => m.name === newTerminal.manager)?.role}</p>
                      <p>{availableManagers.find(m => m.name === newTerminal.manager)?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Status</label>
                <div className="status-toggle">
                  <button
                    className={`status-btn ${newTerminal.status === 'active' ? 'active' : ''}`}
                    onClick={() => setNewTerminal({
                      ...newTerminal,
                      status: 'active'
                    })}
                  >
                    <i className="fas fa-check-circle"></i>
                    Active
                  </button>
                  <button
                    className={`status-btn ${newTerminal.status === 'inactive' ? 'active' : ''}`}
                    onClick={() => setNewTerminal({
                      ...newTerminal,
                      status: 'inactive'
                    })}
                  >
                    <i className="fas fa-times-circle"></i>
                    Inactive
                  </button>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleAddTerminal}
                >
                  <i className="fas fa-plus"></i>
                  Add Terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSList; 