import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Files from './components/Files/FIles.jsx'; // Ensure this matches the actual filename
import './App.css';

// Component for handling protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Main application layout with sidebar
const App = () => {
  
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <Main isExpanded={isSidebarExpanded} />
      {/* Main content */}
      <div className="main-content">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Main isExpanded={isSidebarExpanded} />} />
          <Route path="/FIles" element={<Files />} />
          {/* Add additional protected routes here */}
        </Routes>
      </div>
    </div>
  );
};

// Application wrapper with routing setup
const AppWrapper = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/FIles" element={<Files />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          {/* Fallback Route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};


export default AppWrapper;
