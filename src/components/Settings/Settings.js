import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Features from './Features';
import Billing from './Billing';
import PaymentTypes from './PaymentTypes';
import Loyalty from './Loyalty';
import Taxes from './Taxes';
import Receipt from './Receipt';
import Stores from './Stores';
import Devices from './Devices';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <Routes>
        <Route path="/" element={<Navigate to="features" replace />} />
        <Route path="features" element={<Features />} />
        <Route path="billing" element={<Billing />} />
        <Route path="payment-types" element={<PaymentTypes />} />
        <Route path="loyalty" element={<Loyalty />} />
        <Route path="taxes" element={<Taxes />} />
        <Route path="receipt" element={<Receipt />} />
        <Route path="stores" element={<Stores />} />
        <Route path="devices" element={<Devices />} />
      </Routes>
    </div>
  );
};

export default Settings; 