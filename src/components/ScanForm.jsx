import React, { useState } from 'react';
import { Search, Globe, Loader, Zap, AlertCircle } from 'lucide-react';

const ScanForm = ({ onScan, isScanning, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url.trim());
    }
  };

  const sampleUrls = [
    'https://www.bbc.com',
    'https://www.github.com',
    'https://www.wikipedia.org'
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Scan Your Website for Accessibility Issues
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get instant feedback on accessibility violations and actionable suggestions 
            to improve your website's compliance with WCAG 2.1 AA standards.
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="block w-full pl-14 pr-32 py-5 text-lg border-0 rounded-2xl shadow-xl bg-white focus:ring-4 focus:ring-blue-500/20 focus:shadow-2xl transition-all duration-300 placeholder-gray-400"
              required
              disabled={isScanning}
            />
            <button
              type="submit"
              disabled={isScanning || !url.trim()}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200">
                {isScanning ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Scanning...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Scan Now</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Try these sample URLs:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleUrls.map((sampleUrl) => (
              <button
                key={sampleUrl}
                onClick={() => setUrl(sampleUrl)}
                className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                disabled={isScanning}
              >
                {sampleUrl.replace('https://www.', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What We Scan For:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Missing alt text on images</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Color contrast issues</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Form labeling problems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Heading structure violations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>ARIA implementation issues</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Keyboard navigation barriers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanForm;