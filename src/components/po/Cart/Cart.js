import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ items, total, removeFromCart, formatCurrency }) => {
  const [paymentType, setPaymentType] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentTypes = [
    { id: 'cash', name: 'Cash', icon: 'money-bill-wave' },
    { id: 'card', name: 'Card', icon: 'credit-card' },
    { id: 'mobile', name: 'Mobile Money', icon: 'mobile-alt' },
  ];

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!paymentType) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate receipt data
    const receipt = {
      items,
      total,
      paymentType,
      date: new Date().toLocaleString(),
      receiptNumber: `RCP${Date.now().toString().slice(-6)}`,
    };

    // Print receipt
    printReceipt(receipt);
    
    // Reset cart and modal
    setIsProcessing(false);
    setShowPaymentModal(false);
    setPaymentType('');
    // You might want to add a function to clear the cart here
  };

  const printReceipt = (receipt) => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              max-width: 300px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .items {
              margin-bottom: 20px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .total {
              border-top: 1px dashed #000;
              padding-top: 10px;
              margin-top: 10px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Your Store Name</h2>
            <p>Receipt #${receipt.receiptNumber}</p>
            <p>${receipt.date}</p>
          </div>
          <div class="items">
            ${receipt.items.map(item => `
              <div class="item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatCurrency(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>
          <div class="total">
            <div class="item">
              <span>Total</span>
              <span>${formatCurrency(receipt.total)}</span>
            </div>
          </div>
          <div class="footer">
            <p>Payment Method: ${receipt.paymentType}</p>
            <p>Thank you for your purchase!</p>
          </div>
        </body>
      </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">x{item.quantity}</span>
            <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
            <button 
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span>Total:</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <button 
        className="checkout-button"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        Checkout
      </button>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h3>Select Payment Method</h3>
            <div className="payment-types">
              {paymentTypes.map(type => (
                <button
                  key={type.id}
                  className={`payment-type-btn ${paymentType === type.id ? 'active' : ''}`}
                  onClick={() => setPaymentType(type.id)}
                >
                  <i className={`fas fa-${type.icon}`}></i>
                  {type.name}
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                className="pay-button"
                onClick={handlePayment}
                disabled={!paymentType || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>Pay {formatCurrency(total)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 