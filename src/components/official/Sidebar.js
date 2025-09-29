import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AlertTriangle,
  CheckCircle,
  FileText,
  MapPin,
  Users,
  LogOut,
  Waves,
  X,
  Shield,
  Phone
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Map Overview', href: '/official/map', icon: MapPin },
    { name: 'Verification Queue', href: '/official/verification', icon: CheckCircle },
    { name: 'Citizen Reports', href: '/official/citizen-reports', icon: Phone },
    { name: 'Assignments', href: '/official/assignments', icon: Users },
    { name: 'Alerts & Advisories', href: '/official/alerts', icon: AlertTriangle },
    { name: 'Social Media Alerts', href: '/official/social-alerts', icon: Shield },
    { name: 'Reports & Export', href: '/official/reports', icon: FileText },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl border-r border-gray-200 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 bg-maris-blue shadow">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white tracking-tight drop-shadow">M.A.R.I.S</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-maris-blue flex items-center justify-center shadow">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'O'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.jurisdiction}</p>
            </div>
          </div>
        </div>

        {/* Navigation (scrollable) */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-maris-blue/40 scrollbar-track-gray-100 scroll-smooth">
          <div className="space-y-1 pb-24">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-maris-blue text-white shadow'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout button */}
        <div className="w-full p-3 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
