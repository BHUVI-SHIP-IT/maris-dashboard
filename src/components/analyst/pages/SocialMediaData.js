import React, { useState } from 'react';
import { Twitter, Facebook, Instagram, Globe, Filter, RefreshCw, ExternalLink, AlertTriangle, Shield, X } from 'lucide-react';

const SocialMediaData = () => {
  const [activeTab, setActiveTab] = useState('merged');
  const [filters, setFilters] = useState({
    source: 'all',
    sentiment: 'all',
    timeRange: '24h'
  });
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvedPosts, setApprovedPosts] = useState([]);
  
  const handleRefresh = () => {
    setLastRefresh(new Date());
    alert('Data refreshed successfully! Latest social media posts and official reports loaded.');
    console.log('Data refresh triggered at:', new Date().toISOString());
  };

  const handleApprovePost = (postId, approvalNotes = '') => {
    const post = socialPosts.find(p => p.id === postId);
    if (!post) return;

    const approvedPost = {
      ...post,
      approvalStatus: 'approved',
      approvedBy: 'Data Analyst',
      approvedAt: new Date(),
      approvalNotes: approvalNotes,
      officialAlert: true
    };

    setApprovedPosts(prev => [...prev, approvedPost]);
    
    // In real app, would send to official dashboard
    console.log('Post approved for official alerts:', approvedPost);
    alert(`Post "${post.content.substring(0, 50)}..." has been approved and sent to Official Dashboard as an alert.`);
  };

  const handleRejectPost = (postId, rejectionReason) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    const post = socialPosts.find(p => p.id === postId);
    if (!post) return;

    console.log('Post rejected:', { postId, reason: rejectionReason });
    alert(`Post rejected: ${rejectionReason}`);
  };

  const handleRequestMoreInfo = (postId, infoRequest) => {
    if (!infoRequest.trim()) {
      alert('Please specify what additional information is needed.');
      return;
    }

    const post = socialPosts.find(p => p.id === postId);
    if (!post) return;

    console.log('Additional info requested:', { postId, request: infoRequest });
    alert(`Additional information requested: ${infoRequest}`);
  };

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
      location: 'Mumbai',
      credibilityScore: 0.95,
      isFake: false
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
      location: 'Chennai',
      credibilityScore: 0.92,
      isFake: false
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
      location: 'Mumbai',
      credibilityScore: 0.75,
      isFake: false
    },
    {
      id: 4,
      source: 'twitter',
      author: '@KochiPortTrust',
      content: 'Port operations temporarily suspended due to rough sea conditions. All vessels advised to seek shelter. #KochiPort #MaritimeSafety',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      sentiment: 'warning',
      engagement: { likes: 178, shares: 92, comments: 34 },
      verified: true,
      location: 'Kochi',
      credibilityScore: 0.88,
      isFake: false
    },
    {
      id: 5,
      source: 'instagram',
      author: '@VisakhapatnamFisherman',
      content: 'Unusual fish behavior observed near the coast. Large schools moving away from shore. Could indicate underwater disturbance.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      sentiment: 'concerned',
      engagement: { likes: 67, shares: 23, comments: 89 },
      verified: false,
      location: 'Visakhapatnam',
      credibilityScore: 0.65,
      isFake: false
    },
    {
      id: 6,
      source: 'facebook',
      author: 'Kolkata Port Authority',
      content: 'Successful completion of dredging operations in Hooghly River. Navigation channel depth restored to optimal levels.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      sentiment: 'positive',
      engagement: { likes: 245, shares: 45, comments: 12 },
      verified: true,
      location: 'Kolkata',
      credibilityScore: 0.91,
      isFake: false
    },
    {
      id: 7,
      source: 'twitter',
      author: '@GujaratCoastAlert',
      content: 'High tide alert for Surat and Bharuch districts. Coastal areas may experience flooding. Emergency teams on standby.',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      sentiment: 'warning',
      engagement: { likes: 134, shares: 78, comments: 56 },
      verified: true,
      location: 'Gujarat',
      credibilityScore: 0.87,
      isFake: false
    },
    {
      id: 8,
      source: 'twitter',
      author: '@PuriBeachWatch',
      content: 'Turtle nesting season begins! 47 Olive Ridley turtles spotted near Puri beach. Conservation efforts in full swing. 🐢',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      sentiment: 'positive',
      engagement: { likes: 456, shares: 234, comments: 123 },
      verified: false,
      location: 'Puri',
      credibilityScore: 0.78,
      isFake: false
    },
    {
      id: 9,
      source: 'facebook',
      author: 'Mangalore Coast Guard',
      content: 'Search and rescue operation successful. Missing fishing vessel located 15 nautical miles off Mangalore coast. All crew safe.',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      sentiment: 'positive',
      engagement: { likes: 567, shares: 123, comments: 89 },
      verified: true,
      location: 'Mangalore',
      credibilityScore: 0.94,
      isFake: false
    },
    {
      id: 10,
      source: 'instagram',
      author: '@GoaBeachPatrol',
      content: 'Red flag warning at all Goa beaches due to strong currents and high waves. Swimming strictly prohibited.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      sentiment: 'urgent',
      engagement: { likes: 234, shares: 156, comments: 67 },
      verified: true,
      location: 'Goa',
      credibilityScore: 0.93,
      isFake: false
    },
    {
      id: 11,
      source: 'twitter',
      author: '@BhubaneswarWeather',
      content: 'Cyclone Amphan aftermath: Coastal restoration work progressing well. 78% of damaged infrastructure repaired.',
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
      sentiment: 'positive',
      engagement: { likes: 189, shares: 67, comments: 34 },
      verified: false,
      location: 'Bhubaneswar',
      credibilityScore: 0.72,
      isFake: false
    },
    {
      id: 12,
      source: 'facebook',
      author: 'Paradip Port Trust',
      content: 'New automated weather monitoring system installed. Real-time data now available for better maritime safety.',
      timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      sentiment: 'positive',
      engagement: { likes: 123, shares: 45, comments: 23 },
      verified: true,
      location: 'Paradip',
      credibilityScore: 0.89,
      isFake: false
    },
    // Fake/Suspicious Posts
    {
      id: 13,
      source: 'twitter',
      author: '@FakeNewsAlert99',
      content: 'BREAKING: Massive tsunami heading towards Mumbai! Government hiding the truth! Share to save lives! #TsunamiAlert #Mumbai',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      sentiment: 'urgent',
      engagement: { likes: 1234, shares: 5678, comments: 890 },
      verified: false,
      location: 'Mumbai',
      credibilityScore: 0.15,
      isFake: true
    },
    {
      id: 14,
      source: 'facebook',
      author: 'Conspiracy Marine Facts',
      content: 'Secret underwater alien base discovered near Kochi coast! Navy covering it up! Fishermen report strange lights underwater.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      sentiment: 'concerned',
      engagement: { likes: 567, shares: 234, comments: 123 },
      verified: false,
      location: 'Kochi',
      credibilityScore: 0.08,
      isFake: true
    },
    {
      id: 15,
      source: 'instagram',
      author: '@ViralNewsIndia',
      content: 'Chennai port will be permanently closed due to sea level rise! All ships being diverted! Government announcement coming soon!',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      sentiment: 'urgent',
      engagement: { likes: 890, shares: 456, comments: 234 },
      verified: false,
      location: 'Chennai',
      credibilityScore: 0.22,
      isFake: true
    },
    {
      id: 16,
      source: 'twitter',
      author: '@SuspiciousAccount',
      content: 'Oil spill in Arabian Sea is 100 times worse than reported! Media blackout in effect! RT to spread awareness!',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      sentiment: 'urgent',
      engagement: { likes: 2345, shares: 1234, comments: 567 },
      verified: false,
      location: 'Arabian Sea',
      credibilityScore: 0.18,
      isFake: true
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
    },
    {
      id: 4,
      source: 'INCOIS',
      title: 'Ocean Current Analysis - Arabian Sea',
      content: 'Unusual current patterns detected in Arabian Sea. Potential impact on shipping routes between Mumbai and Gulf ports.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'medium',
      url: 'https://incois.gov.in/ocean-current-analysis-004'
    },
    {
      id: 5,
      source: 'IMD',
      title: 'Monsoon Onset Prediction',
      content: 'Southwest monsoon expected to advance over Kerala coast by June 1st. Normal rainfall predicted for coastal regions.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://mausam.imd.gov.in/monsoon-onset-005'
    },
    {
      id: 6,
      source: 'ISRO',
      title: 'Chlorophyll Concentration Mapping',
      content: 'Satellite data reveals increased phytoplankton activity along Tamil Nadu coast. Positive indicator for marine ecosystem.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://isro.gov.in/chlorophyll-mapping-006'
    },
    {
      id: 7,
      source: 'INCOIS',
      title: 'Tsunami Advisory System Update',
      content: 'Enhanced early warning capabilities deployed across Indian Ocean. Response time improved to under 5 minutes.',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://incois.gov.in/tsunami-advisory-007'
    },
    {
      id: 8,
      source: 'IMD',
      title: 'Sea Surface Temperature Anomaly',
      content: 'Above normal SST recorded in Bay of Bengal. Conducive conditions for tropical cyclone development.',
      timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
      severity: 'high',
      url: 'https://mausam.imd.gov.in/sst-anomaly-008'
    },
    {
      id: 9,
      source: 'ISRO',
      title: 'Coastal Vulnerability Assessment',
      content: 'Updated vulnerability maps for Gujarat and Maharashtra coastline. 23 high-risk zones identified.',
      timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
      severity: 'medium',
      url: 'https://isro.gov.in/coastal-vulnerability-009'
    },
    {
      id: 10,
      source: 'INCOIS',
      title: 'Marine Pollution Tracking',
      content: 'Oil spill trajectory model updated for Mumbai coast incident. Cleanup operations guided by real-time predictions.',
      timestamp: new Date(Date.now() - 13 * 60 * 60 * 1000),
      severity: 'high',
      url: 'https://incois.gov.in/pollution-tracking-010'
    },
    {
      id: 11,
      source: 'IMD',
      title: 'Extreme Weather Event Analysis',
      content: 'Post-cyclone damage assessment completed for Odisha. Infrastructure resilience recommendations issued.',
      timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
      severity: 'medium',
      url: 'https://mausam.imd.gov.in/extreme-weather-011'
    },
    {
      id: 12,
      source: 'ISRO',
      title: 'Mangrove Forest Monitoring',
      content: 'Sundarbans mangrove coverage shows 12% increase over last year. Positive impact on coastal protection.',
      timestamp: new Date(Date.now() - 17 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://isro.gov.in/mangrove-monitoring-012'
    },
    {
      id: 13,
      source: 'INCOIS',
      title: 'Fisheries Advisory - Arabian Sea',
      content: 'Optimal fishing zones identified off Kerala and Karnataka coast. Sustainable catch recommendations provided.',
      timestamp: new Date(Date.now() - 19 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://incois.gov.in/fisheries-advisory-013'
    },
    {
      id: 14,
      source: 'IMD',
      title: 'Coastal Fog Prediction',
      content: 'Dense fog expected along West Bengal and Odisha coast. Visibility may drop below 50 meters affecting navigation.',
      timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000),
      severity: 'medium',
      url: 'https://mausam.imd.gov.in/fog-prediction-014'
    },
    {
      id: 15,
      source: 'ISRO',
      title: 'Port Infrastructure Monitoring',
      content: 'Satellite-based monitoring of major ports shows optimal operational capacity. No structural concerns detected.',
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
      severity: 'low',
      url: 'https://isro.gov.in/port-monitoring-015'
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

  const getCredibilityColor = (score) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
    if (score >= 0.4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getCredibilityLabel = (score) => {
    if (score >= 0.8) return 'High Credibility';
    if (score >= 0.6) return 'Medium Credibility';
    if (score >= 0.4) return 'Low Credibility';
    return 'Very Low Credibility';
  };

  const tabs = [
    { id: 'merged', name: 'Merged Feed', icon: Globe },
    { id: 'social', name: 'Social Media', icon: Twitter },
    { id: 'verification', name: 'Post Verification', icon: AlertTriangle },
    { id: 'approval', name: 'Approval Queue', icon: Shield },
    { id: 'incois', name: 'INCOIS', icon: Globe },
    { id: 'imd', name: 'IMD', icon: Globe },
    { id: 'isro', name: 'ISRO', icon: Globe }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Social Media & External Data</h1>
            <p className="text-gray-600">Monitor social feeds and official data sources for maritime incidents</p>
          </div>
          
          {/* Refresh Button */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <button 
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-maris-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-shrink-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Social Posts</p>
              <p className="text-2xl font-bold">{socialPosts.length}</p>
            </div>
            <Twitter className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Official Reports</p>
              <p className="text-2xl font-bold">{externalData.length}</p>
            </div>
            <Globe className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Critical Alerts</p>
              <p className="text-2xl font-bold">{externalData.filter(item => item.severity === 'critical').length}</p>
            </div>
            <div className="h-8 w-8 bg-red-400 bg-opacity-30 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Verified Sources</p>
              <p className="text-2xl font-bold">{socialPosts.filter(post => post.verified).length}</p>
            </div>
            <div className="h-8 w-8 bg-purple-400 bg-opacity-30 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Fake/Suspicious</p>
              <p className="text-2xl font-bold">{socialPosts.filter(post => post.isFake).length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow-sm flex flex-col flex-1 min-h-0">
        <div className="border-b border-gray-200 flex-shrink-0">
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
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {activeTab === 'verification' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Post Verification Analysis</h3>
                <span className="text-sm text-gray-500">AI-powered credibility assessment</span>
              </div>
              
              {/* Verification Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">Verified Posts</p>
                      <p className="text-2xl font-bold text-green-700">{socialPosts.filter(p => !p.isFake && p.credibilityScore >= 0.7).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Suspicious Posts</p>
                      <p className="text-2xl font-bold text-yellow-700">{socialPosts.filter(p => !p.isFake && p.credibilityScore < 0.7 && p.credibilityScore >= 0.4).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <X className="h-8 w-8 text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-red-600 font-medium">Fake Posts</p>
                      <p className="text-2xl font-bold text-red-700">{socialPosts.filter(p => p.isFake).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts with Credibility Analysis */}
              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <div key={post.id} className={`border rounded-lg p-4 ${post.isFake ? 'border-red-300 bg-red-50' : post.credibilityScore >= 0.7 ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
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
                          <span className={`px-2 py-1 rounded-full text-xs ${getCredibilityColor(post.credibilityScore)}`}>
                            {getCredibilityLabel(post.credibilityScore)} ({(post.credibilityScore * 100).toFixed(0)}%)
                          </span>
                          {post.isFake && (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-bold">
                              🚨 FAKE DETECTED
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        
                        {/* Credibility Indicators */}
                        <div className="bg-white rounded-lg p-3 mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Credibility Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Source Reliability:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs ${post.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {post.verified ? 'Official' : 'Unverified'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Engagement Pattern:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs ${post.engagement.shares > post.engagement.likes ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {post.engagement.shares > post.engagement.likes ? 'Suspicious' : 'Normal'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Content Urgency:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs ${post.sentiment === 'urgent' && !post.verified ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {post.sentiment === 'urgent' && !post.verified ? 'High Alert' : 'Standard'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">AI Confidence:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs ${getCredibilityColor(post.credibilityScore)}`}>
                                {(post.credibilityScore * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
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
            </div>
          ) : activeTab === 'approval' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Social Media Approval Queue</h3>
                <span className="text-sm text-gray-500">Posts requiring approval for official alerts</span>
              </div>
              
              {/* Approval Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-yellow-600 font-medium">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-700">{socialPosts.filter(p => !p.isFake && p.credibilityScore >= 0.6 && !p.verified).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">Approved Today</p>
                      <p className="text-2xl font-bold text-green-700">{approvedPosts.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ExternalLink className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Sent to Officials</p>
                      <p className="text-2xl font-bold text-blue-700">{approvedPosts.filter(p => p.officialAlert).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Requiring Approval */}
              <div className="space-y-4">
                {socialPosts.filter(post => !post.isFake && post.credibilityScore >= 0.6 && !post.verified).map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getSourceIcon(post.source)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCredibilityColor(post.credibilityScore)}`}>
                            {getCredibilityLabel(post.credibilityScore)} ({(post.credibilityScore * 100).toFixed(0)}%)
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(post.sentiment)}`}>
                            {post.sentiment}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        
                        {/* Approval Actions */}
                        <div className="bg-white rounded-lg p-3 mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Approval Decision</h4>
                          <div className="flex space-x-2 mb-3">
                            <button
                              onClick={() => {
                                const notes = prompt('Add approval notes (optional):');
                                handleApprovePost(post.id, notes || '');
                              }}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              ✓ Approve for Official Alert
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for rejection:');
                                if (reason) handleRejectPost(post.id, reason);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              ✗ Reject
                            </button>
                            <button
                              onClick={() => {
                                const info = prompt('What additional information is needed?');
                                if (info) handleRequestMoreInfo(post.id, info);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              ? Request More Info
                            </button>
                          </div>
                        </div>
                        
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

              {/* Recently Approved Posts */}
              {approvedPosts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Approved Posts</h3>
                  <div className="space-y-3">
                    {approvedPosts.map((post) => (
                      <div key={`approved-${post.id}`} className="border border-green-200 rounded-lg p-3 bg-green-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.content.substring(0, 80)}...</p>
                            <p className="text-xs text-gray-600">Approved by {post.approvedBy} at {post.approvedAt.toLocaleTimeString()}</p>
                          </div>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                            ✓ Sent to Officials
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'merged' || activeTab === 'social' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Social Media Posts</h3>
                <span className="text-sm text-gray-500">{socialPosts.filter(post => {
                  if (filters.source !== 'all' && post.source !== filters.source) return false;
                  if (filters.sentiment !== 'all' && post.sentiment !== filters.sentiment) return false;
                  return true;
                }).length} posts found</span>
              </div>
              {socialPosts.filter(post => {
                if (filters.source !== 'all' && post.source !== filters.source) return false;
                if (filters.sentiment !== 'all' && post.sentiment !== filters.sentiment) return false;
                return true;
              }).map((post) => (
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Official Data Sources</h3>
                <span className="text-sm text-gray-500">{externalData.filter(item => activeTab === 'merged' || item.source.toLowerCase() === activeTab).length} reports found</span>
              </div>
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
