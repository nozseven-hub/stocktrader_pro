import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Settings, Search, Bell, BarChart3 } from 'lucide-react';
import MetricsCard from './components/MetricsCard';
import WatchlistTable from './components/WatchlistTable';
import RecommendationsPanel from './components/RecommendationsPanel';
import AdvancedTradingChart from './components/AdvancedTradingChart';
import TradingInterface from './components/TradingInterface';
import NotificationPanel from './components/NotificationPanel';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const [watchlistData, setWatchlistData] = useState([
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 182.52,
      change: 2.34,
      changePercent: 1.30,
      volume: '64.2M',
      pattern: 'Bull Flag',
      confidence: 87,
      trending: 'up'
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 384.30,
      change: -5.67,
      changePercent: -1.45,
      volume: '28.9M',
      pattern: 'Double Top',
      confidence: 73,
      trending: 'down'
    },
    {
      id: 3,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 138.21,
      change: 1.89,
      changePercent: 1.39,
      volume: '31.4M',
      pattern: 'Ascending Triangle',
      confidence: 91,
      trending: 'up'
    },
    {
      id: 4,
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 127.74,
      change: -0.98,
      changePercent: -0.76,
      volume: '45.1M',
      pattern: 'Head & Shoulders',
      confidence: 68,
      trending: 'down'
    },
    {
      id: 5,
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: 12.34,
      changePercent: 5.22,
      volume: '89.7M',
      pattern: 'Breakout',
      confidence: 94,
      trending: 'up'
    }
  ]);

  const [selectedStock, setSelectedStock] = useState(watchlistData?.[0]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'signal',
      message: 'TSLA breakout signal detected',
      time: '2 min ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'alert',
      message: 'AAPL reached target price',
      time: '5 min ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'pattern',
      message: 'GOOGL ascending triangle forming',
      time: '12 min ago',
      priority: 'low'
    }
  ]);

  const [portfolioMetrics] = useState({
    totalValue: 245780.50,
    dailyPL: 3247.85,
    dailyPLPercent: 1.34,
    accuracy: 73.2,
    activeAlerts: 12
  });

  const [recommendations] = useState([
    {
      id: 1,
      symbol: 'NVDA',
      signal: 'BUY',
      pattern: 'Cup & Handle',
      confidence: 89,
      targetPrice: 475.00,
      currentPrice: 432.10,
      riskLevel: 'Medium'
    },
    {
      id: 2,
      symbol: 'META',
      signal: 'SELL',
      pattern: 'Double Top',
      confidence: 76,
      targetPrice: 285.00,
      currentPrice: 312.45,
      riskLevel: 'High'
    },
    {
      id: 3,
      symbol: 'AMD',
      signal: 'HOLD',
      pattern: 'Consolidation',
      confidence: 62,
      targetPrice: 108.00,
      currentPrice: 105.30,
      riskLevel: 'Low'
    }
  ]);

  const [viewMode, setViewMode] = useState('trading'); // 'overview' or 'trading'

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setWatchlistData(prevData => 
        prevData?.map(stock => ({
          ...stock,
          price: stock?.price + (Math.random() - 0.5) * 2,
          change: stock?.change + (Math.random() - 0.5) * 0.5,
          changePercent: stock?.changePercent + (Math.random() - 0.5) * 0.2
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleOrderSubmit = (orderData) => {
    console.log('Order submitted:', orderData);
    // Handle order submission
  };

  const handleBuyClick = (symbol, price) => {
    console.log('Buy clicked for:', symbol, 'at', price);
    setViewMode('trading');
  };

  const handleSellClick = (symbol, price) => {
    console.log('Sell clicked for:', symbol, 'at', price);
    setViewMode('trading');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">StockTrader Pro</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link to="/stock-analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
                <Link to="/reports" className="text-gray-600 hover:text-gray-900">Reports</Link>
                <Link to="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-1 text-sm rounded ${
                    viewMode === 'overview' ?'bg-white text-gray-900 shadow' :'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('trading')}
                  className={`px-3 py-1 text-sm rounded ${
                    viewMode === 'trading' ?'bg-white text-gray-900 shadow' :'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Trading
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Portfolio Value"
            value={`$${portfolioMetrics?.totalValue?.toLocaleString()}`}
            change={portfolioMetrics?.dailyPLPercent}
            icon={TrendingUp}
            color="blue"
          />
          <MetricsCard
            title="Daily P&L"
            value={`$${portfolioMetrics?.dailyPL?.toLocaleString()}`}
            change={portfolioMetrics?.dailyPLPercent}
            icon={portfolioMetrics?.dailyPL > 0 ? TrendingUp : TrendingDown}
            color={portfolioMetrics?.dailyPL > 0 ? "green" : "red"}
          />
          <MetricsCard
            title="Recommendation Accuracy"
            value={`${portfolioMetrics?.accuracy}%`}
            change={0}
            icon={Activity}
            color="purple"
          />
          <MetricsCard
            title="Active Alerts"
            value={portfolioMetrics?.activeAlerts?.toString()}
            icon={AlertCircle}
            color="orange"
          />
        </div>

        {/* Main Content - Conditional Layout */}
        {viewMode === 'overview' ? (
          // Overview Mode - Original Layout
          (<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <WatchlistTable
                data={watchlistData}
                onStockSelect={handleStockSelect}
                selectedStock={selectedStock}
              />
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {selectedStock?.symbol} - {selectedStock?.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">
                      ${selectedStock?.price?.toFixed(2)}
                    </span>
                    <span className={`flex items-center text-sm font-medium ${
                      selectedStock?.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedStock?.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {selectedStock?.change?.toFixed(2)} ({selectedStock?.changePercent?.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <AdvancedTradingChart 
                  symbol={selectedStock?.symbol} 
                  onBuyClick={handleBuyClick}
                  onSellClick={handleSellClick}
                />
              </div>
            </div>
            <div className="space-y-6">
              <RecommendationsPanel recommendations={recommendations} />
              <NotificationPanel notifications={notifications} />
              <QuickActions />
            </div>
          </div>)
        ) : (
          // Trading Mode - Professional Trading Layout
          (<div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Panel - Watchlist */}
            <div className="xl:col-span-1">
              <WatchlistTable
                data={watchlistData}
                onStockSelect={handleStockSelect}
                selectedStock={selectedStock}
                compact={true}
              />
            </div>
            {/* Center Panel - Advanced Chart */}
            <div className="xl:col-span-2">
              <AdvancedTradingChart 
                symbol={selectedStock?.symbol} 
                onBuyClick={handleBuyClick}
                onSellClick={handleSellClick}
              />
            </div>
            {/* Right Panel - Trading Interface */}
            <div className="xl:col-span-1">
              <TradingInterface
                symbol={selectedStock?.symbol}
                currentPrice={selectedStock?.price}
                onOrderSubmit={handleOrderSubmit}
              />
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default Dashboard;