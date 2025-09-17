import React from 'react';
import { X, Calendar, BarChart3, Building } from 'lucide-react';

const FilterPanel = ({ selectedFilters, onFiltersChange, onClose }) => {
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const reportTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'daily', label: 'Daily Reports' },
    { value: 'weekly', label: 'Weekly Reports' },
    { value: 'custom', label: 'Custom Reports' },
    { value: 'performance', label: 'Performance Reports' }
  ];

  const segments = [
    { value: 'all', label: 'All Segments' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Consumer', label: 'Consumer' },
    { value: 'Indices', label: 'Indices' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...selectedFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg mb-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filter Reports</h3>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date Range Filter */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </label>
          <div className="space-y-2">
            {dateRanges?.map((range) => (
              <label key={range?.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="dateRange"
                  value={range?.value}
                  checked={selectedFilters?.dateRange === range?.value}
                  onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{range?.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Report Type Filter */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <BarChart3 className="h-4 w-4 mr-2" />
            Report Type
          </label>
          <div className="space-y-2">
            {reportTypes?.map((type) => (
              <label key={type?.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reportType"
                  value={type?.value}
                  checked={selectedFilters?.reportType === type?.value}
                  onChange={(e) => handleFilterChange('reportType', e?.target?.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{type?.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Market Segment Filter */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Building className="h-4 w-4 mr-2" />
            Market Segment
          </label>
          <div className="space-y-2">
            {segments?.map((segment) => (
              <label key={segment?.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="segment"
                  value={segment?.value}
                  checked={selectedFilters?.segment === segment?.value}
                  onChange={(e) => handleFilterChange('segment', e?.target?.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{segment?.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
        <button
          onClick={() => {
            onFiltersChange({
              dateRange: 'all',
              reportType: 'all',
              segment: 'all'
            });
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;