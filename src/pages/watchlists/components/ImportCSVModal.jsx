import React, { useState, useCallback } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';

const ImportCSVModal = ({ onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    const files = e?.dataTransfer?.files;
    if (files && files?.[0]) {
      handleFile(files?.[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    if (files && files?.[0]) {
      handleFile(files?.[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile?.name?.endsWith('.csv')) {
      setErrors(['Please select a CSV file']);
      return;
    }

    setFile(selectedFile);
    setErrors([]);
    parseCSV(selectedFile);
  };

  const parseCSV = (file) => {
    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csv = e?.target?.result;
        const lines = csv?.split('\n');
        const headers = lines?.[0]?.split(',')?.map(h => h?.trim()?.toLowerCase());
        
        // Validate headers
        const requiredHeaders = ['symbol'];
        const missingHeaders = requiredHeaders?.filter(h => !headers?.includes(h));
        
        if (missingHeaders?.length > 0) {
          setErrors([`Missing required columns: ${missingHeaders?.join(', ')}`]);
          setIsProcessing(false);
          return;
        }

        const data = [];
        const parseErrors = [];

        for (let i = 1; i < lines?.length; i++) {
          const line = lines?.[i]?.trim();
          if (!line) continue;

          const values = line?.split(',')?.map(v => v?.trim());
          
          if (values?.length !== headers?.length) {
            parseErrors?.push(`Row ${i + 1}: Column count mismatch`);
            continue;
          }

          const rowData = {};
          headers?.forEach((header, index) => {
            rowData[header] = values?.[index];
          });

          if (!rowData?.symbol) {
            parseErrors?.push(`Row ${i + 1}: Missing symbol`);
            continue;
          }

          data?.push(rowData);
        }

        if (parseErrors?.length > 0) {
          setErrors(parseErrors);
        }

        setCsvData(data);
        setIsProcessing(false);
      } catch (error) {
        setErrors(['Error parsing CSV file']);
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setErrors(['Error reading file']);
      setIsProcessing(false);
    };

    reader?.readAsText(file);
  };

  const handleImport = () => {
    if (csvData && csvData?.length > 0) {
      onImport(csvData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Import Stocks from CSV</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Upload a CSV file with stock data. Required column: <strong>symbol</strong>
          </p>
          <p className="text-sm text-gray-500">
            Optional columns: name, price
          </p>
        </div>

        {/* File Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive
              ? 'border-blue-400 bg-blue-50' :'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your CSV file here, or</p>
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
            Browse Files
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-4 flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{file?.name}</p>
              <p className="text-sm text-gray-500">
                {(file?.size / 1024)?.toFixed(1)} KB
              </p>
            </div>
            {isProcessing && (
              <div className="text-sm text-blue-600">Processing...</div>
            )}
          </div>
        )}

        {/* Errors */}
        {errors?.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <h4 className="text-sm font-medium text-red-900">Import Errors</h4>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {errors?.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview */}
        {csvData && csvData?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Preview ({csvData?.length} stocks)
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {csvData?.slice(0, 5)?.map((row, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{row?.symbol}</span>
                    {row?.name && <span className="text-gray-600 ml-2">{row?.name}</span>}
                    {row?.price && <span className="text-gray-600 ml-2">${row?.price}</span>}
                  </div>
                ))}
                {csvData?.length > 5 && (
                  <div className="text-sm text-gray-500">
                    ... and {csvData?.length - 5} more stocks
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sample Format */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Sample CSV Format</h4>
          <div className="text-sm text-blue-800 font-mono bg-white p-2 rounded">
            symbol,name,price<br />
            AAPL,Apple Inc.,150.00<br />
            MSFT,Microsoft Corporation,300.00<br />
            GOOGL,Alphabet Inc.,2500.00
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!csvData || csvData?.length === 0 || isProcessing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import {csvData ? `(${csvData?.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCSVModal;