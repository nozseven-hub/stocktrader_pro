import React, { useState } from 'react';
import { MoreHorizontal, Edit3, Trash2 } from 'lucide-react';

const WatchlistTabs = ({ watchlists, activeTab, onTabChange, onDeleteWatchlist }) => {
  const [showDropdown, setShowDropdown] = React.useState(null);

  const handleDeleteClick = (watchlistId, e) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this watchlist?')) {
      onDeleteWatchlist(watchlistId);
    }
    setShowDropdown(null);
  };

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8 overflow-x-auto">
        {watchlists?.map((watchlist, index) => (
          <div key={watchlist?.id} className="relative flex items-center group">
            <button
              onClick={() => onTabChange(index)}
              className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{watchlist?.name}</span>
              <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5">
                {watchlist?.stocks?.length || 0}
              </span>
            </button>
            
            {watchlists?.length > 1 && (
              <div className="relative ml-1">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    setShowDropdown(showDropdown === watchlist?.id ? null : watchlist?.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {showDropdown === watchlist?.id && (
                  <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-2 z-10">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(watchlist?.id, e)}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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

export default WatchlistTabs;