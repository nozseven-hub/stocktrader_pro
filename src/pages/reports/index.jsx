import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Filter, Search, Settings, Bell, BarChart3, Plus, Archive, TrendingUp } from 'lucide-react';
import ReportCard from './components/ReportCard';
import CreateReportModal from './components/CreateReportModal';
import ReportPreview from './components/ReportPreview';
import FilterPanel from './components/FilterPanel';

const Reports = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'all',
    reportType: 'all',
    segment: 'all'
  });

  // Mock report data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Daily Market Analysis - December 17, 2025',
      date: '2025-12-17',
      type: 'daily',
      coverage: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'],
      findings: 'Strong bullish sentiment across tech sector with 5 breakout patterns detected',
      accuracy: 87,
      downloadFormats: ['PDF', 'CSV'],
      status: 'completed',
      segment: 'Technology'
    },
    {
      id: 2,
      title: 'Weekly Pattern Recognition Summary',
      date: '2025-12-15',
      type: 'weekly',
      coverage: ['SPY', 'QQQ', 'DIA', 'IWM'],
      findings: 'Head & shoulders pattern forming in Russell 2000, bullish flags in major indices',
      accuracy: 92,
      downloadFormats: ['PDF', 'CSV'],
      status: 'completed',
      segment: 'Indices'
    },
    {
      id: 3,
      title: 'Custom Energy Sector Analysis',
      date: '2025-12-14',
      type: 'custom',
      coverage: ['XOM', 'CVX', 'COP', 'EOG', 'SLB'],
      findings: 'Consolidation phase ending, potential breakout imminent in 3 out of 5 stocks',
      accuracy: 79,
      downloadFormats: ['PDF', 'CSV', 'Excel'],
      status: 'completed',
      segment: 'Energy'
    },
    {
      id: 4,
      title: 'Healthcare Stock Performance Review',
      date: '2025-12-13',
      type: 'performance',
      coverage: ['JNJ', 'PFE', 'UNH', 'ABBV', 'TMO'],
      findings: 'Mixed signals with 2 strong buy recommendations and 1 sell alert',
      accuracy: 85,
      downloadFormats: ['PDF', 'CSV'],
      status: 'completed',
      segment: 'Healthcare'
    }
  ]);

  const [reportTemplates] = useState([
    {
      id: 1,
      name: 'Daily Tech Analysis',
      schedule: 'Daily at 9:00 AM',
      stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'],
      enabled: true
    },
    {
      id: 2,
      name: 'Weekly Market Overview',
      schedule: 'Mondays at 8:00 AM',
      stocks: ['SPY', 'QQQ', 'DIA', 'IWM'],
      enabled: true
    },
    {
      id: 3,
      name: 'Monthly Portfolio Review',
      schedule: '1st of each month',
      stocks: 'All watchlist stocks',
      enabled: false
    }
  ]);

  const [performanceMetrics] = useState({
    totalReports: 147,
    avgAccuracy: 84.3,
    patternSuccess: 78.9,
    recommendationHits: 176
  });

  const filteredReports = reports?.filter(report => {
    const matchesSearch = report?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         report?.coverage?.some(stock => stock?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    const matchesType = selectedFilters?.reportType === 'all' || report?.type === selectedFilters?.reportType;
    const matchesSegment = selectedFilters?.segment === 'all' || report?.segment === selectedFilters?.segment;
    
    return matchesSearch && matchesType && matchesSegment;
  });

  const handlePreview = (report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  const handleDownload = (report, format) => {
    // Simulate download
    console.log(`Downloading ${report?.title} as ${format}`);
  };

  const handleBulkExport = () => {
    // Simulate bulk export
    console.log('Creating bulk archive...');
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
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/stock-analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
                <Link to="/reports" className="text-blue-600 font-medium">Reports</Link>
                <Link to="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
            <p className="text-gray-600 mt-2">Access automated analysis reports and generate custom market documents</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button
              onClick={handleBulkExport}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Archive className="h-4 w-4 mr-2" />
              Bulk Export
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Report
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.totalReports}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.avgAccuracy}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pattern Success</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.patternSuccess}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recommendation Hits</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.recommendationHits}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports or stocks..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Panel */}
            {filterOpen && (
              <FilterPanel
                selectedFilters={selectedFilters}
                onFiltersChange={setSelectedFilters}
                onClose={() => setFilterOpen(false)}
              />
            )}

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports?.map((report) => (
                <ReportCard
                  key={report?.id}
                  report={report}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {filteredReports?.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reports found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Sidebar - Report Templates */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
              <div className="space-y-4">
                {reportTemplates?.map((template) => (
                  <div key={template?.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{template?.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${
                        template?.enabled 
                          ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                      }`}>
                        {template?.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template?.schedule}</p>
                    <p className="text-xs text-gray-500">
                      {Array.isArray(template?.stocks) 
                        ? `${template?.stocks?.length} stocks` 
                        : template?.stocks
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {showCreateModal && (
        <CreateReportModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(reportData) => {
            console.log('Creating report:', reportData);
            setShowCreateModal(false);
          }}
        />
      )}
      {showPreview && selectedReport && (
        <ReportPreview
          report={selectedReport}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default Reports;