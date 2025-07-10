import React from 'react';
import { Image, Type, MousePointer, Palette, Users, Globe } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, categoryCounts }) => {
  const categories = [
    { id: 'all', name: 'All Issues', icon: Globe },
    { id: 'images', name: 'Images', icon: Image },
    { id: 'text', name: 'Text & Headings', icon: Type },
    { id: 'forms', name: 'Forms', icon: MousePointer },
    { id: 'color', name: 'Color & Contrast', icon: Palette },
    { id: 'aria', name: 'ARIA & Semantics', icon: Users }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = categoryCounts[category.id] || 0;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
              <div className="text-sm font-medium text-center">
                <div>{category.name}</div>
                {category.id !== 'all' && (
                  <div className={`text-xs mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                    {count} issues
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;