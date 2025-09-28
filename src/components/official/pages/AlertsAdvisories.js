import React, { useState } from 'react';
import { Send, MapPin, Users, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const AlertsAdvisories = () => {
  const [alertForm, setAlertForm] = useState({
    template: '',
    title: '',
    message: '',
    severity: 'medium',
    targetArea: '',
    coordinates: null
  });

  const templates = [
    {
      id: 'cyclone',
      name: 'Cyclone Warning',
      title: 'Cyclone Alert - Immediate Action Required',
      message: 'A cyclone is approaching your area. Please move to higher ground and follow evacuation procedures immediately. Secure all loose objects and stock up on essential supplies.'
    },
    {
      id: 'flood',
      name: 'Flood Alert',
      title: 'Flood Warning - Stay Safe',
      message: 'Heavy rainfall has caused flooding in your area. Avoid low-lying areas and do not attempt to cross flooded roads. Emergency shelters are available at designated locations.'
    },
    {
      id: 'pollution',
      name: 'Pollution Advisory',
      title: 'Water Contamination Alert',
      message: 'Water contamination detected in your area. Avoid contact with seawater and report any unusual observations. Use bottled water for drinking and cooking.'
    },
    {
      id: 'tsunami',
      name: 'Tsunami Warning',
      title: 'Tsunami Alert - Evacuate Immediately',
      message: 'Tsunami waves detected. Move to higher ground immediately. Stay away from beaches and coastal areas until all-clear is given.'
    },
    {
      id: 'oil_spill',
      name: 'Oil Spill Alert',
      title: 'Marine Pollution - Oil Spill Detected',
      message: 'Oil spill reported in coastal waters. Avoid swimming and fishing in affected areas. Report any oil-covered wildlife to authorities.'
    },
    {
      id: 'storm_surge',
      name: 'Storm Surge Warning',
      title: 'Storm Surge Alert - Coastal Flooding Expected',
      message: 'Storm surge expected to cause coastal flooding. Evacuate low-lying coastal areas immediately. Secure boats and marine equipment.'
    },
    {
      id: 'high_tide',
      name: 'High Tide Advisory',
      title: 'Extreme High Tide Warning',
      message: 'Unusually high tides expected. Coastal roads may be flooded. Avoid parking near waterfront areas and use alternate routes.'
    },
    {
      id: 'navigation',
      name: 'Navigation Hazard',
      title: 'Navigation Warning - Hazard Detected',
      message: 'Navigation hazard reported in shipping lanes. All vessels advised to use alternate routes. Contact port authority for updated navigation charts.'
    }
  ];

  const handleTemplateSelect = (template) => {
    setAlertForm({
      ...alertForm,
      template: template.id,
      title: template.title,
      message: template.message
    });
  };

  const handleSendAlert = () => {
    if (!alertForm.title || !alertForm.message || !alertForm.targetArea) {
      alert('Please fill in all required fields before sending the alert.');
      return;
    }
    
    // In real app, would send alert via API
    const alertData = {
      ...alertForm,
      timestamp: new Date(),
      id: Date.now(),
      status: 'sent'
    };
    
    console.log('Sending alert:', alertData);
    alert(`Alert "${alertForm.title}" sent successfully to ${alertForm.targetArea}!`);
    
    // Reset form
    setAlertForm({
      template: '',
      title: '',
      message: '',
      severity: 'medium',
      targetArea: '',
      coordinates: null
    });
  };

  // Recent alerts history
  const recentAlerts = [
    {
      id: 1,
      title: 'Cyclone Alert - Immediate Action Required',
      targetArea: 'Mumbai Coastal Areas',
      severity: 'critical',
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      recipients: 45000
    },
    {
      id: 2,
      title: 'High Tide Advisory',
      targetArea: 'Chennai Marina Beach',
      severity: 'medium',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'resolved',
      recipients: 12000
    },
    {
      id: 3,
      title: 'Oil Spill Alert',
      targetArea: 'Kochi Port Area',
      severity: 'high',
      sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'active',
      recipients: 8500
    },
    {
      id: 4,
      title: 'Navigation Hazard Warning',
      targetArea: 'Visakhapatnam Shipping Lane',
      severity: 'medium',
      sentAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'resolved',
      recipients: 3200
    },
    {
      id: 5,
      title: 'Storm Surge Warning',
      targetArea: 'Kolkata Coastal Districts',
      severity: 'high',
      sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'expired',
      recipients: 28000
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired': return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Alerts & Advisories</h1>
        <p className="text-gray-600">Issue emergency alerts and advisories to citizens</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Composer */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compose Alert</h2>
          
          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template (Optional)
            </label>
            <div className="grid grid-cols-1 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-3 text-left border rounded-lg hover:bg-gray-50 ${
                    alertForm.template === template.id ? 'border-maris-blue bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{template.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{template.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Alert Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Title
              </label>
              <input
                type="text"
                value={alertForm.title}
                onChange={(e) => setAlertForm({...alertForm, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                placeholder="Enter alert title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={alertForm.message}
                onChange={(e) => setAlertForm({...alertForm, message: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                placeholder="Enter alert message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity Level
              </label>
              <select
                value={alertForm.severity}
                onChange={(e) => setAlertForm({...alertForm, severity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Area
              </label>
              <select
                value={alertForm.targetArea}
                onChange={(e) => setAlertForm({...alertForm, targetArea: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
              >
                <option value="">Select target area</option>
                <option value="mumbai_central">Mumbai Central</option>
                <option value="bandra">Bandra</option>
                <option value="colaba">Colaba</option>
                <option value="juhu">Juhu</option>
                <option value="all_mumbai">All Mumbai</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          {alertForm.title && alertForm.message && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Preview</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    alertForm.severity === 'critical' ? 'text-red-500' :
                    alertForm.severity === 'high' ? 'text-orange-500' :
                    alertForm.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <span className="font-semibold text-gray-900">{alertForm.title}</span>
                </div>
                <p className="text-gray-700 text-sm">{alertForm.message}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                  <span>Severity: {alertForm.severity}</span>
                  {alertForm.targetArea && <span>Area: {alertForm.targetArea}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSendAlert}
            disabled={!alertForm.title || !alertForm.message || !alertForm.targetArea}
            className="w-full mt-6 bg-maris-blue text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Send Alert</span>
          </button>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: 'Cyclone Alert - Immediate Action Required',
                severity: 'critical',
                area: 'All Mumbai',
                sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                recipients: 15420
              },
              {
                id: 2,
                title: 'Flood Warning - Stay Safe',
                severity: 'high',
                area: 'Bandra',
                sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                recipients: 3240
              }
            ].map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {alert.area}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {alert.recipients.toLocaleString()} recipients
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {alert.sentAt.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Alerts History</h2>
          <span className="text-sm text-gray-500">{recentAlerts.length} alerts in last 24 hours</span>
        </div>
        
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(alert.status)}
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.targetArea}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {alert.recipients.toLocaleString()} recipients
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {alert.sentAt.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'active' ? 'bg-red-100 text-red-800' :
                    alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsAdvisories;
