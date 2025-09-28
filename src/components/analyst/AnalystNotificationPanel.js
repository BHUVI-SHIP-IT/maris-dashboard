import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle, TrendingUp, MapPin, Clock } from 'lucide-react';

const AnalystNotificationPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Comprehensive analyst notifications
    const analystNotifications = [
      {
        id: 1,
        type: 'alert',
        title: 'Critical Risk Zone Detected',
        message: 'Mumbai coastal area showing 87% risk increase in the last 24 hours',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        location: 'Mumbai, Maharashtra',
        severity: 'high',
        category: 'risk_assessment'
      },
      {
        id: 2,
        type: 'trend',
        title: 'Pollution Levels Rising',
        message: 'Chennai and Kolkata showing significant pollution trend increases',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        location: 'Multiple Locations',
        severity: 'medium',
        category: 'environmental'
      },
      {
        id: 3,
        type: 'info',
        title: 'New Data Source Integrated',
        message: 'INCOIS satellite data successfully integrated into predictive models',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        location: 'System Update',
        severity: 'low',
        category: 'system'
      },
      {
        id: 4,
        type: 'alert',
        title: 'Cyclone Formation Detected',
        message: 'Bay of Bengal showing low pressure formation - 72% probability of cyclone development',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        location: 'Bay of Bengal',
        severity: 'high',
        category: 'weather'
      },
      {
        id: 5,
        type: 'trend',
        title: 'Hotspot Pattern Change',
        message: 'Visakhapatnam risk score decreased by 15% - infrastructure improvements detected',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        location: 'Visakhapatnam, AP',
        severity: 'low',
        category: 'infrastructure'
      },
      {
        id: 6,
        type: 'info',
        title: 'Model Accuracy Update',
        message: 'Flood prediction model accuracy improved to 91.3% after latest training',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        location: 'AI System',
        severity: 'low',
        category: 'ai_model'
      },
      {
        id: 7,
        type: 'alert',
        title: 'Unusual Maritime Activity',
        message: 'Increased shipping traffic detected near Kochi - potential congestion risk',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        location: 'Kochi, Kerala',
        severity: 'medium',
        category: 'maritime_traffic'
      },
      {
        id: 8,
        type: 'trend',
        title: 'Seasonal Pattern Alert',
        message: 'Monsoon impact predictions updated - 23% increase in flooding risk for Gujarat coast',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        location: 'Gujarat Coast',
        severity: 'medium',
        category: 'seasonal'
      }
    ];
    
    setNotifications(analystNotifications);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'info': return <Info className="h-5 w-5 text-green-500" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'alerts') return notification.type === 'alert';
    if (activeTab === 'trends') return notification.type === 'trend';
    if (activeTab === 'system') return notification.category === 'system' || notification.category === 'ai_model';
    return true;
  });

  const unreadCount = notifications.filter(n => n.severity === 'high').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl z-[10000]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600">{unreadCount} high priority alerts</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'alerts', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length },
              { id: 'trends', label: 'Trends', count: notifications.filter(n => n.type === 'trend').length },
              { id: 'system', label: 'System', count: notifications.filter(n => n.category === 'system' || n.category === 'ai_model').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-maris-blue border-b-2 border-maris-blue bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <CheckCircle className="h-12 w-12 mb-2" />
                <p>No notifications in this category</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${getSeverityColor(notification.severity)} hover:shadow-sm transition-shadow cursor-pointer`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {notification.location}
                          <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full">
                            {notification.category.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full px-4 py-2 text-sm text-maris-blue hover:bg-blue-50 rounded-lg transition-colors">
              Mark All as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystNotificationPanel;
