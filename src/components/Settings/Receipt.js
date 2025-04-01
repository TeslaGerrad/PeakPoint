import React, { useState } from 'react';
import './Receipt.css';

const Receipt = () => {
  const [receiptSettings, setReceiptSettings] = useState({
    businessName: 'My Restaurant',
    address: '123 Main Street, City',
    phone: '+260 97X XXX XXX',
    email: 'info@myrestaurant.com',
    vatNumber: 'VAT123456789',
    showLogo: true,
    footer: 'Thank you for your business!',
    additionalNotes: 'All prices are in ZMW and include VAT',
    printDuplicate: false
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Header',
      enabled: true,
      fields: ['businessName', 'address', 'phone', 'email']
    },
    {
      id: 2,
      name: 'Order Details',
      enabled: true,
      fields: ['orderNumber', 'date', 'time', 'cashier']
    },
    {
      id: 3,
      name: 'Items',
      enabled: true,
      fields: ['itemName', 'quantity', 'price', 'total']
    },
    {
      id: 4,
      name: 'Totals',
      enabled: true,
      fields: ['subtotal', 'tax', 'discount', 'total']
    },
    {
      id: 5,
      name: 'Footer',
      enabled: true,
      fields: ['footer', 'additionalNotes', 'vatNumber']
    }
  ]);

  const handleSettingChange = (key, value) => {
    setReceiptSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggleSection = (sectionId) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  return (
    <div className="receipt-container">
      <div className="page-header">
        <h2>Receipt Settings</h2>
        <p>Customize your receipt layout and content</p>
      </div>

      <div className="receipt-content">
        <div className="settings-section">
          <h3>Business Information</h3>
          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              value={receiptSettings.businessName}
              onChange={(e) => handleSettingChange('businessName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={receiptSettings.address}
              onChange={(e) => handleSettingChange('address', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={receiptSettings.phone}
                onChange={(e) => handleSettingChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={receiptSettings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>VAT Number</label>
            <input
              type="text"
              value={receiptSettings.vatNumber}
              onChange={(e) => handleSettingChange('vatNumber', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Layout & Content</h3>
          <div className="sections-list">
            {sections.map(section => (
              <div key={section.id} className="section-item">
                <div className="section-header">
                  <div className="section-title">
                    <h4>{section.name}</h4>
                    <span className="fields-info">
                      {section.fields.join(', ')}
                    </span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => handleToggleSection(section.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h3>Additional Settings</h3>
          <div className="form-group">
            <label>Footer Message</label>
            <textarea
              value={receiptSettings.footer}
              onChange={(e) => handleSettingChange('footer', e.target.value)}
              placeholder="Enter a message to display at the bottom of the receipt"
            />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              value={receiptSettings.additionalNotes}
              onChange={(e) => handleSettingChange('additionalNotes', e.target.value)}
              placeholder="Enter any additional information"
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={receiptSettings.showLogo}
                onChange={(e) => handleSettingChange('showLogo', e.target.checked)}
              />
              Show business logo on receipt
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={receiptSettings.printDuplicate}
                onChange={(e) => handleSettingChange('printDuplicate', e.target.checked)}
              />
              Print duplicate copy
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 