import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    // Store user data with jurisdiction for filtering
    const userWithJurisdiction = {
      ...userData,
      jurisdiction: userData.jurisdiction,
      jurisdictionFilter: getJurisdictionFilter(userData.jurisdiction)
    };
    setUser(userWithJurisdiction);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Helper function to get jurisdiction filter data
  const getJurisdictionFilter = (jurisdiction) => {
    const jurisdictionMap = {
      'mumbai': { state: 'Maharashtra', district: 'Mumbai', coordinates: [19.0760, 72.8777] },
      'chennai': { state: 'Tamil Nadu', district: 'Chennai', coordinates: [13.0827, 80.2707] },
      'kochi': { state: 'Kerala', district: 'Kochi', coordinates: [9.9312, 76.2673] },
      'visakhapatnam': { state: 'Andhra Pradesh', district: 'Visakhapatnam', coordinates: [17.6868, 83.2185] },
      'kolkata': { state: 'West Bengal', district: 'Kolkata', coordinates: [22.5726, 88.3639] }
    };
    return jurisdictionMap[jurisdiction] || null;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
