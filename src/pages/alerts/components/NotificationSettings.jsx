import React, { useState } from 'react';
import { X, Bell, Mail, Smartphone, Volume2, Moon } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const NotificationSettings = ({ preferences, onClose, onSave }) => {
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  const notificationOptions = [
    {
      key: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive browser push notifications for alerts',
      icon: Bell
    },
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive email alerts for triggered conditions',
      icon: Mail
    },
    {
      key: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive text message alerts (carrier charges may apply)',
      icon: Smartphone
    },
    {
      key: 'soundAlerts',
      label: 'Sound Alerts',
      description: 'Play sound when alerts are triggered',
      icon: Volume2
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Notification Methods */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Methods</h4>
            <div className="space-y-4">
              {notificationOptions?.map((option) => {
                const Icon = option?.icon;
                return (
                  <div key={option?.key} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{option?.label}</h5>
                          <p className="text-sm text-gray-500 mt-1">{option?.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings?.[option?.key]}
                            onChange={() => handleToggle(option?.key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiet Hours */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Quiet Hours</h4>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Moon className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Enable Quiet Hours</h5>
                    <p className="text-sm text-gray-500">Disable notifications during specified hours</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings?.quietHours?.enabled}
                    onChange={() => handleQuietHoursChange('enabled', !settings?.quietHours?.enabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings?.quietHours?.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={settings?.quietHours?.start}
                      onChange={(e) => handleQuietHoursChange('start', e?.target?.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={settings?.quietHours?.end}
                      onChange={(e) => handleQuietHoursChange('end', e?.target?.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alert Priority */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Alert Priority Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <span className="font-medium text-red-900">High Priority</span>
                  <p className="text-sm text-red-700">Breakouts, major price movements</p>
                </div>
                <span className="text-sm text-red-600">Always notify</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <span className="font-medium text-yellow-900">Medium Priority</span>
                  <p className="text-sm text-yellow-700">Pattern formations, volume spikes</p>
                </div>
                <span className="text-sm text-yellow-600">Respect quiet hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <span className="font-medium text-blue-900">Low Priority</span>
                  <p className="text-sm text-blue-700">Minor price alerts, updates</p>
                </div>
                <span className="text-sm text-blue-600">Batch notifications</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;