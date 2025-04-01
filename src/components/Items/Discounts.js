import React, { useState, useEffect } from 'react';
import './Items.css';
import AddDiscountModal from './AddDiscountModal';

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    name: '',
    type: 'percentage',
    value: '',
    startDate: '',
    endDate: '',
    applicableItems: [],
    minOrderValue: '',
    maxDiscount: '',
    usageLimit: '',
    description: ''
  });

  useEffect(() => {
    const fetchDiscounts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Happy Hour',
            type: 'percentage',
            value: 15,
            startDate: '2024-03-01',
            endDate: '2024-12-31',
            applicableItems: ['Beverages'],
            minOrderValue: 50,
            maxDiscount: 100,
            usageLimit: 1000,
            usedCount: 234,
            status: 'active',
            description: 'Get 15% off on all beverages between 3 PM and 6 PM'
          },
          {
            id: 2,
            name: 'Staff Discount',
            type: 'percentage',
            value: 20,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            applicableItems: ['All'],
            minOrderValue: 0,
            maxDiscount: 200,
            usageLimit: null,
            usedCount: 567,
            status: 'active',
            description: 'Employee discount on all items'
          },
          {
            id: 3,
            name: 'Lunch Special',
            type: 'fixed',
            value: 25,
            startDate: '2024-03-01',
            endDate: '2024-06-30',
            applicableItems: ['Food'],
            minOrderValue: 100,
            maxDiscount: 25,
            usageLimit: 500,
            usedCount: 123,
            status: 'active',
            description: 'K25 off on lunch menu items between 12 PM and 3 PM'
          }
        ];
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleAddDiscount = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveDiscount = () => {
    // Implement save functionality
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="discounts-container">
      <div className="discounts-header">
        <h2>Discounts</h2>
        <button className="add-btn" onClick={handleAddDiscount}>
          <i className="fas fa-plus"></i>
          Add Discount
        </button>
      </div>

      <div className="discounts-grid">
        {discounts.map(discount => (
          <div key={discount.id} className="discount-card">
            <div className="discount-icon">
              <i className="fas fa-percent"></i>
            </div>
            <div className="discount-details">
              <h3>{discount.name}</h3>
              <p className="discount-description">{discount.description}</p>
              <div className="discount-stats">
                <span>
                  {discount.type === 'percentage' ? `${discount.value}%` : `K${discount.value}`}
                </span>
                <span>•</span>
                <span>Used: {discount.usedCount}</span>
                {discount.usageLimit && (
                  <>
                    <span>•</span>
                    <span>Limit: {discount.usageLimit}</span>
                  </>
                )}
              </div>
              <div className="applicable-items">
                {discount.applicableItems.map(item => (
                  <span key={item} className="item-tag">{item}</span>
                ))}
              </div>
              <div className="discount-meta">
                <span className={`status ${discount.status}`}>
                  {discount.status}
                </span>
                <span className="date-range">
                  {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="discount-actions">
              <button title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button title="Delete">
                <i className="fas fa-trash"></i>
              </button>
              <button title={discount.status === 'active' ? 'Deactivate' : 'Activate'}>
                <i className={`fas fa-${discount.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddDiscountModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Discounts; 