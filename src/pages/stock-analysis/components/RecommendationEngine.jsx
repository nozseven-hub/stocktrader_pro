import React from 'react';
import { TrendingUp, TrendingDown, Minus, Target, Shield, Clock, Brain } from 'lucide-react';

const RecommendationEngine = ({ recommendation }) => {
  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'BUY': return TrendingUp;
      case 'SELL': return TrendingDown;
      case 'HOLD': return Minus;
      default: return Minus;
    }
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'BUY': return 'text-green-600 bg-green-100';
      case 'SELL': return 'text-red-600 bg-red-100';
      case 'HOLD': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const SignalIcon = getSignalIcon(recommendation?.signal);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendation</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Advanced algorithmic analysis and recommendation</p>
      </div>
      
      <div className="p-6">
        {/* Main Signal */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center space-x-3 px-6 py-4 rounded-lg ${
            getSignalColor(recommendation?.signal)
          }`}>
            <SignalIcon className="h-8 w-8" />
            <div className="text-left">
              <div className="text-2xl font-bold">{recommendation?.signal}</div>
              <div className="text-sm opacity-75">{recommendation?.confidence}% confidence</div>
            </div>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Target className="h-5 w-5 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Target Price</div>
            <div className="text-lg font-bold text-gray-900">
              ${recommendation?.targetPrice?.toFixed(2)}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Shield className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Stop Loss</div>
            <div className="text-lg font-bold text-gray-900">
              ${recommendation?.stopLoss?.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Risk Level:</span>
            <span className={`text-sm font-medium flex items-center ${
              getRiskColor(recommendation?.riskLevel)
            }`}>
              <Shield className="h-4 w-4 mr-1" />
              {recommendation?.riskLevel}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Time Horizon:</span>
            <span className="text-sm font-medium text-gray-900 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recommendation?.timeHorizon}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Success Probability:</span>
            <span className="text-sm font-medium text-blue-600">
              {recommendation?.probabilitySuccess}%
            </span>
          </div>
        </div>
        
        {/* Confidence Meter */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Recommendation Confidence</span>
            <span>{recommendation?.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                recommendation?.confidence >= 80 ? 'bg-green-500' :
                recommendation?.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${recommendation?.confidence}%` }}
            ></div>
          </div>
        </div>
        
        {/* Reasoning */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Analysis Reasoning
          </h4>
          <div className="space-y-2">
            {recommendation?.reasoning?.map((reason, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Risk Assessment */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-orange-600" />
            Risk Assessment
          </h4>
          <div className="text-sm text-gray-600">
            {recommendation?.signal === 'BUY' && (
              <>
                <p className="mb-2">
                  <strong>Upside Potential:</strong> {((recommendation?.targetPrice / (recommendation?.targetPrice - (recommendation?.targetPrice - 150)) - 1) * 100)?.toFixed(1)}%
                </p>
                <p>
                  <strong>Downside Risk:</strong> {((150 - recommendation?.stopLoss) / 150 * 100)?.toFixed(1)}%
                </p>
              </>
            )}
            {recommendation?.signal === 'SELL' && (
              <p>
                Consider position sizing and market conditions. Short-term bearish outlook with {recommendation?.riskLevel?.toLowerCase()} risk profile.
              </p>
            )}
            {recommendation?.signal === 'HOLD' && (
              <p>
                Current position maintenance recommended. Monitor for breakout signals and market sentiment changes.
              </p>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-6">
          <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            recommendation?.signal === 'BUY' ?'bg-green-600 hover:bg-green-700 text-white'
              : recommendation?.signal === 'SELL' ?'bg-red-600 hover:bg-red-700 text-white' :'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}>
            Execute {recommendation?.signal} Recommendation
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;