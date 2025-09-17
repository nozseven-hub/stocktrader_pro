import React, { useState } from 'react';
import { MoreHorizontal, Edit3, Copy, Trash2, TrendingUp, Volume2, Activity, ArrowUpDown, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const AlertsTable = ({ alerts, onDelete, onDuplicate }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [showDropdown, setShowDropdown] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAlerts = [...alerts]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getAlertTypeIcon = (type) => {
    const icons = {
      price: TrendingUp,
      volume: Volume2,
      pattern: Activity
    };
    return icons?.[type] || Activity;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: Clock,
      triggered: CheckCircle,
      expired: XCircle
    };
    return icons?.[status] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-blue-600 bg-blue-100',
      triggered: 'text-green-600 bg-green-100',
      expired: 'text-gray-600 bg-gray-100'
    };
    return colors?.[status] || 'text-gray-600 bg-gray-100';
  };

  const getConditionDisplay = (alert) => {
    if (alert?.type === 'pattern') {
      return alert?.condition?.replace('_', ' ')?.toUpperCase();
    }
    
    if (alert?.type === 'volume') {
      const value = alert?.targetValue;
      const formatted = value >= 1000000 ? `${(value / 1000000)?.toFixed(1)}M` : `${(value / 1000)?.toFixed(0)}K`;
      return `${alert?.condition?.toUpperCase()} ${formatted}`;
    }
    
    return `${alert?.condition?.toUpperCase()} $${alert?.targetValue?.toFixed(2)}`;
  };

  const getCurrentProgress = (alert) => {
    if (alert?.type === 'pattern' || !alert?.currentValue || !alert?.targetValue) {
      return null;
    }
    
    const progress = (alert?.currentValue / alert?.targetValue) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('symbol')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('type')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('createdAt')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Created</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAlerts?.map((alert) => {
              const TypeIcon = getAlertTypeIcon(alert?.type);
              const StatusIcon = getStatusIcon(alert?.status);
              const progress = getCurrentProgress(alert);
              
              return (
                <tr key={alert?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert?.symbol}</div>
                      <div className="text-sm text-gray-500 truncate max-w-32">{alert?.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TypeIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-900 capitalize">{alert?.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getConditionDisplay(alert)}</div>
                    <div className="text-sm text-gray-500">{alert?.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {progress !== null ? (
                      <div className="w-full">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>${alert?.currentValue?.toFixed(2)}</span>
                          <span>${alert?.targetValue?.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              progress >= 100 ? 'bg-green-500' : progress >= 75 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Pattern-based</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {alert?.status}
                    </div>
                    {alert?.triggeredAt && (
                      <div className="text-xs text-gray-500 mt-1">
                        Triggered {formatTimestamp(alert?.triggeredAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(alert?.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === alert?.id ? null : alert?.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      
                      {showDropdown === alert?.id && (
                        <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-36">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDuplicate(alert);
                              setShowDropdown(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => {
                              onDelete(alert?.id);
                              setShowDropdown(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {sortedAlerts?.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No alerts found matching your criteria</p>
        </div>
      )}
      {/* Dropdown backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  );
};

export default AlertsTable;