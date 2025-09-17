import React from 'react';
import { Filter, CheckCircle, Clock, XCircle } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const AlertFilters = ({ 
  filterStatus, 
  filterType, 
  onStatusChange, 
  onTypeChange, 
  statusCounts,
  resultCount 
}) => {
  const statusFilters = [
    { value: 'all', label: 'All', count: statusCounts?.all, icon: Filter },
    { value: 'active', label: 'Active', count: statusCounts?.active, icon: Clock },
    { value: 'triggered', label: 'Triggered', count: statusCounts?.triggered, icon: CheckCircle },
    { value: 'expired', label: 'Expired', count: statusCounts?.expired, icon: XCircle }
  ];

  const typeFilters = [
    { value: 'all', label: 'All Types' },
    { value: 'price', label: 'Price Alerts' },
    { value: 'volume', label: 'Volume Alerts' },
    { value: 'pattern', label: 'Pattern Alerts' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Status Filters */}
          <div className="flex items-center space-x-1">
            {statusFilters?.map((filter) => {
              const Icon = filter?.icon;
              return (
                <button
                  key={filter?.value}
                  onClick={() => onStatusChange(filter?.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === filter?.value
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{filter?.label}</span>
                  <span className="bg-white text-gray-600 text-xs rounded-full px-2 py-0.5">
                    {filter?.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={filterType}
              onChange={(e) => onTypeChange(e?.target?.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {typeFilters?.map(filter => (
                <option key={filter?.value} value={filter?.value}>
                  {filter?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          {resultCount} alert{resultCount !== 1 ? 's' : ''} found
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;