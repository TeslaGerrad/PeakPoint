import React, { useState } from 'react';
import './Employees.css';

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle employee addition
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal compact">
        <div className="modal-header">
          <h3>Add Employee</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={employeeData.name}
              onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={employeeData.role}
              onChange={(e) => setEmployeeData({...employeeData, role: e.target.value})}
              required
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={employeeData.email}
              onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={employeeData.phone}
              onChange={(e) => setEmployeeData({...employeeData, phone: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={employeeData.password}
              onChange={(e) => setEmployeeData({...employeeData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={employeeData.confirmPassword}
              onChange={(e) => setEmployeeData({...employeeData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal; 