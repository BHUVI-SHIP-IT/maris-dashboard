import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import OfficialDashboard from './components/official/OfficialDashboard';
import AnalystDashboard from './components/analyst/AnalystDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/official/*" element={
              <ProtectedRoute role="official">
                <OfficialDashboard />
              </ProtectedRoute>
            } />
            <Route path="/analyst/*" element={
              <ProtectedRoute role="analyst">
                <AnalystDashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== role) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default App;
