import React, { useState } from 'react';
import { ShoppingCart, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';

const TradingInterface = ({ symbol, currentPrice, onOrderSubmit }) => {
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice?.toFixed(2) || '');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [timeInForce, setTimeInForce] = useState('DAY');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [orders] = useState([
    {
      id: 1,
      symbol: 'AAPL',
      side: 'buy',
      quantity: 100,
      type: 'limit',
      price: 180.50,
      status: 'pending',
      timestamp: '2025-12-17 09:30:00'
    },
    {
      id: 2,
      symbol: 'MSFT',
      side: 'sell',
      quantity: 50,
      type: 'stop',
      price: 380.00,
      status: 'filled',
      timestamp: '2025-12-17 10:15:00'
    }
  ]);

  const [positions] = useState([
    {
      symbol: 'AAPL',
      quantity: 200,
      avgPrice: 175.30,
      currentPrice: 182.52,
      unrealizedPL: 1444.00,
      unrealizedPLPercent: 4.12
    },
    {
      symbol: 'GOOGL',
      quantity: 50,
      avgPrice: 135.80,
      currentPrice: 138.21,
      unrealizedPL: 120.50,
      unrealizedPLPercent: 1.77
    }
  ]);

  const calculateOrderValue = () => {
    const qty = parseFloat(quantity) || 0;
    const orderPrice = orderType === 'market' ? currentPrice : parseFloat(price) || 0;
    return qty * orderPrice;
  };

  const handleSubmitOrder = () => {
    const orderData = {
      symbol,
      side,
      quantity: parseFloat(quantity),
      type: orderType,
      price: orderType === 'market' ? null : parseFloat(price),
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      timeInForce,
      value: calculateOrderValue()
    };

    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    onOrderSubmit?.({
      symbol,
      side,
      quantity: parseFloat(quantity),
      type: orderType,
      price: orderType === 'market' ? currentPrice : parseFloat(price),
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      timeInForce
    });
    
    setShowConfirmation(false);
    // Reset form
    setQuantity('');
    setStopLoss('');
    setTakeProfit('');
  };

  return (
    <div className="space-y-6">
      {/* Order Entry */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Place Order - {symbol}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Order Details */}
          <div className="space-y-4">
            {/* Side Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Side
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSide('buy')}
                  className={`p-3 rounded-lg font-medium ${
                    side === 'buy' ?'bg-green-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide('sell')}
                  className={`p-3 rounded-lg font-medium ${
                    side === 'sell' ?'bg-red-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Type
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="market">Market</option>
                <option value="limit">Limit</option>
                <option value="stop">Stop</option>
                <option value="stop_limit">Stop Limit</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Shares)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>

            {/* Price (for non-market orders) */}
            {orderType !== 'market' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {orderType === 'limit' ? 'Limit Price' : 'Stop Price'} ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e?.target?.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                />
              </div>
            )}
          </div>

          {/* Right Column - Advanced Options */}
          <div className="space-y-4">
            {/* Time in Force */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Time in Force
              </label>
              <select
                value={timeInForce}
                onChange={(e) => setTimeInForce(e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DAY">Day</option>
                <option value="GTC">Good Till Canceled</option>
                <option value="IOC">Immediate or Cancel</option>
                <option value="FOK">Fill or Kill</option>
              </select>
            </div>

            {/* Stop Loss */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Loss ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            {/* Take Profit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Take Profit ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e?.target?.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            {/* Order Value */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">Estimated Order Value</div>
              <div className="text-xl font-bold text-gray-900">
                ${calculateOrderValue()?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmitOrder}
            disabled={!quantity || (orderType !== 'market' && !price)}
            className={`px-6 py-3 rounded-lg font-medium ${
              side === 'buy' ?'bg-green-600 hover:bg-green-700 text-white' :'bg-red-600 hover:bg-red-700 text-white'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} {symbol}
          </button>
        </div>
      </div>
      {/* Current Positions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Current Positions</h3>
        </div>
        <div className="p-6">
          {positions?.length > 0 ? (
            <div className="space-y-3">
              {positions?.map((position, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium text-lg">{position?.symbol}</div>
                    <div className="text-sm text-gray-600">
                      {position?.quantity} shares @ ${position?.avgPrice?.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${position?.currentPrice?.toFixed(2)}</div>
                    <div className={`text-sm ${
                      position?.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position?.unrealizedPL >= 0 ? '+' : ''}${position?.unrealizedPL?.toFixed(2)}
                      ({position?.unrealizedPL >= 0 ? '+' : ''}{position?.unrealizedPLPercent?.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No open positions
            </div>
          )}
        </div>
      </div>
      {/* Active Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Active Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Symbol</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Side</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Time</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders?.map((order) => (
                <tr key={order?.id}>
                  <td className="px-6 py-4 text-sm font-medium">{order?.symbol}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      order?.side === 'buy' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                    }`}>
                      {order?.side?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{order?.quantity}</td>
                  <td className="px-6 py-4 text-sm capitalize">{order?.type}</td>
                  <td className="px-6 py-4 text-sm">${order?.price?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`flex items-center px-2 py-1 text-xs font-medium rounded ${
                      order?.status === 'filled' ?'bg-green-100 text-green-800'
                        : order?.status === 'pending' ?'bg-yellow-100 text-yellow-800' :'bg-red-100 text-red-800'
                    }`}>
                      {order?.status === 'filled' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {order?.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {order?.status === 'cancelled' && <X className="h-3 w-3 mr-1" />}
                      {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order?.timestamp}</td>
                  <td className="px-6 py-4 text-sm">
                    {order?.status === 'pending' && (
                      <button className="text-red-600 hover:text-red-800">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                Confirm Order
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-medium">{symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Side:</span>
                  <span className={`font-medium ${
                    side === 'buy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {side?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{quantity} shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <span className="font-medium capitalize">{orderType}</span>
                </div>
                {orderType !== 'market' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${price}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Estimated Value:</span>
                  <span className="font-bold">${calculateOrderValue()?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className={`px-4 py-2 rounded-lg text-white ${
                    side === 'buy' ?'bg-green-600 hover:bg-green-700' :'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInterface;