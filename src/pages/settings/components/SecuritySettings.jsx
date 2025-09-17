import React, { useState } from 'react';
import { Shield, Smartphone, Key, Eye, Clock, AlertTriangle } from 'lucide-react';

const SecuritySettings = ({ onChange }) => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    ipLogging: true,
    loginNotifications: true,
    deviceTracking: true,
    apiKeyRotation: 'monthly',
    passwordPolicy: 'strict'
  });

  const [loginActivity] = useState([
    {
      timestamp: '2025-12-17 09:15:23',
      location: 'New York, NY, USA',
      device: 'Chrome on Windows',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      timestamp: '2025-12-16 18:42:11',
      location: 'New York, NY, USA',
      device: 'Safari on iPhone',
      ip: '192.168.1.105',
      status: 'success'
    },
    {
      timestamp: '2025-12-16 14:28:45',
      location: 'Unknown Location',
      device: 'Chrome on Linux',
      ip: '203.0.113.42',
      status: 'blocked'
    },
    {
      timestamp: '2025-12-15 22:15:33',
      location: 'New York, NY, USA',
      device: 'Chrome on Windows',
      ip: '192.168.1.100',
      status: 'success'
    }
  ]);

  const [trustedDevices] = useState([
    {
      name: 'Windows PC - Chrome',
      location: 'New York, NY',
      lastSeen: '2025-12-17 09:15:23',
      trusted: true
    },
    {
      name: 'iPhone - Safari',
      location: 'New York, NY',
      lastSeen: '2025-12-16 18:42:11',
      trusted: true
    },
    {
      name: 'MacBook Pro - Chrome',
      location: 'New York, NY',
      lastSeen: '2025-12-14 16:30:15',
      trusted: false
    }
  ]);

  const handleSettingChange = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
    onChange();
  };

  const enable2FA = () => {
    // Handle 2FA setup
    console.log('Opening 2FA setup');
  };

  const disable2FA = () => {
    if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      handleSettingChange('twoFactorEnabled', false);
    }
  };

  const logoutAllDevices = () => {
    if (confirm('This will log you out of all devices and sessions. Continue?')) {
      console.log('Logging out all devices');
    }
  };

  const sessionTimeouts = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' },
    { value: 0, label: 'Never' }
  ];

  const rotationPeriods = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'manual', label: 'Manual only' }
  ];

  const passwordPolicies = [
    { value: 'basic', label: 'Basic', desc: 'Minimum 8 characters' },
    { value: 'standard', label: 'Standard', desc: '8+ chars, numbers, symbols' },
    { value: 'strict', label: 'Strict', desc: '12+ chars, mixed case, numbers, symbols' }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600" />
          Security Settings
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Manage two-factor authentication, session management, and security monitoring
        </p>
      </div>
      {/* Two-Factor Authentication */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Smartphone className="h-4 w-4 mr-2" />
          Two-Factor Authentication
        </h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h5 className="font-medium text-blue-900">
                2FA is {securitySettings?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {securitySettings?.twoFactorEnabled 
                  ? 'Your account is protected with two-factor authentication' :'Enable 2FA for enhanced account security'
                }
              </p>
            </div>
            <button
              onClick={securitySettings?.twoFactorEnabled ? disable2FA : enable2FA}
              className={`px-4 py-2 text-sm rounded-lg ${
                securitySettings?.twoFactorEnabled
                  ? 'bg-red-600 text-white hover:bg-red-700' :'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {securitySettings?.twoFactorEnabled ? 'Disable 2FA' : 'Setup 2FA'}
            </button>
          </div>
        </div>

        {securitySettings?.twoFactorEnabled && (
          <div className="ml-4 p-3 border rounded-lg">
            <p className="text-sm text-gray-600">
              Authenticator app configured • Backup codes generated • SMS backup enabled
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">
              View backup codes
            </button>
          </div>
        )}
      </div>
      {/* Session Management */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Session Management
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout
            </label>
            <select
              value={securitySettings?.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e?.target?.value))}
              className="w-full md:w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sessionTimeouts?.map((timeout) => (
                <option key={timeout?.value} value={timeout?.value}>
                  {timeout?.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Automatically log out after this period of inactivity
            </p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">IP Address Logging</span>
              <p className="text-xs text-gray-500">Track login attempts by IP address</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings?.ipLogging}
              onChange={(e) => handleSettingChange('ipLogging', e?.target?.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Login Notifications</span>
              <p className="text-xs text-gray-500">Receive email alerts for new logins</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings?.loginNotifications}
              onChange={(e) => handleSettingChange('loginNotifications', e?.target?.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>

          <button
            onClick={logoutAllDevices}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Log Out All Devices
          </button>
        </div>
      </div>
      {/* Password Policy */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Key className="h-4 w-4 mr-2" />
          Password Policy
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {passwordPolicies?.map((policy) => (
            <button
              key={policy?.value}
              onClick={() => handleSettingChange('passwordPolicy', policy?.value)}
              className={`p-4 rounded-lg border-2 text-center ${
                securitySettings?.passwordPolicy === policy?.value
                  ? 'border-blue-600 bg-blue-50 text-blue-700' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{policy?.label}</div>
              <div className="text-xs text-gray-500 mt-1">{policy?.desc}</div>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key Rotation
          </label>
          <select
            value={securitySettings?.apiKeyRotation}
            onChange={(e) => handleSettingChange('apiKeyRotation', e?.target?.value)}
            className="w-full md:w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {rotationPeriods?.map((period) => (
              <option key={period?.value} value={period?.value}>
                {period?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Login Activity */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Eye className="h-4 w-4 mr-2" />
          Recent Login Activity
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Device</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">IP Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loginActivity?.map((activity, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity?.timestamp}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity?.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity?.device}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">{activity?.ip}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      activity?.status === 'success' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                    }`}>
                      {activity?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Trusted Devices */}
      <div>
        <h4 className="text-md font-medium mb-4">Trusted Devices</h4>
        <div className="space-y-3">
          {trustedDevices?.map((device, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">{device?.name}</h5>
                <p className="text-sm text-gray-600">{device?.location}</p>
                <p className="text-xs text-gray-500">Last seen: {device?.lastSeen}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  device?.trusted
                    ? 'bg-green-100 text-green-800' :'bg-orange-100 text-orange-800'
                }`}>
                  {device?.trusted ? 'Trusted' : 'Untrusted'}
                </span>
                <button className="text-sm text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h5 className="font-medium text-yellow-900">Security Recommendations</h5>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Consider enabling API key rotation for enhanced security</li>
              <li>• Review and remove unused trusted devices regularly</li>
              <li>• Monitor login activity for suspicious patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;