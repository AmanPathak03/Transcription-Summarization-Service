// Sidebar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets'; 
import './Sidebar.css'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const links = [
    { label: 'Home', icon: assets.home_icon, href: '#' },
    { label: 'Profile', icon: assets.profile_icon, href: '#' },
    { label: 'Files', icon: assets.files_icon, href: '/FIles' },
    // { label: 'Settings', icon: assets.setting_icon, href: '#' },
    { label: 'Logout', icon: assets.logout_icon, href: '#' },
  ];

  return (
    <motion.div
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 200 : 60 }}
      transition={{ duration: 0.3 }}
    >
      {/* Navigation Links */}
      <div className="nav-menu">
        {links.map((link, index) => (
          <Link key={index} to={link.href} className="menu-item">
            <img src={link.icon} alt={`${link.label} icon`} className="icon" />
            {isExpanded && <span className="menu-text">{link.label}</span>}
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <img
          src={assets.user_icon} 
          alt="Profile"
          className="profile-img"
        />
        {isExpanded && <span className="profile-name">Aman</span>}
      </div>
    </motion.div>
  );
};

export default Sidebar;
