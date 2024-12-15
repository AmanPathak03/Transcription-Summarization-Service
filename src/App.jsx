import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import Files from './components/Files/FIles'; // Adjust case to match the actual file name
import './App.css';

const App = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div className={`app-container ${isSidebarExpanded ? 'expanded' : ''}`}>
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Main isExpanded={isSidebarExpanded} />
      <Routes>
        <Route path="/FIles" element={<Files />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/FIles" element={<Files />} />
          {/* Protected routes */}
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppWrapper;
