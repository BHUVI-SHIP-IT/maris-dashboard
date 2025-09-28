import React, { useState } from 'react';
import { Download, Calendar, Filter, FileText, Eye } from 'lucide-react';

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
      details: 'Oil spill report verified and assigned to cleanup crew'
    },
    {
      id: 2,
      action: 'Alert Sent',
      user: 'Jane Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: 'Cyclone warning sent to all Mumbai residents'
    },
    {
      id: 3,
      action: 'Report Rejected',
      reportId: 'RPT-002',
      user: 'Mike Johnson',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      details: 'False alarm - no actual emergency detected'
    }
  ]);

  const handleExport = (format) => {
    // In real app, would generate and download file
    alert(`Exporting reports as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports Export & Audit</h1>
        <p className="text-gray-600">Export reports and view audit logs of official actions</p>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Logs</h2>
          
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{log.action}</h3>
                      {log.reportId && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {log.reportId}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>By: {log.user}</span>
                      <span>{log.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
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
