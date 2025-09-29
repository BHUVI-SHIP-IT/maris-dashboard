import React, { useState, useEffect } from 'react';
import { Eye, Check, X, Clock, Image, Video, FileText } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const VerificationQueue = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    // Jurisdiction-specific pending reports data
    const allPendingReports = {
      mumbai: [
      {
        id: 1,
        title: 'Coastal Erosion Observed',
        category: 'infrastructure',
        predictedCategory: 'infrastructure',
        confidence: 0.92,
        severity: 'medium',
        location: { lat: 19.0760, lng: 72.8777 },
        address: 'Juhu Beach, Mumbai',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        description: 'Significant coastal erosion noticed after recent storms. Beach area reduced by approximately 20 meters.',
        reporter: {
          name: 'Rajesh Kumar',
          phone: '+91 98765 43210',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Erosion damage view 1' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Erosion damage view 2' },
          { type: 'video', url: '/api/placeholder/video', caption: 'Video showing extent of damage' }
        ],
        aiAnalysis: {
          keywords: ['erosion', 'beach', 'storm damage', 'infrastructure'],
          sentiment: 'concerned',
          urgency: 'medium'
        },
        jurisdiction: 'mumbai'
      },
      {
        id: 2,
        title: 'Suspicious Oil Discharge',
        category: 'pollution',
        predictedCategory: 'pollution',
        confidence: 0.87,
        severity: 'high',
        location: { lat: 19.0896, lng: 72.8656 },
        address: 'Mumbai Port Area',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        description: 'Dark liquid discharge observed from cargo vessel. Strong petroleum odor detected.',
        reporter: {
          name: 'Priya Sharma',
          phone: '+91 87654 32109',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Oil discharge from vessel' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Water contamination visible' }
        ],
        aiAnalysis: {
          keywords: ['oil', 'pollution', 'vessel', 'contamination'],
          sentiment: 'urgent',
          urgency: 'high'
        },
        jurisdiction: 'mumbai'
      },
      {
        id: 3,
        title: 'Fishing Boat Distress Signal',
        category: 'emergency',
        predictedCategory: 'emergency',
        confidence: 0.94,
        severity: 'critical',
        location: { lat: 19.0176, lng: 72.8562 },
        address: '15 nautical miles from Gateway of India',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        description: 'Fishing vessel "Sagar Rani" sent distress signal. Engine failure with 8 crew members on board. Weather conditions deteriorating rapidly.',
        reporter: {
          name: 'Maritime Rescue Center',
          phone: '+91 22 2431 6558',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Last known vessel position' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Weather radar showing storm' }
        ],
        aiAnalysis: {
          keywords: ['distress', 'emergency', 'rescue', 'vessel', 'storm'],
          sentiment: 'urgent',
          urgency: 'critical'
        },
        jurisdiction: 'mumbai'
      },
      {
        id: 4,
        title: 'Illegal Sand Mining Activity',
        category: 'violation',
        predictedCategory: 'violation',
        confidence: 0.78,
        severity: 'high',
        location: { lat: 19.0330, lng: 72.8697 },
        address: 'Mahim Creek, Mumbai',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'Unauthorized sand mining operations detected in protected mangrove area. Multiple trucks and excavators involved causing environmental damage.',
        reporter: {
          name: 'Environmental Officer',
          phone: '+91 98765 43211',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Mining equipment on site' },
          { type: 'video', url: '/api/placeholder/video', caption: 'Live mining activity footage' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Damaged mangrove area' }
        ],
        aiAnalysis: {
          keywords: ['mining', 'illegal', 'environmental', 'violation', 'mangrove'],
          sentiment: 'concerned',
          urgency: 'high'
        },
        jurisdiction: 'mumbai'
      },
      {
        id: 5,
        title: 'Suspicious Vessel Movement',
        category: 'security',
        predictedCategory: 'security',
        confidence: 0.71,
        severity: 'medium',
        location: { lat: 19.1136, lng: 72.9083 },
        address: 'Bandra-Worli Sea Link vicinity',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        description: 'Unidentified vessel spotted near restricted maritime zone without proper clearance. Vessel appears to be conducting unauthorized activities.',
        reporter: {
          name: 'Coast Guard Patrol',
          phone: '+91 22 2431 6789',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Vessel identification photo' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'GPS tracking data' }
        ],
        aiAnalysis: {
          keywords: ['vessel', 'security', 'unauthorized', 'maritime', 'surveillance'],
          sentiment: 'concerned',
          urgency: 'medium'
        },
        jurisdiction: 'mumbai'
      },
      {
        id: 6,
        title: 'Marine Wildlife Stranding',
        category: 'wildlife',
        predictedCategory: 'wildlife',
        confidence: 0.89,
        severity: 'medium',
        location: { lat: 19.1075, lng: 72.8263 },
        address: 'Juhu Beach, Mumbai',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        description: 'Multiple dolphins found stranded on Juhu Beach. Appears to be related to recent sonar testing in the area. Immediate rescue operation required.',
        reporter: {
          name: 'Marine Biologist',
          phone: '+91 98765 43212',
          verified: true
        },
        media: [
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Stranded dolphins on beach' },
          { type: 'video', url: '/api/placeholder/video', caption: 'Rescue operation in progress' },
          { type: 'image', url: '/api/placeholder/400/300', caption: 'Marine life assessment' }
        ],
        aiAnalysis: {
          keywords: ['wildlife', 'stranding', 'dolphins', 'rescue', 'marine'],
          sentiment: 'urgent',
          urgency: 'high'
        },
        jurisdiction: 'mumbai'
      }
      ],
      chennai: [
        {
          id: 3,
          title: 'Fishing Net Debris',
          category: 'pollution',
          predictedCategory: 'pollution',
          confidence: 0.85,
          severity: 'medium',
          location: { lat: 13.0827, lng: 80.2707 },
          address: 'Marina Beach, Chennai',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Large amounts of discarded fishing nets washing ashore',
          reporter: { name: 'Coastal Volunteer', phone: '+91 98765 43211', verified: true },
          media: [
            { type: 'image', url: '/api/placeholder/400/300', caption: 'Fishing net debris' }
          ],
          aiAnalysis: { keywords: ['fishing', 'nets', 'debris', 'pollution'], sentiment: 'concerned', urgency: 'medium' },
          jurisdiction: 'chennai'
        }
      ],
      kochi: [
        {
          id: 4,
          title: 'Backwater Contamination',
          category: 'pollution',
          predictedCategory: 'pollution',
          confidence: 0.90,
          severity: 'high',
          location: { lat: 9.9312, lng: 76.2673 },
          address: 'Vembanad Lake, Kochi',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          description: 'Chemical contamination detected in backwater system',
          reporter: { name: 'Environmental Officer', phone: '+91 98765 43212', verified: true },
          media: [
            { type: 'image', url: '/api/placeholder/400/300', caption: 'Water discoloration' }
          ],
          aiAnalysis: { keywords: ['chemical', 'contamination', 'backwater'], sentiment: 'urgent', urgency: 'high' },
          jurisdiction: 'kochi'
        }
      ],
      visakhapatnam: [
        {
          id: 5,
          title: 'Port Security Breach',
          category: 'infrastructure',
          predictedCategory: 'infrastructure',
          confidence: 0.88,
          severity: 'high',
          location: { lat: 17.6868, lng: 83.2185 },
          address: 'Visakhapatnam Port, AP',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          description: 'Unauthorized vessel detected in restricted port area',
          reporter: { name: 'Port Security', phone: '+91 98765 43213', verified: true },
          media: [
            { type: 'image', url: '/api/placeholder/400/300', caption: 'Unauthorized vessel' }
          ],
          aiAnalysis: { keywords: ['security', 'breach', 'unauthorized', 'vessel'], sentiment: 'urgent', urgency: 'high' },
          jurisdiction: 'visakhapatnam'
        }
      ],
      kolkata: [
        {
          id: 6,
          title: 'River Bank Collapse',
          category: 'infrastructure',
          predictedCategory: 'infrastructure',
          confidence: 0.94,
          severity: 'critical',
          location: { lat: 22.5726, lng: 88.3639 },
          address: 'Hooghly River, Kolkata',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          description: 'Major riverbank collapse threatening nearby settlements',
          reporter: { name: 'District Collector', phone: '+91 98765 43214', verified: true },
          media: [
            { type: 'image', url: '/api/placeholder/400/300', caption: 'Bank collapse damage' }
          ],
          aiAnalysis: { keywords: ['collapse', 'riverbank', 'infrastructure'], sentiment: 'critical', urgency: 'critical' },
          jurisdiction: 'kolkata'
        }
      ]
    };

    // Filter reports based on user's jurisdiction
    const userJurisdiction = user?.jurisdiction;
    const jurisdictionReports = allPendingReports[userJurisdiction] || [];
    setReports(jurisdictionReports);
  }, [user]);

  const handleVerification = (reportId, action, notes) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Validate notes for rejection
    if (action === 'reject' && !notes.trim()) {
      alert('Please provide notes when rejecting a report.');
      return;
    }
    
    // Log the verification action
    console.log('Verification action:', {
      reportId,
      action,
      notes,
      report: report.title,
      timestamp: new Date().toISOString()
    });
    
    // Show confirmation message
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    alert(`Report "${report.title}" has been ${actionText} successfully.`);
    
    // Remove from queue and reset form
    setReports(reports.filter(r => r.id !== reportId));
    setSelectedReport(null);
    setVerificationNotes('');
    
    // In real app, would make API call to update report status
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
<<<<<<< HEAD
    <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="bg-white rounded-lg shadow-sm flex flex-col flex-1 min-h-0">
=======
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-screen">
      {/* Reports Queue */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Verification Queue</h2>
          <p className="text-sm text-gray-600">{reports.length} reports pending verification</p>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedReport?.id === report.id ? 'bg-blue-50 border-l-4 border-l-maris-blue' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{report.address}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {report.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {report.confidence * 100}% confidence
                    </span>
                  </div>
                  <div className="flex items-center mt-1 space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {report.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {report.media.map((media, idx) => (
                    <div key={idx} className="text-gray-400">
                      {getMediaIcon(media.type)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Details */}
      <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
>>>>>>> c402aa22227b7c5568deabd56d3a714927613c1a
        {selectedReport ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">{selectedReport.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedReport.address}</p>
                  <div className="flex flex-wrap items-center mt-2 gap-2 lg:gap-4">
                    <span className="text-xs lg:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Predicted: {selectedReport.predictedCategory}
                    </span>
                    <span className="text-xs lg:text-sm text-gray-600">
                      Confidence: {(selectedReport.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-left lg:text-right">
                  <p className="text-sm text-gray-600">Reported by</p>
                  <p className="font-medium">{selectedReport.reporter.name}</p>
                  <p className="text-xs text-gray-500">{selectedReport.reporter.phone}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 min-h-0">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedReport.description}</p>
              </div>

              {/* AI Analysis */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Keywords</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedReport.aiAnalysis.keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Sentiment</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedReport.aiAnalysis.sentiment}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Attached Media</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedReport.media.map((media, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={media.caption}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="p-2">
                        <p className="text-xs text-gray-600">{media.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Notes */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Notes</h3>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add your verification notes here..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maris-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleVerification(selectedReport.id, 'verify', verificationNotes)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Verify Report</span>
                </button>
                <button
                  onClick={() => handleVerification(selectedReport.id, 'reject', verificationNotes)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Reject Report</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a report to view details</p>
            </div>
          </div>
        )}
      </div>
      {/* Reports Queue */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm flex flex-col min-h-0">
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Verification Queue</h2>
          <p className="text-sm text-gray-600">{reports.length} reports pending verification</p>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedReport?.id === report.id ? 'bg-blue-50 border-l-4 border-l-maris-blue' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{report.address}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {report.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {report.confidence * 100}% confidence
                    </span>
                  </div>
                  <div className="flex items-center mt-1 space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {report.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {report.media.map((media, idx) => (
                    <div key={idx} className="text-gray-400">
                      {getMediaIcon(media.type)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationQueue;
