import React, { useState, useEffect } from 'react';
import './Customers.css';
import AddCustomerModal from './AddCustomerModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Sarah Johnson',
            phone: '+260 97X XXX XXX',
            email: 'sarah@example.com',
            joinDate: '2024-01-15',
            totalOrders: 25,
            totalSpent: 2500.00,
            lastOrder: '2024-03-18',
            status: 'active',
            loyaltyPoints: 250
          },
          {
            id: 2,
            name: 'Michael Chen',
            phone: '+260 96X XXX XXX',
            email: 'michael@example.com',
            joinDate: '2024-02-01',
            totalOrders: 15,
            totalSpent: 1800.00,
            lastOrder: '2024-03-20',
            status: 'active',
            loyaltyPoints: 180
          },
          {
            id: 3,
            name: 'Emma Wilson',
            phone: '+260 95X XXX XXX',
            email: 'emma@example.com',
            joinDate: '2024-01-20',
            totalOrders: 8,
            totalSpent: 950.00,
            lastOrder: '2024-03-15',
            status: 'inactive',
            loyaltyPoints: 95
          }
        ];
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h2>Customers</h2>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Add Customer
        </button>
      </div>

      <div className="customers-grid">
        {customers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="customer-avatar">
              <div className="avatar-placeholder">
                {customer.name.charAt(0)}
              </div>
              <span className={`status-indicator ${customer.status}`}></span>
            </div>
            <div className="customer-details">
              <h3>{customer.name}</h3>
              <div className="customer-contact">
                <span><i className="fas fa-phone"></i> {customer.phone}</span>
                <span><i className="fas fa-envelope"></i> {customer.email}</span>
              </div>
              <div className="customer-stats">
                <div className="stat">
                  <span className="stat-label">Total Orders</span>
                  <span className="stat-value">{customer.totalOrders}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Spent</span>
                  <span className="stat-value">K{customer.totalSpent.toFixed(2)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Loyalty Points</span>
                  <span className="stat-value points">{customer.loyaltyPoints}</span>
                </div>
              </div>
              <div className="last-order">
                Last order: {new Date(customer.lastOrder).toLocaleDateString()}
              </div>
            </div>
            <div className="customer-actions">
              <button title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button title="View History">
                <i className="fas fa-history"></i>
              </button>
              <button title={customer.status === 'active' ? 'Deactivate' : 'Activate'}>
                <i className={`fas fa-${customer.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CustomerList; 