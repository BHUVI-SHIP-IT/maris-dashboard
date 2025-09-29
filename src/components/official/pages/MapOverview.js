import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Filter, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapOverview = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    severity: 'all',
    status: 'all',
    timeRange: '24h'
  });
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock data for reports - filtered by jurisdiction
  useEffect(() => {
    const allReports = {
      mumbai: [
        {
          id: 1,
          title: 'Coastal Flooding Alert',
          category: 'flooding',
          severity: 'high',
          status: 'pending',
          location: { lat: 19.0760, lng: 72.8777 },
          address: 'Marine Drive, Mumbai',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Heavy flooding reported along Marine Drive due to high tide',
          reporter: 'Citizen Report #1234',
          jurisdiction: 'mumbai'
        },
        {
          id: 2,
          title: 'Oil Spill Detected',
          category: 'pollution',
          severity: 'critical',
          status: 'verified',
          location: { lat: 19.0896, lng: 72.8656 },
          address: 'Bandra Worli Sea Link, Mumbai',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          description: 'Large oil spill detected near sea link, immediate action required',
          reporter: 'Coast Guard Report',
          jurisdiction: 'mumbai'
        },
        {
          id: 3,
          title: 'Illegal Fishing Activity',
          category: 'infrastructure',
          severity: 'medium',
          status: 'assigned',
          location: { lat: 19.1136, lng: 72.8697 },
          address: 'Juhu Beach, Mumbai',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          description: 'Unauthorized fishing boats spotted in restricted marine area',
          reporter: 'Marine Police',
          jurisdiction: 'mumbai'
        },
        {
          id: 4,
          title: 'Sewage Discharge Alert',
          category: 'pollution',
          severity: 'high',
          status: 'pending',
          location: { lat: 19.0330, lng: 72.8570 },
          address: 'Worli Creek, Mumbai',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          description: 'Untreated sewage discharge detected in creek waters',
          reporter: 'Environmental Monitor',
          jurisdiction: 'mumbai'
        },
        {
          id: 5,
          title: 'Storm Surge Warning',
          category: 'weather',
          severity: 'critical',
          status: 'resolved',
          location: { lat: 18.9220, lng: 72.8347 },
          address: 'Colaba, Mumbai',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          description: 'High storm surge expected, coastal evacuation completed',
          reporter: 'IMD Weather Station',
          jurisdiction: 'mumbai'
        },
        {
          id: 6,
          title: 'Mangrove Destruction',
          category: 'infrastructure',
          severity: 'high',
          status: 'verified',
          location: { lat: 19.1197, lng: 72.9089 },
          address: 'Mahim Creek, Mumbai',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          description: 'Illegal construction destroying mangrove ecosystem',
          reporter: 'Forest Department',
          jurisdiction: 'mumbai'
        }
      ],
      chennai: [
        {
          id: 7,
          title: 'Cyclone Warning',
          category: 'weather',
          severity: 'high',
          status: 'assigned',
          location: { lat: 13.0827, lng: 80.2707 },
          address: 'Marina Beach, Chennai',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          description: 'Cyclone approaching, evacuation procedures initiated',
          reporter: 'IMD Alert',
          jurisdiction: 'chennai'
        },
        {
          id: 8,
          title: 'Fishing Boat Distress',
          category: 'infrastructure',
          severity: 'critical',
          status: 'pending',
          location: { lat: 13.0569, lng: 80.2963 },
          address: 'Kasimedu Fishing Harbor, Chennai',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Fishing vessel engine failure, 12 fishermen stranded at sea',
          reporter: 'Coast Guard Emergency',
          jurisdiction: 'chennai'
        },
        {
          id: 9,
          title: 'Industrial Waste Spill',
          category: 'pollution',
          severity: 'high',
          status: 'verified',
          location: { lat: 13.1067, lng: 80.2963 },
          address: 'Ennore Creek, Chennai',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          description: 'Chemical waste discharge from thermal power plant',
          reporter: 'Pollution Control Board',
          jurisdiction: 'chennai'
        },
        {
          id: 10,
          title: 'Beach Erosion Critical',
          category: 'infrastructure',
          severity: 'medium',
          status: 'assigned',
          location: { lat: 13.0478, lng: 80.2838 },
          address: 'Besant Nagar Beach, Chennai',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          description: 'Severe coastal erosion threatening beachfront properties',
          reporter: 'Coastal Engineering Dept',
          jurisdiction: 'chennai'
        },
        {
          id: 11,
          title: 'Algal Bloom Alert',
          category: 'pollution',
          severity: 'medium',
          status: 'resolved',
          location: { lat: 13.0732, lng: 80.2609 },
          address: 'Cooum River Mouth, Chennai',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          description: 'Toxic algal bloom detected, water quality restored',
          reporter: 'Marine Biology Institute',
          jurisdiction: 'chennai'
        }
      ],
      kochi: [
        {
          id: 12,
          title: 'Port Infrastructure Damage',
          category: 'infrastructure',
          severity: 'medium',
          status: 'pending',
          location: { lat: 9.9312, lng: 76.2673 },
          address: 'Kochi Port, Kerala',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          description: 'Storm damage to port infrastructure reported',
          reporter: 'Port Authority',
          jurisdiction: 'kochi'
        },
        {
          id: 13,
          title: 'Backwater Pollution Crisis',
          category: 'pollution',
          severity: 'critical',
          status: 'verified',
          location: { lat: 9.8312, lng: 76.2711 },
          address: 'Vembanad Lake, Kochi',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          description: 'Massive fish kill due to industrial pollution in backwaters',
          reporter: 'Fisheries Department',
          jurisdiction: 'kochi'
        },
        {
          id: 14,
          title: 'Monsoon Flood Warning',
          category: 'weather',
          severity: 'high',
          status: 'assigned',
          location: { lat: 9.9816, lng: 76.2999 },
          address: 'Fort Kochi Beach, Kerala',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Heavy monsoon rains causing coastal flooding',
          reporter: 'Kerala Meteorological Dept',
          jurisdiction: 'kochi'
        },
        {
          id: 15,
          title: 'Illegal Sand Mining',
          category: 'infrastructure',
          severity: 'high',
          status: 'pending',
          location: { lat: 9.9004, lng: 76.2663 },
          address: 'Periyar River Mouth, Kochi',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          description: 'Unauthorized sand mining damaging river ecosystem',
          reporter: 'Environmental Activist',
          jurisdiction: 'kochi'
        }
      ],
      visakhapatnam: [
        {
          id: 16,
          title: 'Beach Erosion Alert',
          category: 'infrastructure',
          severity: 'medium',
          status: 'verified',
          location: { lat: 17.6868, lng: 83.2185 },
          address: 'RK Beach, Visakhapatnam',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          description: 'Significant beach erosion observed after recent storms',
          reporter: 'Coastal Survey Team',
          jurisdiction: 'visakhapatnam'
        },
        {
          id: 17,
          title: 'Cargo Ship Emergency',
          category: 'infrastructure',
          severity: 'critical',
          status: 'assigned',
          location: { lat: 17.7231, lng: 83.3078 },
          address: 'Visakhapatnam Port, AP',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          description: 'Cargo vessel taking water, emergency response activated',
          reporter: 'Port Control Tower',
          jurisdiction: 'visakhapatnam'
        },
        {
          id: 18,
          title: 'Plastic Waste Accumulation',
          category: 'pollution',
          severity: 'high',
          status: 'pending',
          location: { lat: 17.6599, lng: 83.2073 },
          address: 'Lawsons Bay Beach, Vizag',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          description: 'Massive plastic waste washing ashore, marine life threatened',
          reporter: 'Beach Cleanup Volunteer',
          jurisdiction: 'visakhapatnam'
        },
        {
          id: 19,
          title: 'Tsunami Drill Alert',
          category: 'weather',
          severity: 'medium',
          status: 'resolved',
          location: { lat: 17.7041, lng: 83.2977 },
          address: 'Bheemunipatnam Beach, AP',
          timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
          description: 'Tsunami preparedness drill completed successfully',
          reporter: 'Disaster Management Authority',
          jurisdiction: 'visakhapatnam'
        }
      ],
      kolkata: [
        {
          id: 20,
          title: 'River Pollution Detected',
          category: 'pollution',
          severity: 'high',
          status: 'pending',
          location: { lat: 22.5726, lng: 88.3639 },
          address: 'Hooghly River, Kolkata',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          description: 'Industrial waste discharge detected in river',
          reporter: 'Environmental Monitor',
          jurisdiction: 'kolkata'
        },
        {
          id: 21,
          title: 'Sundarbans Mangrove Threat',
          category: 'infrastructure',
          severity: 'critical',
          status: 'verified',
          location: { lat: 22.4707, lng: 88.9331 },
          address: 'Sundarbans Delta, WB',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Rising sea levels threatening mangrove ecosystem',
          reporter: 'WWF Conservation Team',
          jurisdiction: 'kolkata'
        },
        {
          id: 22,
          title: 'Ferry Accident Alert',
          category: 'infrastructure',
          severity: 'high',
          status: 'assigned',
          location: { lat: 22.5958, lng: 88.2636 },
          address: 'Princep Ghat, Kolkata',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          description: 'Passenger ferry collision, rescue operations ongoing',
          reporter: 'River Police',
          jurisdiction: 'kolkata'
        },
        {
          id: 23,
          title: 'Cyclone Amphan Aftermath',
          category: 'weather',
          severity: 'medium',
          status: 'resolved',
          location: { lat: 22.2587, lng: 88.3636 },
          address: 'Diamond Harbour, WB',
          timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
          description: 'Post-cyclone damage assessment completed',
          reporter: 'State Disaster Response Force',
          jurisdiction: 'kolkata'
        }
      ]
    };

    // Filter reports based on user's jurisdiction
    const userJurisdiction = user?.jurisdiction;
    const jurisdictionReports = allReports[userJurisdiction] || [];
    setReports(jurisdictionReports);
  }, [user]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'assigned': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter(report => {
    if (filters.category !== 'all' && report.category !== filters.category) return false;
    if (filters.severity !== 'all' && report.severity !== filters.severity) return false;
    if (filters.status !== 'all' && report.status !== filters.status) return false;
    
    // Time range filtering
    const now = new Date();
    const reportTime = report.timestamp;
    const timeDiff = now - reportTime;
    
    switch (filters.timeRange) {
      case '1h':
        return timeDiff <= 60 * 60 * 1000;
      case '24h':
        return timeDiff <= 24 * 60 * 60 * 1000;
      case '7d':
        return timeDiff <= 7 * 24 * 60 * 60 * 1000;
      case '30d':
        return timeDiff <= 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  return (
    <div className="h-full flex flex-col space-y-4 md:space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 flex-shrink-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 md:p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs md:text-sm">Total Reports</p>
              <p className="text-xl md:text-2xl font-bold">{filteredReports.length}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-2 md:p-3">
              <AlertCircle className="h-4 w-4 md:h-6 md:w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Critical</p>
              <p className="text-2xl font-bold">{filteredReports.filter(r => r.severity === 'critical').length}</p>
            </div>
            <div className="bg-red-400 bg-opacity-30 rounded-full p-3">
              <XCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending</p>
              <p className="text-2xl font-bold">{filteredReports.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 rounded-full p-3">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Resolved</p>
              <p className="text-2xl font-bold">{filteredReports.filter(r => r.status === 'resolved').length}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 min-h-0">
        {/* Map Section */}
        <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
          <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-gray-900">Live Reports Map</h2>
                <p className="text-xs md:text-sm text-gray-600">
                  {user?.jurisdictionFilter ? 
                    `${user.jurisdictionFilter.district}, ${user.jurisdictionFilter.state}` : 
                    'Real-time incident visualization'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <select
                  value={filters.timeRange}
                  onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
                  className="text-xs md:text-sm border border-gray-300 rounded-lg px-2 py-1 md:px-3 md:py-2 bg-white shadow-sm focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        
        <div className="flex-1 min-h-0">
          <MapContainer
            center={user?.jurisdictionFilter?.coordinates || [19.0760, 72.8777]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredReports.map((report) => (
              <Marker
                key={report.id}
                position={[report.location.lat, report.location.lng]}
                eventHandlers={{
                  click: () => setSelectedReport(report)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className="text-xs text-gray-500">{report.status}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Reports Panel */}
      <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
        {/* Filters */}
        <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Reports</h3>
            <span className="bg-maris-blue text-white text-xs px-2 py-1 rounded-full">
              {filteredReports.length}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-maris-blue focus:border-transparent transition-all"
              >
                <option value="all">All Categories</option>
                <option value="flooding"> Flooding</option>
                <option value="pollution"> Pollution</option>
                <option value="weather">Weather</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-maris-blue focus:border-transparent transition-all"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-maris-blue focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="assigned">Assigned</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            </div>
            
            {/* Quick Filter Buttons */}
            <div className="pt-2 flex flex-row">
              <p className="text-xs font-medium text-gray-600 mb-2">Quick Filters</p>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setFilters({...filters, severity: 'critical', status: 'pending'})}
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                >
                  Critical & Pending
                </button>
                <button
                  onClick={() => setFilters({...filters, category: 'all', severity: 'all', status: 'all', timeRange: '24h'})}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedReport?.id === report.id ? 'bg-blue-50 border-l-4 border-l-maris-blue' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{report.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {report.timestamp.toLocaleTimeString()} - {report.reporter}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getSeverityColor(report.severity)}`}>
                    {report.severity}
                  </span>
                  <div className="flex items-center text-gray-500">
                    {getStatusIcon(report.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MapOverview;
