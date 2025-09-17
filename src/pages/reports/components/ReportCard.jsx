import React from 'react';
import { Calendar, Download, Eye, Share, FileText, TrendingUp, TrendingDown } from 'lucide-react';

const ReportCard = ({ report, onPreview, onDownload }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-green-100 text-green-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{report?.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(report?.type)}`}>
              {report?.type?.charAt(0)?.toUpperCase() + report?.type?.slice(1)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            {report?.date}
            <span className="mx-2">•</span>
            <span>{report?.segment}</span>
          </div>
          <p className="text-gray-700 mb-3">{report?.findings}</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-gray-600">Coverage: {report?.coverage?.join(', ')}</span>
            </div>
            <div className="flex items-center">
              {report?.accuracy >= 80 ? (
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1 text-orange-600" />
              )}
              <span className={`font-medium ${
                report?.accuracy >= 80 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {report?.accuracy}% accuracy
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onPreview(report)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </button>
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
              <Download className="h-4 w-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {report?.downloadFormats?.map((format) => (
                <button
                  key={format}
                  onClick={() => onDownload(report, format)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          <button
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
            title="Share"
          >
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;