import React from 'react';
import { Shield, AlertTriangle, TrendingDown, Activity, Target, Clock } from 'lucide-react';

const RiskAssessment = ({ data, recommendation }) => {
  // Calculate risk metrics based on stock data and recommendation
  const calculateRiskMetrics = () => {
    const currentPrice = data?.price || 180;
    const volatility = data?.volatility || 25;
    const beta = data?.beta || 1.2;
    
    // Calculate various risk measures
    const maxDrawdown = volatility * 0.6; // Estimated max drawdown
    const valueAtRisk = currentPrice * (volatility / 100) * 1.65; // 95% VaR
    const riskReward = recommendation?.targetPrice && recommendation?.stopLoss ? 
      (recommendation?.targetPrice - currentPrice) / (currentPrice - recommendation?.stopLoss) : 0;
    
    return {
      volatility,
      beta,
      maxDrawdown,
      valueAtRisk,
      riskReward,
      sharpeRatio: 1.2 + Math.random() * 0.8, // Mock Sharpe ratio
      correlation: 0.65 + Math.random() * 0.3, // Mock market correlation
      liquidityRisk: volatility > 30 ? 'High' : volatility > 20 ? 'Medium' : 'Low'
    };
  };

  const riskMetrics = calculateRiskMetrics();

  const getRiskColor = (value, thresholds) => {
    if (value >= thresholds?.high) return 'text-red-600 bg-red-100';
    if (value >= thresholds?.medium) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLevel = (value, thresholds) => {
    if (value >= thresholds?.high) return 'High';
    if (value >= thresholds?.medium) return 'Medium';
    return 'Low';
  };

  const volatilityThresholds = { high: 30, medium: 20 };
  const betaThresholds = { high: 1.5, medium: 1.0 };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Comprehensive risk analysis and metrics</p>
      </div>
      <div className="p-6">
        {/* Overall Risk Score */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">Overall Risk Level</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              getRiskColor(riskMetrics?.volatility, volatilityThresholds)
            }`}>
              {getRiskLevel(riskMetrics?.volatility, volatilityThresholds)} Risk
            </span>
          </div>
          <div className="text-xs text-orange-700">
            Based on volatility, beta, and market conditions
          </div>
        </div>

        {/* Key Risk Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Volatility */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Volatility</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {riskMetrics?.volatility}%
            </div>
            <div className="text-xs text-gray-600">30-day annualized</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${
                  riskMetrics?.volatility > 30 ? 'bg-red-500' :
                  riskMetrics?.volatility > 20 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(riskMetrics?.volatility, 50)}%` }}
              ></div>
            </div>
          </div>

          {/* Beta */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Beta</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {riskMetrics?.beta?.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">vs S&P 500</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${
                  riskMetrics?.beta > 1.5 ? 'bg-red-500' :
                  riskMetrics?.beta > 1.0 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(riskMetrics?.beta * 33.33, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Advanced Risk Metrics */}
        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Value at Risk (95%)</span>
              <span className="text-lg font-semibold text-red-600">
                ${riskMetrics?.valueAtRisk?.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Maximum expected loss in 1 day with 95% confidence
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Maximum Drawdown</span>
              <span className="text-lg font-semibold text-orange-600">
                -{riskMetrics?.maxDrawdown?.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Estimated maximum peak-to-trough decline
            </div>
          </div>

          {recommendation?.targetPrice && recommendation?.stopLoss && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Risk/Reward Ratio</span>
                <span className={`text-lg font-semibold ${
                  riskMetrics?.riskReward >= 2 ? 'text-green-600' :
                  riskMetrics?.riskReward >= 1 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  1:{riskMetrics?.riskReward?.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                Potential reward per unit of risk
              </div>
            </div>
          )}

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Sharpe Ratio</span>
              <span className={`text-lg font-semibold ${
                riskMetrics?.sharpeRatio >= 1.5 ? 'text-green-600' :
                riskMetrics?.sharpeRatio >= 1.0 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {riskMetrics?.sharpeRatio?.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Risk-adjusted return measure
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
            Key Risk Factors
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Market Risk:</span>
                <span className="text-gray-600 ml-2">
                  High correlation ({(riskMetrics?.correlation * 100)?.toFixed(0)}%) with market movements
                </span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Liquidity Risk:</span>
                <span className="text-gray-600 ml-2">
                  {riskMetrics?.liquidityRisk} liquidity risk based on volatility patterns
                </span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Sector Risk:</span>
                <span className="text-gray-600 ml-2">
                  {data?.sector} sector exposure with cyclical characteristics
                </span>
              </div>
            </div>

            {riskMetrics?.volatility > 25 && (
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Volatility Risk:</span>
                  <span className="text-gray-600 ml-2">
                    Higher than average volatility may lead to larger price swings
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Risk Management Suggestions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Risk Management Tips
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <Clock className="h-3 w-3 mt-1 flex-shrink-0" />
              <span>Consider position sizing based on {riskMetrics?.volatility}% volatility</span>
            </div>
            {recommendation?.stopLoss && (
              <div className="flex items-start space-x-2">
                <Shield className="h-3 w-3 mt-1 flex-shrink-0" />
                <span>Use stop-loss at ${recommendation?.stopLoss?.toFixed(2)} to limit downside</span>
              </div>
            )}
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
              <span>Monitor market conditions due to high beta ({riskMetrics?.beta?.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;