import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Play, Pause, RotateCcw, Layers } from 'lucide-react';

const NationalMap = () => {
  const [timelineValue, setTimelineValue] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState('density');

  useEffect(() => {
    // Comprehensive heatmap data for all major Indian coastal cities
    const allData = [
      // West Coast
      { lat: 19.0760, lng: 72.8777, intensity: 85, city: 'Mumbai', reports: 234, state: 'Maharashtra', category: 'pollution', trend: 'increasing' },
      { lat: 15.2993, lng: 74.1240, intensity: 29, city: 'Goa', reports: 45, state: 'Goa', category: 'tourism', trend: 'stable' },
      { lat: 9.9312, lng: 76.2673, intensity: 45, city: 'Kochi', reports: 89, state: 'Kerala', category: 'infrastructure', trend: 'decreasing' },
      { lat: 8.5241, lng: 76.9366, intensity: 31, city: 'Thiruvananthapuram', reports: 67, state: 'Kerala', category: 'weather', trend: 'stable' },
      { lat: 12.9716, lng: 77.5946, intensity: 42, city: 'Mangalore', reports: 78, state: 'Karnataka', category: 'pollution', trend: 'increasing' },
      
      // East Coast
      { lat: 13.0827, lng: 80.2707, intensity: 72, city: 'Chennai', reports: 156, state: 'Tamil Nadu', category: 'weather', trend: 'increasing' },
      { lat: 17.6868, lng: 83.2185, intensity: 38, city: 'Visakhapatnam', reports: 67, state: 'Andhra Pradesh', category: 'infrastructure', trend: 'stable' },
      { lat: 22.5726, lng: 88.3639, intensity: 56, city: 'Kolkata', reports: 123, state: 'West Bengal', category: 'pollution', trend: 'decreasing' },
      { lat: 11.9416, lng: 79.8083, intensity: 34, city: 'Puducherry', reports: 52, state: 'Puducherry', category: 'flooding', trend: 'stable' },
      { lat: 20.9517, lng: 85.0985, intensity: 48, city: 'Bhubaneswar', reports: 91, state: 'Odisha', category: 'weather', trend: 'increasing' },
      { lat: 19.2183, lng: 84.8516, intensity: 53, city: 'Puri', reports: 87, state: 'Odisha', category: 'flooding', trend: 'increasing' },
      
      // Gujarat Coast
      { lat: 23.0225, lng: 72.5714, intensity: 61, city: 'Ahmedabad', reports: 134, state: 'Gujarat', category: 'pollution', trend: 'stable' },
      { lat: 21.1702, lng: 72.8311, intensity: 39, city: 'Surat', reports: 76, state: 'Gujarat', category: 'infrastructure', trend: 'decreasing' },
      { lat: 22.4707, lng: 70.0577, intensity: 44, city: 'Rajkot', reports: 82, state: 'Gujarat', category: 'weather', trend: 'stable' },
      
      // Additional Coastal Cities
      { lat: 26.9124, lng: 75.7873, intensity: 27, city: 'Jaipur', reports: 43, state: 'Rajasthan', category: 'infrastructure', trend: 'stable' },
      { lat: 12.2958, lng: 76.6394, intensity: 36, city: 'Mysore', reports: 58, state: 'Karnataka', category: 'pollution', trend: 'decreasing' },
      { lat: 11.0168, lng: 76.9558, intensity: 41, city: 'Coimbatore', reports: 71, state: 'Tamil Nadu', category: 'infrastructure', trend: 'stable' }
    ];
    
    // Apply filters
    let filteredData = allData;
    
    if (selectedLayer === 'reports') {
      filteredData = allData.filter(city => city.reports > 50);
    } else if (selectedLayer === 'severity') {
      filteredData = allData.filter(city => city.intensity > 40);
    }
    
    setHeatmapData(filteredData);
  }, [selectedLayer]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineValue(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            alert('Timeline playback completed! All historical data has been displayed.');
            return 100;
          }
          return prev + 2; // Faster playback
        });
      }, 150); // Slightly slower for better visibility
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getIntensityColor = (intensity) => {
    if (intensity > 70) return '#ef4444'; // red
    if (intensity > 50) return '#f59e0b'; // yellow
    if (intensity > 30) return '#10b981'; // green
    return '#6b7280'; // gray
  };

  const getIntensityRadius = (intensity) => {
    return (intensity / 100) * 50000; // Max radius 50km
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">National Maritime Hazard Map</h1>
            <p className="text-gray-600">Real-time hazard density visualization across Indian coastline</p>
          </div>
          
          {/* Layer Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-400" />
              <select
                value={selectedLayer}
                onChange={(e) => setSelectedLayer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="density">Hazard Density</option>
                <option value="reports">Report Count</option>
                <option value="severity">Severity Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

       {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-sm p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Critical Zones</p>
              <p className="text-2xl lg:text-3xl font-bold">{heatmapData.filter(d => d.intensity > 70).length}</p>
              <p className="text-xs text-red-200 mt-1">Immediate Action Required</p>
            </div>
            <div className="bg-red-400 bg-opacity-30 rounded-full p-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-sm p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">High Risk Areas</p>
              <p className="text-2xl lg:text-3xl font-bold">{heatmapData.filter(d => d.intensity > 50 && d.intensity <= 70).length}</p>
              <p className="text-xs text-yellow-200 mt-1">Monitor Closely</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 rounded-full p-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Reports</p>
              <p className="text-2xl lg:text-3xl font-bold">{heatmapData.reduce((sum, d) => sum + d.reports, 0)}</p>
              <p className="text-xs text-blue-200 mt-1">Across All Regions</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Resolved</p>
              <p className="text-2xl lg:text-3xl font-bold">{Math.floor(heatmapData.reduce((sum, d) => sum + d.reports, 0) * 0.68)}</p>
              <p className="text-xs text-green-200 mt-1">68% Success Rate</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-sm p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Cities</p>
              <p className="text-2xl lg:text-3xl font-bold">{heatmapData.length}</p>
              <p className="text-xs text-purple-200 mt-1">Monitoring Points</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Timeline */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Map */}
        <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-900'>Map Overview</h1>
        </div>
        <div className="h-screen w-auto mx-7 rounded-t-lg overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]} // Center of India
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Heatmap circles */}
            {heatmapData.map((point, index) => (
              <Circle
                key={index}
                center={[point.lat, point.lng]}
                radius={getIntensityRadius(point.intensity)}
                fillColor={getIntensityColor(point.intensity)}
                color={getIntensityColor(point.intensity)}
                fillOpacity={0.3}
                opacity={0.6}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{point.city}</h3>
                    <p className="text-sm">Hazard Intensity: {point.intensity}%</p>
                    <p className="text-sm">Total Reports: {point.reports}</p>
                  </div>
                </Popup>
              </Circle>
            ))}
            
            {/* City markers */}
            {heatmapData.map((point, index) => (
              <Marker key={`marker-${index}`} position={[point.lat, point.lng]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{point.city}</h3>
                    <p className="text-sm">Reports: {point.reports}</p>
                    <p className="text-sm">Intensity: {point.intensity}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Timeline Controls */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center w-10 h-10 bg-maris-blue text-white rounded-full hover:bg-blue-600"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => {
                setTimelineValue(0);
                setIsPlaying(false);
              }}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={timelineValue}
                onChange={(e) => setTimelineValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>24 hours ago</span>
                <span>12 hours ago</span>
                <span>Now</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Timeline: {timelineValue}%
            </div>
          </div>
        </div>
      </div>


     
      
    </div>
  );
};

export default NationalMap;
