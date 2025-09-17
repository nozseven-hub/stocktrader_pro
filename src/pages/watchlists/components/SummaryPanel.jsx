import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, AlertCircle, Activity } from 'lucide-react';

const SummaryPanel = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const cards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(data?.totalValue),
      change: data?.dailyPLPercent,
      changeText: `${data?.dailyPL >= 0 ? '+' : ''}${formatCurrency(data?.dailyPL)} today`,
      icon: BarChart3,
      color: data?.dailyPL >= 0 ? 'green' : 'red'
    },
    {
      title: 'Total Stocks',
      value: data?.totalStocks?.toString(),
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Active Alerts',
      value: data?.activeAlerts?.toString(),
      icon: AlertCircle,
      color: 'orange'
    },
    {
      title: 'Top Gainer',
      value: data?.topGainer ? data?.topGainer?.symbol : 'N/A',
      changeText: data?.topGainer ? `+${data?.topGainer?.changePercent?.toFixed(2)}%` : '',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Top Loser',
      value: data?.topLoser ? data?.topLoser?.symbol : 'N/A',
      changeText: data?.topLoser ? `${data?.topLoser?.changePercent?.toFixed(2)}%` : '',
      icon: TrendingDown,
      color: 'red'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{card?.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card?.value}</p>
              {card?.changeText && (
                <p className={`text-sm font-medium mt-1 ${
                  card?.change !== undefined 
                    ? (card?.change >= 0 ? 'text-green-600' : 'text-red-600')
                    : 'text-gray-600'
                }`}>
                  {card?.changeText}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(card?.color)}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryPanel;