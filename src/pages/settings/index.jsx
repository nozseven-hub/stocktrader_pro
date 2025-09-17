import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, BarChart3, User, Shield, Database, Globe, Save, RotateCcw } from 'lucide-react';
import AnalysisSettings from './components/AnalysisSettings';
import NotificationSettings from './components/NotificationSettings';
import AccountSettings from './components/AccountSettings';
import MarketPreferences from './components/MarketPreferences';
import APISettings from './components/APISettings';
import SecuritySettings from './components/SecuritySettings';
import Icon from '../../components/AppIcon';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'analysis', label: 'Analysis Settings', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'market', label: 'Market Preferences', icon: Globe },
    { id: 'api', label: 'API Integration', icon: Database },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setHasChanges(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analysis':
        return <AnalysisSettings onChange={() => setHasChanges(true)} />;
      case 'notifications':
        return <NotificationSettings onChange={() => setHasChanges(true)} />;
      case 'account':
        return <AccountSettings onChange={() => setHasChanges(true)} />;
      case 'market':
        return <MarketPreferences onChange={() => setHasChanges(true)} />;
      case 'api':
        return <APISettings onChange={() => setHasChanges(true)} />;
      case 'security':
        return <SecuritySettings onChange={() => setHasChanges(true)} />;
      default:
        return <AnalysisSettings onChange={() => setHasChanges(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">StockTrader Pro</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/stock-analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
                <Link to="/reports" className="text-gray-600 hover:text-gray-900">Reports</Link>
                <Link to="/settings" className="text-blue-600 font-medium">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600 mt-2">Configure analysis parameters, notifications, and account preferences</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={!hasChanges}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center px-4 py-2 rounded-lg text-white ${
                hasChanges 
                  ? 'bg-blue-600 hover:bg-blue-700' :'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!hasChanges || saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <nav className="space-y-1">
                {tabs?.map((tab) => {
                  const Icon = tab?.icon;
                  return (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                        activeTab === tab?.id
                          ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab?.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Alerts</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Calls Today</span>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subscription</span>
                  <span className="font-medium">Pro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      {/* Save Confirmation */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 bg-orange-400 rounded-full"></div>
            <span className="text-sm text-gray-700">You have unsaved changes</span>
            <button
              onClick={handleSave}
              className="text-sm text-blue-600 font-medium hover:text-blue-700"
            >
              Save Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;