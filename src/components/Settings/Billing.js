import React from 'react';
import './Billing.css';

const Billing = () => {
  const currentPlan = {
    name: 'Professional',
    price: 'ZMW 499.99',
    billingCycle: 'monthly',
    nextBilling: '2024-04-20',
    features: [
      'All Basic Features',
      'Advanced Analytics',
      'Priority Support',
      'Custom Branding'
    ]
  };

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 29.99,
      features: [
        'Up to 1,000 orders/month',
        'Basic Analytics',
        'Email Support',
        'Standard Features'
      ]
    },
    {
      id: 2,
      name: 'Professional',
      price: 49.99,
      features: [
        'Unlimited orders',
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99.99,
      features: [
        'All Professional Features',
        'API Access',
        'Dedicated Support',
        'Custom Development'
      ]
    }
  ];

  return (
    <div className="billing-container">
      <div className="page-header">
        <h2>Billing & Subscriptions</h2>
        <p>Manage your subscription and billing details</p>
      </div>

      <div className="current-plan">
        <h3>Current Plan</h3>
        <div className="plan-details">
          <div className="plan-info">
            <h4>{currentPlan.name}</h4>
            <div className="price">
              <span className="currency">ZMW</span>
              <span className="amount">{currentPlan.price.split(' ')[1]}</span>
              <span className="period">/month</span>
            </div>
            <p>Next billing date: {currentPlan.nextBilling}</p>
          </div>
          <button className="change-plan-btn">Change Plan</button>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <span className="popular-tag">Popular</span>}
            <h3>{plan.name}</h3>
            <div className="plan-price">
              <span className="currency">ZMW</span>
              <span className="amount">{plan.price}</span>
              <span className="period">/month</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`select-plan-btn ${currentPlan.name === plan.name ? 'current' : ''}`}>
              {currentPlan.name === plan.name ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="billing-history">
        <h3>Billing History</h3>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mar 20, 2024</td>
              <td>Professional Plan - Monthly</td>
              <td>
                <div className="price">
                  <span className="currency">ZMW</span>
                  <span className="amount">499.99</span>
                  <span className="period">/month</span>
                </div>
              </td>
              <td><span className="status success">Paid</span></td>
              <td><button className="download-btn"><i className="fas fa-download"></i></button></td>
            </tr>
            {/* Add more billing history rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing; 