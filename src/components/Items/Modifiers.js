import React, { useState, useEffect } from 'react';
import './Items.css';

const Modifiers = () => {
  const [modifiers, setModifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newModifier, setNewModifier] = useState({
    name: '',
    type: 'single',
    options: [''],
    defaultPrice: 0,
    appliesTo: []
  });

  useEffect(() => {
    const fetchModifiers = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Size',
            type: 'single',
            options: ['Small', 'Medium', 'Large'],
            defaultPrice: 0,
            appliesTo: ['Beverages', 'Pizza', 'Burgers'],
            itemCount: 12,
            status: 'active'
          },
          {
            id: 2,
            name: 'Extra Cheese',
            type: 'boolean',
            options: ['Yes'],
            defaultPrice: 10.00,
            appliesTo: ['Pizza', 'Burgers', 'Sandwiches'],
            itemCount: 8,
            status: 'active'
          },
          {
            id: 3,
            name: 'Spicy Level',
            type: 'single',
            options: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
            defaultPrice: 0,
            appliesTo: ['Food'],
            itemCount: 15,
            status: 'active'
          },
          {
            id: 4,
            name: 'Toppings',
            type: 'multiple',
            options: ['Mushrooms', 'Onions', 'Peppers', 'Olives'],
            defaultPrice: 5.00,
            appliesTo: ['Pizza', 'Salads'],
            itemCount: 6,
            status: 'active'
          }
        ];
        setModifiers(data);
      } catch (error) {
        console.error('Error fetching modifiers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModifiers();
  }, []);

  const handleAddOption = () => {
    setNewModifier({
      ...newModifier,
      options: [...newModifier.options, '']
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newModifier.options];
    newOptions[index] = value;
    setNewModifier({
      ...newModifier,
      options: newOptions
    });
  };

  const handleRemoveOption = (index) => {
    setNewModifier({
      ...newModifier,
      options: newModifier.options.filter((_, i) => i !== index)
    });
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
        <span>Loading modifiers...</span>
      </div>
    );
  }

  return (
    <div className="modifiers-container">
      <div className="modifiers-header">
        <h2>Modifiers</h2>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          <i className="fas fa-plus"></i> Add Modifier
        </button>
      </div>

      <div className="modifiers-grid">
        {modifiers.map(modifier => (
          <div key={modifier.id} className="modifier-card">
            <div className="modifier-icon">
              <i className="fas fa-sliders-h"></i>
            </div>
            <div className="modifier-details">
              <h3>{modifier.name}</h3>
              <p className="modifier-type">Type: {modifier.type}</p>
              <div className="modifier-options">
                {modifier.options.map((option, index) => (
                  <span key={index} className="option-tag">{option}</span>
                ))}
              </div>
              <p className="modifier-price">
                Default Price: {modifier.defaultPrice > 0 ? `K${modifier.defaultPrice.toFixed(2)}` : 'Free'}
              </p>
              <p className="modifier-stats">
                <span>{modifier.itemCount} items</span>
                <span className={`status ${modifier.status}`}>{modifier.status}</span>
              </p>
              <div className="applies-to">
                {modifier.appliesTo.map(category => (
                  <span key={category} className="category-tag">{category}</span>
                ))}
              </div>
            </div>
            <div className="modifier-actions">
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
            <h3>Add New Modifier</h3>
            <div className="modal-content">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newModifier.name}
                  onChange={(e) => setNewModifier({...newModifier, name: e.target.value})}
                  placeholder="Modifier name"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newModifier.type}
                  onChange={(e) => setNewModifier({...newModifier, type: e.target.value})}
                >
                  <option value="single">Single Selection</option>
                  <option value="multiple">Multiple Selection</option>
                  <option value="boolean">Yes/No</option>
                </select>
              </div>
              <div className="form-group">
                <label>Options</label>
                {newModifier.options.map((option, index) => (
                  <div key={index} className="option-input">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder="Option name"
                    />
                    <button onClick={() => handleRemoveOption(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
                <button className="add-option-btn" onClick={handleAddOption}>
                  <i className="fas fa-plus"></i> Add Option
                </button>
              </div>
              <div className="form-group">
                <label>Default Price</label>
                <input
                  type="number"
                  value={newModifier.defaultPrice}
                  onChange={(e) => setNewModifier({...newModifier, defaultPrice: parseFloat(e.target.value)})}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => setIsAddModalOpen(false)}>
                Save Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modifiers; 