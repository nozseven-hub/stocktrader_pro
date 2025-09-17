import React from 'react';
import { Clock, CheckCircle, Mail, MessageSquare, Smartphone } from 'lucide-react';

const AlertHistory = ({ history }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getActionIcon = (action) => {
    const icons = {
      notification_sent: CheckCircle,
      email_sent: Mail,
      sms_sent: Smartphone,
      webhook_called: MessageSquare
    };
    return icons?.[action] || CheckCircle;
  };

  const getActionColor = (action) => {
    const colors = {
      notification_sent: 'text-blue-600',
      email_sent: 'text-green-600',
      sms_sent: 'text-purple-600',
      webhook_called: 'text-orange-600'
    };
    return colors?.[action] || 'text-gray-600';
  };

  const getActionLabel = (action) => {
    const labels = {
      notification_sent: 'Push Notification',
      email_sent: 'Email Sent',
      sms_sent: 'SMS Sent',
      webhook_called: 'Webhook Called'
    };
    return labels?.[action] || 'Action Taken';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Alert History</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {history?.map((item) => {
          const ActionIcon = getActionIcon(item?.action);
          const actionColor = getActionColor(item?.action);
          
          return (
            <div key={item?.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full bg-white ${actionColor}`}>
                <ActionIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {item?.symbol}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(item?.triggeredAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {item?.message}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${actionColor} bg-white`}>
                    {getActionLabel(item?.action)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {item?.type} alert
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {(!history || history?.length === 0) && (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent alert activity</p>
        </div>
      )}
      {history && history?.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All History
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertHistory;