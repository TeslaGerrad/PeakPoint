import React, { useState, useEffect } from 'react';
import './Items.css';
import AddItemModal from './AddItemModal';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Extended sample data
        const data = [
          {
            id: 1,
            name: 'Chicken Burger',
            category: 'Food',
            price: 85.00,
            stock: 150,
            status: 'active',
            image: '/images/chicken-burger.jpg',
            modifiers: ['Size', 'Extra Cheese', 'Spicy Level']
          },
          {
            id: 2,
            name: 'Coca Cola',
            category: 'Beverages',
            price: 15.00,
            stock: 500,
            status: 'active',
            image: '/images/coca-cola.jpg',
            modifiers: ['Size', 'Ice']
          },
          {
            id: 3,
            name: 'Chocolate Cake',
            category: 'Desserts',
            price: 45.00,
            stock: 20,
            status: 'active',
            image: '/images/chocolate-cake.jpg',
            modifiers: ['Size', 'Extra Frosting']
          },
          {
            id: 4,
            name: 'Pizza Margherita',
            category: 'Food',
            price: 120.00,
            stock: 50,
            status: 'active',
            image: '/images/pizza.jpg',
            modifiers: ['Size', 'Extra Cheese', 'Crust Type']
          },
          {
            id: 5,
            name: 'Green Salad',
            category: 'Food',
            price: 35.00,
            stock: 25,
            status: 'active',
            image: '/images/salad.jpg',
            modifiers: ['Dressing', 'Extra Toppings']
          },
          {
            id: 6,
            name: 'Iced Tea',
            category: 'Beverages',
            price: 18.00,
            stock: 200,
            status: 'active',
            image: '/images/iced-tea.jpg',
            modifiers: ['Size', 'Ice', 'Sweetness']
          }
        ];
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    setIsAddModalOpen(true);
  };

  const handleEditItem = (id) => {
    // Implement edit item functionality
  };

  const handleDeleteItem = (id) => {
    // Implement delete item functionality
  };

  const availableModifiers = [
    { id: 1, name: 'Size' },
    { id: 2, name: 'Extra Cheese' },
    { id: 3, name: 'Spicy Level' },
    { id: 4, name: 'Toppings' }
  ];

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="items-container">
      <div className="items-header">
        <h2>Items</h2>
        <button className="add-btn" onClick={handleAddItem}>
          <i className="fas fa-plus"></i>
          Add Item
        </button>
      </div>

      <div className="items-controls">
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
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>
      </div>

      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-image">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="item-icon">
                  <i className="fas fa-utensils"></i>
                </div>
              )}
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <div className="item-info">
                <span className="item-price">K{item.price.toFixed(2)}</span>
                <span className="stock-count">
                  <i className="fas fa-box"></i> {item.stock}
                </span>
              </div>
            </div>
            <div className="item-actions">
              <button title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button title="Delete">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default ItemList; 