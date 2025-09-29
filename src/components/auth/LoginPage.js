import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Waves, BarChart3 } from 'lucide-react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'official',
    jurisdiction: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!credentials.username || !credentials.password || !credentials.role) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (credentials.role === 'official' && !credentials.jurisdiction) {
      alert('Please select a jurisdiction for official role.');
      return;
    }
    
    // Simple validation - in real app would validate against backend
    if (credentials.username === 'admin' && credentials.password === 'password') {
      const userData = {
        name: 'Official User',
        role: credentials.role,
        jurisdiction: credentials.jurisdiction
      };
      
      login(userData);
      console.log('Login successful:', userData);
      navigate(credentials.role === 'official' ? '/official' : '/analyst');
    } else if (credentials.username === 'analyst' && credentials.password === 'password') {
      const userData = {
        name: 'Data Analyst',
        role: credentials.role
      };
      
      login(userData);
      console.log('Login successful:', userData);
      navigate('/analyst');
    } else {
      alert('Invalid credentials. Use admin/password or analyst/password');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen h-full flex items-center bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500 justify-center p-2 sm:p-4 md:p-6">
      <div className="max-w-md w-full bg-white/80 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex items-center justify-center mb-6">
          <Waves className="h-10 w-10 text-maris-blue mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Maris Dashboard</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-maris-blue focus:border-maris-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-maris-blue focus:border-maris-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-maris-blue focus:border-maris-blue"
              required
            >
              <option value="official">Official</option>
              <option value="analyst">Data Analyst</option>
            </select>
          </div>
          {credentials.role === 'official' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
              <select
                name="jurisdiction"
                value={credentials.jurisdiction}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-maris-blue focus:border-maris-blue"
                required
              >
                <option value="">Select Jurisdiction</option>
                <option value="Coastal City A">Coastal City A</option>
                <option value="Harbor Town B">Harbor Town B</option>
                <option value="Island Region C">Island Region C</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-maris-blue text-white font-semibold py-2 rounded-md hover:bg-maris-blue-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-500">
          <p>For testing, use:</p>
          <ul className="list-disc list-inside">
            <li>Official: <span className="font-mono">admin / password</span></li>
            <li>Data Analyst: <span className="font-mono">analyst / password</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

