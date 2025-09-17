import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Volume2, Activity } from 'lucide-react';

const TradingChart = ({ symbol }) => {
  const chartRef = useRef(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['RSI']);

  // Generate mock candlestick data
  const generateMockData = () => {
    const data = [];
    let basePrice = 150 + Math.random() * 100;
    
    for (let i = 0; i < 50; i++) {
      const open = basePrice;
      const close = open + (Math.random() - 0.5) * 10;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      data?.push({
        time: new Date(Date.now() - (49 - i) * 24 * 60 * 60 * 1000),
        open,
        high,
        low,
        close,
        volume
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const [chartData] = useState(generateMockData());

  useEffect(() => {
    // This would typically initialize a real charting library like lightweight-charts
    // For now, we'll create a simple SVG chart
    if (chartRef?.current && chartData?.length > 0) {
      const svg = chartRef?.current;
      svg.innerHTML = ''; // Clear previous chart
      
      // Chart dimensions
      const width = svg?.clientWidth;
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 40, left: 60 };
      const chartWidth = width - margin?.left - margin?.right;
      const chartHeight = height - margin?.top - margin?.bottom;
      
      // Create SVG elements
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement?.setAttribute('width', width);
      svgElement?.setAttribute('height', height);
      svgElement?.setAttribute('class', 'w-full');
      
      // Price scales
      const prices = chartData?.flatMap(d => [d?.open, d?.high, d?.low, d?.close]);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceRange = maxPrice - minPrice;
      
      // Time scale
      const timeRange = chartData?.length;
      
      // Draw candlesticks
      chartData?.forEach((candle, i) => {
        const x = margin?.left + (i / (timeRange - 1)) * chartWidth;
        const yOpen = margin?.top + ((maxPrice - candle?.open) / priceRange) * chartHeight;
        const yClose = margin?.top + ((maxPrice - candle?.close) / priceRange) * chartHeight;
        const yHigh = margin?.top + ((maxPrice - candle?.high) / priceRange) * chartHeight;
        const yLow = margin?.top + ((maxPrice - candle?.low) / priceRange) * chartHeight;
        
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
        svgElement?.appendChild(wickLine);
        
        // Candle body
        const bodyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bodyRect?.setAttribute('x', x - 2);
        bodyRect?.setAttribute('y', Math.min(yOpen, yClose));
        bodyRect?.setAttribute('width', '4');
        bodyRect?.setAttribute('height', Math.abs(yClose - yOpen) || 1);
        bodyRect?.setAttribute('fill', color);
        svgElement?.appendChild(bodyRect);
      });
      
      // Add grid lines
      for (let i = 0; i <= 5; i++) {
        const y = margin?.top + (i / 5) * chartHeight;
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine?.setAttribute('x1', margin?.left);
        gridLine?.setAttribute('y1', y);
        gridLine?.setAttribute('x2', margin?.left + chartWidth);
        gridLine?.setAttribute('y2', y);
        gridLine?.setAttribute('stroke', '#e5e7eb');
        gridLine?.setAttribute('stroke-width', '1');
        svgElement?.appendChild(gridLine);
        
        // Price labels
        const price = maxPrice - (i / 5) * priceRange;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label?.setAttribute('x', margin?.left - 10);
        label?.setAttribute('y', y + 4);
        label?.setAttribute('text-anchor', 'end');
        label?.setAttribute('class', 'text-xs fill-gray-600');
        label.textContent = `$${price?.toFixed(2)}`;
        svgElement?.appendChild(label);
      }
      
      svg?.appendChild(svgElement);
    }
  }, [chartData, timeframe, chartType, symbol]);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];
  const chartTypes = ['candlestick', 'line', 'area'];
  const availableIndicators = ['RSI', 'MACD', 'Bollinger Bands', 'Moving Average'];

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Timeframe Selection */}
          <div className="flex items-center space-x-1">
            {timeframes?.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-sm rounded ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart Type */}
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-gray-600" />
            <select
              value={chartType}
              onChange={(e) => setChartType(e?.target?.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {chartTypes?.map((type) => (
                <option key={type} value={type}>
                  {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-gray-600" />
          <div className="flex flex-wrap gap-2">
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
      {/* Chart Container */}
      <div className="bg-white border rounded-lg p-4">
        <div ref={chartRef} className="w-full h-80 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Loading chart for {symbol}...</p>
          </div>
        </div>
      </div>
      {/* Volume Chart */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <h4 className="text-sm font-medium">Volume</h4>
        </div>
        <div className="flex items-end space-x-1 h-20">
          {chartData?.slice(-20)?.map((data, i) => (
            <div
              key={i}
              className="bg-blue-200 flex-1 min-w-1"
              style={{
                height: `${(data?.volume / Math.max(...chartData?.map(d => d?.volume))) * 80}px`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingChart;