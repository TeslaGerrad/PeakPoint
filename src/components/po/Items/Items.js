import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Items.css';

const Items = () => {
  const { posId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample categories and items data
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'food', name: 'Food' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const items = [
    {
      id: 1,
      name: 'Burger',
      price: 25.00,
      category: 'food',
      image: '/images/burger.jpg'
    },
    {
      id: 2,
      name: 'Cola',
      price: 5.00,
      category: 'drinks',
      image: '/images/cola.jpg'
    },
    {
      id: 3,
      name: 'Pizza',
      price: 35.00,
      category: 'food',
      image: '/images/pizza.jpg'
    },
    {
      id: 4,
      name: 'Chicken Wings',
      price: 28.00,
      category: 'food',
      image: '/images/wings.jpg'
    },
    {
      id: 5,
      name: 'French Fries',
      price: 12.00,
      category: 'food',
      image: '/images/fries.jpg'
    },
    {
      id: 6,
      name: 'Mineral Water',
      price: 3.00,
      category: 'drinks',
      image: '/images/water.jpg'
    },
    {
      id: 7,
      name: 'Orange Juice',
      price: 6.00,
      category: 'drinks',
      image: '/images/orange-juice.jpg'
    },
    {
      id: 8,
      name: 'Ice Cream',
      price: 8.00,
      category: 'desserts',
      image: '/images/ice-cream.jpg'
    },
    {
      id: 9,
      name: 'Chocolate Cake',
      price: 15.00,
      category: 'desserts',
      image: '/images/chocolate-cake.jpg'
    },
    {
      id: 10,
      name: 'Salad',
      price: 18.00,
      category: 'food',
      image: '/images/salad.jpg'
    },
    {
      id: 11,
      name: 'Iced Tea',
      price: 4.50,
      category: 'drinks',
      image: '/images/iced-tea.jpg'
    },
    {
      id: 12,
      name: 'Cheesecake',
      price: 16.00,
      category: 'desserts',
      image: '/images/cheesecake.jpg'
    },
    {
      id: 13,
      name: 'Pasta',
      price: 22.00,
      category: 'food',
      image: '/images/pasta.jpg'
    },
    {
      id: 14,
      name: 'Milkshake',
      price: 9.00,
      category: 'drinks',
      image: '/images/milkshake.jpg'
    },
    {
      id: 15,
      name: 'Apple Pie',
      price: 12.00,
      category: 'desserts',
      image: '/images/apple-pie.jpg'
    },
    {
      id: 16,
      name: 'Fish & Chips',
      price: 26.00,
      category: 'food',
      image: '/images/fish-chips.jpg'
    },
    {
      id: 17,
      name: 'Lemonade',
      price: 5.50,
      category: 'drinks',
      image: '/images/lemonade.jpg'
    },
    {
      id: 18,
      name: 'Tiramisu',
      price: 14.00,
      category: 'desserts',
      image: '/images/tiramisu.jpg'
    }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Filter items based on category and search term
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatZMW = (amount) => `ZMW ${amount.toFixed(2)}`;

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const processPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      printReceipt();
      setCart([]);
      setShowCheckoutModal(false);
    }, 2000);
  };

  const printReceipt = () => {
    // Implement receipt printing logic
    console.log('Printing receipt...');
  };

  return (
    <div className="pos-layout">
      <div className="pos-items">
        <div className="pos-header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="categories-bar">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="items-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="item-card"
              onClick={() => addToCart(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="price">{formatZMW(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <div className="cart-header">
          <h2>Current Order</h2>
          {cart.length > 0 && (
            <button className="clear-cart" onClick={() => setCart([])}>
              Clear Cart
            </button>
          )}
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>{formatZMW(item.price)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => {
                  if (item.quantity > 1) {
                    setCart(cart.map(cartItem =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                    ));
                  } else {
                    setCart(cart.filter(cartItem => cartItem.id !== item.id));
                  }
                }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
              <p className="item-total">{formatZMW(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatZMW(getCartTotal())}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <div className="modal-header">
              <h2>Checkout</h2>
              <button 
                className="close-button"
                onClick={() => setShowCheckoutModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatZMW(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span>{formatZMW(getCartTotal())}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h3>Select Payment Method</h3>
                <div className="payment-options">
                  <button
                    className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <i className="fas fa-money-bill-wave"></i>
                    Cash
                  </button>
                  <button
                    className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <i className="fas fa-credit-card"></i>
                    Card
                  </button>
                  <button
                    className={`payment-option ${paymentMethod === 'mobile' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('mobile')}
                  >
                    <i className="fas fa-mobile-alt"></i>
                    Mobile Money
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="process-button"
                onClick={processPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Process Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items; 