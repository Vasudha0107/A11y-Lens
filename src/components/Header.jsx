import React from 'react';
import { Eye, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                A11y Lens
              </h1>
              <p className="text-sm text-gray-500 font-medium">Accessibility Scanner</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;