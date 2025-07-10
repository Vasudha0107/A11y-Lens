// Simulated accessibility scanner - In production, this would call a real accessibility API
export const scanWebsite = async (url) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock scan results based on different URLs
  const mockResults = {
    'https://www.bbc.com': {
      url,
      score: 85,
      issues: [
        {
          title: 'Missing Alt Text',
          description: 'Images without alternative text make content inaccessible to screen reader users.',
          category: 'images',
          severity: 'serious',
          count: 3,
          wcagLevel: '2.1 AA',
          impact: 'High',
          suggestion: 'Add descriptive alt attributes to all informative images.'
        },
        {
          title: 'Low Color Contrast',
          description: 'Text elements have insufficient contrast ratios, making them difficult to read.',
          category: 'color',
          severity: 'moderate',
          count: 2,
          wcagLevel: '2.1 AA',
          impact: 'Medium',
          suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text.'
        }
      ]
    },
    'https://www.github.com': {
      url,
      score: 92,
      issues: [
        {
          title: 'Missing Form Labels',
          description: 'Form inputs lack proper labels, making them inaccessible to assistive technologies.',
          category: 'forms',
          severity: 'serious',
          count: 1,
          wcagLevel: '2.1 AA',
          impact: 'High',
          suggestion: 'Associate labels with form controls using the "for" attribute.'
        }
      ]
    },
    'https://www.wikipedia.org': {
      url,
      score: 78,
      issues: [
        {
          title: 'Improper Heading Structure',
          description: 'Heading levels skip from H1 to H3, disrupting the logical document outline.',
          category: 'text',
          severity: 'moderate',
          count: 4,
          wcagLevel: '2.1 AA',
          impact: 'Medium',
          suggestion: 'Use heading levels sequentially (H1, H2, H3) to create a logical hierarchy.'
        },
        {
          title: 'Missing ARIA Labels',
          description: 'Interactive elements lack ARIA labels for screen reader accessibility.',
          category: 'aria',
          severity: 'serious',
          count: 6,
          wcagLevel: '2.1 AA',
          impact: 'High',
          suggestion: 'Add aria-label or aria-labelledby attributes to interactive elements.'
        },
        {
          title: 'Keyboard Navigation Issues',
          description: 'Some interactive elements are not accessible via keyboard navigation.',
          category: 'forms',
          severity: 'critical',
          count: 2,
          wcagLevel: '2.1 AA',
          impact: 'High',
          suggestion: 'Ensure all interactive elements can be reached and activated using keyboard.'
        }
      ]
    }
  };

  // Generate result based on URL or create a generic result
  const result = mockResults[url] || {
    url,
    score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
    issues: [
      {
        title: 'Missing Alt Text',
        description: 'Images without alternative text make content inaccessible to screen reader users.',
        category: 'images',
        severity: 'serious',
        count: Math.floor(Math.random() * 5) + 1,
        wcagLevel: '2.1 AA',
        impact: 'High',
        suggestion: 'Add descriptive alt attributes to all informative images.'
      },
      {
        title: 'Low Color Contrast',
        description: 'Text elements have insufficient contrast ratios, making them difficult to read.',
        category: 'color',
        severity: 'moderate',
        count: Math.floor(Math.random() * 3) + 1,
        wcagLevel: '2.1 AA',
        impact: 'Medium',
        suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text.'
      },
      {
        title: 'Missing Form Labels',
        description: 'Form inputs lack proper labels, making them inaccessible to assistive technologies.',
        category: 'forms',
        severity: 'critical',
        count: Math.floor(Math.random() * 2) + 1,
        wcagLevel: '2.1 AA',
        impact: 'High',
        suggestion: 'Associate labels with form controls using the "for" attribute.'
      },
      {
        title: 'Improper Heading Structure',
        description: 'Heading levels skip levels, disrupting the logical document outline.',
        category: 'text',
        severity: 'moderate',
        count: Math.floor(Math.random() * 4) + 1,
        wcagLevel: '2.1 AA',
        impact: 'Medium',
        suggestion: 'Use heading levels sequentially to create a logical hierarchy.'
      }
    ]
  };

  return result;
};