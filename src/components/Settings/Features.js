import React, { useState } from 'react';
import './Features.css';

const Features = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: 'Online Ordering',
      description: 'Allow customers to place orders through your website',
      enabled: true,
      category: 'sales',
      icon: 'fas fa-shopping-cart'
    },
    {
      id: 2,
      name: 'Table Management',
      description: 'Manage restaurant tables and reservations',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-chair'
    },
    {
      id: 3,
      name: 'Kitchen Display',
      description: 'Show orders in kitchen with real-time updates',
      enabled: true,
      category: 'operations',
      icon: 'fas fa-utensils'
    },
    {
      id: 4,
      name: 'Customer Feedback',
      description: 'Collect and manage customer reviews',
      enabled: true,
      category: 'customer',
      icon: 'fas fa-star'
    },
    {
      id: 5,
      name: 'Inventory Management',
      description: 'Track and manage your inventory in real-time',
      enabled: true,
      category: 'operations',
      icon: 'fas fa-box'
    },
    {
      id: 6,
      name: 'Employee Scheduling',
      description: 'Manage employee shifts and schedules',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-calendar-alt'
    }
    ,    {
      id: 7,
      name: 'ZRA  Smart invoicing',
      description: 'Tax Records and management',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-sticky-note'
    }
    ,    {
      id: 8,
      name: 'Digital Marketing',
      description: 'Digital Marketing Package designed to put you in front of more customers',
      enabled: false,
      category: 'marketing',
      icon: 'fas fa-tags'
    }
    ,    {
      id: 9,
      name: '15 Devices',
      description: 'Devices running PeakPoint System',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-tv'
    }
    ,    {
      id: 10,
      name: '35 Devices',
      description: 'Devices running PeakPoint System',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-laptop-house'
    }
    ,
    {
      id: 11,
      name: 'Franchise Management',
      description: 'Manage franchise Stock Procurement ,Stock Movement ,Automate Reorders and Control Prices Centrally',
      enabled: false,
      category: 'operations',
      icon: 'fas fa-store'
    }
    ,
    {
      id: 12,
      name: 'Payment Getway',
      description: 'Mobile payment such has Airtel, MTN and Card VISA',
      enabled: false,
      category: 'Payments',
      icon: 'fa-solid fa-money-bill-transfer'
    }
  ]);

  const handleToggleFeature = (featureId) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  return (
    <div className="features-container">
      <div className="page-header">
        <h2>Features</h2>
        <p>Enable or disable system features</p>
      </div>

      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-title">
                <h3>{feature.name}</h3>
                <span className="feature-category">{feature.category}</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={feature.enabled}
                  onChange={() => handleToggleFeature(feature.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features; 