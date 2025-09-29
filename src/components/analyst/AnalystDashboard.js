import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import NationalMap from './pages/NationalMap';
import CitizenReports from './pages/CitizenReports';
import TrendsHotspots from './pages/TrendsHotspots';
import SocialMediaData from './pages/SocialMediaData';
import PredictiveAnalytics from './pages/PredictiveAnalytics';

const AnalystDashboard = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/analyst/national-map" replace />} />
            <Route path="/national-map" element={<NationalMap />} />
            <Route path="/citizen-reports" element={<CitizenReports />} />
            <Route path="/trends" element={<TrendsHotspots />} />
            <Route path="/social-data" element={<SocialMediaData />} />
            <Route path="/predictive" element={<PredictiveAnalytics />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AnalystDashboard;
