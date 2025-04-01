import React, { useState, useEffect } from 'react';
import './Integrations.css';

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'MTN Mobile Money',
            description: 'Accept MTN Mobile Money payments',
            icon: 'fas fa-mobile-alt',
            status: 'connected',
            category: 'payments',
            lastSync: '2024-03-20T10:30:00',
            features: ['Direct Payments', 'Payment Links', 'Transaction History']
          },
          {
            id: 2,
            name: 'Airtel Money',
            description: 'Process Airtel Money transactions',
            icon: 'fas fa-money-bill-wave',
            status: 'connected',
            category: 'payments',
            lastSync: '2024-03-20T10:15:00',
            features: ['Direct Payments', 'Refunds', 'Settlement Reports']
          },
          {
            id: 3,
            name: 'Zamtel Money',
            description: 'Accept Zamtel Money payments',
            icon: 'fas fa-wallet',
            status: 'disconnected',
            category: 'payments',
            features: ['Direct Payments', 'Transaction Reports', 'Auto Settlement']
          },
          {
            id: 4,
            name: 'WhatsApp Business',
            description: 'Connect with customers through WhatsApp',
            icon: 'fab fa-whatsapp',
            status: 'connected',
            category: 'messaging',
            lastSync: '2024-03-20T10:30:00',
            features: ['Chat', 'Notifications', 'Order Updates']
          },
          {
            id: 5,
            name: 'Visa/Mastercard',
            description: 'Accept card payments',
            icon: 'fas fa-credit-card',
            status: 'pending',
            category: 'payments',
            features: ['Card Payments', 'Recurring Billing', 'Refunds']
          },
          {
            id: 6,
            name: 'Google Analytics',
            description: 'Track and analyze customer behavior',
            icon: 'fab fa-google',
            status: 'disconnected',
            category: 'analytics',
            features: ['Website Analytics', 'Customer Insights', 'Reports']
          },
          {
            id: 7,
            name: 'Facebook Shop',
            description: 'Sell directly on Facebook',
            icon: 'fab fa-facebook',
            status: 'connected',
            category: 'sales',
            lastSync: '2024-03-20T09:15:00',
            features: ['Product Sync', 'Order Management', 'Customer Messages']
          },
          {
            id: 8,
            name: 'Instagram Shopping',
            description: 'Showcase products on Instagram',
            icon: 'fab fa-instagram',
            status: 'pending',
            category: 'sales',
            features: ['Product Tags', 'Shop Tab', 'Stories Integration']
          },
          {
            id: 9,
            name: 'Mailchimp',
            description: 'Email marketing automation',
            icon: 'fas fa-envelope',
            status: 'connected',
            category: 'marketing',
            lastSync: '2024-03-20T08:45:00',
            features: ['Email Campaigns', 'Customer Lists', 'Automation']
          },
          {
            id: 10,
            name: 'PayPal',
            description: 'Accept international payments',
            icon: 'fab fa-paypal',
            status: 'disconnected',
            category: 'payments',
            features: ['Online Payments', 'Invoicing', 'Global Reach']
          }
        ];
        setApps(data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  const handleConnect = (appId) => {
    // Handle app connection
    console.log('Connecting app:', appId);
  };

  const handleDisconnect = (appId) => {
    // Handle app disconnection
    console.log('Disconnecting app:', appId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#4caf50';
      case 'disconnected': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#666';
    }
  };

  // Add category filter
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Apps' },
    { id: 'payments', name: 'Payments' },
    { id: 'messaging', name: 'Messaging' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'analytics', name: 'Analytics' }
  ];

  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="integrations-container">
      <div className="integrations-header">
        <h2>App Integrations</h2>
        <div className="header-actions">
          <button className="refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Refresh Status
          </button>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="apps-grid">
        {filteredApps.map(app => (
          <div key={app.id} className="app-card">
            <div className="app-header">
              <div className="app-icon">
                <i className={app.icon}></i>
              </div>
              <div className="app-info">
                <h3>{app.name}</h3>
                <p>{app.description}</p>
              </div>
            </div>

            <div className="app-features">
              {app.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>

            <div className="app-status">
              <span 
                className="status-dot"
                style={{ backgroundColor: getStatusColor(app.status) }}
              ></span>
              <span className="status-text">
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
              {app.lastSync && (
                <span className="last-sync">
                  Last sync: {new Date(app.lastSync).toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="app-actions">
              {app.status === 'connected' ? (
                <button 
                  className="disconnect-btn"
                  onClick={() => handleDisconnect(app.id)}
                >
                  Disconnect
                </button>
              ) : (
                <button 
                  className="connect-btn"
                  onClick={() => handleConnect(app.id)}
                >
                  {app.status === 'pending' ? 'Complete Setup' : 'Connect'}
                </button>
              )}
              <button className="settings-btn">
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps; 