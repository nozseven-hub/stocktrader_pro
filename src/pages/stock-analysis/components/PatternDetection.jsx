import React from 'react';
import { TrendingUp, Activity, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const PatternDetection = ({ patterns }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'forming': return AlertCircle;
      case 'failed': return XCircle;
      default: return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'forming': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getBreakoutColor = (probability) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Pattern Detection</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">AI-powered pattern recognition results</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {patterns?.map((pattern) => {
            const StatusIcon = getStatusIcon(pattern?.status);
            return (
              <div key={pattern?.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Pattern Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(pattern?.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{pattern?.pattern}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{pattern?.timeframe}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pattern?.status)}`}>
                          {pattern?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Confidence Score */}
                  <div className={`px-3 py-2 rounded-lg border text-center ${getConfidenceColor(pattern?.confidence)}`}>
                    <div className="text-lg font-bold">{pattern?.confidence}%</div>
                    <div className="text-xs opacity-75">Confidence</div>
                  </div>
                </div>
                {/* Pattern Details */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{pattern?.description}</p>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${getBreakoutColor(pattern?.breakoutProbability)}`}>
                        {pattern?.breakoutProbability}%
                      </div>
                      <div className="text-xs text-gray-600">Breakout Probability</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {pattern?.timeframe}
                      </div>
                      <div className="text-xs text-gray-600">Analysis Timeframe</div>
                    </div>
                  </div>
                  
                  {/* Confidence Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Pattern Strength</span>
                      <span>{pattern?.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          pattern?.confidence >= 80 ? 'bg-green-500' :
                          pattern?.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${pattern?.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Pattern-specific insights */}
                  {pattern?.status === 'active' && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <strong>Active Signal:</strong> Pattern is currently in play with strong momentum. 
                          Monitor for breakout confirmation.
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {pattern?.status === 'forming' && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-800">
                          <strong>Formation Stage:</strong> Pattern is developing. Wait for completion 
                          before taking action.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Historical Performance Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Pattern Recognition Accuracy
          </h4>
          <div className="text-sm text-gray-600">
            Our AI model has achieved 78.4% accuracy in pattern detection over the last 12 months, 
            with higher accuracy for patterns with confidence scores above 80%.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetection;