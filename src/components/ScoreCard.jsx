import React from 'react';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, Zap } from 'lucide-react';

const ScoreCard = ({ score, issueCount, url, totalElements, testedElements }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return 'Excellent accessibility! 🎉';
    if (score >= 80) return 'Good accessibility with minor issues';
    if (score >= 60) return 'Moderate accessibility - needs improvement';
    return 'Poor accessibility - requires immediate attention';
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const coveragePercentage = totalElements > 0 ? Math.round((testedElements / totalElements) * 100) : 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Accessibility Score</h3>
          <p className="text-gray-600 text-sm break-all mb-2">{url}</p>
          <p className="text-sm text-gray-500">{getScoreMessage(score)}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getScoreIcon(score)}
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color ${getScoreGradient(score).split(' ')[0].replace('from-', '')}`} />
                <stop offset="100%" className={`stop-color ${getScoreGradient(score).split(' ')[1].replace('to-', '')}`} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
              <div className="text-gray-500 text-sm font-medium">out of 100</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Issues Found</span>
              <span className="text-2xl font-bold text-red-600">{issueCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min((issueCount / 20) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Test Coverage</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{coveragePercentage}%</span>
            </div>
            <div className="text-sm text-gray-600">
              {testedElements} of {totalElements} elements analyzed
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{Math.max(0, 100 - issueCount)}</div>
              <div className="text-xs text-green-700">Passed</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">{Math.min(issueCount, 5)}</div>
              <div className="text-xs text-yellow-700">Warnings</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{Math.max(0, issueCount - 5)}</div>
              <div className="text-xs text-red-700">Errors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Powered by axe-core accessibility engine</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;