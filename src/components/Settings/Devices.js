import React, { useState } from 'react';
import './Devices.css';
import './common.css';

const Devices = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Main Counter POS',
      type: 'POS Terminal',
      model: 'Sunmi V2 Pro',
      serialNumber: 'SM2023456789',
      location: 'Main Branch',
      status: 'online',
      lastActive: '2024-03-20 14:30',
      printerName: 'Epson TM-T88VI',
      printerStatus: 'ready'
    },
    {
      id: 2,
      name: 'Kitchen Display',
      type: 'KDS',
      model: 'Android Tablet',
      serialNumber: 'TAB987654321',
      location: 'Main Branch',
      status: 'online',
      lastActive: '2024-03-20 14:28',
      printerName: null,
      printerStatus: null
    },
    {
      id: 3,
      name: 'Bar POS',
      type: 'POS Terminal',
      model: 'Sunmi V2 Pro',
      serialNumber: 'SM2023456790',
      location: 'Main Branch',
      status: 'offline',
      lastActive: '2024-03-19 22:45',
      printerName: 'Epson TM-T88VI',
      printerStatus: 'error'
    }
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceAction = (device, action) => {
    switch(action) {
      case 'restart':
        // Restart device logic
        break;
      case 'test':
        // Test printer logic
        break;
      default:
        break;
    }
  };

  return (
    <div className="devices-container">
      <div className="page-header">
        <h2>Devices</h2>
        <button 
          className="add-device-btn"
          onClick={() => setShowAddDevice(true)}
        >
          <i className="fas fa-plus"></i>
          Add New Device
        </button>
      </div>

      <div className="devices-grid">
        {devices.map(device => (
          <div key={device.id} className="device-card">
            <div className="device-header">
              <div className="device-title">
                <h3>{device.name}</h3>
                <span className={`status-badge ${device.status}`}>
                  <i className={`fas fa-${device.status === 'online' ? 'circle' : 'power-off'}`}></i>
                  {device.status}
                </span>
              </div>
              <div className="device-type">
                <i className={`fas fa-${device.type === 'POS Terminal' ? 'cash-register' : 'tablet'}`}></i>
                {device.type}
              </div>
            </div>

            <div className="device-details">
              <div className="detail-row">
                <span className="detail-label">Model</span>
                <span className="detail-value">{device.model}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Serial Number</span>
                <span className="detail-value">{device.serialNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location</span>
                <span className="detail-value">{device.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Active</span>
                <span className="detail-value">{device.lastActive}</span>
              </div>
              {device.printerName && (
                <div className="printer-status">
                  <div className="printer-info">
                    <i className="fas fa-print"></i>
                    <span>{device.printerName}</span>
                  </div>
                  <span className={`status-badge ${device.printerStatus}`}>
                    {device.printerStatus}
                  </span>
                </div>
              )}
            </div>

            <div className="device-actions">
              <button 
                className="action-btn restart"
                onClick={() => handleDeviceAction(device, 'restart')}
              >
                <i className="fas fa-redo"></i>
                Restart
              </button>
              {device.printerName && (
                <button 
                  className="action-btn test"
                  onClick={() => handleDeviceAction(device, 'test')}
                >
                  <i className="fas fa-print"></i>
                  Test Print
                </button>
              )}
              <button 
                className="action-btn configure"
                onClick={() => setSelectedDevice(device)}
              >
                <i className="fas fa-cog"></i>
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="modal-overlay" onClick={() => setShowAddDevice(false)}>
          <div className="device-modal" onClick={e => e.stopPropagation()}>
            {/* Modal content */}
          </div>
        </div>
      )}

      {/* Configure Device Modal */}
      {selectedDevice && (
        <div className="modal-overlay" onClick={() => setSelectedDevice(null)}>
          <div className="device-modal" onClick={e => e.stopPropagation()}>
            {/* Configuration form */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices; 