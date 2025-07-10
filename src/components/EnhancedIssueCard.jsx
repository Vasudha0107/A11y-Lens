import React, { useState } from 'react';
import { AlertTriangle, Info, Zap, ChevronRight, ChevronDown, Code, ExternalLink } from 'lucide-react';

const EnhancedIssueCard = ({ issue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="flex items-center space-x-2">
            {issue.helpUrl && (
              <a
                href={issue.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Learn More</span>
              </a>
            )}
            {issue.elements && issue.elements.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 font-medium transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>View Elements</span>
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {isExpanded && issue.elements && (
          <div className="mt-4 space-y-3">
            <h6 className="font-medium text-gray-900">Affected Elements:</h6>
            {issue.elements.slice(0, 5).map((element, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm font-mono text-gray-700 mb-2">
                  Selector: <span className="text-blue-600">{element.target}</span>
                </div>
                <div className="bg-white rounded border p-2">
                  <code className="text-xs text-gray-800 break-all">{element.html}</code>
                </div>
                {element.failureSummary && (
                  <div className="mt-2 text-sm text-red-600">
                    <strong>Issue:</strong> {element.failureSummary}
                  </div>
                )}
              </div>
            ))}
            {issue.elements.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                ... and {issue.elements.length - 5} more elements
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedIssueCard;