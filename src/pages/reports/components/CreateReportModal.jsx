import React, { useState } from 'react';
import { X, Calendar, Filter, BarChart3 } from 'lucide-react';

const CreateReportModal = ({ onClose, onCreate }) => {
  const [reportData, setReportData] = useState({
    title: '',
    dateRange: {
      start: '',
      end: ''
    },
    stocks: [],
    analysisType: [],
    customStocks: ''
  });

  const analysisTypes = [
    { id: 'patterns', label: 'Pattern Detection', description: 'Identify chart patterns and formations' },
    { id: 'performance', label: 'Performance Analytics', description: 'Analyze price performance and trends' },
    { id: 'recommendations', label: 'Recommendation Accuracy', description: 'Review recommendation hit rates' },
    { id: 'technical', label: 'Technical Indicators', description: 'RSI, MACD, and other indicators' },
    { id: 'volume', label: 'Volume Analysis', description: 'Trading volume patterns and trends' }
  ];

  const stockFilters = [
    { id: 'watchlist', label: 'My Watchlist', count: 12 },
    { id: 'sp500', label: 'S&P 500', count: 500 },
    { id: 'nasdaq', label: 'NASDAQ 100', count: 100 },
    { id: 'tech', label: 'Technology Sector', count: 45 },
    { id: 'healthcare', label: 'Healthcare Sector', count: 32 },
    { id: 'finance', label: 'Financial Sector', count: 28 }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    const finalStocks = reportData?.customStocks 
      ? reportData?.customStocks?.split(',')?.map(s => s?.trim()?.toUpperCase())
      : reportData?.stocks;
    
    onCreate({
      ...reportData,
      stocks: finalStocks,
      id: Date.now()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Create Custom Report</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Report Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Title
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Custom Tech Sector Analysis"
              value={reportData?.title}
              onChange={(e) => setReportData({...reportData, title: e?.target?.value})}
              required
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={reportData?.dateRange?.start}
                  onChange={(e) => setReportData({
                    ...reportData, 
                    dateRange: {...reportData?.dateRange, start: e?.target?.value}
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={reportData?.dateRange?.end}
                  onChange={(e) => setReportData({
                    ...reportData, 
                    dateRange: {...reportData?.dateRange, end: e?.target?.value}
                  })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Stock Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-2" />
              Stock Selection
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {stockFilters?.map((filter) => (
                  <label key={filter?.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={reportData?.stocks?.includes(filter?.id)}
                      onChange={(e) => {
                        if (e?.target?.checked) {
                          setReportData({
                            ...reportData,
                            stocks: [...reportData?.stocks, filter?.id]
                          });
                        } else {
                          setReportData({
                            ...reportData,
                            stocks: reportData?.stocks?.filter(s => s !== filter?.id)
                          });
                        }
                      }}
                    />
                    <div>
                      <span className="text-sm font-medium">{filter?.label}</span>
                      <span className="text-xs text-gray-500 ml-2">({filter?.count})</span>
                    </div>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Or enter custom stock symbols</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AAPL, MSFT, GOOGL (comma separated)"
                  value={reportData?.customStocks}
                  onChange={(e) => setReportData({...reportData, customStocks: e?.target?.value})}
                />
              </div>
            </div>
          </div>

          {/* Analysis Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Analysis Types
            </label>
            <div className="space-y-2">
              {analysisTypes?.map((type) => (
                <label key={type?.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="rounded mt-1"
                    checked={reportData?.analysisType?.includes(type?.id)}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setReportData({
                          ...reportData,
                          analysisType: [...reportData?.analysisType, type?.id]
                        });
                      } else {
                        setReportData({
                          ...reportData,
                          analysisType: reportData?.analysisType?.filter(t => t !== type?.id)
                        });
                      }
                    }}
                  />
                  <div>
                    <span className="text-sm font-medium">{type?.label}</span>
                    <p className="text-xs text-gray-500">{type?.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReportModal;