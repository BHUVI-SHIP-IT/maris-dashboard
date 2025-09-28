import React, { useState, useEffect } from 'react';
import { Users, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AssignmentTracking = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  const handleAssignTeam = (teamId, assignmentId) => {
    const team = teams.find(t => t.id === teamId);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!team || !assignment) return;
    
    // Update team status
    setTeams(teams.map(t => 
      t.id === teamId 
        ? { ...t, status: 'busy' }
        : t
    ));
    
    // Update assignment
    setAssignments(assignments.map(a =>
      a.id === assignmentId
        ? { ...a, assignedTeam: team, status: 'assigned' }
        : a
    ));
    
    alert(`Team "${team.name}" has been assigned to "${assignment.title}"`);
  };
  
  const handleUpdateStatus = (assignmentId, newStatus) => {
    setAssignments(assignments.map(a =>
      a.id === assignmentId
        ? { ...a, status: newStatus }
        : a
    ));
    
    const assignment = assignments.find(a => a.id === assignmentId);
    alert(`Assignment "${assignment?.title}" status updated to: ${newStatus}`);
  };

  useEffect(() => {
    // Jurisdiction-specific teams
    const allTeamsData = {
      mumbai: [
        { id: 1, name: 'Mumbai Emergency Response', members: 4, status: 'available', location: 'Mumbai Central', specialization: 'Emergency Rescue' },
        { id: 2, name: 'Marine Cleanup Crew Mumbai', members: 6, status: 'busy', location: 'Bandra', specialization: 'Pollution Control' },
        { id: 3, name: 'Infrastructure Assessment', members: 3, status: 'available', location: 'Colaba', specialization: 'Structural Analysis' },
        { id: 4, name: 'Coast Guard Alpha', members: 8, status: 'available', location: 'Gateway of India', specialization: 'Maritime Security' },
        { id: 5, name: 'Marine Wildlife Rescue', members: 5, status: 'busy', location: 'Juhu Beach', specialization: 'Wildlife Protection' },
        { id: 6, name: 'Port Security Team', members: 7, status: 'available', location: 'Mumbai Port', specialization: 'Port Operations' },
        { id: 7, name: 'Dive & Recovery Unit', members: 4, status: 'available', location: 'Navy Nagar', specialization: 'Underwater Operations' }
      ],
      chennai: [
        { id: 4, name: 'Chennai Coast Guard', members: 5, status: 'available', location: 'Marina Beach' },
        { id: 5, name: 'Pollution Control Chennai', members: 4, status: 'busy', location: 'Ennore' }
      ],
      kochi: [
        { id: 6, name: 'Kochi Marine Response', members: 3, status: 'available', location: 'Fort Kochi' },
        { id: 7, name: 'Backwater Monitoring', members: 4, status: 'available', location: 'Vembanad' }
      ],
      visakhapatnam: [
        { id: 8, name: 'Vizag Port Security', members: 6, status: 'busy', location: 'Visakhapatnam Port' },
        { id: 9, name: 'Beach Patrol Unit', members: 3, status: 'available', location: 'RK Beach' }
      ],
      kolkata: [
        { id: 10, name: 'Hooghly River Patrol', members: 4, status: 'available', location: 'Princep Ghat' },
        { id: 11, name: 'Sundarbans Unit', members: 5, status: 'busy', location: 'Sundarbans' }
      ]
    };

    const mockAssignments = [
      {
        id: 1,
        reportId: 'RPT-001',
        title: 'Oil Spill Cleanup',
        assignedTeam: { id: 2, name: 'Marine Cleanup Crew Mumbai', members: 6, status: 'busy', location: 'Bandra' },
        assignedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        eta: new Date(Date.now() + 1 * 60 * 60 * 1000),
        status: 'in_progress',
        priority: 'high',
        location: 'Bandra Worli Sea Link',
        updates: [
          { time: new Date(Date.now() - 30 * 60 * 1000), message: 'Team dispatched to location', status: 'dispatched' },
          { time: new Date(Date.now() - 15 * 60 * 1000), message: 'Arrived at scene, assessment in progress', status: 'on_site' }
        ]
      },
      {
        id: 2,
        reportId: 'RPT-003',
        title: 'Fishing Vessel Emergency Rescue',
        assignedTeam: { id: 4, name: 'Coast Guard Alpha', members: 8, status: 'busy', location: 'Gateway of India' },
        assignedAt: new Date(Date.now() - 45 * 60 * 1000),
        eta: new Date(Date.now() + 30 * 60 * 1000),
        status: 'in_progress',
        priority: 'critical',
        location: '15 nautical miles from Gateway of India',
        updates: [
          { time: new Date(Date.now() - 40 * 60 * 1000), message: 'Emergency response team mobilized', status: 'dispatched' },
          { time: new Date(Date.now() - 25 * 60 * 1000), message: 'Rescue vessel deployed', status: 'en_route' },
          { time: new Date(Date.now() - 10 * 60 * 1000), message: 'Visual contact established with distressed vessel', status: 'on_site' }
        ]
      },
      {
        id: 3,
        reportId: 'RPT-006',
        title: 'Marine Wildlife Rescue Operation',
        assignedTeam: { id: 5, name: 'Marine Wildlife Rescue', members: 5, status: 'busy', location: 'Juhu Beach' },
        assignedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        eta: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'in_progress',
        priority: 'high',
        location: 'Juhu Beach, Mumbai',
        updates: [
          { time: new Date(Date.now() - 2.5 * 60 * 60 * 1000), message: 'Wildlife rescue team deployed', status: 'dispatched' },
          { time: new Date(Date.now() - 2 * 60 * 60 * 1000), message: 'On-site assessment of stranded dolphins', status: 'on_site' },
          { time: new Date(Date.now() - 1 * 60 * 60 * 1000), message: 'Rescue operation in progress, 3 dolphins relocated', status: 'active' }
        ]
      },
      {
        id: 4,
        reportId: 'RPT-004',
        title: 'Environmental Violation Investigation',
        assignedTeam: { id: 3, name: 'Infrastructure Assessment', members: 3, status: 'available', location: 'Colaba' },
        assignedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        eta: new Date(Date.now() + 3 * 60 * 60 * 1000),
        status: 'assigned',
        priority: 'medium',
        location: 'Mahim Creek, Mumbai',
        updates: [
          { time: new Date(Date.now() - 50 * 60 * 1000), message: 'Investigation team assigned', status: 'assigned' },
          { time: new Date(Date.now() - 30 * 60 * 1000), message: 'Team preparing equipment for site visit', status: 'preparing' }
        ]
      },
      {
        id: 5,
        reportId: 'RPT-005',
        title: 'Suspicious Vessel Monitoring',
        assignedTeam: { id: 6, name: 'Port Security Team', members: 7, status: 'available', location: 'Mumbai Port' },
        assignedAt: new Date(Date.now() - 90 * 60 * 1000),
        eta: new Date(Date.now() + 45 * 60 * 1000),
        status: 'assigned',
        priority: 'medium',
        location: 'Bandra-Worli Sea Link vicinity',
        updates: [
          { time: new Date(Date.now() - 80 * 60 * 1000), message: 'Security team notified', status: 'assigned' },
          { time: new Date(Date.now() - 60 * 60 * 1000), message: 'Surveillance equipment prepared', status: 'preparing' }
        ]
      }
    ];

    // Filter teams and assignments based on user's jurisdiction
    const userJurisdiction = user?.jurisdiction;
    const jurisdictionTeams = allTeamsData[userJurisdiction] || [];
    const jurisdictionAssignments = mockAssignments.filter(assignment => 
      assignment.location && assignment.location.toLowerCase().includes(userJurisdiction || '')
    );
    
    setTeams(jurisdictionTeams);
    setAssignments(jurisdictionAssignments);
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignment & Status Tracking</h1>
        <p className="text-gray-600">Manage field team assignments and track progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teams Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Available Teams</h2>
            <span className="text-sm text-gray-500">{teams.length} teams total</span>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {teams.map((team) => (
              <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    team.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {team.status}
                  </span>
                </div>
                {team.specialization && (
                  <p className="text-xs text-blue-600 mb-2 font-medium">{team.specialization}</p>
                )}
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {team.members} members
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {team.location}
                  </div>
                </div>
                {team.status === 'available' && (
                  <button 
                    onClick={() => handleAssignTeam(team.id, assignments[0]?.id)}
                    className="mt-2 w-full px-3 py-1 text-xs bg-maris-blue text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Assign to Task
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Assignments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Active Assignments</h2>
              <span className="text-sm text-gray-500">{assignments.length} active operations</span>
            </div>
          </div>
          <div className="p-6">
            {assignments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active assignments</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <span className="text-xs text-gray-500">#{assignment.reportId}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assignment.location}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Assigned: {assignment.assignedAt.toLocaleTimeString()}</span>
                          <span>ETA: {assignment.eta.toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          assignment.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          assignment.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {assignment.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Assigned Team:</span>
                        <span className="text-sm text-gray-600">{assignment.assignedTeam.members} members</span>
                      </div>
                      <p className="text-sm text-gray-900">{assignment.assignedTeam.name}</p>
                      <p className="text-xs text-gray-500">{assignment.assignedTeam.location}</p>
                    </div>

                    {assignment.updates && assignment.updates.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Updates:</h4>
                        <div className="space-y-2">
                          {assignment.updates.slice(-2).map((update, index) => (
                            <div key={index} className="flex items-start space-x-2 text-xs">
                              <div className="w-2 h-2 bg-maris-blue rounded-full mt-1.5 flex-shrink-0"></div>
                              <div>
                                <p className="text-gray-700">{update.message}</p>
                                <p className="text-gray-500">{update.time.toLocaleTimeString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleUpdateStatus(assignment.id, 'completed')}
                        className="flex-1 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(assignment.id, 'in_progress')}
                        className="flex-1 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTracking;
