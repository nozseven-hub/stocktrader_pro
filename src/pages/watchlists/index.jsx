import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Upload, Bell, Settings, BarChart3 } from 'lucide-react';
import WatchlistTabs from './components/WatchlistTabs';
import WatchlistTable from './components/WatchlistTable';
import CreateWatchlistModal from './components/CreateWatchlistModal';
import ImportCSVModal from './components/ImportCSVModal';
import SummaryPanel from './components/SummaryPanel';
import BulkActionsPanel from './components/BulkActionsPanel';

const Watchlists = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const [watchlists, setWatchlists] = useState([
    {
      id: 1,
      name: 'Tech Giants',
      description: 'Major technology companies',
      stocks: [
        {
          id: 1,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 182.52,
          change: 2.34,
          changePercent: 1.30,
          volume: '64.2M',
          pattern: 'Bull Flag',
          patternConfidence: 87,
          lastAnalysis: '2024-01-15 14:30:00',
          alertsActive: 2
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
          patternConfidence: 73,
          lastAnalysis: '2024-01-15 14:25:00',
          alertsActive: 1
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
          patternConfidence: 91,
          lastAnalysis: '2024-01-15 14:32:00',
          alertsActive: 3
        }
      ]
    },
    {
      id: 2,
      name: 'Growth Stocks',
      description: 'High growth potential stocks',
      stocks: [
        {
          id: 4,
          symbol: 'TSLA',
          name: 'Tesla Inc.',
          price: 248.50,
          change: 12.34,
          changePercent: 5.22,
          volume: '89.7M',
          pattern: 'Breakout',
          patternConfidence: 94,
          lastAnalysis: '2024-01-15 14:28:00',
          alertsActive: 4
        },
        {
          id: 5,
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 875.28,
          change: -8.45,
          changePercent: -0.95,
          volume: '45.6M',
          pattern: 'Cup & Handle',
          patternConfidence: 82,
          lastAnalysis: '2024-01-15 14:20:00',
          alertsActive: 2
        }
      ]
    },
    {
      id: 3,
      name: 'Dividend Stocks',
      description: 'Reliable dividend paying stocks',
      stocks: [
        {
          id: 6,
          symbol: 'KO',
          name: 'The Coca-Cola Company',
          price: 58.92,
          change: 0.23,
          changePercent: 0.39,
          volume: '12.3M',
          pattern: 'Consolidation',
          patternConfidence: 65,
          lastAnalysis: '2024-01-15 14:15:00',
          alertsActive: 1
        }
      ]
    }
  ]);

  const [summaryData, setSummaryData] = useState({
    totalValue: 1245780.50,
    dailyPL: 5247.85,
    dailyPLPercent: 0.42,
    totalStocks: 0,
    activeAlerts: 0,
    topGainer: null,
    topLoser: null
  });

  // Calculate summary data
  useEffect(() => {
    const allStocks = watchlists?.flatMap(wl => wl?.stocks);
    const totalStocks = allStocks?.length;
    const activeAlerts = allStocks?.reduce((sum, stock) => sum + stock?.alertsActive, 0);
    
    const sortedByChange = [...allStocks]?.sort((a, b) => b?.changePercent - a?.changePercent);
    const topGainer = sortedByChange?.[0];
    const topLoser = sortedByChange?.[sortedByChange?.length - 1];

    setSummaryData(prev => ({
      ...prev,
      totalStocks,
      activeAlerts,
      topGainer,
      topLoser
    }));
  }, [watchlists]);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlists(prevWatchlists => 
        prevWatchlists?.map(watchlist => ({
          ...watchlist,
          stocks: watchlist?.stocks?.map(stock => ({
            ...stock,
            price: Math.max(0.01, stock?.price + (Math.random() - 0.5) * 2),
            change: stock?.change + (Math.random() - 0.5) * 0.5,
            changePercent: stock?.changePercent + (Math.random() - 0.5) * 0.3
          }))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateWatchlist = (watchlistData) => {
    const newWatchlist = {
      id: Date.now(),
      name: watchlistData?.name,
      description: watchlistData?.description,
      stocks: []
    };
    setWatchlists(prev => [...prev, newWatchlist]);
    setShowCreateModal(false);
    setActiveTab(watchlists?.length);
  };

  const handleDeleteWatchlist = (watchlistId) => {
    if (watchlists?.length > 1) {
      setWatchlists(prev => prev?.filter(wl => wl?.id !== watchlistId));
      if (activeTab >= watchlists?.length - 1) {
        setActiveTab(Math.max(0, activeTab - 1));
      }
    }
  };

  const handleImportCSV = (csvData) => {
    if (watchlists?.[activeTab]) {
      const newStocks = csvData?.map((row, index) => ({
        id: Date.now() + index,
        symbol: row?.symbol?.toUpperCase() || '',
        name: row?.name || `${row?.symbol} Inc.`,
        price: parseFloat(row?.price) || 0,
        change: 0,
        changePercent: 0,
        volume: '0',
        pattern: 'None',
        patternConfidence: 0,
        lastAnalysis: new Date()?.toISOString(),
        alertsActive: 0
      }));

      setWatchlists(prev => 
        prev?.map(wl => 
          wl?.id === watchlists?.[activeTab]?.id 
            ? { ...wl, stocks: [...wl?.stocks, ...newStocks] }
            : wl
        )
      );
    }
    setShowImportModal(false);
  };

  const handleRemoveStock = (stockId) => {
    setWatchlists(prev => 
      prev?.map(wl => 
        wl?.id === watchlists?.[activeTab]?.id 
          ? { ...wl, stocks: wl?.stocks?.filter(s => s?.id !== stockId) }
          : wl
      )
    );
  };

  const handleBulkAction = (action, stockIds) => {
    switch (action) {
      case 'remove':
        setWatchlists(prev => 
          prev?.map(wl => 
            wl?.id === watchlists?.[activeTab]?.id 
              ? { ...wl, stocks: wl?.stocks?.filter(s => !stockIds?.includes(s?.id)) }
              : wl
          )
        );
        break;
      case 'analyze': console.log('Analyze stocks:', stockIds);
        break;
      case 'alert': console.log('Set alerts for stocks:', stockIds);
        break;
    }
    setSelectedStocks([]);
  };

  const filteredStocks = watchlists?.[activeTab]?.stocks?.filter(stock => {
    const matchesSearch = stock?.symbol?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         stock?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'gainers') return matchesSearch && stock?.changePercent > 0;
    if (filterType === 'losers') return matchesSearch && stock?.changePercent < 0;
    if (filterType === 'alerts') return matchesSearch && stock?.alertsActive > 0;
    
    return matchesSearch;
  }) || [];

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
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/watchlists" className="text-blue-600 font-medium">Watchlists</Link>
                <Link to="/alerts" className="text-gray-600 hover:text-gray-900">Alerts</Link>
                <Link to="/stock-analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
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
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Watchlists</h2>
            <p className="text-gray-600 mt-1">Organize and monitor your stock portfolios</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Watchlist
            </button>
          </div>
        </div>

        {/* Summary Panel */}
        <SummaryPanel data={summaryData} />

        {/* Watchlist Tabs */}
        <WatchlistTabs 
          watchlists={watchlists}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onDeleteWatchlist={handleDeleteWatchlist}
        />

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stocks</option>
              <option value="gainers">Gainers</option>
              <option value="losers">Losers</option>
              <option value="alerts">With Alerts</option>
            </select>
            <span className="text-sm text-gray-500">
              {filteredStocks?.length} stocks
            </span>
          </div>
          
          {selectedStocks?.length > 0 && (
            <BulkActionsPanel
              selectedCount={selectedStocks?.length}
              onAction={handleBulkAction}
              selectedStocks={selectedStocks}
            />
          )}
        </div>

        {/* Watchlist Table */}
        {watchlists?.[activeTab] && (
          <WatchlistTable
            stocks={filteredStocks}
            selectedStocks={selectedStocks}
            onSelectionChange={setSelectedStocks}
            onRemoveStock={handleRemoveStock}
          />
        )}

        {/* Empty State */}
        {watchlists?.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No watchlists yet</h3>
            <p className="text-gray-600 mb-6">Create your first watchlist to start tracking stocks</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Watchlist
            </button>
          </div>
        )}
      </div>
      {/* Modals */}
      {showCreateModal && (
        <CreateWatchlistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateWatchlist}
        />
      )}
      {showImportModal && (
        <ImportCSVModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImportCSV}
        />
      )}
    </div>
  );
};

export default Watchlists;