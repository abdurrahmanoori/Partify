import React, { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { icon: '👤', label: 'Customer', active: true },
    { icon: '📊', label: 'Dashboard' },
    { icon: '📦', label: 'Products' },
    { icon: '📋', label: 'Orders' },
    { icon: '📈', label: 'Analytics' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📞', label: 'Support' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Partify</h2>
          <button
            className="sidebar-close"
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="sidebar-menu-item">
                <a
                  href="#"
                  className={`sidebar-menu-link ${item.active ? 'active' : ''}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;