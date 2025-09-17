import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const TechnicalIndicators = ({ symbol }) => {
  // Generate mock technical indicator data
  const [indicators] = useState({
    rsi: {
      value: 45.8,
      signal: 'Neutral',
      description: 'RSI below 50, showing slight bearish momentum but not oversold',
      status: 'neutral'
    },
    macd: {
      value: -1.24,
      signal: 'Sell',
      description: 'MACD below signal line, indicating bearish momentum',
      status: 'bearish',
      histogram: 0.34
    },
    stochastic: {
      value: 32.1,
      signal: 'Oversold',
      description: 'Stochastic in oversold territory, potential reversal signal',
      status: 'bullish'
    },
    williams: {
      value: -78.5,
      signal: 'Oversold',
      description: 'Williams %R indicates oversold conditions',
      status: 'bullish'
    },
    cci: {
      value: -89.3,
      signal: 'Oversold',
      description: 'CCI below -100 indicates oversold conditions',
      status: 'bullish'
    },
    momentum: {
      value: -2.34,
      signal: 'Bearish',
      description: 'Price momentum trending downward',
      status: 'bearish'
    }
  });

  const getSignalColor = (status) => {
    switch (status) {
      case 'bullish': return 'text-green-600 bg-green-100';
      case 'bearish': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSignalIcon = (status) => {
    switch (status) {
      case 'bullish': return TrendingUp;
      case 'bearish': return TrendingDown;
      default: return Activity;
    }
  };

  const getIndicatorDescription = (key) => {
    const descriptions = {
      rsi: 'Relative Strength Index (14)',
      macd: 'MACD (12, 26, 9)',
      stochastic: 'Stochastic Oscillator (14, 3)',
      williams: 'Williams %R (14)',
      cci: 'Commodity Channel Index (20)',
      momentum: 'Price Momentum (10)'
    };
    return descriptions?.[key] || key?.toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Technical Indicators</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Real-time oscillators and momentum indicators</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Object.entries(indicators)?.map(([key, indicator]) => {
            const SignalIcon = getSignalIcon(indicator?.status);
            return (
              <div key={key} className="border rounded-lg p-4">
                {/* Indicator Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getSignalColor(indicator?.status)}`}>
                      <SignalIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getIndicatorDescription(key)}
                      </h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getSignalColor(indicator?.status)
                      }`}>
                        {indicator?.signal}
                      </span>
                    </div>
                  </div>
                  
                  {/* Value Display */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {indicator?.value?.toFixed(2)}
                    </div>
                    {indicator?.histogram !== undefined && (
                      <div className="text-sm text-gray-600">
                        Hist: {indicator?.histogram?.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
                {/* Indicator Description */}
                <p className="text-sm text-gray-600 mb-3">
                  {indicator?.description}
                </p>
                {/* Visual Representation */}
                <div className="space-y-2">
                  {key === 'rsi' && (
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            indicator?.value > 70 ? 'bg-red-500' :
                            indicator?.value < 30 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${indicator?.value}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span className="text-green-600">30 (Oversold)</span>
                        <span>50</span>
                        <span className="text-red-600">70 (Overbought)</span>
                        <span>100</span>
                      </div>
                    </div>
                  )}
                  
                  {key === 'stochastic' && (
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            indicator?.value > 80 ? 'bg-red-500' :
                            indicator?.value < 20 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${indicator?.value}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span className="text-green-600">20</span>
                        <span>50</span>
                        <span className="text-red-600">80</span>
                        <span>100</span>
                      </div>
                    </div>
                  )}
                  
                  {key === 'williams' && (
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            indicator?.value > -20 ? 'bg-red-500' :
                            indicator?.value < -80 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.abs(indicator?.value)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-100</span>
                        <span className="text-green-600">-80</span>
                        <span>-50</span>
                        <span className="text-red-600">-20</span>
                        <span>0</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Signal Strength */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-600">Signal Strength</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5]?.map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= (Math.abs(indicator?.value) > 70 ? 5 : 
                                   Math.abs(indicator?.value) > 50 ? 3 : 1)
                            ? (indicator?.status === 'bullish' ? 'bg-green-500' : 
                               indicator?.status === 'bearish' ? 'bg-red-500' : 'bg-yellow-500')
                            : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Technical Summary
          </h4>
          <div className="text-sm text-gray-600">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">2</div>
                <div>Bullish Signals</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-red-600">2</div>
                <div>Bearish Signals</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-600">2</div>
                <div>Neutral Signals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;