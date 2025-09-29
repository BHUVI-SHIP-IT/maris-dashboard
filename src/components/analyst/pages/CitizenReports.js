import React, { useState } from 'react';
import { Phone, MapPin, Clock, User, AlertTriangle, CheckCircle, X, Eye, FileText, Camera, Video } from 'lucide-react';

const CitizenReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [analysisNotes, setAnalysisNotes] = useState('');
  const [pendingReports, setPendingReports] = useState([
    {
      id: 'CR001',
      title: 'Oil Spill Near Fishing Area',
      description: 'Large oil spill observed near the main fishing area. Multiple dead fish floating on surface. Strong petroleum smell. Estimated area affected is approximately 2 square kilometers. Local fishermen reporting significant impact on their daily catch.',
      location: 'Mumbai Coastal Area - Sector 7',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      reportedBy: {
        name: 'Rajesh Kumar',
        phone: '+91-9876543210',
        citizenId: 'MH001234',
        email: 'rajesh.kumar@email.com',
        address: 'Fishing Colony, Worli, Mumbai'
      },
      timestamp: new Date('2025-01-29T14:30:00'),
      priority: 'high',
      category: 'Environmental Hazard',
      status: 'pending_analysis',
      estimatedAffectedArea: '2 sq km',
      weatherConditions: 'Clear sky, moderate winds from southwest',
      nearbyLandmarks: ['Worli Fishing Village', 'Bandra-Worli Sea Link', 'Mahim Bay'],
      media: [
        { type: 'image', url: '/api/media/oil-spill-1.jpg', description: 'Oil spill overview from drone', timestamp: '14:30' },
        { type: 'image', url: '/api/media/oil-spill-2.jpg', description: 'Dead fish on surface', timestamp: '14:32' },
        { type: 'video', url: '/api/media/oil-spill-video.mp4', description: 'Video of the spill area showing extent', timestamp: '14:35', duration: '2:15' },
        { type: 'image', url: '/api/media/oil-spill-3.jpg', description: 'Affected fishing boats', timestamp: '14:40' }
      ],
      aiAnalysis: {
        confidence: 0.89,
        predictedCategory: 'Environmental Emergency',
        keywords: ['oil spill', 'environmental hazard', 'marine pollution', 'fishing area', 'dead fish', 'petroleum smell'],
        severity: 'high',
        urgency: 'immediate',
        riskFactors: ['Marine ecosystem damage', 'Fishing industry impact', 'Coastal pollution'],
        recommendedActions: ['Deploy oil containment booms', 'Notify environmental agencies', 'Issue fishing ban in affected area']
      }
    },
    {
      id: 'CR002',
      title: 'Suspicious Vessel Activity',
      description: 'Unidentified vessel moving in restricted waters near port area. No visible registration numbers. Acting suspiciously. Vessel appears to be conducting unauthorized surveillance of port infrastructure. Estimated length 25-30 meters, dark colored hull.',
      location: 'Chennai Port - Zone B',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      reportedBy: {
        name: 'Priya Sharma',
        phone: '+91-9123456789',
        citizenId: 'TN005678',
        email: 'priya.sharma@email.com',
        address: 'Port Area, Chennai'
      },
      timestamp: new Date('2025-01-29T13:15:00'),
      priority: 'critical',
      category: 'Security Threat',
      status: 'pending_analysis',
      vesselDetails: {
        estimatedLength: '25-30 meters',
        hullColor: 'Dark blue/black',
        speed: '8-10 knots',
        direction: 'Northwest towards restricted zone',
        crewVisible: '3-4 persons on deck'
      },
      weatherConditions: 'Partly cloudy, calm seas, visibility 8km',
      nearbyLandmarks: ['Chennai Port Container Terminal', 'Lighthouse', 'Naval Base Entrance'],
      media: [
        { type: 'image', url: '/api/media/suspicious-vessel.jpg', description: 'Vessel in restricted area', timestamp: '13:15' },
        { type: 'image', url: '/api/media/vessel-close.jpg', description: 'Close-up of vessel showing no registration', timestamp: '13:18' },
        { type: 'video', url: '/api/media/vessel-movement.mp4', description: 'Video showing suspicious movement pattern', timestamp: '13:20', duration: '1:45' }
      ],
      aiAnalysis: {
        confidence: 0.92,
        predictedCategory: 'Security Alert',
        keywords: ['suspicious vessel', 'restricted waters', 'security threat', 'unidentified', 'port surveillance', 'unauthorized access'],
        severity: 'critical',
        urgency: 'immediate',
        riskFactors: ['Port security breach', 'Potential terrorism threat', 'Unauthorized surveillance'],
        recommendedActions: ['Alert Coast Guard immediately', 'Deploy patrol boats', 'Notify port security', 'Track vessel movement']
      }
    },
    {
      id: 'CR003',
      title: 'Illegal Fishing Activity',
      description: 'Multiple boats using banned fishing nets in protected marine area. Observed during early morning hours.',
      location: 'Kochi Marine Sanctuary',
      coordinates: { lat: 9.9312, lng: 76.2673 },
      reportedBy: {
        name: 'Arun Menon',
        phone: '+91-9876512345',
        citizenId: 'KL009876'
      },
      timestamp: new Date('2025-01-29T06:45:00'),
      priority: 'medium',
      category: 'Illegal Activity',
      status: 'pending_analysis',
      media: [
        { type: 'image', url: '/api/media/illegal-fishing-1.jpg', description: 'Boats with banned nets' },
        { type: 'image', url: '/api/media/illegal-fishing-2.jpg', description: 'Close-up of banned equipment' }
      ],
      aiAnalysis: {
        confidence: 0.85,
        predictedCategory: 'Regulatory Violation',
        keywords: ['illegal fishing', 'banned nets', 'protected area', 'marine sanctuary'],
        severity: 'medium',
        urgency: 'standard'
      }
    },
    {
      id: 'CR004',
      title: 'Distressed Fishing Boat',
      description: 'Small fishing boat appears to be in distress. Engine smoke visible, boat listing to one side. Crew waving for help. Vessel appears to be taking on water. 4 crew members visible on deck.',
      location: 'Visakhapatnam Offshore - 15km',
      coordinates: { lat: 17.6868, lng: 83.2185 },
      reportedBy: {
        name: 'Captain Suresh',
        phone: '+91-9988776655',
        citizenId: 'AP001122',
        email: 'suresh.captain@email.com',
        address: 'Fisherman Colony, Visakhapatnam'
      },
      timestamp: new Date('2025-01-29T11:20:00'),
      priority: 'critical',
      category: 'Emergency Rescue',
      status: 'pending_analysis',
      vesselDetails: {
        vesselType: 'Traditional fishing boat',
        estimatedLength: '12 meters',
        crewCount: '4 persons',
        condition: 'Taking on water, engine failure',
        distressSignals: 'Hand waving, smoke signals'
      },
      weatherConditions: 'Rough seas, wind speed 25 knots, wave height 2-3 meters',
      nearbyLandmarks: ['Visakhapatnam Port', 'Dolphin Hill', 'Fishing Harbor'],
      media: [
        { type: 'image', url: '/api/media/distressed-boat.jpg', description: 'Boat in distress with visible smoke', timestamp: '11:20' },
        { type: 'video', url: '/api/media/distress-signal.mp4', description: 'Crew signaling for help', timestamp: '11:22', duration: '1:30' },
        { type: 'image', url: '/api/media/boat-listing.jpg', description: 'Boat listing to starboard side', timestamp: '11:25' }
      ],
      aiAnalysis: {
        confidence: 0.95,
        predictedCategory: 'Emergency Response',
        keywords: ['distressed vessel', 'emergency rescue', 'engine failure', 'crew in danger', 'taking on water', 'rough seas'],
        severity: 'critical',
        urgency: 'immediate',
        riskFactors: ['Lives at risk', 'Vessel sinking', 'Rough weather conditions'],
        recommendedActions: ['Deploy rescue boats immediately', 'Alert Coast Guard', 'Prepare medical assistance', 'Coordinate with nearby vessels']
      }
    },
    {
      id: 'CR005',
      title: 'Chemical Waste Discharge',
      description: 'Industrial vessel discharging unknown chemical waste into coastal waters. Water color changed to reddish-brown. Strong chemical odor detected. Marine life showing distress signs.',
      location: 'Kandla Port Industrial Zone',
      coordinates: { lat: 23.0225, lng: 70.2208 },
      reportedBy: {
        name: 'Dr. Meera Patel',
        phone: '+91-9876543210',
        citizenId: 'GJ007890',
        email: 'meera.patel@marine.org',
        address: 'Marine Research Institute, Kandla'
      },
      timestamp: new Date('2025-01-29T16:45:00'),
      priority: 'high',
      category: 'Environmental Violation',
      status: 'pending_analysis',
      vesselDetails: {
        vesselType: 'Industrial cargo ship',
        estimatedLength: '80-100 meters',
        flagState: 'Unknown',
        dischargeType: 'Chemical waste - reddish-brown liquid',
        dischargeRate: 'Continuous for past 30 minutes'
      },
      weatherConditions: 'Clear weather, light winds, high tide',
      nearbyLandmarks: ['Kandla Port', 'Industrial Complex', 'Tidal Creek'],
      affectedArea: 'Approximately 500 meters radius',
      media: [
        { type: 'image', url: '/api/media/chemical-discharge-1.jpg', description: 'Discolored water from chemical discharge', timestamp: '16:45' },
        { type: 'image', url: '/api/media/chemical-discharge-2.jpg', description: 'Industrial vessel during discharge', timestamp: '16:48' },
        { type: 'video', url: '/api/media/chemical-discharge-video.mp4', description: 'Active discharge from vessel', timestamp: '16:50', duration: '3:20' },
        { type: 'image', url: '/api/media/affected-marine-life.jpg', description: 'Distressed marine life in affected area', timestamp: '16:55' }
      ],
      aiAnalysis: {
        confidence: 0.87,
        predictedCategory: 'Environmental Crime',
        keywords: ['chemical discharge', 'industrial pollution', 'marine contamination', 'illegal dumping', 'environmental violation'],
        severity: 'high',
        urgency: 'immediate',
        riskFactors: ['Marine ecosystem damage', 'Water contamination', 'Public health risk', 'Legal violation'],
        recommendedActions: ['Stop vessel immediately', 'Collect water samples', 'Alert pollution control board', 'Document evidence for legal action']
      }
    },
    {
      id: 'CR006',
      title: 'Coral Reef Damage by Anchor',
      description: 'Large cruise ship anchored directly on protected coral reef. Visible damage to coral formations. Anchor chain dragging across reef causing extensive destruction.',
      location: 'Lakshadweep Marine Protected Area',
      coordinates: { lat: 10.5667, lng: 72.6417 },
      reportedBy: {
        name: 'Ravi Nair',
        phone: '+91-9123456789',
        citizenId: 'LD001234',
        email: 'ravi.nair@diving.com',
        address: 'Kavaratti Island, Lakshadweep'
      },
      timestamp: new Date('2025-01-29T09:30:00'),
      priority: 'high',
      category: 'Environmental Damage',
      status: 'pending_analysis',
      vesselDetails: {
        vesselType: 'Cruise ship',
        estimatedLength: '200+ meters',
        flagState: 'Foreign flagged',
        anchorType: 'Heavy chain anchor',
        anchoringDuration: 'Approximately 2 hours'
      },
      weatherConditions: 'Calm seas, clear visibility, low tide exposing reef damage',
      nearbyLandmarks: ['Kavaratti Island', 'Marine Protected Zone Boundary', 'Coral Garden'],
      damageAssessment: 'Estimated 50 square meters of coral reef damaged',
      media: [
        { type: 'image', url: '/api/media/coral-damage-1.jpg', description: 'Cruise ship anchored on reef', timestamp: '09:30' },
        { type: 'image', url: '/api/media/coral-damage-2.jpg', description: 'Damaged coral formations', timestamp: '09:35' },
        { type: 'video', url: '/api/media/coral-damage-underwater.mp4', description: 'Underwater footage of reef damage', timestamp: '09:40', duration: '4:15' },
        { type: 'image', url: '/api/media/anchor-chain-damage.jpg', description: 'Anchor chain dragging across reef', timestamp: '09:45' }
      ],
      aiAnalysis: {
        confidence: 0.91,
        predictedCategory: 'Environmental Violation',
        keywords: ['coral reef damage', 'illegal anchoring', 'marine protected area', 'cruise ship violation', 'ecosystem destruction'],
        severity: 'high',
        urgency: 'immediate',
        riskFactors: ['Irreversible coral damage', 'Protected area violation', 'Marine biodiversity loss'],
        recommendedActions: ['Order immediate vessel departure', 'Document damage for legal action', 'Alert marine protection authorities', 'Assess environmental impact']
      }
    }
  ]);

  const [analyzedReports, setAnalyzedReports] = useState([]);

  // Function to check if similar issue already exists
  const checkForSimilarIssue = (newReport) => {
    const existingReports = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]');
    
    // Define similarity criteria
    const isSimilarIssue = (existing, newReport) => {
      // Check if same category and nearby location (within 5km radius)
      const isSameCategory = existing.category === newReport.category;
      const isNearbyLocation = calculateDistance(
        existing.coordinates, 
        newReport.coordinates
      ) <= 5; // 5km radius
      
      // Check if reported within last 24 hours
      const timeDiff = Math.abs(new Date(existing.timestamp) - new Date(newReport.timestamp));
      const isRecentlyReported = timeDiff <= 24 * 60 * 60 * 1000; // 24 hours
      
      // Check for similar keywords in AI analysis
      const commonKeywords = existing.aiAnalysis?.keywords?.filter(keyword => 
        newReport.aiAnalysis?.keywords?.includes(keyword)
      ) || [];
      const hasSimilarKeywords = commonKeywords.length >= 2;
      
      return isSameCategory && (isNearbyLocation || hasSimilarKeywords) && isRecentlyReported;
    };
    
    return existingReports.find(existing => isSimilarIssue(existing, newReport));
  };

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleApproveReport = (reportId) => {
    const report = pendingReports.find(r => r.id === reportId);
    if (!report) return;

    // Check for similar existing issues
    const similarIssue = checkForSimilarIssue(report);
    
    if (similarIssue) {
      // Similar issue exists - update priority and count instead of creating new
      const existingReports = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]');
      const updatedReports = existingReports.map(existing => {
        if (existing.id === similarIssue.id) {
          return {
            ...existing,
            // Increase priority if current report has higher priority
            priority: getPriorityLevel(report.priority) > getPriorityLevel(existing.priority) 
              ? report.priority : existing.priority,
            // Add to report count
            relatedReports: [...(existing.relatedReports || []), {
              id: report.id,
              reportedBy: report.reportedBy,
              timestamp: report.timestamp,
              description: report.description,
              media: report.media,
              addedAt: new Date()
            }],
            // Update last activity
            lastUpdated: new Date(),
            // Merge analysis notes
            analysisNotes: existing.analysisNotes + `\n\n[RELATED REPORT ${new Date().toLocaleString()}]: ${analysisNotes || 'Additional similar incident reported.'}`
          };
        }
        return existing;
      });

      localStorage.setItem('approvedCitizenReports', JSON.stringify(updatedReports));
      
      // Update local state
      setAnalyzedReports(prev => [...prev, {
        ...report,
        status: 'merged_with_existing',
        mergedWith: similarIssue.id,
        analysisNotes: `Merged with existing issue: ${similarIssue.title}`,
        analyzedBy: 'Data Analyst',
        analyzedAt: new Date()
      }]);
      
      setPendingReports(prev => prev.filter(r => r.id !== reportId));
      setSelectedReport(null);
      setAnalysisNotes('');

      // Notify officials of priority update
      window.dispatchEvent(new CustomEvent('citizenReportUpdated', { 
        detail: { 
          reportId: similarIssue.id, 
          action: 'priority_increased',
          newRelatedReport: report
        } 
      }));

      alert(`Similar issue found! Report merged with existing case "${similarIssue.title}". Priority updated and officials notified.`);
    } else {
      // No similar issue - create new report as usual
      const approvedReport = {
        ...report,
        status: 'approved',
        analysisNotes: analysisNotes,
        analyzedBy: 'Data Analyst',
        analyzedAt: new Date(),
        forwardedToOfficial: true,
        officialStatus: 'pending_response',
        relatedReports: [], // Initialize for future similar reports
        lastUpdated: new Date()
      };

      // Update local state
      setAnalyzedReports(prev => [...prev, approvedReport]);
      setPendingReports(prev => prev.filter(r => r.id !== reportId));
      setSelectedReport(null);
      setAnalysisNotes('');

      // Store in localStorage for cross-component communication
      const existingApprovedReports = JSON.parse(localStorage.getItem('approvedCitizenReports') || '[]');
      const updatedApprovedReports = [...existingApprovedReports, approvedReport];
      localStorage.setItem('approvedCitizenReports', JSON.stringify(updatedApprovedReports));

      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('citizenReportApproved', { 
        detail: { report: approvedReport } 
      }));

      alert(`Report "${report.title}" has been approved and forwarded to Official Dashboard.`);
    }
  };

  // Helper function to get numeric priority level for comparison
  const getPriorityLevel = (priority) => {
    switch (priority) {
      case 'critical': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const handleRejectReport = (reportId, reason) => {
    if (!reason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    const report = pendingReports.find(r => r.id === reportId);
    if (!report) return;

    const rejectedReport = {
      ...report,
      status: 'rejected',
      rejectionReason: reason,
      analyzedBy: 'Data Analyst',
      analyzedAt: new Date()
    };

    setAnalyzedReports(prev => [...prev, rejectedReport]);
    setPendingReports(prev => prev.filter(r => r.id !== reportId));
    setSelectedReport(null);

    alert(`Report "${report.title}" has been rejected.`);
  };

  const handleRequestMoreInfo = (reportId) => {
    const report = pendingReports.find(r => r.id === reportId);
    if (!report) return;

    // In real app, would send notification to citizen
    alert(`Additional information requested from ${report.reportedBy.name} for report "${report.title}".`);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_analysis': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Citizen Reports Analysis</h1>
            </div>
            <p className="text-indigo-100 text-lg">Review, verify and approve citizen-submitted incident reports</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{pendingReports.length}</div>
              <div className="text-sm text-indigo-200">Pending Review</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-300">{analyzedReports.length}</div>
              <div className="text-sm text-indigo-200">Analyzed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Pending Analysis</p>
              <p className="text-3xl font-bold mt-2">{pendingReports.length}</p>
              <div className="flex items-center mt-2 text-blue-200 text-xs">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></div>
                Awaiting review
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <Phone className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Approved Today</p>
              <p className="text-3xl font-bold mt-2">{analyzedReports.filter(r => r.status === 'approved').length}</p>
              <div className="flex items-center mt-2 text-green-200 text-xs">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                Verified & sent
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-red-500 via-red-600 to-rose-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Critical Reports</p>
              <p className="text-3xl font-bold mt-2">{pendingReports.filter(r => r.priority === 'critical').length}</p>
              <div className="flex items-center mt-2 text-red-200 text-xs">
                <div className="w-2 h-2 bg-red-300 rounded-full mr-2 animate-pulse"></div>
                Urgent attention
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-purple-500 via-indigo-600 to-violet-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg Response Time</p>
              <p className="text-3xl font-bold mt-2">12m</p>
              <div className="flex items-center mt-2 text-purple-200 text-xs">
                <div className="w-2 h-2 bg-purple-300 rounded-full mr-2"></div>
                Analysis speed
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Reports List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                Pending Analysis
              </h2>
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                  {pendingReports.length} reports
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">AI-analyzed reports awaiting expert verification</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {pendingReports.map((report, index) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`group p-5 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                  selectedReport?.id === report.id 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-l-indigo-500 shadow-md' 
                    : 'hover:shadow-sm'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(report.priority)}`}>
                    {report.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {report.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {report.timestamp.toLocaleTimeString()}
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
          </div>
        </div>

        {/* Enhanced Report Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {selectedReport ? (
            <div>
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-gray-200">
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
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200">
                        🤖 AI: {(selectedReport.aiAnalysis.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Report ID</div>
                      <div className="font-mono text-sm font-medium text-gray-700">{selectedReport.id}</div>
                    </div>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700">{selectedReport.description}</p>
                </div>

                {/* Reporter Info */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Reported By</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{selectedReport.reportedBy.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedReport.reportedBy.phone}</span>
                    </div>
                    <div className="text-xs text-gray-500">ID: {selectedReport.reportedBy.citizenId}</div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">AI Analysis</h3>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <p className="text-xs font-medium text-blue-900">Predicted Category</p>
                        <p className="text-sm text-blue-800">{selectedReport.aiAnalysis.predictedCategory}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-900">Urgency Level</p>
                        <p className="text-sm text-blue-800">{selectedReport.aiAnalysis.urgency}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-900 mb-1">Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedReport.aiAnalysis.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Attachments */}
                {selectedReport.media.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Media Attachments</h3>
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

                {/* Analysis Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Analysis Notes
                  </label>
                  <textarea
                    value={analysisNotes}
                    onChange={(e) => setAnalysisNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add your analysis notes here..."
                  />
                </div>

                {/* Enhanced Action Buttons */}
                <div className="bg-gray-50 -mx-6 -mb-6 p-6 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleApproveReport(selectedReport.id)}
                      className="group flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 group-hover:animate-pulse" />
                        <span>Approve & Forward</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Please provide a reason for rejection:');
                        if (reason) handleRejectReport(selectedReport.id, reason);
                      }}
                      className="group flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <X className="h-5 w-5 group-hover:animate-pulse" />
                        <span>Reject</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleRequestMoreInfo(selectedReport.id)}
                      className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <AlertTriangle className="h-5 w-5 group-hover:animate-pulse" />
                        <span>More Info</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-12">
              <div className="text-center">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Report for Analysis</h3>
                <p className="text-gray-500 max-w-sm">
                  Choose a report from the pending list to review AI analysis and make verification decisions
                </p>
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Approve
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    Reject
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    More Info
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
