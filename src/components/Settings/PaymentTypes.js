import React, { useState } from 'react';
import './PaymentTypes.css';

const PaymentTypes = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: 'Cash',
      enabled: true,
      icon: 'fas fa-money-bill-wave',
      description: 'Accept cash payments in ZMW',
      defaultMethod: true
    },
    {
      id: 2,
      name: 'MTN Mobile Money',
      enabled: true,
      icon: 'fas fa-mobile-alt',
      description: 'Accept MTN Mobile Money payments',
      merchantId: 'MM123456',
      apiKey: '••••••••••••'
    },
    {
      id: 3,
      name: 'Airtel Money',
      enabled: true,
      icon: 'fas fa-wallet',
      description: 'Accept Airtel Money payments',
      merchantId: 'AM789012',
      apiKey: '••••••••••••'
    },
    {
      id: 4,
      name: 'Visa/Mastercard',
      enabled: false,
      icon: 'fas fa-credit-card',
      description: 'Accept credit/debit card payments',
      requiresSetup: true
    },
    {
      id: 5,
      name: 'Bank Transfer',
      enabled: true,
      icon: 'fas fa-university',
      description: 'Accept bank transfer payments',
      accountDetails: {
        bank: 'First National Bank',
        accountNumber: '1234567890',
        branchCode: '123456'
      }
    }
  ]);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleToggleMethod = (methodId) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === methodId
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
  };

  const handleConfigureMethod = (method) => {
    setSelectedMethod(method);
    setShowConfigModal(true);
  };

  return (
    <div className="payment-types-container">
      <div className="page-header">
        <h2>Payment Types</h2>
        <p>Configure accepted payment methods</p>
      </div>

      <div className="payment-methods-grid">
        {paymentMethods.map(method => (
          <div key={method.id} className="payment-method-card">
            <div className="method-header">
              <div className="method-icon">
                <i className={method.icon}></i>
              </div>
              <div className="method-info">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={() => handleToggleMethod(method.id)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="method-details">
              {method.merchantId && (
                <div className="detail-item">
                  <span className="detail-label">Merchant ID:</span>
                  <span>{method.merchantId}</span>
                </div>
              )}
              {method.apiKey && (
                <div className="detail-item">
                  <span className="detail-label">API Key:</span>
                  <span>{method.apiKey}</span>
                </div>
              )}
              {method.accountDetails && (
                <>
                  <div className="detail-item">
                    <span className="detail-label">Bank:</span>
                    <span>{method.accountDetails.bank}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Account:</span>
                    <span>{method.accountDetails.accountNumber}</span>
                  </div>
                </>
              )}
            </div>

            <div className="method-actions">
              <button 
                className="configure-btn"
                onClick={() => handleConfigureMethod(method)}
              >
                <i className="fas fa-cog"></i>
                Configure
              </button>
              {method.defaultMethod && (
                <span className="default-badge">
                  <i className="fas fa-star"></i>
                  Default
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showConfigModal && selectedMethod && (
        <div className="modal-overlay" onClick={() => setShowConfigModal(false)}>
          <div className="config-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Configure {selectedMethod.name}</h3>
              <button className="close-btn" onClick={() => setShowConfigModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              {/* Configuration form will vary based on payment method */}
              <form className="config-form">
                {selectedMethod.name === 'MTN Mobile Money' && (
                  <>
                    <div className="form-group">
                      <label>Merchant ID</label>
                      <input type="text" defaultValue={selectedMethod.merchantId} />
                    </div>
                    <div className="form-group">
                      <label>API Key</label>
                      <input type="password" defaultValue={selectedMethod.apiKey} />
                    </div>
                  </>
                )}
                {/* Add more configuration options for other payment methods */}
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowConfigModal(false)}>
                Cancel
              </button>
              <button className="save-btn">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTypes; 