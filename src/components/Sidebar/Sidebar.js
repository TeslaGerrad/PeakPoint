import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, menuItems }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSubmenu = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo" onClick={handleLogoClick}>
        <span className="logo-text">PEAK</span>
        <span className="logo-text-colored">POINT</span>
      </div>
      
      <ul className="sidebar-menu">
        {Object.entries(menuItems).map(([key, item]) => (
          <li key={key} className="menu-item">
            {item.subItems ? (
              <>
                <div 
                  className={`menu-title ${expandedItems[key] ? 'expanded' : ''}`}
                  onClick={() => toggleSubmenu(key)}
                >
                  <i className={`fas fa-${item.icon}`}></i>
                  <span>{item.title}</span>
                  <i className="fas fa-chevron-down arrow"></i>
                </div>
                {expandedItems[key] && (
                  <ul className="submenu">
                    {item.subItems.map((subItem, index) => (
                      <li key={index}>
                        <Link 
                          to={`/dashboard/${subItem.path}`}
                          className={location.pathname === `/dashboard/${subItem.path}` ? 'active' : ''}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link 
                to={`/dashboard/${item.path}`}
                className={location.pathname === `/dashboard/${item.path}` ? 'active' : ''}
              >
                <i className={`fas fa-${item.icon}`}></i>
                <span>{item.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar; 