import React, { useEffect, useRef, useState } from 'react';
import { 
  BarChart3, TrendingUp, Volume2, Activity, Settings, 
  Maximize, Plus, Minus, MousePointer, Crosshair, 
  TrendingDown, ChevronDown, Play, Square
} from 'lucide-react';
import Icon from '../../../components/AppIcon';


const AdvancedTradingChart = ({ symbol, onBuyClick, onSellClick }) => {
  const chartRef = useRef(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['RSI', 'MACD']);
  const [drawings, setDrawings] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState('cursor');
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate comprehensive mock data
  const generateAdvancedData = () => {
    const data = [];
    let basePrice = 150 + Math.random() * 100;
    
    for (let i = 0; i < 200; i++) {
      const open = basePrice;
      const volatility = 0.02 + Math.random() * 0.03;
      const trend = Math.sin(i * 0.1) * 0.5;
      const noise = (Math.random() - 0.5) * volatility;
      
      const priceChange = (trend + noise) * basePrice;
      const close = open + priceChange;
      const high = Math.max(open, close) + Math.random() * basePrice * 0.02;
      const low = Math.min(open, close) - Math.random() * basePrice * 0.02;
      const volume = Math.floor(Math.random() * 2000000) + 500000;
      
      // Technical indicators
      const rsi = 30 + Math.random() * 40;
      const macd = (Math.random() - 0.5) * 5;
      const bb_upper = close + (basePrice * 0.04);
      const bb_lower = close - (basePrice * 0.04);
      const sma_20 = basePrice * (0.98 + Math.random() * 0.04);
      
      data?.push({
        time: new Date(Date.now() - (199 - i) * 24 * 60 * 60 * 1000),
        open,
        high,
        low,
        close,
        volume,
        rsi,
        macd,
        bb_upper,
        bb_lower,
        sma_20
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const [chartData] = useState(generateAdvancedData());
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [crosshair, setCrosshair] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (chartRef?.current && chartData?.length > 0) {
      renderAdvancedChart();
    }
  }, [chartData, timeframe, chartType, zoom, indicators]);

  const renderAdvancedChart = () => {
    const container = chartRef?.current;
    container.innerHTML = '';
    
    const width = container?.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 80, bottom: 60, left: 80 };
    const chartWidth = width - margin?.left - margin?.right;
    const chartHeight = height - margin?.top - margin?.bottom;
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg?.setAttribute('width', width);
    svg?.setAttribute('height', height);
    svg?.setAttribute('class', 'advanced-chart');
    
    // Price scales
    const prices = chartData?.flatMap(d => [d?.open, d?.high, d?.low, d?.close]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const paddedMin = minPrice - priceRange * 0.1;
    const paddedMax = maxPrice + priceRange * 0.1;
    const paddedRange = paddedMax - paddedMin;
    
    // Time scale
    const visibleData = chartData?.slice(-Math.floor(100 / zoom));
    const candleWidth = Math.max(2, chartWidth / visibleData?.length * 0.8);
    
    // Grid lines
    for (let i = 0; i <= 8; i++) {
      const y = margin?.top + (i / 8) * chartHeight;
      const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      gridLine?.setAttribute('x1', margin?.left);
      gridLine?.setAttribute('y1', y);
      gridLine?.setAttribute('x2', margin?.left + chartWidth);
      gridLine?.setAttribute('y2', y);
      gridLine?.setAttribute('stroke', '#f0f0f0');
      gridLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(gridLine);
      
      // Price labels
      const price = paddedMax - (i / 8) * paddedRange;
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label?.setAttribute('x', margin?.left - 10);
      label?.setAttribute('y', y + 4);
      label?.setAttribute('text-anchor', 'end');
      label?.setAttribute('class', 'text-xs fill-gray-600');
      label.textContent = `$${price?.toFixed(2)}`;
      svg?.appendChild(label);
    }
    
    // Vertical grid lines
    for (let i = 0; i < visibleData?.length; i += Math.max(1, Math.floor(visibleData?.length / 8))) {
      const x = margin?.left + (i / (visibleData?.length - 1)) * chartWidth;
      const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      gridLine?.setAttribute('x1', x);
      gridLine?.setAttribute('y1', margin?.top);
      gridLine?.setAttribute('x2', x);
      gridLine?.setAttribute('y2', margin?.top + chartHeight);
      gridLine?.setAttribute('stroke', '#f8f8f8');
      gridLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(gridLine);
    }
    
    // Draw technical indicators first (behind candles)
    if (indicators?.includes('Moving Average')) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let pathData = '';
      visibleData?.forEach((candle, i) => {
        const x = margin?.left + (i / (visibleData?.length - 1)) * chartWidth;
        const y = margin?.top + ((paddedMax - candle?.sma_20) / paddedRange) * chartHeight;
        pathData += `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      path?.setAttribute('d', pathData);
      path?.setAttribute('stroke', '#3b82f6');
      path?.setAttribute('stroke-width', '2');
      path?.setAttribute('fill', 'none');
      svg?.appendChild(path);
    }
    
    if (indicators?.includes('Bollinger Bands')) {
      // Upper band
      const upperPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let upperData = '';
      visibleData?.forEach((candle, i) => {
        const x = margin?.left + (i / (visibleData?.length - 1)) * chartWidth;
        const y = margin?.top + ((paddedMax - candle?.bb_upper) / paddedRange) * chartHeight;
        upperData += `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      upperPath?.setAttribute('d', upperData);
      upperPath?.setAttribute('stroke', '#8b5cf6');
      upperPath?.setAttribute('stroke-width', '1');
      upperPath?.setAttribute('fill', 'none');
      upperPath?.setAttribute('opacity', '0.7');
      svg?.appendChild(upperPath);
      
      // Lower band
      const lowerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let lowerData = '';
      visibleData?.forEach((candle, i) => {
        const x = margin?.left + (i / (visibleData?.length - 1)) * chartWidth;
        const y = margin?.top + ((paddedMax - candle?.bb_lower) / paddedRange) * chartHeight;
        lowerData += `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      lowerPath?.setAttribute('d', lowerData);
      lowerPath?.setAttribute('stroke', '#8b5cf6');
      lowerPath?.setAttribute('stroke-width', '1');
      lowerPath?.setAttribute('fill', 'none');
      lowerPath?.setAttribute('opacity', '0.7');
      svg?.appendChild(lowerPath);
    }
    
    // Draw candlesticks
    visibleData?.forEach((candle, i) => {
      const x = margin?.left + (i / (visibleData?.length - 1)) * chartWidth;
      const yOpen = margin?.top + ((paddedMax - candle?.open) / paddedRange) * chartHeight;
      const yClose = margin?.top + ((paddedMax - candle?.close) / paddedRange) * chartHeight;
      const yHigh = margin?.top + ((paddedMax - candle?.high) / paddedRange) * chartHeight;
      const yLow = margin?.top + ((paddedMax - candle?.low) / paddedRange) * chartHeight;
      
      const isGreen = candle?.close > candle?.open;
      const color = isGreen ? '#10b981' : '#ef4444';
      
      // Wick line
      const wickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      wickLine?.setAttribute('x1', x);
      wickLine?.setAttribute('y1', yHigh);
      wickLine?.setAttribute('x2', x);
      wickLine?.setAttribute('y2', yLow);
      wickLine?.setAttribute('stroke', color);
      wickLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(wickLine);
      
      // Candle body
      const bodyHeight = Math.abs(yClose - yOpen) || 1;
      const bodyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bodyRect?.setAttribute('x', x - candleWidth / 2);
      bodyRect?.setAttribute('y', Math.min(yOpen, yClose));
      bodyRect?.setAttribute('width', candleWidth);
      bodyRect?.setAttribute('height', bodyHeight);
      bodyRect?.setAttribute('fill', isGreen ? color : 'white');
      bodyRect?.setAttribute('stroke', color);
      bodyRect?.setAttribute('stroke-width', '1');
      
      // Add hover effects
      bodyRect?.addEventListener('mouseenter', () => {
        setSelectedCandle(candle);
        bodyRect?.setAttribute('opacity', '0.8');
      });
      
      bodyRect?.addEventListener('mouseleave', () => {
        bodyRect?.setAttribute('opacity', '1');
      });
      
      svg?.appendChild(bodyRect);
    });
    
    // Current price line
    const currentPrice = visibleData?.[visibleData?.length - 1]?.close;
    if (currentPrice) {
      const y = margin?.top + ((paddedMax - currentPrice) / paddedRange) * chartHeight;
      const priceLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      priceLine?.setAttribute('x1', margin?.left);
      priceLine?.setAttribute('y1', y);
      priceLine?.setAttribute('x2', margin?.left + chartWidth);
      priceLine?.setAttribute('y2', y);
      priceLine?.setAttribute('stroke', '#3b82f6');
      priceLine?.setAttribute('stroke-width', '2');
      priceLine?.setAttribute('stroke-dasharray', '5,5');
      svg?.appendChild(priceLine);
      
      // Price label
      const priceLabel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      priceLabel?.setAttribute('x', margin?.left + chartWidth + 5);
      priceLabel?.setAttribute('y', y - 10);
      priceLabel?.setAttribute('width', 60);
      priceLabel?.setAttribute('height', 20);
      priceLabel?.setAttribute('fill', '#3b82f6');
      svg?.appendChild(priceLabel);
      
      const priceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      priceText?.setAttribute('x', margin?.left + chartWidth + 35);
      priceText?.setAttribute('y', y + 4);
      priceText?.setAttribute('text-anchor', 'middle');
      priceText?.setAttribute('class', 'text-xs fill-white font-medium');
      priceText.textContent = `$${currentPrice?.toFixed(2)}`;
      svg?.appendChild(priceText);
    }
    
    container?.appendChild(svg);
  };

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  const chartTypes = ['candlestick', 'line', 'area', 'heikin-ashi'];
  const availableIndicators = [
    'RSI', 'MACD', 'Moving Average', 'Bollinger Bands', 
    'Stochastic', 'Williams %R', 'CCI', 'Momentum'
  ];
  const drawingTools = [
    { id: 'cursor', label: 'Cursor', icon: MousePointer },
    { id: 'crosshair', label: 'Crosshair', icon: Crosshair },
    { id: 'trendline', label: 'Trend Line', icon: TrendingUp },
    { id: 'rectangle', label: 'Rectangle', icon: Square }
  ];

  const currentPrice = chartData?.[chartData?.length - 1]?.close || 0;
  const priceChange = chartData?.length > 1 
    ? currentPrice - chartData?.[chartData?.length - 2]?.close 
    : 0;
  const priceChangePercent = chartData?.length > 1 
    ? (priceChange / chartData?.[chartData?.length - 2]?.close) * 100 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Chart Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">{symbol}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">${currentPrice?.toFixed(2)}</span>
              <span className={`flex items-center text-sm font-medium ${
                priceChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {priceChange >= 0 ? 
                  <TrendingUp className="h-4 w-4 mr-1" /> : 
                  <TrendingDown className="h-4 w-4 mr-1" />
                }
                {priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)} 
                ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent?.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {/* Trading Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onBuyClick?.(symbol, currentPrice)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Buy
            </button>
            <button
              onClick={() => onSellClick?.(symbol, currentPrice)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Sell
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Maximize className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Timeframe Selection */}
          <div className="flex items-center space-x-1">
            {timeframes?.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-sm rounded ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart Type & Tools */}
          <div className="flex items-center space-x-4">
            {/* Chart Type */}
            <div className="relative group">
              <button className="flex items-center px-3 py-1 text-sm border rounded hover:bg-gray-50">
                <BarChart3 className="h-4 w-4 mr-1" />
                {chartType}
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {chartTypes?.map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawing Tools */}
            <div className="flex items-center space-x-1 border rounded">
              {drawingTools?.map((tool) => {
                const Icon = tool?.icon;
                return (
                  <button
                    key={tool?.id}
                    onClick={() => setSelectedTool(tool?.id)}
                    className={`p-2 ${
                      selectedTool === tool?.id
                        ? 'bg-blue-600 text-white' :'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={tool?.label}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 border rounded">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-2 text-sm">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-1 border rounded">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-gray-600" />
            <div className="flex flex-wrap gap-1">
              {availableIndicators?.map((indicator) => (
                <button
                  key={indicator}
                  onClick={() => {
                    setIndicators(prev => 
                      prev?.includes(indicator)
                        ? prev?.filter(i => i !== indicator)
                        : [...prev, indicator]
                    );
                  }}
                  className={`px-2 py-1 text-xs rounded ${
                    indicators?.includes(indicator)
                      ? 'bg-purple-100 text-purple-700' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {indicator}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Chart Area */}
      <div className="relative">
        <div ref={chartRef} className="w-full h-96"></div>
        
        {/* Selected Candle Info */}
        {selectedCandle && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded text-sm">
            <div>Time: {selectedCandle?.time?.toLocaleString()}</div>
            <div>O: ${selectedCandle?.open?.toFixed(2)}</div>
            <div>H: ${selectedCandle?.high?.toFixed(2)}</div>
            <div>L: ${selectedCandle?.low?.toFixed(2)}</div>
            <div>C: ${selectedCandle?.close?.toFixed(2)}</div>
            <div>Volume: {selectedCandle?.volume?.toLocaleString()}</div>
            {indicators?.includes('RSI') && (
              <div>RSI: {selectedCandle?.rsi?.toFixed(2)}</div>
            )}
          </div>
        )}
      </div>
      {/* Indicator Panels */}
      {indicators?.length > 0 && (
        <div className="border-t p-4 space-y-4">
          {indicators?.includes('RSI') && (
            <div className="h-20 bg-gray-50 rounded p-2">
              <div className="text-xs font-medium text-gray-600 mb-1">RSI (14)</div>
              <div className="h-12 relative bg-white rounded border">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-red-300"></div>
                <div className="absolute bottom-1/3 left-0 right-0 h-px bg-green-300"></div>
                {/* RSI line would be drawn here */}
              </div>
            </div>
          )}
          
          {indicators?.includes('MACD') && (
            <div className="h-20 bg-gray-50 rounded p-2">
              <div className="text-xs font-medium text-gray-600 mb-1">MACD (12,26,9)</div>
              <div className="h-12 bg-white rounded border">
                {/* MACD histogram and lines would be drawn here */}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Volume Chart */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <h4 className="text-sm font-medium">Volume</h4>
        </div>
        <div className="flex items-end space-x-px h-16">
          {chartData?.slice(-50)?.map((data, i) => (
            <div
              key={i}
              className={`flex-1 min-w-1 ${
                data?.close > data?.open ? 'bg-green-200' : 'bg-red-200'
              }`}
              style={{
                height: `${(data?.volume / Math.max(...chartData?.map(d => d?.volume))) * 64}px`
              }}
              title={`Volume: ${data?.volume?.toLocaleString()}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedTradingChart;