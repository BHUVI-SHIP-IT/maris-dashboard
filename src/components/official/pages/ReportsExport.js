import React, { useState } from 'react';
import { Download, Calendar, Filter, FileText, Eye, BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

const ReportsExport = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
    status: 'all',
    severity: 'all'
  });

  const [auditLogs] = useState([
    {
      id: 1,
      action: 'Report Verified',
      reportId: 'RPT-001',
      user: 'John Doe',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      details: 'Oil spill report verified and assigned to cleanup crew',
      category: 'verification',
      severity: 'high'
    },
    {
      id: 2,
      action: 'Alert Sent',
      user: 'Jane Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: 'Cyclone warning sent to all Mumbai residents',
      category: 'alert',
      severity: 'critical'
    },
    {
      id: 3,
      action: 'Report Rejected',
      reportId: 'RPT-002',
      user: 'Mike Johnson',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      details: 'False alarm - no actual emergency detected',
      category: 'verification',
      severity: 'low'
    },
    {
      id: 4,
      action: 'Team Assigned',
      reportId: 'RPT-003',
      user: 'Sarah Wilson',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      details: 'Marine rescue team assigned to fishing vessel emergency',
      category: 'assignment',
      severity: 'high'
    },
    {
      id: 5,
      action: 'Export Generated',
      user: 'Admin User',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      details: 'Monthly incident report exported to PDF format',
      category: 'export',
      severity: 'low'
    },
    {
      id: 6,
      action: 'Report Updated',
      reportId: 'RPT-004',
      user: 'David Chen',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      details: 'Pollution incident status updated to resolved',
      category: 'update',
      severity: 'medium'
    },
    {
      id: 7,
      action: 'Alert Cancelled',
      user: 'Emma Brown',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      details: 'Tsunami warning cancelled - false alarm from seismic data',
      category: 'alert',
      severity: 'critical'
    },
    {
      id: 8,
      action: 'User Login',
      user: 'Official User',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      details: 'User logged in from Mumbai jurisdiction',
      category: 'system',
      severity: 'low'
    },
    {
      id: 9,
      action: 'Report Created',
      reportId: 'RPT-005',
      user: 'System Auto',
      timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
      details: 'Automatic report generated from sensor data - high wave activity',
      category: 'creation',
      severity: 'medium'
    },
    {
      id: 10,
      action: 'Team Status Updated',
      user: 'Operations Manager',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      details: 'Coast Guard Team Alpha marked as available after mission completion',
      category: 'assignment',
      severity: 'low'
    }
  ]);

  const handleExport = (format) => {
    // Validate date range
    if (filters.startDate && filters.endDate && new Date(filters.startDate) > new Date(filters.endDate)) {
      alert('Start date cannot be after end date.');
      return;
    }
    
    // Generate mock data for export
    const exportData = {
      filters: filters,
      timestamp: new Date().toISOString(),
      totalRecords: Math.floor(Math.random() * 500) + 100,
      format: format.toUpperCase()
    };
    
    console.log('Export data:', exportData);
    
    // In real app, would generate and download file
    const fileName = `maris_reports_${new Date().toISOString().split('T')[0]}.${format}`;
    alert(`Exporting ${exportData.totalRecords} reports as ${format.toUpperCase()}...\nFile: ${fileName}`);
    
    // Simulate download delay
    setTimeout(() => {
      alert(`Export completed! File "${fileName}" would be downloaded.`);
    }, 2000);
  };

  // Export statistics
  const exportStats = {
    totalReports: 1247,
    thisMonth: 156,
    lastExport: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    avgResponseTime: '12 minutes',
    resolvedReports: 1089,
    pendingReports: 158
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports Export & Audit</h1>
        <p className="text-gray-600">Export reports and view audit logs of official actions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Reports</p>
              <p className="text-2xl font-bold">{exportStats.totalReports}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">This Month</p>
              <p className="text-2xl font-bold">{exportStats.thisMonth}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Resolved</p>
              <p className="text-2xl font-bold">{exportStats.resolvedReports}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Response</p>
              <p className="text-2xl font-bold">{exportStats.avgResponseTime}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h2>
          
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="flooding">Flooding</option>
                <option value="pollution">Pollution</option>
                <option value="weather">Weather</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <select
                  value={filters.severity}
                  onChange={(e) => setFilters({...filters, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleExport('csv')}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Export as CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Export as PDF</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Export as Excel</span>
            </button>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Export Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Reports:</span>
                <span className="ml-2 font-medium">1,247</span>
              </div>
              <div>
                <span className="text-gray-600">Date Range:</span>
                <span className="ml-2 font-medium">Last 30 days</span>
              </div>
              <div>
                <span className="text-gray-600">Verified:</span>
                <span className="ml-2 font-medium text-green-600">892</span>
              </div>
              <div>
                <span className="text-gray-600">Pending:</span>
                <span className="ml-2 font-medium text-yellow-600">234</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Logs</h2>
            <span className="text-sm text-gray-500">{auditLogs.length} recent activities</span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {log.user}
                      </div>
                      {log.reportId && (
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {log.reportId}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {log.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      log.category === 'alert' ? 'bg-red-100 text-red-800' :
                      log.category === 'verification' ? 'bg-blue-100 text-blue-800' :
                      log.category === 'assignment' ? 'bg-green-100 text-green-800' :
                      log.category === 'system' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full mt-4 text-maris-blue hover:text-blue-600 text-sm font-medium">
            Load More Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsExport;
