import React, { useState, useEffect } from 'react';
import { Users, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AssignmentTracking = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    // Jurisdiction-specific teams
    const allTeamsData = {
      mumbai: [
        { id: 1, name: 'Mumbai Emergency Response', members: 4, status: 'available', location: 'Mumbai Central' },
        { id: 2, name: 'Marine Cleanup Crew Mumbai', members: 6, status: 'busy', location: 'Bandra' },
        { id: 3, name: 'Infrastructure Assessment', members: 3, status: 'available', location: 'Colaba' }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teams Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Teams</h2>
          <div className="space-y-3">
            {teams.map((team) => (
              <div key={team.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    team.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {team.status}
                  </span>
                </div>
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
              </div>
            ))}
          </div>
        </div>

        {/* Active Assignments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Assignments</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(assignment.status)}`}>
                        {assignment.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {assignment.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {assignment.assignedTeam.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTracking;
