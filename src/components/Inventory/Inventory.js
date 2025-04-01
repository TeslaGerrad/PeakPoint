import React, { useState, useEffect } from 'react';
import './Inventory.css';
import AddStockModal from './AddStockModal';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalStock: 0,
    totalValue: 0,
    stockIn: 0,
    stockOut: 0,
    totalSold: 0,
    totalSoldAmount: 0,
    remaining: 0,
    remainingValue: 0
  });

  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Chicken Burger',
            category: 'Food',
            stock: 150,
            price: 85.00,
            minStock: 50,
            maxStock: 300,
            lastRestocked: '2024-03-15',
            status: 'good'
          },
          {
            id: 2,
            name: 'Coca Cola',
            category: 'Beverages',
            stock: 25,
            price: 15.00,
            minStock: 100,
            maxStock: 500,
            lastRestocked: '2024-03-14',
            status: 'low'
          },
          {
            id: 3,
            name: 'Chocolate Cake',
            category: 'Desserts',
            stock: 45,
            price: 45.00,
            minStock: 20,
            maxStock: 50,
            lastRestocked: '2024-03-16',
            status: 'overstock'
          }
        ];
        setInventory(data);

        // Updated summary calculation
        const summary = data.reduce((acc, item) => {
          const soldQuantity = 150; // Example: Get from actual sales data
          return {
            totalStock: acc.totalStock + item.stock,
            totalValue: acc.totalValue + (item.stock * item.price),
            stockIn: acc.stockIn + (item.status === 'overstock' ? item.stock : 0),
            stockOut: acc.stockOut + (item.status === 'low' ? item.stock : 0),
            totalSold: acc.totalSold + soldQuantity,
            totalSoldAmount: acc.totalSoldAmount + (soldQuantity * item.price),
            remaining: acc.remaining + item.stock,
            remainingValue: acc.remainingValue + (item.stock * item.price)
          };
        }, {
          totalStock: 0,
          totalValue: 0,
          stockIn: 0,
          stockOut: 0,
          totalSold: 0,
          totalSoldAmount: 0,
          remaining: 0,
          remainingValue: 0
        });

        setSummaryData(summary);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          <i className="fas fa-plus"></i>
          Add Stock
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-boxes"></i>
          </div>
          <div className="summary-details">
            <h3>Total Stock</h3>
            <p>{summaryData.totalStock}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="summary-details">
            <h3>Total Value</h3>
            <p>K{summaryData.totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="summary-details">
            <h3>Total Sold</h3>
            <p>{summaryData.totalSold}</p>
            <span className="sub-value">K{summaryData.totalSoldAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-cubes"></i>
          </div>
          <div className="summary-details">
            <h3>Remaining</h3>
            <p>{summaryData.remaining}</p>
            <span className="sub-value">K{summaryData.remainingValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="summary-details">
            <h3>Stock In</h3>
            <p>{summaryData.stockIn}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="summary-details">
            <h3>Stock Out</h3>
            <p>{summaryData.stockOut}</p>
          </div>
        </div>
      </div>

      <div className="inventory-controls">
        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="beverages">Beverages</option>
            <option value="desserts">Desserts</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock Level</option>
            <option value="lastRestocked">Sort by Last Restocked</option>
          </select>
        </div>
      </div>

      <div className="inventory-grid">
        {inventory.map(item => (
          <div key={item.id} className="inventory-card">
            <div className="inventory-icon">
              <i className="fas fa-box"></i>
            </div>
            <div className="inventory-details">
              <h3>{item.name}</h3>
              <div className="inventory-stats">
                <div className="stock-level">
                  <span className="current-stock">{item.stock}</span>
                  <span className="stock-range">
                    Min: {item.minStock} | Max: {item.maxStock}
                  </span>
                </div>
                <div className={`stock-status ${item.status}`}>
                  {item.status === 'good' && <i className="fas fa-check"></i>}
                  {item.status === 'low' && <i className="fas fa-exclamation-triangle"></i>}
                  {item.status === 'overstock' && <i className="fas fa-arrow-up"></i>}
                  {item.status}
                </div>
              </div>
              <div className="last-restocked">
                Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}
              </div>
            </div>
            <div className="inventory-actions">
              <button title="Add Stock">
                <i className="fas fa-plus"></i>
              </button>
              <button title="Adjust Stock">
                <i className="fas fa-edit"></i>
              </button>
              <button title="View History">
                <i className="fas fa-history"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddStockModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        inventory={inventory}
      />
    </div>
  );
};

export default Inventory; 