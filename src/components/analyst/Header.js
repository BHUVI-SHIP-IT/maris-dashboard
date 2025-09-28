import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Waves, Bell, LogOut, BarChart3 } from 'lucide-react';
import NotificationPanel from '../common/NotificationPanel';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <NotificationPanel 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-maris-blue p-2 rounded-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">M.A.R.I.S Analytics</h1>
                <p className="text-sm text-gray-600">National Maritime Intelligence Dashboard</p>
              </div>
            </div>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Live Data</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Bell className="h-5 w-5" />
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white animate-pulse"></span>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-maris-blue flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Data Analyst</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
