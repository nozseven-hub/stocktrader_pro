import React, { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare, Clock } from 'lucide-react';

const NotificationSettings = ({ onChange }) => {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      patterns: true,
      alerts: true,
      reports: true,
      newsletters: false
    },
    push: {
      enabled: true,
      patterns: true,
      alerts: true,
      priceTargets: true,
      breakouts: true
    },
    sms: {
      enabled: false,
      criticalOnly: true,
      alerts: false,
      patterns: false
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    },
    deliveryTime: 'market-hours'
  });

  const handleToggle = (category, setting) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev?.[category],
          [setting]: !prev?.[category]?.[setting]
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [setting]: !prev?.[setting]
      }));
    }
    onChange();
  };

  const handleFrequencyChange = (frequency) => {
    setSettings(prev => ({
      ...prev,
      frequency
    }));
    onChange();
  };

  const handleTimeChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [type]: value
      }
    }));
    onChange();
  };

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-600" />
          Notification Settings
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Configure how and when you receive alerts and notifications
        </p>
      </div>
      {/* Email Notifications */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          Email Notifications
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Email Notifications</span>
              <p className="text-xs text-gray-500">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.email?.enabled}
              onChange={() => handleToggle('email', 'enabled')}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {settings?.email?.enabled && (
            <div className="ml-4 space-y-2">
              {[
                { key: 'patterns', label: 'Pattern Detections', desc: 'New chart patterns found' },
                { key: 'alerts', label: 'Price Alerts', desc: 'Target prices reached' },
                { key: 'reports', label: 'Daily Reports', desc: 'Market analysis summaries' },
                { key: 'newsletters', label: 'Weekly Newsletter', desc: 'Market insights and tips' }
              ]?.map(item => (
                <div key={item?.key} className="flex items-center justify-between p-2">
                  <div>
                    <span className="text-sm text-gray-700">{item?.label}</span>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.email?.[item?.key]}
                    onChange={() => handleToggle('email', item?.key)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Push Notifications */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Smartphone className="h-4 w-4 mr-2" />
          Push Notifications
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Push Notifications</span>
              <p className="text-xs text-gray-500">Instant notifications on your device</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.push?.enabled}
              onChange={() => handleToggle('push', 'enabled')}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {settings?.push?.enabled && (
            <div className="ml-4 space-y-2">
              {[
                { key: 'patterns', label: 'Pattern Alerts', desc: 'Real-time pattern detection' },
                { key: 'alerts', label: 'Price Alerts', desc: 'Price target notifications' },
                { key: 'priceTargets', label: 'Target Reached', desc: 'When stocks hit your targets' },
                { key: 'breakouts', label: 'Breakout Signals', desc: 'Significant price movements' }
              ]?.map(item => (
                <div key={item?.key} className="flex items-center justify-between p-2">
                  <div>
                    <span className="text-sm text-gray-700">{item?.label}</span>
                    <p className="text-xs text-gray-500">{item?.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.push?.[item?.key]}
                    onChange={() => handleToggle('push', item?.key)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* SMS Notifications */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          SMS Notifications
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable SMS Notifications</span>
              <p className="text-xs text-gray-500">Text message alerts (charges may apply)</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.sms?.enabled}
              onChange={() => handleToggle('sms', 'enabled')}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {settings?.sms?.enabled && (
            <div className="ml-4 space-y-2">
              <div className="flex items-center justify-between p-2">
                <div>
                  <span className="text-sm text-gray-700">Critical Alerts Only</span>
                  <p className="text-xs text-gray-500">High-priority notifications only</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings?.sms?.criticalOnly}
                  onChange={() => handleToggle('sms', 'criticalOnly')}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Notification Frequency */}
      <div>
        <h4 className="text-md font-medium mb-4">Notification Frequency</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'immediate', label: 'Immediate', desc: 'Send notifications instantly' },
            { value: 'hourly', label: 'Hourly Digest', desc: 'Bundle notifications every hour' },
            { value: 'daily', label: 'Daily Summary', desc: 'Once per day summary' }
          ]?.map(option => (
            <button
              key={option?.value}
              onClick={() => handleFrequencyChange(option?.value)}
              className={`p-4 rounded-lg border-2 text-center ${
                settings?.frequency === option?.value
                  ? 'border-blue-600 bg-blue-50 text-blue-700' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{option?.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option?.desc}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Quiet Hours */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Quiet Hours
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Quiet Hours</span>
              <p className="text-xs text-gray-500">Suppress notifications during specified hours</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.quietHours?.enabled}
              onChange={() => handleToggle('quietHours', 'enabled')}
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>
          
          {settings?.quietHours?.enabled && (
            <div className="ml-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={settings?.quietHours?.start}
                  onChange={(e) => handleTimeChange('start', e?.target?.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={settings?.quietHours?.end}
                  onChange={(e) => handleTimeChange('end', e?.target?.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Delivery Time Windows */}
      <div>
        <h4 className="text-md font-medium mb-4">Delivery Time Windows</h4>
        <select
          value={settings?.deliveryTime}
          onChange={(e) => {
            setSettings(prev => ({...prev, deliveryTime: e?.target?.value}));
            onChange();
          }}
          className="w-full md:w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="anytime">Anytime</option>
          <option value="market-hours">Market Hours Only (9:30 AM - 4:00 PM EST)</option>
          <option value="extended-hours">Extended Hours (8:00 AM - 6:00 PM EST)</option>
          <option value="business-hours">Business Hours (9:00 AM - 5:00 PM)</option>
        </select>
      </div>
    </div>
  );
};

export default NotificationSettings;