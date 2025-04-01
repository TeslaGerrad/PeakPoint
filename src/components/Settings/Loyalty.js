import React, { useState } from 'react';
import './Loyalty.css';

const Loyalty = () => {
  const [loyaltySettings, setLoyaltySettings] = useState({
    enabled: true,
    pointsPerCurrency: 1,
    minimumPoints: 100,
    expiryDays: 365,
    welcomePoints: 50
  });

  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: 'Free Drink',
      points: 200,
      description: 'Redeem for any drink up to ZMW 25',
      icon: 'fas fa-coffee',
      active: true
    },
    {
      id: 2,
      name: '10% Discount',
      points: 500,
      description: 'Get 10% off your entire order',
      icon: 'fas fa-percent',
      active: true
    },
    {
      id: 3,
      name: 'Free Delivery',
      points: 300,
      description: 'Free delivery on your next order',
      icon: 'fas fa-truck',
      active: true
    },
    {
      id: 4,
      name: 'Birthday Special',
      points: 1000,
      description: 'Special birthday treat worth ZMW 100',
      icon: 'fas fa-gift',
      active: false
    }
  ]);

  const [showAddReward, setShowAddReward] = useState(false);
  const [newReward, setNewReward] = useState({
    name: '',
    points: '',
    description: '',
    icon: 'fas fa-gift'
  });

  const handleSettingChange = (key, value) => {
    setLoyaltySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggleReward = (rewardId) => {
    setRewards(rewards.map(reward =>
      reward.id === rewardId
        ? { ...reward, active: !reward.active }
        : reward
    ));
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    const reward = {
      id: rewards.length + 1,
      ...newReward,
      active: true
    };
    setRewards([...rewards, reward]);
    setShowAddReward(false);
    setNewReward({ name: '', points: '', description: '', icon: 'fas fa-gift' });
  };

  return (
    <div className="loyalty-container">
      <div className="page-header">
        <h2>Loyalty Program</h2>
        <p>Configure your customer loyalty and rewards program</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Program Settings</h3>
          <div className="settings-form">
            <div className="form-group">
              <label className="switch-label">
                Enable Loyalty Program
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={loyaltySettings.enabled}
                    onChange={(e) => handleSettingChange('enabled', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </label>
            </div>

            <div className="form-group">
              <label>Points per ZMW spent</label>
              <input
                type="number"
                value={loyaltySettings.pointsPerCurrency}
                onChange={(e) => handleSettingChange('pointsPerCurrency', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Minimum points for redemption</label>
              <input
                type="number"
                value={loyaltySettings.minimumPoints}
                onChange={(e) => handleSettingChange('minimumPoints', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Points expiry (days)</label>
              <input
                type="number"
                value={loyaltySettings.expiryDays}
                onChange={(e) => handleSettingChange('expiryDays', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Welcome bonus points</label>
              <input
                type="number"
                value={loyaltySettings.welcomePoints}
                onChange={(e) => handleSettingChange('welcomePoints', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="rewards-card">
          <div className="rewards-header">
            <h3>Rewards</h3>
            <button 
              className="add-reward-btn"
              onClick={() => setShowAddReward(true)}
            >
              <i className="fas fa-plus"></i>
              Add Reward
            </button>
          </div>

          <div className="rewards-grid">
            {rewards.map(reward => (
              <div key={reward.id} className="reward-item">
                <div className="reward-icon">
                  <i className={reward.icon}></i>
                </div>
                <div className="reward-info">
                  <h4>{reward.name}</h4>
                  <p>{reward.description}</p>
                  <span className="points-badge">{reward.points} points</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={reward.active}
                    onChange={() => handleToggleReward(reward.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddReward && (
        <div className="modal-overlay" onClick={() => setShowAddReward(false)}>
          <div className="reward-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Reward</h3>
              <button className="close-btn" onClick={() => setShowAddReward(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddReward} className="reward-form">
              <div className="form-group">
                <label>Reward Name</label>
                <input
                  type="text"
                  value={newReward.name}
                  onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Points Required</label>
                <input
                  type="number"
                  value={newReward.points}
                  onChange={(e) => setNewReward({...newReward, points: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newReward.description}
                  onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowAddReward(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loyalty; 