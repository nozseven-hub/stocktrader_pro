import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal, Eye, AlertCircle, Trash2, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchlistTable = ({ stocks, selectedStocks, onSelectionChange, onRemoveStock }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showDropdown, setShowDropdown] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = [...stocks]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSelectStock = (stockId) => {
    if (selectedStocks?.includes(stockId)) {
      onSelectionChange(selectedStocks?.filter(id => id !== stockId));
    } else {
      onSelectionChange([...selectedStocks, stockId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStocks?.length === stocks?.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(stocks?.map(stock => stock?.id));
    }
  };

  const formatLastAnalysis = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getPatternColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedStocks?.length === stocks?.length && stocks?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th
                onClick={() => handleSort('symbol')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Symbol</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Change</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('volume')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Volume</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pattern
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alerts
              </th>
              <th
                onClick={() => handleSort('lastAnalysis')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Last Analysis</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStocks?.map((stock) => (
              <tr key={stock?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedStocks?.includes(stock?.id)}
                    onChange={() => handleSelectStock(stock?.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{stock?.symbol}</div>
                    <div className="text-sm text-gray-500 truncate max-w-32">{stock?.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${stock?.price?.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center text-sm font-medium ${
                    stock?.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock?.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{stock?.change >= 0 ? '+' : ''}{stock?.change?.toFixed(2)}</span>
                    <span className="ml-1">({stock?.changePercent?.toFixed(2)}%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stock?.volume}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{stock?.pattern}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPatternColor(stock?.patternConfidence)}`}>
                      {stock?.patternConfidence}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-sm text-gray-900">{stock?.alertsActive}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatLastAnalysis(stock?.lastAnalysis)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === stock?.id ? null : stock?.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    
                    {showDropdown === stock?.id && (
                      <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-36">
                        <Link
                          to={`/stock-analysis/${stock?.symbol}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowDropdown(null)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Analysis
                        </Link>
                        <Link
                          to={`/alerts?stock=${stock?.symbol}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowDropdown(null)}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Set Alert
                        </Link>
                        <button
                          onClick={() => {
                            onRemoveStock(stock?.id);
                            setShowDropdown(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedStocks?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stocks found in this watchlist</p>
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

export default WatchlistTable;