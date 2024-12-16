import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../Assets/assets'; 
import './Sidebar.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the AuthContext hook

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logout } = useAuth(); // Access the logout function from AuthContext
  const navigate = useNavigate(); // For navigating programmatically

  const links = [
    { label: 'Home', icon: assets.home_icon, href: '/' },
    { label: 'Profile', icon: assets.profile_icon, href: '/profile' },
    { label: 'Files', icon: assets.files_icon, href: '/FIles' },
  ];

  const handleLogout = () => {
    logout(); // Call the logout function to clear authentication
    navigate('/login'); // Redirect to the login page
  };

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
        {/* Logout Button */}
        <div
          className="menu-item logout"
          onClick={handleLogout} // Handle logout on click
        >
          <img src={assets.logout_icon} alt="Logout icon" className="icon" />
          {isExpanded && <span className="menu-text">Logout</span>}
        </div>
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
