import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MapOverview from './pages/MapOverview';
import VerificationQueue from './pages/VerificationQueue';
import AssignmentTracking from './pages/AssignmentTracking';
import AlertsAdvisories from './pages/AlertsAdvisories';
import SocialMediaAlerts from './pages/SocialMediaAlerts';
import ReportsExport from './pages/ReportsExport';

const OfficialDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-hidden bg-gray-100">
          <div className="h-full overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/official/map" replace />} />
              <Route path="/map" element={<MapOverview />} />
              <Route path="/verification" element={<VerificationQueue />} />
              <Route path="/assignments" element={<AssignmentTracking />} />
              <Route path="/alerts" element={<AlertsAdvisories />} />
              <Route path="/social-alerts" element={<SocialMediaAlerts />} />
              <Route path="/reports" element={<ReportsExport />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OfficialDashboard;
