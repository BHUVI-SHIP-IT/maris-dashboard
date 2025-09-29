import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, MapPin, Calendar, Filter } from 'lucide-react';

const TrendsHotspots = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Comprehensive data for charts with filtering
  const generateCategoryData = () => {
    const baseData = [
      { name: 'Flooding', value: 35, count: 234, trend: '+12%', severity: 'high' },
      { name: 'Pollution', value: 28, count: 187, trend: '+8%', severity: 'critical' },
      { name: 'Weather', value: 22, count: 147, trend: '-3%', severity: 'medium' },
      { name: 'Infrastructure', value: 15, count: 98, trend: '+15%', severity: 'medium' },
      { name: 'Marine Life', value: 12, count: 78, trend: '+5%', severity: 'low' },
      { name: 'Navigation', value: 8, count: 56, trend: '-2%', severity: 'low' }
    ];
    
    return selectedCategory === 'all' ? baseData : baseData.filter(item => 
      item.name.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  };

  const generateTimeSeriesData = () => {
    const dates = [];
    const currentDate = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      const baseValues = {
        date: date.toISOString().split('T')[0],
        flooding: Math.floor(Math.random() * 20) + 10,
        pollution: Math.floor(Math.random() * 18) + 8,
        weather: Math.floor(Math.random() * 25) + 12,
        infrastructure: Math.floor(Math.random() * 15) + 5,
        marine_life: Math.floor(Math.random() * 12) + 3,
        navigation: Math.floor(Math.random() * 10) + 2
      };
      
      // Apply time range filter
      if (timeRange === '7d' && i > 6) continue;
      if (timeRange === '30d' || timeRange === '7d' || i <= 29) {
        dates.push(baseValues);
      }
    }
    
    return dates;
  };

  const hotspotData = [
    { city: 'Mumbai', reports: 234, trend: '+12%', severity: 'high', state: 'Maharashtra', riskScore: 87 },
    { city: 'Chennai', reports: 187, trend: '+8%', severity: 'medium', state: 'Tamil Nadu', riskScore: 74 },
    { city: 'Ahmedabad', reports: 156, trend: '+5%', severity: 'medium', state: 'Gujarat', riskScore: 68 },
    { city: 'Kochi', reports: 147, trend: '-3%', severity: 'medium', state: 'Kerala', riskScore: 58 },
    { city: 'Kolkata', reports: 134, trend: '+7%', severity: 'medium', state: 'West Bengal', riskScore: 71 },
    { city: 'Visakhapatnam', reports: 98, trend: '+15%', severity: 'low', state: 'Andhra Pradesh', riskScore: 65 },
    { city: 'Bhubaneswar', reports: 91, trend: '+18%', severity: 'medium', state: 'Odisha', riskScore: 62 },
    { city: 'Puri', reports: 87, trend: '+22%', severity: 'high', state: 'Odisha', riskScore: 79 },
    { city: 'Rajkot', reports: 82, trend: '+3%', severity: 'low', state: 'Gujarat', riskScore: 44 },
    { city: 'Mangalore', reports: 78, trend: '+9%', severity: 'medium', state: 'Karnataka', riskScore: 56 }
  ];

  const keywordData = [
    { text: 'flooding', size: 40, count: 234, category: 'weather' },
    { text: 'oil spill', size: 35, count: 187, category: 'pollution' },
    { text: 'cyclone', size: 30, count: 147, category: 'weather' },
    { text: 'erosion', size: 25, count: 98, category: 'infrastructure' },
    { text: 'pollution', size: 38, count: 210, category: 'pollution' },
    { text: 'storm surge', size: 28, count: 134, category: 'weather' },
    { text: 'marine debris', size: 22, count: 89, category: 'pollution' },
    { text: 'contamination', size: 26, count: 112, category: 'pollution' },
    { text: 'port damage', size: 24, count: 76, category: 'infrastructure' },
    { text: 'fish kill', size: 20, count: 65, category: 'marine_life' },
    { text: 'navigation hazard', size: 18, count: 54, category: 'navigation' },
    { text: 'coral bleaching', size: 16, count: 43, category: 'marine_life' }
  ];

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trends & Hotspots Analysis</h1>
            <p className="text-gray-600">Visualize patterns and emerging hotspots in maritime incidents</p>
          </div>

          
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 lg:gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1 lg:px-3 lg:py-2 text-xs lg:text-sm bg-white shadow-sm focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="flooding">🌊 Flooding</option>
                  <option value="pollution">🛢️ Pollution</option>
                  <option value="weather">🌪️ Weather</option>
                  <option value="infrastructure">🏗️ Infrastructure</option>
                  <option value="marine_life">🐟 Marine Life</option>
                  <option value="navigation">⚓ Navigation</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-1 lg:space-x-2">
                <span className="text-xs lg:text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-maris-blue text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory('pollution')}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === 'pollution' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Critical
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={generateCategoryData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {generateCategoryData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, `${name} (${generateCategoryData().find(d => d.name === name)?.count || 0} reports)`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Series Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="flooding" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="pollution" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="weather" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="infrastructure" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="marine_life" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="navigation" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        

        {/* Keyword Cloud */}
      </div>

      {/* Hotspots Ranking */}
        <div className="bg-white rounded-lg shadow-sm p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 w-full">Top Hotspots</h2>
          <div className="space-y-4">
            {hotspotData.map((hotspot, index) => (
              <div key={hotspot.city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-maris-blue text-white rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{hotspot.city}</h3>
                    <p className="text-sm text-gray-600">{hotspot.reports} reports</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(hotspot.severity)}`}>
                    {hotspot.severity}
                  </span>
                  <span className={`text-sm font-medium ${
                    hotspot.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {hotspot.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Volume by Category</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={generateTimeSeriesData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="flooding" stackId="a" fill="#0ea5e9" />
            <Bar dataKey="pollution" stackId="a" fill="#10b981" />
            <Bar dataKey="weather" stackId="a" fill="#f59e0b" />
            <Bar dataKey="infrastructure" stackId="a" fill="#ef4444" />
            <Bar dataKey="marine_life" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="navigation" stackId="a" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendsHotspots;
