import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Activity, Maximize2 } from 'lucide-react';

const InteractiveChart = ({ symbol, timeframe, onTimeframeChange }) => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['RSI', 'MACD']);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate comprehensive mock data
  const generateChartData = () => {
    const data = [];
    let basePrice = 150 + Math.random() * 100;
    const dataPoints = timeframe === '1D' ? 100 : timeframe === '1W' ? 35 : 
                      timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 365;
    
    for (let i = 0; i < dataPoints; i++) {
      const open = basePrice;
      const volatility = 0.02 + Math.random() * 0.03;
      const change = (Math.random() - 0.5) * volatility * open;
      const close = open + change;
      const high = Math.max(open, close) * (1 + Math.random() * 0.02);
      const low = Math.min(open, close) * (1 - Math.random() * 0.02);
      const volume = Math.floor(Math.random() * 2000000) + 500000;
      
      // Technical indicators
      const rsi = 30 + Math.random() * 40; // RSI between 30-70
      const macd = (Math.random() - 0.5) * 2;
      const macdSignal = macd * 0.8 + (Math.random() - 0.5) * 0.5;
      
      data?.push({
        time: new Date(Date.now() - (dataPoints - i) * getTimeMultiplier()),
        open,
        high,
        low,
        close,
        volume,
        rsi,
        macd,
        macdSignal,
        bollingerUpper: close * 1.1,
        bollingerMiddle: close,
        bollingerLower: close * 0.9,
        sma20: close * (0.98 + Math.random() * 0.04),
        sma50: close * (0.96 + Math.random() * 0.08)
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const getTimeMultiplier = () => {
    switch (timeframe) {
      case '1D': return 5 * 60 * 1000; // 5 minutes
      case '1W': return 60 * 60 * 1000; // 1 hour
      case '1M': return 24 * 60 * 60 * 1000; // 1 day
      case '3M': return 24 * 60 * 60 * 1000; // 1 day
      case '1Y': return 24 * 60 * 60 * 1000; // 1 day
      default: return 60 * 60 * 1000;
    }
  };

  const [chartData] = useState(generateChartData());

  useEffect(() => {
    if (chartRef?.current && chartData?.length > 0) {
      renderChart();
    }
  }, [chartData, chartType, indicators, timeframe, symbol]);

  const renderChart = () => {
    const container = chartRef?.current;
    container.innerHTML = '';
    
    // Chart dimensions
    const width = container?.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const chartWidth = width - margin?.left - margin?.right;
    const chartHeight = height - margin?.top - margin?.bottom;
    
    // Create main SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg?.setAttribute('width', width);
    svg?.setAttribute('height', height);
    svg?.setAttribute('class', 'w-full bg-white rounded');
    
    // Price data
    const prices = chartData?.flatMap(d => [d?.open, d?.high, d?.low, d?.close]);
    const minPrice = Math.min(...prices) * 0.98;
    const maxPrice = Math.max(...prices) * 1.02;
    const priceRange = maxPrice - minPrice;
    
    // Create price scale function
    const priceToY = (price) => margin?.top + ((maxPrice - price) / priceRange) * chartHeight;
    const indexToX = (index) => margin?.left + (index / (chartData?.length - 1)) * chartWidth;
    
    // Grid lines
    for (let i = 0; i <= 5; i++) {
      const y = margin?.top + (i / 5) * chartHeight;
      const price = maxPrice - (i / 5) * priceRange;
      
      // Horizontal grid line
      const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      gridLine?.setAttribute('x1', margin?.left);
      gridLine?.setAttribute('y1', y);
      gridLine?.setAttribute('x2', margin?.left + chartWidth);
      gridLine?.setAttribute('y2', y);
      gridLine?.setAttribute('stroke', '#f3f4f6');
      gridLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(gridLine);
      
      // Price labels
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label?.setAttribute('x', width - 10);
      label?.setAttribute('y', y + 4);
      label?.setAttribute('text-anchor', 'end');
      label?.setAttribute('class', 'text-xs fill-gray-600');
      label.textContent = `$${price?.toFixed(2)}`;
      svg?.appendChild(label);
    }
    
    // Render based on chart type
    if (chartType === 'candlestick') {
      renderCandlesticks(svg, chartData, indexToX, priceToY);
    } else if (chartType === 'line') {
      renderLine(svg, chartData, indexToX, priceToY);
    } else if (chartType === 'area') {
      renderArea(svg, chartData, indexToX, priceToY, chartHeight, margin);
    }
    
    // Render indicators
    if (indicators?.includes('SMA20')) {
      renderMovingAverage(svg, chartData, indexToX, priceToY, 'sma20', '#3b82f6');
    }
    if (indicators?.includes('SMA50')) {
      renderMovingAverage(svg, chartData, indexToX, priceToY, 'sma50', '#ef4444');
    }
    if (indicators?.includes('Bollinger Bands')) {
      renderBollingerBands(svg, chartData, indexToX, priceToY);
    }
    
    // Time axis
    const timeLabels = 5;
    for (let i = 0; i <= timeLabels; i++) {
      const dataIndex = Math.floor((i / timeLabels) * (chartData?.length - 1));
      const x = indexToX(dataIndex);
      const time = chartData?.[dataIndex]?.time;
      
      // Vertical grid line
      const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      gridLine?.setAttribute('x1', x);
      gridLine?.setAttribute('y1', margin?.top);
      gridLine?.setAttribute('x2', x);
      gridLine?.setAttribute('y2', margin?.top + chartHeight);
      gridLine?.setAttribute('stroke', '#f3f4f6');
      gridLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(gridLine);
      
      // Time label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label?.setAttribute('x', x);
      label?.setAttribute('y', height - 10);
      label?.setAttribute('text-anchor', 'middle');
      label?.setAttribute('class', 'text-xs fill-gray-600');
      label.textContent = formatTimeLabel(time, timeframe);
      svg?.appendChild(label);
    }
    
    container?.appendChild(svg);
    
    // Render volume chart if space allows
    if (height > 300) {
      renderVolumeChart(container, chartData, width);
    }
  };

  const renderCandlesticks = (svg, data, indexToX, priceToY) => {
    data?.forEach((candle, i) => {
      const x = indexToX(i);
      const yOpen = priceToY(candle?.open);
      const yClose = priceToY(candle?.close);
      const yHigh = priceToY(candle?.high);
      const yLow = priceToY(candle?.low);
      
      const isGreen = candle?.close > candle?.open;
      const color = isGreen ? '#10b981' : '#ef4444';
      const candleWidth = Math.max(2, Math.min(8, (svg?.getAttribute('width') - 120) / data?.length));
      
      // Wick
      const wickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      wickLine?.setAttribute('x1', x);
      wickLine?.setAttribute('y1', yHigh);
      wickLine?.setAttribute('x2', x);
      wickLine?.setAttribute('y2', yLow);
      wickLine?.setAttribute('stroke', color);
      wickLine?.setAttribute('stroke-width', '1');
      svg?.appendChild(wickLine);
      
      // Body
      const bodyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bodyRect?.setAttribute('x', x - candleWidth / 2);
      bodyRect?.setAttribute('y', Math.min(yOpen, yClose));
      bodyRect?.setAttribute('width', candleWidth);
      bodyRect?.setAttribute('height', Math.abs(yClose - yOpen) || 1);
      bodyRect?.setAttribute('fill', isGreen ? color : 'white');
      bodyRect?.setAttribute('stroke', color);
      bodyRect?.setAttribute('stroke-width', '1');
      svg?.appendChild(bodyRect);
    });
  };

  const renderLine = (svg, data, indexToX, priceToY) => {
    const pathData = data?.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${indexToX(i)} ${priceToY(d?.close)}`
    )?.join(' ');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path?.setAttribute('d', pathData);
    path?.setAttribute('stroke', '#3b82f6');
    path?.setAttribute('stroke-width', '2');
    path?.setAttribute('fill', 'none');
    svg?.appendChild(path);
  };

  const renderArea = (svg, data, indexToX, priceToY, chartHeight, margin) => {
    const pathData = data?.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${indexToX(i)} ${priceToY(d?.close)}`
    )?.join(' ') + ` L ${indexToX(data?.length - 1)} ${margin?.top + chartHeight} L ${indexToX(0)} ${margin?.top + chartHeight} Z`;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path?.setAttribute('d', pathData);
    path?.setAttribute('stroke', '#3b82f6');
    path?.setAttribute('stroke-width', '2');
    path?.setAttribute('fill', 'url(#gradient)');
    svg?.appendChild(path);
    
    // Add gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient?.setAttribute('id', 'gradient');
    gradient?.setAttribute('x1', '0%');
    gradient?.setAttribute('y1', '0%');
    gradient?.setAttribute('x2', '0%');
    gradient?.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1?.setAttribute('offset', '0%');
    stop1?.setAttribute('stop-color', '#3b82f6');
    stop1?.setAttribute('stop-opacity', '0.3');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2?.setAttribute('offset', '100%');
    stop2?.setAttribute('stop-color', '#3b82f6');
    stop2?.setAttribute('stop-opacity', '0');
    
    gradient?.appendChild(stop1);
    gradient?.appendChild(stop2);
    defs?.appendChild(gradient);
    svg?.insertBefore(defs, svg?.firstChild);
  };

  const renderMovingAverage = (svg, data, indexToX, priceToY, field, color) => {
    const pathData = data?.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${indexToX(i)} ${priceToY(d?.[field])}`
    )?.join(' ');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path?.setAttribute('d', pathData);
    path?.setAttribute('stroke', color);
    path?.setAttribute('stroke-width', '1.5');
    path?.setAttribute('fill', 'none');
    path?.setAttribute('opacity', '0.8');
    svg?.appendChild(path);
  };

  const renderBollingerBands = (svg, data, indexToX, priceToY) => {
    // Upper band
    const upperPath = data?.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${indexToX(i)} ${priceToY(d?.bollingerUpper)}`
    )?.join(' ');
    
    // Lower band
    const lowerPath = data?.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${indexToX(i)} ${priceToY(d?.bollingerLower)}`
    )?.join(' ');
    
    // Fill area between bands
    const fillPath = upperPath + ' ' + 
      data?.slice()?.reverse()?.map((d, i) => 
        `L ${indexToX(data?.length - 1 - i)} ${priceToY(d?.bollingerLower)}`
      )?.join(' ') + ' Z';
    
    const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fillArea?.setAttribute('d', fillPath);
    fillArea?.setAttribute('fill', '#8b5cf6');
    fillArea?.setAttribute('opacity', '0.1');
    svg?.appendChild(fillArea);
    
    // Upper line
    const upperLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    upperLine?.setAttribute('d', upperPath);
    upperLine?.setAttribute('stroke', '#8b5cf6');
    upperLine?.setAttribute('stroke-width', '1');
    upperLine?.setAttribute('fill', 'none');
    upperLine?.setAttribute('opacity', '0.6');
    svg?.appendChild(upperLine);
    
    // Lower line
    const lowerLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lowerLine?.setAttribute('d', lowerPath);
    lowerLine?.setAttribute('stroke', '#8b5cf6');
    lowerLine?.setAttribute('stroke-width', '1');
    lowerLine?.setAttribute('fill', 'none');
    lowerLine?.setAttribute('opacity', '0.6');
    svg?.appendChild(lowerLine);
  };

  const renderVolumeChart = (container, data, width) => {
    const volumeDiv = document.createElement('div');
    volumeDiv.className = 'mt-4 bg-white border rounded p-2';
    volumeDiv.innerHTML = `
      <div class="flex items-center space-x-2 mb-2">
        <svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
        <span class="text-sm font-medium text-gray-700">Volume</span>
      </div>
    `;
    
    const volumeChart = document.createElement('div');
    volumeChart.className = 'flex items-end space-x-1 h-16';
    
    const maxVolume = Math.max(...data?.map(d => d?.volume));
    const displayCount = Math.min(50, data?.length);
    const recentData = data?.slice(-displayCount);
    
    recentData?.forEach((d, i) => {
      const bar = document.createElement('div');
      bar.className = `bg-blue-200 hover:bg-blue-300 flex-1 min-w-0 transition-colors cursor-pointer`;
      bar.style.height = `${(d?.volume / maxVolume) * 64}px`;
      bar.title = `Volume: ${(d?.volume / 1000000)?.toFixed(1)}M`;
      volumeChart?.appendChild(bar);
    });
    
    volumeDiv?.appendChild(volumeChart);
    container?.appendChild(volumeDiv);
  };

  const formatTimeLabel = (time, timeframe) => {
    const date = new Date(time);
    switch (timeframe) {
      case '1D':
        return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      case '1W':
        return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1M': case'3M':
        return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1Y':
        return date?.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      default:
        return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];
  const chartTypes = ['candlestick', 'line', 'area'];
  const availableIndicators = ['RSI', 'MACD', 'Bollinger Bands', 'SMA20', 'SMA50'];

  return (
    <div className={`bg-white rounded-lg shadow ${isFullscreen ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
      {/* Chart Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {symbol} Interactive Chart
            </h3>
            
            {/* Timeframe Selection */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {timeframes?.map((tf) => (
                <button
                  key={tf}
                  onClick={() => onTimeframeChange?.(tf)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeframe === tf
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Chart Type */}
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-gray-600" />
              <select
                value={chartType}
                onChange={(e) => setChartType(e?.target?.value)}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                {chartTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Technical Indicators */}
        <div className="flex items-center space-x-2 mt-4">
          <Activity className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-600 mr-2">Indicators:</span>
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
                    ? 'bg-blue-100 text-blue-700' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {indicator}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart Container */}
      <div className="p-4">
        <div 
          ref={chartRef} 
          className={`w-full ${isFullscreen ? 'h-96' : 'h-80'} border rounded bg-gray-50 flex items-center justify-center`}
        >
          <div className="text-center">
            <Activity className="h-12 w-12 text-gray-300 animate-pulse mx-auto mb-2" />
            <p className="text-gray-500">Loading advanced chart...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveChart;