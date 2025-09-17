import React, { useState } from 'react';
import { BarChart3, Activity, TrendingUp, Sliders } from 'lucide-react';

const AnalysisSettings = ({ onChange }) => {
  const [settings, setSettings] = useState({
    patternSensitivity: 75,
    technicalIndicators: {
      rsi: true,
      macd: true,
      bollingerBands: false,
      movingAverages: true,
      volumeAnalysis: true,
      fibonacci: false
    },
    riskTolerance: 'medium',
    alertThreshold: 80,
    dataPoints: 50,
    analysisDepth: 'standard'
  });

  const handleSliderChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    onChange();
  };

  const handleIndicatorToggle = (indicator) => {
    setSettings(prev => ({
      ...prev,
      technicalIndicators: {
        ...prev?.technicalIndicators,
        [indicator]: !prev?.technicalIndicators?.[indicator]
      }
    }));
    onChange();
  };

  const handleRiskToleranceChange = (level) => {
    setSettings(prev => ({
      ...prev,
      riskTolerance: level
    }));
    onChange();
  };

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          Analysis Settings
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Configure pattern detection sensitivity and technical analysis parameters
        </p>
      </div>
      {/* Pattern Detection */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Pattern Detection
        </h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Sensitivity Level</span>
              <span className="text-sm text-gray-500">{settings?.patternSensitivity}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings?.patternSensitivity}
              onChange={(e) => handleSliderChange('patternSensitivity', parseInt(e?.target?.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Alert Threshold</span>
              <span className="text-sm text-gray-500">{settings?.alertThreshold}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="95"
              value={settings?.alertThreshold}
              onChange={(e) => handleSliderChange('alertThreshold', parseInt(e?.target?.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>More Alerts</span>
              <span>Fewer Alerts</span>
            </div>
          </div>
        </div>
      </div>
      {/* Technical Indicators */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Technical Indicators
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings?.technicalIndicators)?.map(([indicator, enabled]) => {
            const labels = {
              rsi: 'RSI (Relative Strength Index)',
              macd: 'MACD (Moving Average Convergence Divergence)',
              bollingerBands: 'Bollinger Bands',
              movingAverages: 'Moving Averages',
              volumeAnalysis: 'Volume Analysis',
              fibonacci: 'Fibonacci Retracements'
            };

            return (
              <label key={indicator} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-700">
                  {labels?.[indicator]}
                </span>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleIndicatorToggle(indicator)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </label>
            );
          })}
        </div>
      </div>
      {/* Risk Tolerance */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Sliders className="h-4 w-4 mr-2" />
          Risk Tolerance
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {['low', 'medium', 'high']?.map((level) => (
            <button
              key={level}
              onClick={() => handleRiskToleranceChange(level)}
              className={`p-4 rounded-lg border-2 text-center ${
                settings?.riskTolerance === level
                  ? 'border-blue-600 bg-blue-50 text-blue-700' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium capitalize">{level}</div>
              <div className="text-xs text-gray-500 mt-1">
                {level === 'low' && 'Conservative approach'}
                {level === 'medium' && 'Balanced strategy'}
                {level === 'high' && 'Aggressive trading'}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Analysis Configuration */}
      <div>
        <h4 className="text-md font-medium mb-4">Analysis Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Historical Data Points</span>
              <span className="text-sm text-gray-500">{settings?.dataPoints}</span>
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={settings?.dataPoints}
              onChange={(e) => handleSliderChange('dataPoints', parseInt(e?.target?.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Depth
            </label>
            <select
              value={settings?.analysisDepth}
              onChange={(e) => {
                setSettings(prev => ({...prev, analysisDepth: e?.target?.value}));
                onChange();
              }}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="advanced">Advanced</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSettings;