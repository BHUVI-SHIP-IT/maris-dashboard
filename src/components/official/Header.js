import React, { useState } from 'react';
import { Menu, Bell, Search, RefreshCw } from 'lucide-react';
import NotificationPanel from '../common/NotificationPanel';

const Header = ({ setSidebarOpen }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
      <NotificationPanel 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Official Dashboard</h1>
            <p className="text-sm text-gray-500">Maritime Emergency Management</p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports, locations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-maris-blue focus:border-maris-blue"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Refresh button */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
            <RefreshCw className="h-5 w-5" />
          </button>

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

          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
