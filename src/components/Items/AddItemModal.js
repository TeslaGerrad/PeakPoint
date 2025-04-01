import React, { useState } from 'react';
import './Items.css';

const AddItemModal = ({ isOpen, onClose, categories, modifiers }) => {
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    modifiers: [],
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemData({
          ...itemData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle item creation
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal compact">
        <div className="modal-header">
          <h3>Add New Item</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={itemData.name}
                onChange={(e) => setItemData({...itemData, name: e.target.value})}
                placeholder="e.g., Chicken Burger"
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={itemData.category}
                onChange={(e) => setItemData({...itemData, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                <option value="food">Food</option>
                <option value="beverages">Beverages</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (K)</label>
              <input
                type="number"
                value={itemData.price}
                onChange={(e) => setItemData({...itemData, price: e.target.value})}
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-group">
              <label>Initial Stock</label>
              <input
                type="number"
                value={itemData.stock}
                onChange={(e) => setItemData({...itemData, stock: e.target.value})}
                min="0"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={itemData.description}
              onChange={(e) => setItemData({...itemData, description: e.target.value})}
              placeholder="Brief description of the item"
              rows="2"
            />
          </div>

          <div className="form-row">
            <div className="form-group image-upload-group">
              <label>Image</label>
              <div className="image-upload compact">
                {itemData.image ? (
                  <div className="image-preview">
                    <img src={itemData.image} alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => setItemData({...itemData, image: null})}
                      className="remove-image"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="item-image"
                      hidden
                    />
                    <label htmlFor="item-image" className="upload-btn">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Upload Image</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Modifiers</label>
              <div className="modifier-checkboxes compact">
                {modifiers?.map(mod => (
                  <label key={mod.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={itemData.modifiers.includes(mod.id)}
                      onChange={(e) => {
                        const newModifiers = e.target.checked
                          ? [...itemData.modifiers, mod.id]
                          : itemData.modifiers.filter(id => id !== mod.id);
                        setItemData({...itemData, modifiers: newModifiers});
                      }}
                    />
                    <span>{mod.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal; 