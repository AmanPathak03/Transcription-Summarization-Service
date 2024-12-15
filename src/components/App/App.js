// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Main from './components/Main/Main.jsx';
import './App.css';

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`app-container ${isSidebarExpanded ? 'expanded' : ''}`}>
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Main isExpanded={isSidebarExpanded} />
    </div>
  );
};

export default App;
