import React, { useState } from 'react';
import Header from './components/Header';
import ScanForm from './components/ScanForm';
import ScanResults from './components/ScanResults';
import { scanWebsite } from './utils/realAccessibilityScanner';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (url) => {
    setIsScanning(true);
    setScanResults(null);
    setError(null);
    
    try {
      const results = await scanWebsite(url);
      setScanResults(results);
    } catch (error) {
      console.error('Scan failed:', error);
      setError('Failed to scan website. Please check the URL and try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleNewScan = () => {
    setScanResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!scanResults && !isScanning && (
        <ScanForm onScan={handleScan} isScanning={isScanning} error={error} />
      )}
      
      {isScanning && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Scanning Website...</h3>
            <p className="text-gray-600 mb-2">Analyzing accessibility issues and WCAG compliance</p>
            <div className="text-sm text-gray-500">
              <div className="mb-1">✓ Loading page content</div>
              <div className="mb-1">✓ Running axe-core analysis</div>
              <div className="mb-1">⏳ Processing results...</div>
            </div>
          </div>
        </div>
      )}
      
      {scanResults && (
        <ScanResults results={scanResults} onNewScan={handleNewScan} />
      )}
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 A11y Lens. Built with accessibility in mind.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;