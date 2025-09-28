import React, { useState } from 'react';
import { Twitter, Facebook, Instagram, Globe, Filter, RefreshCw, ExternalLink } from 'lucide-react';

const SocialMediaData = () => {
  const [activeTab, setActiveTab] = useState('merged');
  const [filters, setFilters] = useState({
    source: 'all',
    sentiment: 'all',
    timeRange: '24h'
  });

  const socialPosts = [
    {
      id: 1,
      source: 'twitter',
      author: '@MumbaiCoastGuard',
      content: 'Oil spill detected near Bandra-Worli Sea Link. Marine cleanup operations initiated immediately. Citizens advised to avoid the area.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      sentiment: 'urgent',
      engagement: { likes: 234, shares: 89, comments: 45 },
      verified: true,
      location: 'Mumbai'
    },
    {
      id: 2,
      source: 'facebook',
      author: 'Chennai Port Trust',
      content: 'Heavy rainfall warning issued for Chennai coastal areas. Fishing boats advised to return to harbor immediately.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      sentiment: 'warning',
      engagement: { likes: 156, shares: 67, comments: 23 },
      verified: true,
      location: 'Chennai'
    },
    {
      id: 3,
      source: 'twitter',
      author: '@CitizenReporter',
      content: 'Massive waves hitting Marine Drive! Water level rising rapidly. #MumbaiFloods #MarineDrive',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      sentiment: 'concerned',
      engagement: { likes: 89, shares: 156, comments: 78 },
      verified: false,
      location: 'Mumbai'
    }
  ];

  const externalData = [
    {
      id: 1,
      source: 'INCOIS',
      title: 'High Wave Alert - West Coast',
      content: 'Wave heights of 3-4 meters expected along Maharashtra and Goa coast for next 24 hours.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      severity: 'high',
      url: 'https://incois.gov.in/alerts/wave-alert-001'
    },
    {
      id: 2,
      source: 'IMD',
      title: 'Cyclone Warning - Bay of Bengal',
      content: 'Low pressure area in Bay of Bengal likely to intensify into cyclonic storm in next 48 hours.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      severity: 'critical',
      url: 'https://mausam.imd.gov.in/cyclone-warning-002'
    },
    {
      id: 3,
      source: 'ISRO',
      title: 'Satellite Imagery - Coastal Changes',
      content: 'Satellite data shows significant coastal erosion along Odisha coastline post-cyclone.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      severity: 'medium',
      url: 'https://isro.gov.in/satellite-data-coastal-003'
    }
  ];

  const getSourceIcon = (source) => {
    switch (source) {
      case 'twitter': return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'facebook': return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
      default: return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'concerned': return 'bg-yellow-100 text-yellow-800';
      case 'positive': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'merged', name: 'Merged Feed', icon: Globe },
    { id: 'social', name: 'Social Media', icon: Twitter },
    { id: 'incois', name: 'INCOIS', icon: Globe },
    { id: 'imd', name: 'IMD', icon: Globe },
    { id: 'isro', name: 'ISRO', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Social Media & External Data</h1>
            <p className="text-gray-600">Monitor social feeds and official data sources for maritime incidents</p>
          </div>
          
          {/* Refresh Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-maris-blue text-white rounded-lg hover:bg-blue-600">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-maris-blue text-maris-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filters.source}
                onChange={(e) => setFilters({...filters, source: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Sources</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="official">Official Sources</option>
              </select>
            </div>
            
            <select
              value={filters.sentiment}
              onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Sentiments</option>
              <option value="urgent">Urgent</option>
              <option value="warning">Warning</option>
              <option value="concerned">Concerned</option>
              <option value="positive">Positive</option>
            </select>
            
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'merged' || activeTab === 'social' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Social Media Posts</h3>
              {socialPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getSourceIcon(post.source)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{post.author}</span>
                        {post.verified && (
                          <span className="text-blue-500 text-xs">✓ Verified</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(post.sentiment)}`}>
                          {post.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>🔄 {post.engagement.shares}</span>
                          <span>💬 {post.engagement.comments}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{post.location}</span>
                          <span>•</span>
                          <span>{post.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Official Data Sources</h3>
              {externalData.filter(item => activeTab === 'merged' || item.source.toLowerCase() === activeTab).map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{item.source}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(item.severity)}`}>
                          {item.severity}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700 mb-3">{item.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{item.timestamp.toLocaleString()}</span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-maris-blue hover:text-blue-600"
                        >
                          <span>View Source</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaData;
