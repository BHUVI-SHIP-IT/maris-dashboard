import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, User, AlertTriangle, CheckCircle, Eye, FileText, Camera, Video, Shield, Users, Navigation } from 'lucide-react';

const CitizenReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [responseNotes, setResponseNotes] = useState('');
  const [approvedReports, setApprovedReports] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // pending, active, resolved

  // Load approved reports from localStorage on component mount
  useEffect(() => {
    const loadApprovedReports = () => {
      const storedReports = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]');
      setApprovedReports(storedReports);
    };

    loadApprovedReports();

    // Listen for new approved reports from analyst dashboard
    const handleNewApprovedReport = (event) => {
      const newReport = event.detail.report;
      setApprovedReports(prev => {
        const updated = [...prev, newReport];
        localStorage.setItem('approvedCitizenReports', JSON.stringify(updated));
        return updated;
      });
    };

    // Listen for priority updates on existing reports
    const handleReportUpdate = (event) => {
      const { reportId, action, newRelatedReport } = event.detail;
      setApprovedReports(prev => {
        const updated = prev.map(report => {
          if (report.id === reportId) {
            const updatedReport = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]')
              .find(r => r.id === reportId);
            return updatedReport || report;
          }
          return report;
        });
        return updated;
      });
      
      // Show notification for priority updates
      if (action === 'priority_increased') {
        window.alert(`🚨 PRIORITY UPDATE: Similar incident reported for "${newRelatedReport.title}". Case priority may have been escalated.`);
      }
    };

    window.addEventListener('citizenReportApproved', handleNewApprovedReport);
    window.addEventListener('citizenReportUpdated', handleReportUpdate);

    return () => {
      window.removeEventListener('citizenReportApproved', handleNewApprovedReport);
      window.removeEventListener('citizenReportUpdated', handleReportUpdate);
    };
  }, []);

  // Update official response and sync to localStorage
  const updateReportInStorage = (updatedReport) => {
    const storedReports = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]');
    const updatedReports = storedReports.map(report => 
      report.id === updatedReport.id ? updatedReport : report
    );
    localStorage.setItem('approvedCitizenReports', JSON.stringify(updatedReports));
    setApprovedReports(updatedReports);
  };

  const handleOfficialResponse = (reportId, responseType) => {
    const report = approvedReports.find(r => r.id === reportId);
    if (!report) return;

    let responseMessage = '';
    let newStatus = 'in_progress';

    switch (responseType) {
      case 'dispatch_team':
        responseMessage = `Emergency response team dispatched to ${report.location}. ETA: 30 minutes.`;
        break;
      case 'coordinate_agencies':
        responseMessage = `Coordinating with relevant agencies for incident at ${report.location}. Multi-agency response initiated.`;
        break;
      case 'issue_alert':
        responseMessage = `Public safety alert issued for ${report.location}. Citizens advised to avoid the area.`;
        break;
      case 'monitor':
        responseMessage = `Situation at ${report.location} under continuous monitoring. Updates will be provided as available.`;
        break;
      case 'resolve':
        responseMessage = responseNotes || 'Incident resolved successfully.';
        newStatus = 'resolved';
        break;
      default:
        responseMessage = responseNotes || 'Official response recorded.';
    }

    const updatedReport = {
      ...report,
      officialStatus: newStatus,
      officialResponse: responseMessage,
      respondedBy: 'Official User',
      respondedAt: new Date()
    };

    updateReportInStorage(updatedReport);
    
    window.alert(`Response recorded: ${responseMessage}`);
    setResponseNotes('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOfficialStatusColor = (status) => {
    switch (status) {
      case 'pending_response': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'image': return <Camera className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Filter reports based on active tab
  const getFilteredReports = () => {
    switch (activeTab) {
      case 'pending':
        return approvedReports.filter(r => r.officialStatus === 'pending_response');
      case 'active':
        return approvedReports.filter(r => r.officialStatus === 'in_progress');
      case 'resolved':
        return approvedReports.filter(r => r.officialStatus === 'resolved');
      default:
        return approvedReports;
    }
  };

  const filteredReports = getFilteredReports();

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Citizen Reports Dashboard</h1>
            </div>
            <p className="text-blue-100 text-lg">Manage and respond to analyst-approved incident reports</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{approvedReports.length}</div>
              <div className="text-sm text-blue-200">Total Reports</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-300">{approvedReports.filter(r => r.officialStatus === 'in_progress').length}</div>
              <div className="text-sm text-blue-200">Active Now</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Reports</p>
              <p className="text-3xl font-bold mt-2">{approvedReports.length}</p>
              <div className="flex items-center mt-2 text-blue-200 text-xs">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></div>
                All incidents
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <Phone className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Critical Priority</p>
              <p className="text-3xl font-bold mt-2">{approvedReports.filter(r => r.priority === 'critical').length}</p>
              <div className="flex items-center mt-2 text-red-200 text-xs">
                <div className="w-2 h-2 bg-red-300 rounded-full mr-2 animate-pulse"></div>
                Urgent response
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Active Reports</p>
              <p className="text-3xl font-bold mt-2">{approvedReports.filter(r => r.officialStatus === 'in_progress').length}</p>
              <div className="flex items-center mt-2 text-orange-200 text-xs">
                <div className="w-2 h-2 bg-orange-300 rounded-full mr-2 animate-pulse"></div>
                Teams deployed
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <Navigation className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Resolved</p>
              <p className="text-3xl font-bold mt-2">{approvedReports.filter(r => r.officialStatus === 'resolved').length}</p>
              <div className="flex items-center mt-2 text-green-200 text-xs">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                Completed
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Reports List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Reports Management
              </h2>
              <div className="text-sm text-gray-500">
                {filteredReports.length} of {approvedReports.length}
              </div>
            </div>
            
            {/* Enhanced Tabs */}
            <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-inner">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'pending'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Pending</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === 'pending' ? 'bg-white/20' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {approvedReports.filter(r => r.officialStatus === 'pending_response').length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'active'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Navigation className="h-4 w-4" />
                  <span>Active</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === 'active' ? 'bg-white/20' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {approvedReports.filter(r => r.officialStatus === 'in_progress').length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('resolved')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'resolved'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Resolved</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === 'resolved' ? 'bg-white/20' : 'bg-green-100 text-green-800'
                  }`}>
                    {approvedReports.filter(r => r.officialStatus === 'resolved').length}
                  </span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`group p-5 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  selectedReport?.id === report.id 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500 shadow-md' 
                    : 'hover:shadow-sm'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{report.title}</h3>
                    {report.relatedReports && report.relatedReports.length > 0 && (
                      <div className="flex items-center mt-1">
                        <Users className="h-3 w-3 text-orange-500 mr-1" />
                        <span className="text-xs text-orange-600 font-medium">
                          +{report.relatedReports.length} similar report{report.relatedReports.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(report.priority)}`}>
                      {report.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getOfficialStatusColor(report.officialStatus)}`}>
                      {report.officialStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {report.location}
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Analyst Approved
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {report.media.map((media, index) => (
                      <div key={index} className="text-gray-400">
                        {getMediaIcon(media.type)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredReports.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <div className="mb-4">
                  {activeTab === 'pending' && <Clock className="h-12 w-12 mx-auto text-gray-300" />}
                  {activeTab === 'active' && <Navigation className="h-12 w-12 mx-auto text-gray-300" />}
                  {activeTab === 'resolved' && <CheckCircle className="h-12 w-12 mx-auto text-gray-300" />}
                </div>
                <p className="text-sm">
                  {activeTab === 'pending' && 'No reports pending response'}
                  {activeTab === 'active' && 'No active reports in progress'}
                  {activeTab === 'resolved' && 'No resolved reports'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Report Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {selectedReport ? (
            <div>
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        selectedReport.priority === 'critical' ? 'bg-red-100' :
                        selectedReport.priority === 'high' ? 'bg-orange-100' :
                        selectedReport.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          selectedReport.priority === 'critical' ? 'text-red-600' :
                          selectedReport.priority === 'high' ? 'text-orange-600' :
                          selectedReport.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedReport.title}</h2>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedReport.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${getPriorityColor(selectedReport.priority)}`}>
                        {selectedReport.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOfficialStatusColor(selectedReport.officialStatus)}`}>
                        {selectedReport.officialStatus.replace('_', ' ').toUpperCase()}
                      </span>
                      {selectedReport.relatedReports && selectedReport.relatedReports.length > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          +{selectedReport.relatedReports.length} RELATED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Report ID</div>
                    <div className="font-mono text-sm font-medium text-gray-700">{selectedReport.id}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(selectedReport.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Description */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Incident Description</h3>
                  <p className="text-sm text-gray-700">{selectedReport.description}</p>
                </div>

                {/* Reporter Info */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Reported By</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{selectedReport.reportedBy.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedReport.reportedBy.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Analyst Analysis */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Analyst Review</h3>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Approved by {selectedReport.analyzedBy}</span>
                      <span className="text-xs text-green-600">
                        {selectedReport.analyzedAt.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-green-700">{selectedReport.analysisNotes}</p>
                  </div>
                </div>

                {/* Related Reports (if any) */}
                {selectedReport.relatedReports && selectedReport.relatedReports.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Related Reports ({selectedReport.relatedReports.length})
                    </h3>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">
                          Similar incidents merged with this case
                        </span>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedReport.relatedReports.map((related, index) => (
                          <div key={index} className="text-xs bg-white p-2 rounded border">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-gray-700">
                                {related.reportedBy.name}
                              </span>
                              <span className="text-gray-500">
                                {new Date(related.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{related.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-orange-700">
                        💡 <strong>Priority escalated</strong> due to multiple similar reports in the area
                      </div>
                    </div>
                  </div>
                )}

                {/* Official Response (if exists) */}
                {selectedReport.officialResponse && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Official Response</h3>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Response by {selectedReport.respondedBy}</span>
                        <span className="text-xs text-blue-600">
                          {selectedReport.respondedAt.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">{selectedReport.officialResponse}</p>
                    </div>
                  </div>
                )}

                {/* Media Attachments */}
                {selectedReport.media.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Evidence</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedReport.media.map((media, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            {getMediaIcon(media.type)}
                            <span className="text-xs font-medium text-gray-700">{media.type.toUpperCase()}</span>
                          </div>
                          <p className="text-xs text-gray-600">{media.description}</p>
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Response Notes */}
                {selectedReport.officialStatus !== 'resolved' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Response Notes
                    </label>
                    <textarea
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add response details..."
                    />
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                {selectedReport.officialStatus !== 'resolved' && (
                  <div className="bg-gray-50 -mx-6 -mb-6 p-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleOfficialResponse(selectedReport.id, 'dispatch_team')}
                        className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Users className="h-4 w-4 group-hover:animate-pulse" />
                          <span>Dispatch Team</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleOfficialResponse(selectedReport.id, 'coordinate_agencies')}
                        className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Navigation className="h-4 w-4 group-hover:animate-pulse" />
                          <span>Coordinate</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleOfficialResponse(selectedReport.id, 'issue_alert')}
                        className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <AlertTriangle className="h-4 w-4 group-hover:animate-pulse" />
                          <span>Issue Alert</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleOfficialResponse(selectedReport.id, 'monitor')}
                        className="group bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Eye className="h-4 w-4 group-hover:animate-pulse" />
                          <span>Monitor</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-12">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Report</h3>
                <p className="text-gray-500 max-w-sm">
                  Choose a report from the list to view detailed information and take appropriate action
                </p>
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    Pending
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    Active
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Resolved
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenReports;
