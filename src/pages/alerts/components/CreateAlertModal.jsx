import React, { useState } from 'react';
import { X, TrendingUp, Volume2, Activity } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const CreateAlertModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    type: 'price',
    condition: 'above',
    targetValue: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const stockSuggestions = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'META', name: 'Meta Platforms Inc.' }
  ];

  const alertTypes = [
    { 
      value: 'price', 
      label: 'Price Alert', 
      icon: TrendingUp,
      description: 'Get notified when price crosses a threshold'
    },
    { 
      value: 'volume', 
      label: 'Volume Alert', 
      icon: Volume2,
      description: 'Get notified on volume spikes or changes'
    },
    { 
      value: 'pattern', 
      label: 'Pattern Alert', 
      icon: Activity,
      description: 'Get notified on technical pattern formations'
    }
  ];

  const priceConditions = [
    { value: 'above', label: 'Above' },
    { value: 'below', label: 'Below' }
  ];

  const volumeConditions = [
    { value: 'above', label: 'Above' },
    { value: 'spike', label: 'Spike (% increase)' }
  ];

  const patternConditions = [
    { value: 'breakout', label: 'Breakout' },
    { value: 'breakdown', label: 'Breakdown' },
    { value: 'bull_flag', label: 'Bull Flag' },
    { value: 'bear_flag', label: 'Bear Flag' },
    { value: 'cup_handle', label: 'Cup & Handle' },
    { value: 'head_shoulders', label: 'Head & Shoulders' },
    { value: 'double_top', label: 'Double Top' },
    { value: 'double_bottom', label: 'Double Bottom' }
  ];

  const getConditions = () => {
    switch (formData?.type) {
      case 'volume': return volumeConditions;
      case 'pattern': return patternConditions;
      default: return priceConditions;
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData?.symbol?.trim()) {
      newErrors.symbol = 'Stock symbol is required';
    }
    if (!formData?.type) {
      newErrors.type = 'Alert type is required';
    }
    if (formData?.type !== 'pattern' && !formData?.targetValue) {
      newErrors.targetValue = 'Target value is required';
    }
    
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate description if not provided
    let description = formData?.description;
    if (!description) {
      if (formData?.type === 'pattern') {
        description = `${formData?.condition?.replace('_', ' ')} pattern detection`;
      } else if (formData?.type === 'volume') {
        const value = parseFloat(formData?.targetValue);
        const formatted = value >= 1000000 ? `${(value / 1000000)?.toFixed(1)}M` : `${(value / 1000)?.toFixed(0)}K`;
        description = `Volume ${formData?.condition} ${formatted}`;
      } else {
        description = `Price ${formData?.condition} $${parseFloat(formData?.targetValue)?.toFixed(2)}`;
      }
    }

    const alertData = {
      ...formData,
      targetValue: formData?.type === 'pattern' ? null : parseFloat(formData?.targetValue),
      currentValue: null,
      description
    };

    onCreate(alertData);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-fill stock name when symbol is selected
    if (name === 'symbol') {
      const stock = stockSuggestions?.find(s => s?.symbol === value?.toUpperCase());
      if (stock) {
        setFormData(prev => ({ ...prev, name: stock?.name }));
      }
    }

    // Reset condition when type changes
    if (name === 'type') {
      const conditions = getConditions();
      setFormData(prev => ({ 
        ...prev, 
        condition: conditions?.[0]?.value || '',
        targetValue: ''
      }));
    }
  };

  const requiresTargetValue = formData?.type !== 'pattern';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create New Alert</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Selection */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Symbol *
            </label>
            <div className="relative">
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData?.symbol}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase ${
                  errors?.symbol ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter stock symbol (e.g., AAPL)"
                list="stock-suggestions"
              />
              <datalist id="stock-suggestions">
                {stockSuggestions?.map(stock => (
                  <option key={stock?.symbol} value={stock?.symbol}>
                    {stock?.name}
                  </option>
                ))}
              </datalist>
            </div>
            {errors?.symbol && (
              <p className="text-red-600 text-sm mt-1">{errors?.symbol}</p>
            )}
            {formData?.name && (
              <p className="text-sm text-gray-500 mt-1">{formData?.name}</p>
            )}
          </div>

          {/* Alert Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Alert Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alertTypes?.map((type) => {
                const Icon = type?.icon;
                return (
                  <label
                    key={type?.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      formData?.type === type?.value
                        ? 'border-blue-500 bg-blue-50' :'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type?.value}
                      checked={formData?.type === type?.value}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{type?.label}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{type?.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors?.type && (
              <p className="text-red-600 text-sm mt-1">{errors?.type}</p>
            )}
          </div>

          {/* Condition and Target Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData?.condition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getConditions()?.map(condition => (
                  <option key={condition?.value} value={condition?.value}>
                    {condition?.label}
                  </option>
                ))}
              </select>
            </div>

            {requiresTargetValue && (
              <div>
                <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Value *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {formData?.type === 'price' ? '$' : ''}
                  </span>
                  <input
                    type="number"
                    id="targetValue"
                    name="targetValue"
                    value={formData?.targetValue}
                    onChange={handleChange}
                    step={formData?.type === 'price' ? '0.01' : '1'}
                    min="0"
                    className={`w-full ${formData?.type === 'price' ? 'pl-8' : 'pl-3'} pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors?.targetValue ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={formData?.type === 'price' ? '100.00' : '1000000'}
                  />
                </div>
                {errors?.targetValue && (
                  <p className="text-red-600 text-sm mt-1">{errors?.targetValue}</p>
                )}
                {formData?.type === 'volume' && formData?.targetValue && (
                  <p className="text-sm text-gray-500 mt-1">
                    {parseFloat(formData?.targetValue) >= 1000000 
                      ? `${(parseFloat(formData?.targetValue) / 1000000)?.toFixed(1)}M shares`
                      : `${(parseFloat(formData?.targetValue) / 1000)?.toFixed(0)}K shares`
                    }
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Custom Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Description (Optional)
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Custom alert description"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlertModal;