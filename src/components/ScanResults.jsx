import React, { useState } from 'react';
import { Download, RefreshCw, Share2, Clock, Globe } from 'lucide-react';
import ScoreCard from './ScoreCard';
import CategoryFilter from './CategoryFilter';
import EnhancedIssueCard from './EnhancedIssueCard';

const ScanResults = ({ results, onNewScan }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!results) return null;

  const filteredIssues = selectedCategory === 'all' 
    ? results.issues 
    : results.issues.filter(issue => issue.category === selectedCategory);

  const categoryCounts = results.issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {});

  const handleExport = () => {
    const reportData = {
      url: results.url,
      score: results.score,
      scanTime: results.scanTime,
      totalElements: results.totalElements,
      testedElements: results.testedElements,
      totalIssues: results.issues.length,
      issues: results.issues.map(issue => ({
        ...issue,
        // Remove elements array from export to reduce file size
        elementCount: issue.elements ? issue.elements.length : 0
      }))
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accessibility-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatScanTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Scan Results</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{results.testedElements} elements tested</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatScanTime(results.scanTime)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={onNewScan}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      <ScoreCard 
        score={results.score} 
        issueCount={results.issues.length} 
        url={results.url}
        totalElements={results.totalElements}
        testedElements={results.testedElements}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <div className="space-y-6">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No issues found in this category</div>
            {selectedCategory === 'all' && (
              <div className="text-green-600 text-sm mt-2">🎉 This website has excellent accessibility!</div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'all' ? 'All Issues' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Issues`}
                <span className="ml-2 text-gray-500">({filteredIssues.length})</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIssues.map((issue, index) => (
                <EnhancedIssueCard key={`${issue.id}-${index}`} issue={issue} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanResults;