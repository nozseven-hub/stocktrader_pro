import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Plus, Share } from 'lucide-react';
import InteractiveChart from './components/InteractiveChart';
import PatternDetection from './components/PatternDetection';
import TechnicalIndicators from './components/TechnicalIndicators';
import RecommendationEngine from './components/RecommendationEngine';
import SupportResistance from './components/SupportResistance';
import RiskAssessment from './components/RiskAssessment';

const StockAnalysis = () => {
  const { symbol } = useParams();
  const [selectedSymbol, setSelectedSymbol] = useState(symbol || 'AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock stock data generation
  const generateStockData = (stockSymbol) => {
    const companies = {
      'AAPL': { name: 'Apple Inc.', sector: 'Technology' },
      'MSFT': { name: 'Microsoft Corporation', sector: 'Technology' },
      'GOOGL': { name: 'Alphabet Inc.', sector: 'Technology' },
      'AMZN': { name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
      'TSLA': { name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
      'NVDA': { name: 'NVIDIA Corporation', sector: 'Technology' },
      'META': { name: 'Meta Platforms Inc.', sector: 'Technology' }
    };

    const company = companies?.[stockSymbol] || { name: `${stockSymbol} Corporation`, sector: 'Technology' };
    const basePrice = 100 + Math.random() * 400;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;

    return {
      symbol: stockSymbol,
      name: company?.name,
      sector: company?.sector,
      price: basePrice,
      change: change,
      changePercent: changePercent,
      volume: Math.floor(Math.random() * 50000000) + 10000000,
      marketCap: Math.floor(Math.random() * 2000000000000) + 100000000000,
      pe: Math.floor(Math.random() * 30) + 10,
      dayRange: {
        low: basePrice - Math.random() * 10,
        high: basePrice + Math.random() * 10
      },
      weekRange52: {
        low: basePrice - Math.random() * 100,
        high: basePrice + Math.random() * 100
      },
      volatility: Math.floor(Math.random() * 50) + 10,
      beta: 0.5 + Math.random() * 1.5,
      lastUpdated: new Date()
    };
  };

  const [patternData] = useState([
    {
      id: 1,
      pattern: 'Wolfe Wave',
      confidence: 87,
      timeframe: '4H',
      status: 'Active',
      breakoutProbability: 73,
      description: 'Bullish Wolfe Wave pattern forming with strong volume confirmation'
    },
    {
      id: 2,
      pattern: 'Bull Flag',
      confidence: 91,
      timeframe: '1D',
      status: 'Completed',
      breakoutProbability: 89,
      description: 'Classic bull flag pattern with successful breakout above resistance'
    },
    {
      id: 3,
      pattern: 'Ascending Triangle',
      confidence: 68,
      timeframe: '1W',
      status: 'Forming',
      breakoutProbability: 64,
      description: 'Ascending triangle pattern in early formation stage'
    }
  ]);

  const [recommendation] = useState({
    signal: 'BUY',
    confidence: 84,
    targetPrice: 195.50,
    stopLoss: 165.30,
    reasoning: [
      'Strong bullish pattern formation with high confidence',
      'Technical indicators showing positive momentum',
      'Volume analysis confirms institutional buying',
      'Support levels holding strong during recent pullbacks'
    ],
    riskLevel: 'Medium',
    timeHorizon: '2-3 weeks',
    probabilitySuccess: 76
  });

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStockData(generateStockData(selectedSymbol));
      setLoading(false);
    }, 1000);
  }, [selectedSymbol]);

  useEffect(() => {
    if (symbol && symbol !== selectedSymbol) {
      setSelectedSymbol(symbol);
    }
  }, [symbol, selectedSymbol]);

  const handleStockSearch = (newSymbol) => {
    setSelectedSymbol(newSymbol?.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Analyzing {selectedSymbol}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {stockData?.symbol} - {stockData?.name}
                  </h1>
                  <p className="text-sm text-gray-600">{stockData?.sector}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ${stockData?.price?.toFixed(2)}
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stockData?.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stockData?.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {stockData?.change?.toFixed(2)} ({stockData?.changePercent?.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter symbol (e.g., AAPL)"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e?.key === 'Enter' && e?.target?.value?.trim()) {
                    handleStockSearch(e?.target?.value?.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add to Watchlist</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Volume</div>
            <div className="text-lg font-semibold">{(stockData?.volume / 1000000)?.toFixed(1)}M</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Market Cap</div>
            <div className="text-lg font-semibold">${(stockData?.marketCap / 1000000000)?.toFixed(1)}B</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">P/E Ratio</div>
            <div className="text-lg font-semibold">{stockData?.pe?.toFixed(1)}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Day Range</div>
            <div className="text-lg font-semibold">
              ${stockData?.dayRange?.low?.toFixed(2)} - ${stockData?.dayRange?.high?.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Volatility</div>
            <div className="text-lg font-semibold">{stockData?.volatility}%</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Beta</div>
            <div className="text-lg font-semibold">{stockData?.beta?.toFixed(2)}</div>
          </div>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <InteractiveChart 
              symbol={selectedSymbol} 
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechnicalIndicators symbol={selectedSymbol} />
              <SupportResistance data={stockData} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <RecommendationEngine recommendation={recommendation} />
            <PatternDetection patterns={patternData} />
            <RiskAssessment data={stockData} recommendation={recommendation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;