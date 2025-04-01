import React, { useState, useEffect } from 'react';
import './Integrations.css';

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewTokenForm, setShowNewTokenForm] = useState(false);
  const [newTokenData, setNewTokenData] = useState({
    name: '',
    description: '',
    permissions: ['read']
  });

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Mobile App Token',
            token: 'xxxx-xxxx-xxxx-7890',
            created: '2024-03-01T10:00:00',
            lastUsed: '2024-03-20T15:30:00',
            status: 'active',
            permissions: ['read', 'write'],
            description: 'Used for mobile app integration'
          },
          {
            id: 2,
            name: 'POS Integration',
            token: 'xxxx-xxxx-xxxx-4567',
            created: '2024-02-15T09:00:00',
            lastUsed: '2024-03-20T14:45:00',
            status: 'active',
            permissions: ['read', 'write', 'delete'],
            description: 'Point of Sale system integration'
          },
          {
            id: 3,
            name: 'Analytics Token',
            token: 'xxxx-xxxx-xxxx-1234',
            created: '2024-01-20T11:00:00',
            lastUsed: '2024-03-19T16:20:00',
            status: 'inactive',
            permissions: ['read'],
            description: 'Used for analytics dashboard'
          }
        ];
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const handleCreateToken = (e) => {
    e.preventDefault();
    // Handle token creation
    console.log('Creating new token:', newTokenData);
    setShowNewTokenForm(false);
  };

  const handleRevokeToken = (tokenId) => {
    // Handle token revocation
    console.log('Revoking token:', tokenId);
  };

  const handleRegenerateToken = (tokenId) => {
    // Handle token regeneration
    console.log('Regenerating token:', tokenId);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="tokens-container">
      <div className="tokens-header">
        <h2>API Tokens</h2>
        <button 
          className="create-token-btn"
          onClick={() => setShowNewTokenForm(true)}
        >
          <i className="fas fa-plus"></i>
          Create New Token
        </button>
      </div>

      {showNewTokenForm && (
        <div className="token-form-container" onClick={() => setShowNewTokenForm(false)}>
          <div className="token-form" onClick={e => e.stopPropagation()}>
            <h3>Create New API Token</h3>
            <form onSubmit={handleCreateToken}>
              <div className="form-group">
                <label>Token Name</label>
                <input
                  type="text"
                  value={newTokenData.name}
                  onChange={(e) => setNewTokenData({...newTokenData, name: e.target.value})}
                  required
                  placeholder="e.g., Mobile App Token"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTokenData.description}
                  onChange={(e) => setNewTokenData({...newTokenData, description: e.target.value})}
                  rows="2"
                  placeholder="What is this token for?"
                />
              </div>

              <div className="form-group">
                <label>Permissions</label>
                <div className="permissions-group">
                  {['read', 'write', 'delete'].map(perm => (
                    <label key={perm} className="permission-checkbox">
                      <input
                        type="checkbox"
                        checked={newTokenData.permissions.includes(perm)}
                        onChange={(e) => {
                          const permissions = e.target.checked
                            ? [...newTokenData.permissions, perm]
                            : newTokenData.permissions.filter(p => p !== perm);
                          setNewTokenData({...newTokenData, permissions});
                        }}
                      />
                      <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowNewTokenForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tokens-list">
        {tokens.map(token => (
          <div key={token.id} className="token-card">
            <div className="token-info">
              <div className="token-header">
                <h3>{token.name}</h3>
                <span className={`token-status ${token.status}`}>
                  {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                </span>
              </div>
              <p className="token-description">{token.description}</p>
              <div className="token-value">
                <span>{token.token}</span>
                <button className="copy-btn" title="Copy token">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <div className="token-meta">
                <span>Created: {new Date(token.created).toLocaleDateString()}</span>
                <span>Last used: {new Date(token.lastUsed).toLocaleDateString()}</span>
              </div>
              <div className="token-permissions">
                {token.permissions.map(perm => (
                  <span key={perm} className="permission-tag">
                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            <div className="token-actions">
              <button 
                className="regenerate-btn"
                onClick={() => handleRegenerateToken(token.id)}
                title="Regenerate token"
              >
                <i className="fas fa-sync-alt"></i>
              </button>
              <button 
                className="revoke-btn"
                onClick={() => handleRevokeToken(token.id)}
                title="Revoke token"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tokens; 