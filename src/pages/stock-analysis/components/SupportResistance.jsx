import React from 'react';
import { TrendingUp, TrendingDown, Target, ArrowUp, ArrowDown } from 'lucide-react';

const SupportResistance = ({ data }) => {
  // Generate support and resistance levels based on current price
  const currentPrice = data?.price || 180;
  
  const supportLevels = [
    {
      level: currentPrice * 0.95,
      strength: 'Strong',
      type: 'support',
      touches: 4,
      lastTest: '2 days ago',
      description: 'Key psychological support level'
    },
    {
      level: currentPrice * 0.90,
      strength: 'Medium',
      type: 'support',
      touches: 2,
      lastTest: '1 week ago',
      description: 'Previous breakout level'
    },
    {
      level: currentPrice * 0.85,
      strength: 'Weak',
      type: 'support',
      touches: 1,
      lastTest: '2 weeks ago',
      description: 'Long-term support trend'
    }
  ];
  
  const resistanceLevels = [
    {
      level: currentPrice * 1.05,
      strength: 'Strong',
      type: 'resistance',
      touches: 3,
      lastTest: '1 day ago',
      description: 'Recent rejection level'
    },
    {
      level: currentPrice * 1.10,
      strength: 'Medium',
      type: 'resistance',
      touches: 2,
      lastTest: '5 days ago',
      description: 'Weekly high resistance'
    },
    {
      level: currentPrice * 1.15,
      strength: 'Strong',
      type: 'resistance',
      touches: 5,
      lastTest: '2 weeks ago',
      description: 'Major resistance zone'
    }
  ];

  const allLevels = [...supportLevels, ...resistanceLevels]?.sort((a, b) => b?.level - a?.level);

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Strong': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Weak': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    return type === 'support' ?'text-green-600 bg-green-50 border-green-200' :'text-red-600 bg-red-50 border-red-200';
  };

  const getDistanceFromPrice = (level) => {
    const distance = ((level - currentPrice) / currentPrice) * 100;
    return {
      percentage: Math.abs(distance)?.toFixed(2),
      direction: distance > 0 ? 'above' : 'below'
    };
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Support & Resistance</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Key price levels and market structure</p>
      </div>
      <div className="p-6">
        {/* Current Price Indicator */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Current Price</span>
            </div>
            <span className="text-lg font-bold text-blue-900">
              ${currentPrice?.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Price Levels */}
        <div className="space-y-3">
          {allLevels?.map((level, index) => {
            const distance = getDistanceFromPrice(level?.level);
            const isNearPrice = parseFloat(distance?.percentage) < 3;
            
            return (
              <div 
                key={index}
                className={`border rounded-lg p-4 transition-all ${
                  isNearPrice ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full border ${getTypeColor(level?.type)}`}>
                      {level?.type === 'support' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">
                          ${level?.level?.toFixed(2)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          getStrengthColor(level?.strength)
                        }`}>
                          {level?.strength}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {level?.type} Level
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      distance?.direction === 'above' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {distance?.percentage}% {distance?.direction}
                    </div>
                    <div className="text-xs text-gray-500">
                      {level?.touches} touches
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {level?.description}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last tested: {level?.lastTest}</span>
                  {isNearPrice && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                      Watch Level
                    </span>
                  )}
                </div>
                {/* Strength indicator */}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Strength:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5]?.map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full ${
                          dot <= level?.touches
                            ? level?.strength === 'Strong' ? 'bg-red-500' :
                              level?.strength === 'Medium'? 'bg-yellow-500' : 'bg-green-500' :'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Trading Insights */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-800">
                <strong>Next Support:</strong> Strong support at ${supportLevels?.[0]?.level?.toFixed(2)} 
                ({getDistanceFromPrice(supportLevels?.[0]?.level)?.percentage}% below current price)
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <TrendingDown className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <strong>Next Resistance:</strong> Strong resistance at ${resistanceLevels?.[0]?.level?.toFixed(2)} 
                ({getDistanceFromPrice(resistanceLevels?.[0]?.level)?.percentage}% above current price)
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Structure Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Market Structure Analysis
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Nearest Support:</span>
              <span className="font-medium">${supportLevels?.[0]?.level?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Nearest Resistance:</span>
              <span className="font-medium">${resistanceLevels?.[0]?.level?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Trading Range:</span>
              <span className="font-medium">
                ${supportLevels?.[0]?.level?.toFixed(2)} - ${resistanceLevels?.[0]?.level?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportResistance;