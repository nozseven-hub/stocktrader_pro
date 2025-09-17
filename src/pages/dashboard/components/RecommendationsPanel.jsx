import React from 'react';
import { TrendingUp, TrendingDown, Minus, Target, AlertTriangle } from 'lucide-react';

const RecommendationsPanel = ({ recommendations }) => {
  const getSignalColor = (signal) => {
    switch (signal) {
      case 'BUY': return 'text-green-600 bg-green-100';
      case 'SELL': return 'text-red-600 bg-red-100';
      case 'HOLD': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'BUY': return TrendingUp;
      case 'SELL': return TrendingDown;
      case 'HOLD': return Minus;
      default: return Minus;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        <p className="text-sm text-gray-600">Latest automated trading signals</p>
      </div>
      <div className="p-6 space-y-4">
        {recommendations?.map((rec) => {
          const SignalIcon = getSignalIcon(rec?.signal);
          return (
            <div key={rec?.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold">{rec?.symbol}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    getSignalColor(rec?.signal)
                  }`}>
                    <SignalIcon className="h-3 w-3 mr-1" />
                    {rec?.signal}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {rec?.confidence}% confidence
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pattern:</span>
                  <span className="font-medium">{rec?.pattern}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">${rec?.currentPrice?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    ${rec?.targetPrice?.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk:</span>
                  <span className={`font-medium flex items-center ${getRiskColor(rec?.riskLevel)}`}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {rec?.riskLevel}
                  </span>
                </div>
              </div>
              <div className="mt-3 bg-gray-100 rounded h-1">
                <div 
                  className="bg-blue-600 h-1 rounded transition-all"
                  style={{ width: `${rec?.confidence}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsPanel;