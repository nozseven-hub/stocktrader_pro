import React, { useState } from 'react';
import { Database, Key, Link, Activity, Copy, Eye, EyeOff } from 'lucide-react';

const APISettings = ({ onChange }) => {
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk-proj-abc123...xyz789',
    webhookUrl: 'https://your-app.com/webhook',
    enableWebhooks: true,
    rateLimitPlan: 'professional',
    allowedIPs: ['192.168.1.100', '10.0.0.50'],
    enableCORS: true,
    corsOrigins: ['https://yourdomain.com']
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [newIP, setNewIP] = useState('');
  const [newOrigin, setNewOrigin] = useState('');

  const [apiStats] = useState({
    todaysCalls: 2847,
    monthlyLimit: 100000,
    averageResponseTime: 145,
    successRate: 99.7
  });

  const [integrations] = useState([
    {
      name: 'TradingView',
      status: 'connected',
      lastSync: '2 minutes ago',
      description: 'Real-time chart integration'
    },
    {
      name: 'Discord Bot',
      status: 'connected',
      lastSync: '5 minutes ago',
      description: 'Alert notifications via Discord'
    },
    {
      name: 'Slack Workspace',
      status: 'disconnected',
      lastSync: 'Never',
      description: 'Team collaboration and alerts'
    },
    {
      name: 'Custom Dashboard',
      status: 'connected',
      lastSync: '1 minute ago',
      description: 'External dashboard integration'
    }
  ]);

  const handleApiSettingChange = (key, value) => {
    setApiSettings(prev => ({
      ...prev,
      [key]: value
    }));
    onChange();
  };

  const generateNewApiKey = () => {
    if (confirm('This will invalidate your current API key. Continue?')) {
      const newKey = 'sk-proj-' + Math.random()?.toString(36)?.substring(2, 15);
      handleApiSettingChange('apiKey', newKey);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // Show toast notification
  };

  const addIPAddress = () => {
    if (newIP && !apiSettings?.allowedIPs?.includes(newIP)) {
      handleApiSettingChange('allowedIPs', [...apiSettings?.allowedIPs, newIP]);
      setNewIP('');
    }
  };

  const removeIPAddress = (ip) => {
    handleApiSettingChange('allowedIPs', apiSettings?.allowedIPs?.filter(address => address !== ip));
  };

  const addCorsOrigin = () => {
    if (newOrigin && !apiSettings?.corsOrigins?.includes(newOrigin)) {
      handleApiSettingChange('corsOrigins', [...apiSettings?.corsOrigins, newOrigin]);
      setNewOrigin('');
    }
  };

  const removeCorsOrigin = (origin) => {
    handleApiSettingChange('corsOrigins', apiSettings?.corsOrigins?.filter(o => o !== origin));
  };

  const rateLimitPlans = [
    { value: 'basic', label: 'Basic (1,000 calls/day)', price: 'Free' },
    { value: 'professional', label: 'Professional (100,000 calls/month)', price: '$29/month' },
    { value: 'enterprise', label: 'Enterprise (Unlimited)', price: '$199/month' }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-600" />
          API Integration
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Configure API access, webhooks, and third-party platform connections
        </p>
      </div>
      {/* API Usage Stats */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          API Usage Statistics
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{apiStats?.todaysCalls?.toLocaleString()}</div>
            <div className="text-sm text-blue-700">API Calls Today</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{apiStats?.monthlyLimit?.toLocaleString()}</div>
            <div className="text-sm text-green-700">Monthly Limit</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{apiStats?.averageResponseTime}ms</div>
            <div className="text-sm text-purple-700">Avg Response Time</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{apiStats?.successRate}%</div>
            <div className="text-sm text-orange-700">Success Rate</div>
          </div>
        </div>
      </div>
      {/* API Key Management */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Key className="h-4 w-4 mr-2" />
          API Key Management
        </h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiSettings?.apiKey}
                  readOnly
                  className="flex-1 border rounded-lg px-3 py-2 bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiSettings?.apiKey)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={generateNewApiKey}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Regenerate API Key
          </button>
        </div>
      </div>
      {/* Rate Limiting */}
      <div>
        <h4 className="text-md font-medium mb-4">Rate Limiting Plan</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rateLimitPlans?.map((plan) => (
            <button
              key={plan?.value}
              onClick={() => handleApiSettingChange('rateLimitPlan', plan?.value)}
              className={`p-4 rounded-lg border-2 text-center ${
                apiSettings?.rateLimitPlan === plan?.value
                  ? 'border-blue-600 bg-blue-50 text-blue-700' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{plan?.label}</div>
              <div className="text-sm text-gray-500 mt-1">{plan?.price}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Webhook Configuration */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Link className="h-4 w-4 mr-2" />
          Webhook Configuration
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Webhooks</span>
              <p className="text-xs text-gray-500">Receive real-time notifications via HTTP POST</p>
            </div>
            <input
              type="checkbox"
              checked={apiSettings?.enableWebhooks}
              onChange={(e) => handleApiSettingChange('enableWebhooks', e?.target?.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {apiSettings?.enableWebhooks && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={apiSettings?.webhookUrl}
                onChange={(e) => handleApiSettingChange('webhookUrl', e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-app.com/webhook"
              />
            </div>
          )}
        </div>
      </div>
      {/* IP Whitelisting */}
      <div>
        <h4 className="text-md font-medium mb-4">IP Whitelisting</h4>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newIP}
              onChange={(e) => setNewIP(e?.target?.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="192.168.1.100"
            />
            <button
              onClick={addIPAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add IP
            </button>
          </div>
          <div className="space-y-2">
            {apiSettings?.allowedIPs?.map((ip, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">{ip}</span>
                <button
                  onClick={() => removeIPAddress(ip)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CORS Configuration */}
      <div>
        <h4 className="text-md font-medium mb-4">CORS Configuration</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable CORS</span>
              <p className="text-xs text-gray-500">Allow cross-origin requests from specified domains</p>
            </div>
            <input
              type="checkbox"
              checked={apiSettings?.enableCORS}
              onChange={(e) => handleApiSettingChange('enableCORS', e?.target?.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {apiSettings?.enableCORS && (
            <>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e?.target?.value)}
                  className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourdomain.com"
                />
                <button
                  onClick={addCorsOrigin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Origin
                </button>
              </div>
              <div className="space-y-2">
                {apiSettings?.corsOrigins?.map((origin, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{origin}</span>
                    <button
                      onClick={() => removeCorsOrigin(origin)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Third-party Integrations */}
      <div>
        <h4 className="text-md font-medium mb-4">Third-party Integrations</h4>
        <div className="space-y-3">
          {integrations?.map((integration, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">{integration?.name}</h5>
                <p className="text-sm text-gray-600">{integration?.description}</p>
                <p className="text-xs text-gray-500">Last sync: {integration?.lastSync}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  integration?.status === 'connected' ?'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                }`}>
                  {integration?.status}
                </span>
                <button className={`px-3 py-1 text-sm rounded ${
                  integration?.status === 'connected' ?'text-red-600 hover:bg-red-50' :'text-blue-600 hover:bg-blue-50'
                }`}>
                  {integration?.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APISettings;