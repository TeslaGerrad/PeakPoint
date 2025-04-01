import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerList.css';

const ManagerList = () => {
  const navigate = useNavigate();
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Robert Chen",
      location: "Main Branch",
      status: "active",
      lastActive: "2024-03-20 15:30",
      role: "Store Manager",
      email: "robert@example.com",
      assignedPOS: ["Main Store POS", "Express Checkout"],
      performanceScore: 95
    },
    {
      id: 2,
      name: "Lisa Wong",
      location: "Downtown Branch",
      status: "active",
      lastActive: "2024-03-20 15:25",
      role: "Branch Manager",
      email: "lisa@example.com",
      assignedPOS: ["Downtown POS"],
      performanceScore: 88
    },
    {
      id: 3,
      name: "David Miller",
      location: "Mall Branch",
      status: "inactive",
      lastActive: "2024-03-20 14:15",
      role: "Operations Manager",
      email: "david@example.com",
      assignedPOS: ["Mall Kiosk 1", "Mall Kiosk 2"],
      performanceScore: 92
    }
  ]);

  const [newManager, setNewManager] = useState({
    name: '',
    location: '',
    role: '',
    email: '',
    status: 'active'
  });

  const [availablePOS] = useState([
    { id: 1, name: 'Main Store POS', location: 'Main Branch' },
    { id: 2, name: 'Express Checkout', location: 'Downtown' },
    { id: 3, name: 'Mall Kiosk 1', location: 'Mall Branch' },
    { id: 4, name: 'Mall Kiosk 2', location: 'Mall Branch' },
  ]);

  const handleAddManager = () => {
    if (!newManager.name || !newManager.location || !newManager.role || !newManager.email) {
      alert('Please fill in all required fields');
      return;
    }

    const newManagerEntry = {
      id: Date.now(),
      ...newManager,
      lastActive: new Date().toLocaleString(),
      assignedPOS: [],
      performanceScore: 0
    };

    setManagers([...managers, newManagerEntry]);
    setShowAddModal(false);
    setNewManager({ name: '', location: '', role: '', email: '', status: 'active' });
  };

  const handleToggleStatus = (manager) => {
    const newStatus = manager.status === 'active' ? 'inactive' : 'active';
    const updatedManager = {
      ...manager,
      status: newStatus
    };

    setManagers(managers.map(m => 
      m.id === manager.id ? updatedManager : m
    ));

    if (selectedManager && selectedManager.id === manager.id) {
      setSelectedManager(updatedManager);
    }
  };

  const handlePOSAssignment = (pos) => {
    const updatedManager = { ...selectedManager };
    if (updatedManager.assignedPOS.includes(pos.name)) {
      updatedManager.assignedPOS = updatedManager.assignedPOS.filter(p => p !== pos.name);
    } else {
      updatedManager.assignedPOS = [...updatedManager.assignedPOS, pos.name];
    }
    setSelectedManager(updatedManager);
  };

  const handlePermissionToggle = (permission, value) => {
    setSelectedManager(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    setManagers(managers.map(m => 
      m.id === selectedManager.id ? selectedManager : m
    ));
    setShowManageModal(false);
  };

  return (
    <div className="manager-list-container">
      <div className="manager-list-header">
        <div className="header-left">
          <h1>Manager Overview</h1>
          <p className="subtitle">Manage and monitor your managers</p>
        </div>
        <div className="header-actions">
          <button className="refresh-button">
            <i className="fas fa-sync-alt"></i>
            Refresh Status
          </button>
          <button 
            className="add-manager-button"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Manager
          </button>
        </div>
      </div>

      <div className="manager-stats">
        <div className="stat-box">
          <div className="stat-icon active">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-info">
            <h3>Active Managers</h3>
            <p className="stat-value">
              {managers.filter(m => m.status === 'active').length}
            </p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon inactive">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="stat-info">
            <h3>Inactive Managers</h3>
            <p className="stat-value">
              {managers.filter(m => m.status === 'inactive').length}
            </p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-info">
            <h3>Average Performance</h3>
            <p className="stat-value">
              {Math.round(managers.reduce((sum, m) => sum + m.performanceScore, 0) / managers.length)}%
            </p>
          </div>
        </div>
      </div>

      <div className="manager-grid">
        {managers.map(manager => (
          <div key={manager.id} className="manager-card">
            <div className="manager-card-header">
              <div className="header-info">
                <h2>{manager.name}</h2>
                <span 
                  className={`manager-status ${manager.status}`}
                  onClick={() => handleToggleStatus(manager)}
                >
                  <i className={`fas fa-${manager.status === 'active' ? 'check' : 'times'}-circle`}></i>
                  {manager.status}
                </span>
              </div>
            </div>
            
            <div className="manager-info">
              <p className="role">
                <i className="fas fa-user-tie"></i>
                {manager.role}
              </p>
              <p className="location">
                <i className="fas fa-map-marker-alt"></i>
                {manager.location}
              </p>
              <p className="email">
                <i className="fas fa-envelope"></i>
                {manager.email}
              </p>
              <p className="last-active">
                <i className="fas fa-clock"></i>
                Last Active: {manager.lastActive}
              </p>
              
              <div className="performance-info">
                <div className="info-item">
                  <span>Performance Score</span>
                  <strong>{manager.performanceScore}%</strong>
                </div>
                <div className="info-item">
                  <span>Assigned POS</span>
                  <strong>{manager.assignedPOS.length}</strong>
                </div>
              </div>
            </div>

            <div className="manager-card-actions">
              <button 
                className="view-manager-button"
                onClick={() => navigate(`/dashboard/manager/performance/${manager.id}`)}
              >
                <i className="fas fa-chart-bar"></i>
                View Performance
              </button>
              <button 
                className="manage-manager-button"
                onClick={() => {
                  setSelectedManager(manager);
                  setShowManageModal(true);
                }}
              >
                <i className="fas fa-cog"></i>
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Manager Modal */}
      {showAddModal && (
        <div className="manage-modal">
          {/* ... Add manager modal content similar to POS ... */}
        </div>
      )}

      {/* Manage Manager Modal */}
      {showManageModal && selectedManager && (
        <div className="manage-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Manage Manager: {selectedManager.name}</h2>
              <button 
                className="close-button"
                onClick={() => setShowManageModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="manager-details">
                <h3>Manager Details</h3>
                <p><i className="fas fa-user-tie"></i> {selectedManager.role}</p>
                <p><i className="fas fa-envelope"></i> {selectedManager.email}</p>
                <p><i className="fas fa-map-marker-alt"></i> {selectedManager.location}</p>
              </div>

              <div className="pos-assignment-section">
                <h3>Assigned POS Terminals</h3>
                <div className="pos-grid">
                  {availablePOS.map(pos => (
                    <div 
                      key={pos.id} 
                      className={`pos-card ${selectedManager.assignedPOS.includes(pos.name) ? 'assigned' : ''}`}
                      onClick={() => handlePOSAssignment(pos)}
                    >
                      <div className="pos-icon">
                        <i className="fas fa-cash-register"></i>
                      </div>
                      <div className="pos-info">
                        <h4>{pos.name}</h4>
                        <p>{pos.location}</p>
                      </div>
                      <div className="assignment-status">
                        <i className={`fas fa-${selectedManager.assignedPOS.includes(pos.name) ? 'check-circle' : 'plus-circle'}`}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inventory-access">
                <h3>Inventory Management</h3>
                <div className="permission-toggles">
                  <div className="permission-item">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedManager.permissions?.canUpdateStock} 
                        onChange={(e) => handlePermissionToggle('canUpdateStock', e.target.checked)}
                      />
                      Can Update Stock Levels
                    </label>
                  </div>
                  <div className="permission-item">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedManager.permissions?.canAdjustPrices} 
                        onChange={(e) => handlePermissionToggle('canAdjustPrices', e.target.checked)}
                      />
                      Can Adjust Prices
                    </label>
                  </div>
                  <div className="permission-item">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedManager.permissions?.canViewReports} 
                        onChange={(e) => handlePermissionToggle('canViewReports', e.target.checked)}
                      />
                      Can View Inventory Reports
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowManageModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerList; 