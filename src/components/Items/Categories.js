import React, { useState, useEffect } from 'react';
import './Items.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        const data = [
          {
            id: 1,
            name: 'Food',
            description: 'Main dishes and appetizers',
            itemCount: 45,
            status: 'active'
          },
          {
            id: 2,
            name: 'Beverages',
            description: 'Drinks and refreshments',
            itemCount: 28,
            status: 'active'
          },
          {
            id: 3,
            name: 'Desserts',
            description: 'Sweet treats and desserts',
            itemCount: 15,
            status: 'active'
          }
        ];
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveCategory = () => {
    // Implement save functionality
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2>Categories</h2>
        <button className="add-btn" onClick={handleAddCategory}>
          <i className="fas fa-plus"></i> Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-icon">
              <i className="fas fa-folder"></i>
            </div>
            <div className="category-details">
              <h3>{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <p className="category-stats">
                <span>{category.itemCount} items</span>
                <span className={`status ${category.status}`}>{category.status}</span>
              </p>
            </div>
            <div className="category-actions">
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

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Category</h3>
            <div className="modal-content">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Category name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Category description"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveCategory}>
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 