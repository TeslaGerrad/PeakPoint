import React, { useState, useEffect } from 'react';
import './Employees.css';
import AddEmployeeModal from './AddEmployeeModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'John Doe',
            role: 'Manager',
            email: 'john@example.com',
            phone: '+260 97X XXX XXX',
            status: 'active',
            joinDate: '2023-01-15',
            avatar: null,
            recentSales: 2500,
            lastActive: '2024-03-20'
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'Cashier',
            email: 'jane@example.com',
            phone: '+260 96X XXX XXX',
            status: 'active',
            joinDate: '2023-03-20',
            avatar: null,
            recentSales: 1800,
            lastActive: '2024-03-20'
          },
          {
            id: 3,
            name: 'Mike Wilson',
            role: 'Waiter',
            email: 'mike@example.com',
            phone: '+260 95X XXX XXX',
            status: 'inactive',
            joinDate: '2023-06-10',
            avatar: null,
            recentSales: 0,
            lastActive: '2024-02-15'
          }
        ];
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="employees-container">
      <div className="employees-header">
        <h2>Employees</h2>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Add Employee
        </button>
      </div>

      <div className="employees-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <div className="employee-avatar">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} />
              ) : (
                <div className="avatar-placeholder">
                  {employee.name.charAt(0)}
                </div>
              )}
              <span className={`status-indicator ${employee.status}`}></span>
            </div>
            <div className="employee-details">
              <h3>{employee.name}</h3>
              <span className="employee-role">{employee.role}</span>
              <div className="employee-contact">
                <span><i className="fas fa-envelope"></i> {employee.email}</span>
                <span><i className="fas fa-phone"></i> {employee.phone}</span>
              </div>
              <div className="employee-stats">
                <div className="stat">
                  <span className="stat-label">Recent Sales</span>
                  <span className="stat-value">K{employee.recentSales}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Last Active</span>
                  <span className="stat-value">{new Date(employee.lastActive).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="employee-actions">
              <button title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button title="Delete">
                <i className="fas fa-trash"></i>
              </button>
              <button title={employee.status === 'active' ? 'Deactivate' : 'Activate'}>
                <i className={`fas fa-${employee.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default EmployeeList; 