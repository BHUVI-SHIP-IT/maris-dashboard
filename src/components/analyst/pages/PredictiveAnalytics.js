import React, { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, MapPin, Calendar } from 'lucide-react';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('risk_assessment');
  const [timeHorizon, setTimeHorizon] = useState('7d');

  const allRiskData = [
    {
      district: 'Mumbai',
      state: 'Maharashtra',
      riskScore: 87,
      confidence: 0.92,
      primaryRisk: 'Flooding',
      factors: ['Heavy Rainfall Forecast', 'High Tide Cycle', 'Urban Drainage Issues', 'Population Density'],
      trend: 'increasing',
      lastIncident: '2 days ago',
      population: 12442373,
      economicImpact: 'Very High'
    },
    {
      district: 'Chennai',
      state: 'Tamil Nadu',
      riskScore: 74,
      confidence: 0.88,
      primaryRisk: 'Cyclone',
      factors: ['Low Pressure Formation', 'Sea Surface Temperature', 'Wind Patterns', 'Coastal Vulnerability'],
      trend: 'stable',
      lastIncident: '1 week ago',
      population: 7088000,
      economicImpact: 'High'
    },
    {
      district: 'Puri',
      state: 'Odisha',
      riskScore: 79,
      confidence: 0.91,
      primaryRisk: 'Cyclone',
      factors: ['Bay of Bengal Activity', 'Coastal Exposure', 'Historical Patterns', 'Tourism Infrastructure'],
      trend: 'increasing',
      lastIncident: '5 days ago',
      population: 200564,
      economicImpact: 'Medium'
    },
    {
      district: 'Kolkata',
      state: 'West Bengal',
      riskScore: 71,
      confidence: 0.83,
      primaryRisk: 'Erosion',
      factors: ['River Discharge', 'Sediment Patterns', 'Coastal Infrastructure', 'Industrial Pressure'],
      trend: 'increasing',
      lastIncident: '4 days ago',
      population: 4496694,
      economicImpact: 'High'
    },
    {
      district: 'Ahmedabad',
      state: 'Gujarat',
      riskScore: 68,
      confidence: 0.86,
      primaryRisk: 'Industrial Pollution',
      factors: ['Chemical Industries', 'Port Activities', 'Waste Management', 'Water Quality'],
      trend: 'stable',
      lastIncident: '6 days ago',
      population: 5633927,
      economicImpact: 'High'
    },
    {
      district: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      riskScore: 65,
      confidence: 0.85,
      primaryRisk: 'Storm Surge',
      factors: ['Monsoon Activity', 'Coastal Topography', 'Tidal Variations', 'Port Infrastructure'],
      trend: 'decreasing',
      lastIncident: '3 days ago',
      population: 2035922,
      economicImpact: 'Medium'
    },
    {
      district: 'Bhubaneswar',
      state: 'Odisha',
      riskScore: 62,
      confidence: 0.81,
      primaryRisk: 'Flooding',
      factors: ['Monsoon Intensity', 'Urban Planning', 'Drainage Systems', 'Climate Change'],
      trend: 'stable',
      lastIncident: '1 week ago',
      population: 837737,
      economicImpact: 'Medium'
    },
    {
      district: 'Kochi',
      state: 'Kerala',
      riskScore: 58,
      confidence: 0.79,
      primaryRisk: 'Pollution',
      factors: ['Industrial Activity', 'Shipping Traffic', 'Water Quality Trends', 'Backwater Ecosystem'],
      trend: 'stable',
      lastIncident: '5 days ago',
      population: 677381,
      economicImpact: 'Medium'
    },
    {
      district: 'Mangalore',
      state: 'Karnataka',
      riskScore: 56,
      confidence: 0.77,
      primaryRisk: 'Coastal Erosion',
      factors: ['Wave Action', 'Sand Mining', 'Construction Activities', 'Monsoon Impact'],
      trend: 'decreasing',
      lastIncident: '1 week ago',
      population: 488968,
      economicImpact: 'Low'
    },
    {
      district: 'Rajkot',
      state: 'Gujarat',
      riskScore: 44,
      confidence: 0.73,
      primaryRisk: 'Water Scarcity',
      factors: ['Groundwater Depletion', 'Industrial Demand', 'Agricultural Needs', 'Climate Variability'],
      trend: 'stable',
      lastIncident: '2 weeks ago',
      population: 1390933,
      economicImpact: 'Low'
    }
  ];

  // Filter risk data based on selected model and time horizon
  const getRiskData = () => {
    let filteredData = [...allRiskData];
    
    // Apply model-specific filtering
    if (selectedModel === 'flood_prediction') {
      filteredData = filteredData.filter(d => d.primaryRisk.includes('Flood') || d.primaryRisk.includes('Storm'));
    } else if (selectedModel === 'pollution_forecast') {
      filteredData = filteredData.filter(d => d.primaryRisk.includes('Pollution'));
    }
    
    // Apply time horizon adjustments
    if (timeHorizon === '24h') {
      filteredData = filteredData.map(d => ({
        ...d,
        riskScore: Math.max(d.riskScore - 10, 20) // Reduce risk for short term
      }));
    } else if (timeHorizon === '30d') {
      filteredData = filteredData.map(d => ({
        ...d,
        riskScore: Math.min(d.riskScore + 5, 95) // Increase risk for longer term
      }));
    }
    
    return filteredData.sort((a, b) => b.riskScore - a.riskScore);
  };

  const modelMetrics = {
    risk_assessment: {
      name: 'Risk Assessment Model',
      accuracy: 89.2,
      precision: 87.5,
      recall: 91.3,
      lastTrained: '2024-01-15',
      dataPoints: 15420
    },
    flood_prediction: {
      name: 'Flood Prediction Model',
      accuracy: 92.1,
      precision: 90.8,
      recall: 93.4,
      lastTrained: '2024-01-18',
      dataPoints: 8930
    },
    pollution_forecast: {
      name: 'Pollution Forecast Model',
      accuracy: 85.7,
      precision: 84.2,
      recall: 87.1,
      lastTrained: '2024-01-12',
      dataPoints: 12650
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-green-500 transform rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getConfidenceWidth = (confidence) => {
    return `${confidence * 100}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Predictive Analytics</h1>
            <p className="text-gray-600">AI-powered risk assessment and hazard prediction</p>
          </div>
          
          {/* Model Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-gray-400" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="risk_assessment">Risk Assessment</option>
                <option value="flood_prediction">Flood Prediction</option>
                <option value="pollution_forecast">Pollution Forecast</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="24h">Next 24 Hours</option>
                <option value="7d">Next 7 Days</option>
                <option value="30d">Next 30 Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-maris-blue">
              {modelMetrics[selectedModel].accuracy}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {modelMetrics[selectedModel].precision}%
            </div>
            <div className="text-sm text-gray-600">Precision</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {modelMetrics[selectedModel].recall}%
            </div>
            <div className="text-sm text-gray-600">Recall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {modelMetrics[selectedModel].dataPoints.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Training Data Points</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Last trained: {modelMetrics[selectedModel].lastTrained}
        </div>
      </div>

      {/* Risk Assessment Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">High-Risk Districts</h2>
          <p className="text-sm text-gray-600">Districts ranked by predicted risk level for the selected time horizon</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Primary Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key Factors
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getRiskData().map((district, index) => (
                <tr key={district.district} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-maris-blue text-white rounded-full text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{district.district}</div>
                        <div className="text-sm text-gray-500">{district.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(district.riskScore)}`}>
                      {district.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-900">{district.primaryRisk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-maris-blue h-2 rounded-full"
                        style={{ width: getConfidenceWidth(district.confidence) }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(district.confidence * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(district.trend)}
                      <span className="ml-2 text-sm text-gray-600 capitalize">{district.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {district.factors.slice(0, 2).map((factor, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          {factor}
                        </span>
                      ))}
                      {district.factors.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          +{district.factors.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">High Risk Alert</p>
                <p className="text-sm text-gray-600">Mumbai shows 87% risk score due to convergence of heavy rainfall forecast and high tide cycle.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Emerging Pattern</p>
                <p className="text-sm text-gray-600">Cyclone formation probability in Bay of Bengal increased by 23% in the last 48 hours.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Model Update</p>
                <p className="text-sm text-gray-600">Risk assessment model accuracy improved to 89.2% after incorporating latest satellite data.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">Immediate Action Required</p>
              <p className="text-sm text-red-700">Issue flood alert for Mumbai coastal areas. Activate emergency response teams.</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Monitor Closely</p>
              <p className="text-sm text-orange-700">Track cyclone development in Bay of Bengal. Prepare evacuation plans for Chennai.</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Preventive Measures</p>
              <p className="text-sm text-blue-700">Strengthen coastal defenses in Visakhapatnam. Review drainage systems in high-risk areas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
