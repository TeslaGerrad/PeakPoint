import React from 'react';
import './Receipt.css';

const Receipt = ({ receipt }) => {
  const formatZMW = (amount) => `ZMW ${amount.toFixed(2)}`;
  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="receipt">
      <div className="receipt-header">
        <img 
          src="/logo.svg" 
          alt="PeakPoint" 
          className="receipt-logo"
        />
        <h2>PeakPoint</h2>
        <p className="store-info">
          {receipt.location}<br />
          Tel: +260 211 123456<br />
          VAT: ZM100383025
        </p>
      </div>

      <div className="receipt-details">
        <div className="receipt-row">
          <span>Receipt #:</span>
          <span>{receipt.id}</span>
        </div>
        <div className="receipt-row">
          <span>Date:</span>
          <span>{formatDate(receipt.date)}</span>
        </div>
        <div className="receipt-row">
          <span>Cashier:</span>
          <span>{receipt.cashier}</span>
        </div>
      </div>

      <div className="receipt-items">
        {receipt.items.map((item, index) => (
          <div key={index} className="receipt-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-qty">x{item.quantity}</span>
            </div>
            <span className="item-price">{formatZMW(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="receipt-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatZMW(receipt.subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>VAT (16%):</span>
          <span>{formatZMW(receipt.tax)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatZMW(receipt.total)}</span>
        </div>
        <div className="summary-row payment">
          <span>Payment Method:</span>
          <span>{receipt.paymentMethod}</span>
        </div>
      </div>

      <div className="receipt-footer">
        <p>Thank you for shopping at PeakPoint!</p>
        <p className="receipt-barcode">||||||||||||||||||||||||||||</p>
      </div>
    </div>
  );
};

export default Receipt; 