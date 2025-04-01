import React, { useState } from 'react';
import './Stores.css';
import './common.css';

const Stores = () => {
  const [users] = useState({
    managers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', stores: [1] },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', stores: [2] },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', stores: [] }
    ],
    cashiers: [
      { id: 1, name: 'Sarah Wilson', email: 'sarah@example.com', store: 1 },
      { id: 2, name: 'Tom Brown', email: 'tom@example.com', store: 1 },
      { id: 3, name: 'Lisa Davis', email: 'lisa@example.com', store: 2 }
    ]
  });

  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Main Branch',
      address: '123 Cairo Road, Lusaka',
      phone: '+260 97X XXX XXX',
      email: 'main@myrestaurant.com',
      manager: 1,
      cashiers: [1, 2],
      isMain: true,
      active: true,
      operatingHours: {
        monday: { open: '08:00', close: '22:00' },
        tuesday: { open: '08:00', close: '22:00' },
        wednesday: { open: '08:00', close: '22:00' },
        thursday: { open: '08:00', close: '22:00' },
        friday: { open: '08:00', close: '23:00' },
        saturday: { open: '10:00', close: '23:00' },
        sunday: { open: '10:00', close: '22:00' }
      }
    },
    {
      id: 2,
      name: 'Kabulonga Branch',
      address: '456 Lake Road, Kabulonga',
      phone: '+260 97X XXX XXX',
      email: 'kabulonga@myrestaurant.com',
      manager: 2,
      cashiers: [],
      isMain: false,
      active: true,
      operatingHours: {
        monday: { open: '09:00', close: '21:00' },
        tuesday: { open: '09:00', close: '21:00' },
        wednesday: { open: '09:00', close: '21:00' },
        thursday: { open: '09:00', close: '21:00' },
        friday: { open: '09:00', close: '22:00' },
        saturday: { open: '10:00', close: '22:00' },
        sunday: { open: '10:00', close: '21:00' }
      }
    }
  ]);

  const [showAddStore, setShowAddStore] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStoreForStaff, setSelectedStoreForStaff] = useState(null);

  const handleAddStore = (e) => {
    e.preventDefault();
    // Add store logic
  };

  const handleToggleStore = (storeId) => {
    setStores(stores.map(store =>
      store.id === storeId
        ? { ...store, active: !store.active }
        : store
    ));
  };

  const handleEditHours = (store) => {
    setSelectedStore(store);
    setShowHoursModal(true);
  };

  const handleAssignStaff = (store) => {
    setSelectedStoreForStaff(store);
    setShowStaffModal(true);
  };

  const getManagerName = (managerId) => {
    const manager = users.managers.find(m => m.id === managerId);
    return manager ? manager.name : 'Unassigned';
  };

  const getCashiers = (cashierIds) => {
    return users.cashiers.filter(c => cashierIds.includes(c.id));
  };

  // Add handlers for staff management
  const handleManagerChange = (e) => {
    const managerId = parseInt(e.target.value);
    setStores(stores.map(store => 
      store.id === selectedStoreForStaff.id
        ? { ...store, manager: managerId }
        : store
    ));
  };

  const handleCashierToggle = (cashierId) => {
    setStores(stores.map(store => {
      if (store.id === selectedStoreForStaff.id) {
        const cashiers = store.cashiers.includes(cashierId)
          ? store.cashiers.filter(id => id !== cashierId)
          : [...store.cashiers, cashierId];
        return { ...store, cashiers };
      }
      return store;
    }));
  };

  const handleSaveStaffChanges = () => {
    // Here you would typically make an API call to save the changes
    // For now, we'll just close the modal
    setShowStaffModal(false);
    setSelectedStoreForStaff(null);
  };

  return (
    <div className="stores-container">
      <div className="page-header">
        <h2>Store Locations</h2>
        <button 
          className="add-store-btn"
          onClick={() => setShowAddStore(true)}
        >
          <i className="fas fa-plus"></i>
          Add New Store
        </button>
      </div>

      <div className="stores-grid">
        {stores.map(store => (
          <div key={store.id} className={`store-card ${store.isMain ? 'main-store' : ''}`}>
            <div className="store-header">
              <div className="store-title">
                <h3>{store.name}</h3>
                {store.isMain && (
                  <span className="main-badge">
                    <i className="fas fa-star"></i>
                    Main Store
                  </span>
                )}
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={store.active}
                  onChange={() => handleToggleStore(store.id)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="store-details">
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{store.address}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-phone"></i>
                <span>{store.phone}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-envelope"></i>
                <span>{store.email}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-user"></i>
                <span>{getManagerName(store.manager)}</span>
              </div>
            </div>

            <div className="store-hours">
              <h4>
                <i className="fas fa-clock"></i>
                Operating Hours
              </h4>
              <div className="hours-preview">
                <div className="day-hours">
                  <span className="day">Mon-Thu</span>
                  <span className="hours">
                    {store.operatingHours.monday.open} - {store.operatingHours.monday.close}
                  </span>
                </div>
                <div className="day-hours">
                  <span className="day">Fri-Sat</span>
                  <span className="hours">
                    {store.operatingHours.friday.open} - {store.operatingHours.friday.close}
                  </span>
                </div>
              </div>
              <button 
                className="edit-hours-btn"
                onClick={() => handleEditHours(store)}
              >
                Edit Hours
              </button>
            </div>

            <div className="store-staff">
              <h4>
                <i className="fas fa-users"></i>
                Assigned Staff
              </h4>
              <div className="staff-info">
                <div className="manager-info">
                  <label>Manager:</label>
                  <span>{getManagerName(store.manager)}</span>
                </div>
                <div className="cashiers-info">
                  <label>Cashiers ({store.cashiers.length}):</label>
                  <ul>
                    {getCashiers(store.cashiers).map(cashier => (
                      <li key={cashier.id}>{cashier.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                className="assign-staff-btn"
                onClick={() => handleAssignStaff(store)}
              >
                Manage Staff
              </button>
            </div>

            <div className="store-actions">
              <button className="edit-btn">
                <i className="fas fa-edit"></i>
                Edit Details
              </button>
              {!store.isMain && (
                <button className="delete-btn">
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Store Modal */}
      {showAddStore && (
        <div className="modal-overlay" onClick={() => setShowAddStore(false)}>
          <div className="store-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Store</h3>
              <button className="close-btn" onClick={() => setShowAddStore(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddStore}>
              <div className="modal-content">
                <div className="form-group">
                  <label>Store Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter store name"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea 
                    required 
                    placeholder="Enter store address"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+260 97X XXX XXX"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="store@example.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Manager</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Store manager name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowAddStore(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Operating Hours Modal */}
      {showHoursModal && selectedStore && (
        <div className="modal-overlay" onClick={() => setShowHoursModal(false)}>
          <div className="hours-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Operating Hours</h3>
              <button className="close-btn" onClick={() => setShowHoursModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="hours-form">
                {Object.entries(selectedStore.operatingHours).map(([day, hours]) => (
                  <div key={day} className="day-hours-input">
                    <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                    <div className="hours-inputs">
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => {/* Handle change */}}
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => {/* Handle change */}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowHoursModal(false)}>
                Cancel
              </button>
              <button className="save-btn">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Assignment Modal */}
      {showStaffModal && selectedStoreForStaff && (
        <div className="modal-overlay" onClick={() => setShowStaffModal(false)}>
          <div className="staff-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Manage Staff - {selectedStoreForStaff.name}</h3>
              <button className="close-btn" onClick={() => setShowStaffModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="staff-section">
                <h4>Assign Manager</h4>
                <p className="section-description">
                  Select a manager for this store. Managers can manage multiple stores.
                </p>
                <select 
                  value={selectedStoreForStaff.manager || ''}
                  onChange={handleManagerChange}
                >
                  <option value="">Select Manager</option>
                  {users.managers.map(manager => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name} ({manager.email})
                      {manager.stores.length > 0 && 
                        ` - Managing ${manager.stores.length} store${manager.stores.length > 1 ? 's' : ''}`
                      }
                    </option>
                  ))}
                </select>
              </div>

              <div className="staff-section">
                <h4>Assign Cashiers</h4>
                <p className="section-description">
                  Assign cashiers to this store. Each cashier can only be assigned to one store.
                </p>
                <div className="cashiers-list">
                  {users.cashiers.map(cashier => {
                    const isAssigned = selectedStoreForStaff.cashiers.includes(cashier.id);
                    const isAssignedToOther = cashier.store && cashier.store !== selectedStoreForStaff.id;
                    
                    return (
                      <label key={cashier.id} className={`cashier-item ${isAssigned ? 'assigned' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isAssigned}
                          onChange={() => handleCashierToggle(cashier.id)}
                          disabled={isAssignedToOther}
                        />
                        <span className="cashier-info">
                          <span className="cashier-name">{cashier.name}</span>
                          <small>{cashier.email}</small>
                        </span>
                        {isAssignedToOther && (
                          <span className="assigned-badge">
                            Assigned to another store
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowStaffModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveStaffChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores; 