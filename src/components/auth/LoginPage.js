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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        username: credentials.username,
        role: credentials.role,
        jurisdiction: credentials.jurisdiction,
        name: credentials.role === 'official' ? 'District Official' : 'Data Analyst'
      };
      
      login(userData);
      navigate(credentials.role === 'official' ? '/official' : '/analyst');
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500" />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/30" />
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center relative z-10">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="bg-maris-blue p-3 rounded-full shadow-lg">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-wide">M.A.R.I.S</h1>
          </div>
          <p className="text-white/90 drop-shadow-md text-lg font-medium">Maritime Alerts & Reporting Information System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCredentials({...credentials, role: 'official'})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    credentials.role === 'official'
                      ? 'border-maris-blue bg-blue-50 text-maris-blue'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Official</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCredentials({...credentials, role: 'analyst'})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    credentials.role === 'analyst'
                      ? 'border-maris-blue bg-blue-50 text-maris-blue'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Analyst</div>
                </button>
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maris-blue focus:border-maris-blue"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maris-blue focus:border-maris-blue"
                placeholder="Enter your password"
              />
            </div>

            {/* Jurisdiction (for officials) */}
            {credentials.role === 'official' && (
              <div>
                <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700">
                  Jurisdiction
                </label>
                <select
                  id="jurisdiction"
                  name="jurisdiction"
                  required
                  value={credentials.jurisdiction}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maris-blue focus:border-maris-blue"
                >
                  <option value="">Select District/Zone</option>
                  <option value="mumbai">Mumbai District</option>
                  <option value="chennai">Chennai District</option>
                  <option value="kochi">Kochi District</option>
                  <option value="visakhapatnam">Visakhapatnam District</option>
                  <option value="kolkata">Kolkata District</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maris-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maris-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Official: admin/password</p>
            <p className="text-xs text-gray-500">Analyst: analyst/password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
