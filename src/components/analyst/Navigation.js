import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, TrendingUp, Share2, Brain } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { name: 'National Map', href: '/analyst/national-map', icon: Map },
    { name: 'Trends & Hotspots', href: '/analyst/trends', icon: TrendingUp },
    { name: 'Social Media & External Data', href: '/analyst/social-data', icon: Share2 },
    { name: 'Predictive Analytics', href: '/analyst/predictive', icon: Brain },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-maris-blue text-maris-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
