import React, { useState, useEffect } from 'react';
import './Employees.css';

const AccessRights = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            name: 'Admin',
            permissions: {
              dashboard: ['view', 'edit', 'add', 'delete'],
              inventory: ['view', 'edit', 'add', 'delete'],
              employees: ['view', 'edit', 'add', 'delete'],
              reports: ['view', 'edit', 'export', 'delete'],
              settings: ['view', 'edit', 'add', 'delete']
            }
          },
          {
            id: 2,
            name: 'Manager',
            permissions: {
              dashboard: ['view', 'edit'],
              inventory: ['view', 'edit', 'add'],
              employees: ['view', 'edit'],
              reports: ['view', 'export'],
              settings: ['view', 'edit']
            }
          },
          {
            id: 3,
            name: 'Cashier',
            permissions: {
              dashboard: ['view'],
              inventory: ['view'],
              employees: ['view'],
              reports: ['view'],
              settings: ['view']
            }
          }
        ];
        setRoles(data);
        // Set Admin as default selected role
        setSelectedRole(data[0]);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handlePermissionToggle = (module, permission) => {
    if (!selectedRole || !isEditMode) return;

    setRoles(prevRoles => {
      return prevRoles.map(role => {
        if (role.id === selectedRole.id) {
          const permissions = [...role.permissions[module]];
          const index = permissions.indexOf(permission);
          
          if (index === -1) {
            permissions.push(permission);
          } else {
            permissions.splice(index, 1);
          }

          return {
            ...role,
            permissions: {
              ...role.permissions,
              [module]: permissions
            }
          };
        }
        return role;
      });
    });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="access-rights-container">
      <div className="access-header">
        <h2>Access Rights</h2>
        {selectedRole && (
          <div className="header-actions">
            <span className="role-type">
              <i className="fas fa-shield-alt"></i>
              {selectedRole.name} Role
            </span>
            <button 
              className={`edit-btn ${isEditMode ? 'active' : ''}`}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <i className="fas fa-edit"></i>
              {isEditMode ? 'Save Changes' : 'Edit Permissions'}
            </button>
          </div>
        )}
      </div>

      <div className="access-content">
        <div className="roles-list">
          {roles.map(role => (
            <div 
              key={role.id} 
              className={`role-item ${selectedRole?.id === role.id ? 'active' : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              <i className="fas fa-user-shield"></i>
              <span>{role.name}</span>
            </div>
          ))}
        </div>

        {selectedRole && (
          <div className="permissions-grid">
            <div className="grid-header">
              <div className="module-column">Module</div>
              <div className="permissions-column">Permissions</div>
            </div>
            {Object.entries(selectedRole.permissions).map(([module, permissions]) => (
              <div key={module} className="grid-row">
                <div className="module-column">
                  <i className={`fas fa-${getModuleIcon(module)}`}></i>
                  {formatModuleName(module)}
                </div>
                <div className="permissions-column">
                  {['view', 'edit', 'add', 'delete'].map(permission => (
                    <label 
                      key={permission}
                      className={`permission-checkbox ${!isEditMode ? 'disabled' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(module, permission)}
                        disabled={!isEditMode}
                      />
                      <span>{formatPermissionName(permission)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getModuleIcon = (module) => {
  const icons = {
    dashboard: 'chart-line',
    inventory: 'box',
    employees: 'users',
    reports: 'file-alt',
    settings: 'cog'
  };
  return icons[module] || 'circle';
};

const formatModuleName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const formatPermissionName = (permission) => {
  return permission.charAt(0).toUpperCase() + permission.slice(1);
};

export default AccessRights; 