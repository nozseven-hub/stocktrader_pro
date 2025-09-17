import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Bell, Settings, BarChart3, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import AlertsTable from './components/AlertsTable';
import CreateAlertModal from './components/CreateAlertModal';
import AlertFilters from './components/AlertFilters';
import AlertHistory from './components/AlertHistory';
import NotificationSettings from './components/NotificationSettings';

const Alerts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'price',
      condition: 'above',
      targetValue: 185.00,
      currentValue: 182.52,
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      triggeredAt: null,
      description: 'Price above $185.00'
    },
    {
      id: 2,
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      type: 'pattern',
      condition: 'breakout',
      targetValue: null,
      currentValue: null,
      status: 'triggered',
      createdAt: '2024-01-15T09:15:00Z',
      triggeredAt: '2024-01-15T14:22:00Z',
      description: 'Breakout pattern detected'
    },
    {
      id: 3,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      type: 'volume',
      condition: 'above',
      targetValue: 50000000,
      currentValue: 28900000,
      status: 'active',
      createdAt: '2024-01-15T11:45:00Z',
      triggeredAt: null,
      description: 'Volume above 50M'
    },
    {
      id: 4,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      type: 'price',
      condition: 'below',
      targetValue: 135.00,
      currentValue: 138.21,
      status: 'active',
      createdAt: '2024-01-15T08:20:00Z',
      triggeredAt: null,
      description: 'Price below $135.00'
    },
    {
      id: 5,
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      type: 'pattern',
      condition: 'head_shoulders',
      targetValue: null,
      currentValue: null,
      status: 'expired',
      createdAt: '2024-01-14T16:30:00Z',
      triggeredAt: null,
      description: 'Head & Shoulders pattern'
    }
  ]);

  const [alertHistory, setAlertHistory] = useState([
    {
      id: 1,
      symbol: 'TSLA',
      type: 'pattern',
      message: 'Breakout pattern detected at $248.50',
      triggeredAt: '2024-01-15T14:22:00Z',
      action: 'notification_sent'
    },
    {
      id: 2,
      symbol: 'NVDA',
      type: 'price',
      message: 'Price reached target $875.00',
      triggeredAt: '2024-01-15T13:45:00Z',
      action: 'email_sent'
    },
    {
      id: 3,
      symbol: 'AAPL',
      type: 'volume',
      message: 'Volume spike detected - 85.2M shares',
      triggeredAt: '2024-01-15T12:30:00Z',
      action: 'sms_sent'
    }
  ]);

  const [notificationPreferences, setNotificationPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    soundAlerts: true,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  const [alertStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    triggeredToday: 0,
    accuracy: 78.5
  });

  // Calculate alert statistics
  useEffect(() => {
    const totalAlerts = alerts?.length;
    const activeAlerts = alerts?.filter(alert => alert?.status === 'active')?.length;
    const triggeredToday = alerts?.filter(alert => {
      if (!alert?.triggeredAt) return false;
      const today = new Date()?.toDateString();
      return new Date(alert.triggeredAt)?.toDateString() === today;
    })?.length;

    setAlerts(prev => prev?.map(alert => ({ ...alert, totalAlerts, activeAlerts, triggeredToday })));
  }, []);

  const filteredAlerts = alerts?.filter(alert => {
    const matchesSearch = alert?.symbol?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         alert?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         alert?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || alert?.status === filterStatus;
    const matchesType = filterType === 'all' || alert?.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      ...alertData,
      status: 'active',
      createdAt: new Date()?.toISOString(),
      triggeredAt: null
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    setShowCreateModal(false);
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleDuplicateAlert = (alert) => {
    const duplicatedAlert = {
      ...alert,
      id: Date.now(),
      createdAt: new Date()?.toISOString(),
      triggeredAt: null,
      status: 'active'
    };
    
    setAlerts(prev => [duplicatedAlert, ...prev]);
  };

  const handleUpdateNotificationSettings = (settings) => {
    setNotificationPreferences(settings);
    setShowNotificationSettings(false);
  };

  const getStatusCounts = () => {
    return {
      all: alerts?.length,
      active: alerts?.filter(a => a?.status === 'active')?.length,
      triggered: alerts?.filter(a => a?.status === 'triggered')?.length,
      expired: alerts?.filter(a => a?.status === 'expired')?.length
    };
  };

  const statusCounts = getStatusCounts();

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
                <Link to="/watchlists" className="text-gray-600 hover:text-gray-900">Watchlists</Link>
                <Link to="/alerts" className="text-blue-600 font-medium">Alerts</Link>
                <Link to="/stock-analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowNotificationSettings(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Alerts</h2>
            <p className="text-gray-600 mt-1">Manage price thresholds, pattern detections, and trading signals</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </button>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{alerts?.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Bell className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts?.active}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Triggered Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts?.triggered}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alert Accuracy</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{alertStats?.accuracy}%</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Alerts Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Controls */}
            <AlertFilters
              filterStatus={filterStatus}
              filterType={filterType}
              onStatusChange={setFilterStatus}
              onTypeChange={setFilterType}
              statusCounts={statusCounts}
              resultCount={filteredAlerts?.length}
            />

            {/* Alerts Table */}
            <AlertsTable
              alerts={filteredAlerts}
              onDelete={handleDeleteAlert}
              onDuplicate={handleDuplicateAlert}
            />
          </div>

          {/* Right Column - Alert History */}
          <div className="space-y-6">
            <AlertHistory history={alertHistory} />
          </div>
        </div>
      </div>
      {/* Modals */}
      {showCreateModal && (
        <CreateAlertModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAlert}
        />
      )}
      {showNotificationSettings && (
        <NotificationSettings
          preferences={notificationPreferences}
          onClose={() => setShowNotificationSettings(false)}
          onSave={handleUpdateNotificationSettings}
        />
      )}
    </div>
  );
};

export default Alerts;