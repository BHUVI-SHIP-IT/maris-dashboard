import React, { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NotificationPanel = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Jurisdiction-specific notifications
    const allNotifications = {
      mumbai: [
      {
        id: 1,
        type: 'alert',
        title: 'Critical Oil Spill Detected',
        message: 'Large oil spill reported near Bandra-Worli Sea Link. Immediate cleanup required.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: 'high',
        location: 'Mumbai'
      },
      {
        id: 2,
        type: 'info',
        title: 'Weather Update',
        message: 'Heavy rainfall warning issued for Chennai coastal areas for next 6 hours.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        priority: 'medium',
        location: 'Chennai'
      },
      {
        id: 3,
        type: 'success',
        title: 'Report Verified',
        message: 'Coastal erosion report #RPT-001 has been successfully verified and assigned.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        location: 'Juhu'
      },
      {
        id: 4,
        type: 'warning',
        title: 'Team Assignment Pending',
        message: 'Flood report #RPT-003 requires immediate team assignment.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        location: 'Colaba'
      },
      {
        id: 5,
        type: 'alert',
        title: 'Cyclone Warning',
        message: 'Cyclonic storm formation detected in Bay of Bengal. Expected landfall in 48 hours.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        priority: 'high',
        location: 'National'
      }
      ],
      chennai: [
        {
          id: 6,
          type: 'warning',
          title: 'Cyclone Alert Chennai',
          message: 'Cyclone warning issued for Chennai coastal areas.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          read: false,
          priority: 'high',
          location: 'Chennai'
        }
      ],
      kochi: [
        {
          id: 7,
          type: 'alert',
          title: 'Backwater Pollution Kochi',
          message: 'Pollution detected in Vembanad Lake backwaters.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          priority: 'medium',
          location: 'Kochi'
        }
      ],
      visakhapatnam: [
        {
          id: 8,
          type: 'info',
          title: 'Port Security Update',
          message: 'Enhanced security measures at Visakhapatnam Port.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          read: true,
          priority: 'low',
          location: 'Visakhapatnam'
        }
      ],
      kolkata: [
        {
          id: 9,
          type: 'alert',
          title: 'River Bank Collapse',
          message: 'Emergency response for Hooghly riverbank collapse.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          read: false,
          priority: 'critical',
          location: 'Kolkata'
        }
      ]
    };

    // Filter notifications based on user's jurisdiction
    const userJurisdiction = user?.jurisdiction;
    const jurisdictionNotifications = allNotifications[userJurisdiction] || [];
    setNotifications(jurisdictionNotifications);
  }, [user]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-maris-blue to-blue-600 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
              <p className="text-sm text-blue-100">{unreadCount} unread messages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length },
              { key: 'warning', label: 'Warnings', count: notifications.filter(n => n.type === 'warning').length },
              { key: 'info', label: 'Info', count: notifications.filter(n => n.type === 'info').length }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === filterOption.key
                    ? 'bg-maris-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Bell className="h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 transition-colors hover:bg-gray-50 ${
                    getPriorityColor(notification.priority)
                  } ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.timestamp.toLocaleTimeString()}
                            </div>
                            <span>📍 {notification.location}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {notification.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-maris-blue hover:text-blue-600 font-medium"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-500 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Mark All Read
            </button>
            <button
              onClick={() => setNotifications([])}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
