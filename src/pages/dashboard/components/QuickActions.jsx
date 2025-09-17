import React from 'react';
import { Plus, Search, Bell, FileText, Settings, Target } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Add to Watchlist',
      description: 'Track new stocks',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Search,
      label: 'Stock Screener',
      description: 'Find opportunities',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Target,
      label: 'Set Price Alert',
      description: 'Get notified',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FileText,
      label: 'Generate Report',
      description: 'Export analysis',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Bell,
      label: 'Alert Settings',
      description: 'Configure notifications',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Settings,
      label: 'Preferences',
      description: 'Customize dashboard',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">
          {actions?.map((action, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left"
            >
              <div className={`p-2 rounded-lg ${action?.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {action?.label}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {action?.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;