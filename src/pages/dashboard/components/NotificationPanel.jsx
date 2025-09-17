import React from 'react';
import { Bell, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const NotificationPanel = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'signal': return TrendingUp;
      case 'alert': return Target;
      case 'pattern': return AlertTriangle;
      default: return Bell;
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        {notifications?.map((notification) => {
          const NotificationIcon = getNotificationIcon(notification?.type);
          return (
            <div
              key={notification?.id}
              className={`border-l-4 p-3 rounded ${getNotificationColor(notification?.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <NotificationIcon className={`h-5 w-5 ${
                    notification?.priority === 'high' ? 'text-red-600' :
                    notification?.priority === 'medium'? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification?.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-6 py-3 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all notifications →
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;