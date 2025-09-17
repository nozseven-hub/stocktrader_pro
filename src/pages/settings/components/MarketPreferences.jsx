import React, { useState } from 'react';
import { Globe, DollarSign, Clock, Building } from 'lucide-react';

const MarketPreferences = ({ onChange }) => {
  const [preferences, setPreferences] = useState({
    defaultCurrency: 'USD',
    preferredExchanges: ['NYSE', 'NASDAQ'],
    tradingSession: 'regular',
    timezone: 'America/New_York',
    marketDataProvider: 'premium',
    priceDisplayFormat: 'decimal',
    volumeUnit: 'shares',
    percentageDecimal: 2
  });

  const handleCurrencyChange = (currency) => {
    setPreferences(prev => ({
      ...prev,
      defaultCurrency: currency
    }));
    onChange();
  };

  const handleExchangeToggle = (exchange) => {
    setPreferences(prev => ({
      ...prev,
      preferredExchanges: prev?.preferredExchanges?.includes(exchange)
        ? prev?.preferredExchanges?.filter(e => e !== exchange)
        : [...prev?.preferredExchanges, exchange]
    }));
    onChange();
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    onChange();
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  const exchanges = [
    { code: 'NYSE', name: 'New York Stock Exchange', region: 'US' },
    { code: 'NASDAQ', name: 'NASDAQ', region: 'US' },
    { code: 'LSE', name: 'London Stock Exchange', region: 'UK' },
    { code: 'TSE', name: 'Tokyo Stock Exchange', region: 'JP' },
    { code: 'SSE', name: 'Shanghai Stock Exchange', region: 'CN' },
    { code: 'TSX', name: 'Toronto Stock Exchange', region: 'CA' }
  ];

  const tradingSessions = [
    { value: 'pre-market', label: 'Pre-Market (4:00 AM - 9:30 AM EST)', desc: 'Extended early hours trading' },
    { value: 'regular', label: 'Regular Hours (9:30 AM - 4:00 PM EST)', desc: 'Standard trading session' },
    { value: 'after-hours', label: 'After Hours (4:00 PM - 8:00 PM EST)', desc: 'Extended evening hours' },
    { value: 'all', label: 'All Sessions', desc: 'Pre-market + Regular + After hours' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST/EDT)' },
    { value: 'America/Chicago', label: 'Central Time (CST/CDT)' },
    { value: 'America/Denver', label: 'Mountain Time (MST/MDT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          Market Preferences
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Configure default currency, exchanges, and trading session preferences
        </p>
      </div>
      {/* Default Currency */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Default Currency
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currencies?.map((currency) => (
            <button
              key={currency?.code}
              onClick={() => handleCurrencyChange(currency?.code)}
              className={`p-4 rounded-lg border-2 text-center ${
                preferences?.defaultCurrency === currency?.code
                  ? 'border-blue-600 bg-blue-50 text-blue-700' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg font-bold">{currency?.symbol}</div>
              <div className="font-medium">{currency?.code}</div>
              <div className="text-xs text-gray-500">{currency?.name}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Preferred Exchanges */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Building className="h-4 w-4 mr-2" />
          Preferred Exchanges
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exchanges?.map((exchange) => (
            <label
              key={exchange?.code}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="font-medium">{exchange?.name}</span>
                <span className="text-sm text-gray-500 ml-2">({exchange?.code})</span>
                <p className="text-xs text-gray-500">{exchange?.region}</p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.preferredExchanges?.includes(exchange?.code)}
                onChange={() => handleExchangeToggle(exchange?.code)}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </label>
          ))}
        </div>
      </div>
      {/* Trading Session Focus */}
      <div>
        <h4 className="text-md font-medium mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Trading Session Focus
        </h4>
        <div className="space-y-3">
          {tradingSessions?.map((session) => (
            <label
              key={session?.value}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="font-medium">{session?.label}</span>
                <p className="text-xs text-gray-500">{session?.desc}</p>
              </div>
              <input
                type="radio"
                name="tradingSession"
                value={session?.value}
                checked={preferences?.tradingSession === session?.value}
                onChange={(e) => handlePreferenceChange('tradingSession', e?.target?.value)}
                className="h-4 w-4 text-blue-600"
              />
            </label>
          ))}
        </div>
      </div>
      {/* Timezone Configuration */}
      <div>
        <h4 className="text-md font-medium mb-4">Timezone Configuration</h4>
        <select
          value={preferences?.timezone}
          onChange={(e) => handlePreferenceChange('timezone', e?.target?.value)}
          className="w-full md:w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {timezones?.map((tz) => (
            <option key={tz?.value} value={tz?.value}>
              {tz?.label}
            </option>
          ))}
        </select>
      </div>
      {/* Data Display Preferences */}
      <div>
        <h4 className="text-md font-medium mb-4">Data Display Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Data Provider
            </label>
            <select
              value={preferences?.marketDataProvider}
              onChange={(e) => handlePreferenceChange('marketDataProvider', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="free">Free (15-minute delay)</option>
              <option value="premium">Premium (Real-time)</option>
              <option value="professional">Professional (Level 2)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Display Format
            </label>
            <select
              value={preferences?.priceDisplayFormat}
              onChange={(e) => handlePreferenceChange('priceDisplayFormat', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="decimal">Decimal (123.45)</option>
              <option value="fraction">Fraction (123 1/2)</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume Unit
            </label>
            <select
              value={preferences?.volumeUnit}
              onChange={(e) => handlePreferenceChange('volumeUnit', e?.target?.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="shares">Shares</option>
              <option value="k">Thousands (K)</option>
              <option value="m">Millions (M)</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentage Decimal Places
            </label>
            <select
              value={preferences?.percentageDecimal}
              onChange={(e) => handlePreferenceChange('percentageDecimal', parseInt(e?.target?.value))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 decimal place (1.2%)</option>
              <option value={2}>2 decimal places (1.23%)</option>
              <option value={3}>3 decimal places (1.234%)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPreferences;