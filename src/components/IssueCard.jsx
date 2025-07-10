import React from 'react';
import { AlertTriangle, Info, Zap, ChevronRight } from 'lucide-react';

const IssueCard = ({ issue }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'serious': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'moderate': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'serious': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'moderate': return <Info className="w-5 h-5 text-yellow-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getSeverityIcon(issue.severity)}
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{issue.title}</h4>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{issue.count}</div>
          <div className="text-sm text-gray-500">instances</div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{issue.description}</p>

      <div className="space-y-3">
        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Quick Fix</h5>
            <p className="text-sm text-blue-800">{issue.suggestion}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">WCAG: {issue.wcagLevel}</span>
            <span className="text-gray-500">Impact: {issue.impact}</span>
          </div>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <span>Learn More</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;