import React from 'react';
import { X, Download, Share, FileText, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const ReportPreview = ({ report, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">{report?.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDownload(report, 'PDF')}
              className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Share className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {report?.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                {report?.type?.charAt(0)?.toUpperCase() + report?.type?.slice(1)} Report
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                {report?.segment}
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              <span className="text-sm font-medium text-green-600">{report?.accuracy}% Accuracy</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">Executive Summary</h4>
            <p className="text-gray-700 mb-4">{report?.findings}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{report?.coverage?.length}</div>
                <div className="text-sm text-gray-600">Stocks Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.floor(report?.coverage?.length * 0.6)}
                </div>
                <div className="text-sm text-gray-600">Bullish Signals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {Math.floor(report?.coverage?.length * 0.2)}
                </div>
                <div className="text-sm text-gray-600">Bearish Signals</div>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Key Findings</h4>
            <div className="space-y-4">
              {report?.coverage?.map((symbol, index) => {
                const signals = ['Bullish', 'Bearish', 'Neutral'];
                const signal = signals?.[index % signals?.length];
                const patterns = ['Bull Flag', 'Head & Shoulders', 'Triangle', 'Breakout', 'Support'];
                const pattern = patterns?.[index % patterns?.length];
                const price = (Math.random() * 200 + 50)?.toFixed(2);
                const change = ((Math.random() - 0.5) * 10)?.toFixed(2);
                
                return (
                  <div key={symbol} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium text-lg">{symbol}</div>
                      <div className="text-sm text-gray-600">{pattern}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">${price}</div>
                        <div className={`text-sm ${
                          parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {parseFloat(change) >= 0 ? '+' : ''}{change}%
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        signal === 'Bullish' ? 'bg-green-100 text-green-800' :
                        signal === 'Bearish'? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {signal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recommendations</h4>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-2">Top Recommendations:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Consider increasing position in {report?.coverage?.[0]} based on strong bullish signals</li>
                  <li>• Monitor {report?.coverage?.[1]} for potential breakout confirmation</li>
                  <li>• Exercise caution with {report?.coverage?.[2]} due to mixed technical indicators</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Risk Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">Low</div>
                <div className="text-sm text-gray-600">Market Risk</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">Medium</div>
                <div className="text-sm text-gray-600">Volatility Risk</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">High</div>
                <div className="text-sm text-gray-600">Opportunity Potential</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
          <div className="flex space-x-2">
            {report?.downloadFormats?.map((format) => (
              <button
                key={format}
                onClick={() => onDownload(report, format)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;