import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, Shield, Clock, MapPin, Users, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const SocialMediaAlerts = () => {
  const [approvedAlerts, setApprovedAlerts] = useState([]);
  const [filters, setFilters] = useState({
    source: 'all',
    priority: 'all',
    timeRange: '24h'
  });

  useEffect(() => {
    // Mock approved social media alerts that would come from analyst dashboard
    const mockApprovedAlerts = [
      {
        id: 1,
        originalPostId: 3,
        source: 'twitter',
        author: '@CitizenReporter',
        content: 'Massive waves hitting Marine Drive! Water level rising rapidly. #MumbaiFloods #MarineDrive',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        location: 'Mumbai',
        priority: 'high',
        credibilityScore: 0.75,
        approvedBy: 'Data Analyst',
        approvedAt: new Date(Date.now() - 30 * 60 * 1000),
        approvalNotes: 'Verified through multiple sources and weather data',
        officialResponse: 'pending',
        engagement: { likes: 89, shares: 156, comments: 78 },
        alertType: 'weather_warning'
      },
      {
        id: 2,
        originalPostId: 5,
        source: 'instagram',
        author: '@VisakhapatnamFisherman',
        content: 'Unusual fish behavior observed near the coast. Large schools moving away from shore. Could indicate underwater disturbance.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        location: 'Visakhapatnam',
        priority: 'medium',
        credibilityScore: 0.65,
        approvedBy: 'Senior Analyst',
        approvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        approvalNotes: 'Fisherman has good track record, worth investigating',
        officialResponse: 'investigating',
        engagement: { likes: 67, shares: 23, comments: 89 },
        alertType: 'environmental_concern'
      },
      {
        id: 3,
        originalPostId: 8,
        source: 'twitter',
        author: '@PuriBeachWatch',
        content: 'Turtle nesting season begins! 47 Olive Ridley turtles spotted near Puri beach. Conservation efforts in full swing. 🐢',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        location: 'Puri',
        priority: 'low',
        credibilityScore: 0.78,
        approvedBy: 'Marine Biologist',
        approvedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        approvalNotes: 'Positive conservation news, good for public awareness',
        officialResponse: 'acknowledged',
        engagement: { likes: 456, shares: 234, comments: 123 },
        alertType: 'conservation_update'
      },
      {
        id: 4,
        originalPostId: 11,
        source: 'facebook',
        author: '@BhubaneswarWeather',
        content: 'Cyclone Amphan aftermath: Coastal restoration work progressing well. 78% of damaged infrastructure repaired.',
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
        location: 'Bhubaneswar',
        priority: 'medium',
        credibilityScore: 0.72,
        approvedBy: 'Infrastructure Analyst',
        approvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        approvalNotes: 'Progress update verified with local authorities',
        officialResponse: 'responded',
        engagement: { likes: 189, shares: 67, comments: 34 },
        alertType: 'infrastructure_update'
      }
    ];

    setApprovedAlerts(mockApprovedAlerts);
  }, []);

  const getSourceIcon = (source) => {
    switch (source) {
      case 'twitter': return <Twitter className="h-5 w-5 text-blue-500" />;
      case 'facebook': return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram': return <Instagram className="h-5 w-5 text-pink-500" />;
      default: return <ExternalLink className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResponseStatusColor = (status) => {
    switch (status) {
      case 'responded': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOfficialResponse = (alertId, responseType) => {
    setApprovedAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, officialResponse: responseType, respondedAt: new Date() }
          : alert
      )
    );

    const alertItem = approvedAlerts.find(a => a.id === alertId);
    window.alert(`Official response "${responseType}" recorded for social media alert.`);
    console.log('Official response recorded:', { alertId, responseType, timestamp: new Date() });
  };

  const filteredAlerts = approvedAlerts.filter(alert => {
    if (filters.source !== 'all' && alert.source !== filters.source) return false;
    if (filters.priority !== 'all' && alert.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Approved Social Media Alerts</h1>
        <p className="text-gray-600">Monitor and respond to analyst-approved social media posts requiring official attention</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Alerts</p>
              <p className="text-2xl font-bold">{approvedAlerts.length}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">High Priority</p>
              <p className="text-2xl font-bold">{approvedAlerts.filter(a => a.priority === 'high').length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Responded</p>
              <p className="text-2xl font-bold">{approvedAlerts.filter(a => a.officialResponse === 'responded').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending Action</p>
              <p className="text-2xl font-bold">{approvedAlerts.filter(a => a.officialResponse === 'pending').length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select 
              value={filters.source} 
              onChange={(e) => setFilters({...filters, source: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Sources</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              value={filters.priority} 
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select 
              value={filters.timeRange} 
              onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Approved Alerts List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Approved Social Media Alerts</h2>
            <span className="text-sm text-gray-500">{filteredAlerts.length} alerts found</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getSourceIcon(alert.source)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{alert.author}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getResponseStatusColor(alert.officialResponse)}`}>
                      {alert.officialResponse.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.content}</p>
                  
                  {/* Approval Information */}
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Analyst Approval</span>
                      <span className="text-xs text-green-600">
                        Credibility: {(alert.credibilityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Approved by {alert.approvedBy} at {alert.approvedAt.toLocaleTimeString()}
                    </p>
                    {alert.approvalNotes && (
                      <p className="text-sm text-green-600 mt-1">
                        <strong>Notes:</strong> {alert.approvalNotes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {alert.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>❤️ {alert.engagement.likes}</span>
                        <span>🔄 {alert.engagement.shares}</span>
                        <span>💬 {alert.engagement.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Official Response Actions */}
                  {alert.officialResponse === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOfficialResponse(alert.id, 'investigating')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Mark as Investigating
                      </button>
                      <button
                        onClick={() => handleOfficialResponse(alert.id, 'acknowledged')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => handleOfficialResponse(alert.id, 'responded')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Mark as Responded
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAlerts;
