import React from 'react';
import { Trash2, AlertCircle, BarChart3, X } from 'lucide-react';

const BulkActionsPanel = ({ selectedCount, onAction, selectedStocks }) => {
  const handleAction = (action) => {
    onAction(action, selectedStocks);
  };

  return (
    <div className="flex items-center space-x-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
      <span className="text-sm text-blue-800">
        {selectedCount} stock{selectedCount !== 1 ? 's' : ''} selected
      </span>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleAction('analyze')}
          className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          <BarChart3 className="h-4 w-4 mr-1" />
          Analyze
        </button>
        
        <button
          onClick={() => handleAction('alert')}
          className="flex items-center px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          Set Alerts
        </button>
        
        <button
          onClick={() => handleAction('remove')}
          className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </button>
        
        <button
          onClick={() => onAction('clear', [])}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BulkActionsPanel;