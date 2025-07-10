// Browser extension specific scanner using axe-core directly
import axe from 'axe-core';

export const scanCurrentPage = async () => {
  try {
    // Configure axe-core for comprehensive scanning
    const config = {
      rules: {
        // Enable all WCAG 2.1 AA rules
        'color-contrast': { enabled: true },
        'image-alt': { enabled: true },
        'label': { enabled: true },
        'heading-order': { enabled: true },
        'aria-label': { enabled: true },
        'keyboard': { enabled: true },
        'focus-order-semantics': { enabled: true },
        'landmark-one-main': { enabled: true },
        'page-has-heading-one': { enabled: true },
        'region': { enabled: true }
      },
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
    };

    // Run axe-core analysis on current page
    const results = await axe.run(document, config);
    
    // Transform axe results to our format
    return transformAxeResults(results);
  } catch (error) {
    console.error('Browser extension scan failed:', error);
    throw error;
  }
};

const transformAxeResults = (axeResults) => {
  const issues = [];
  
  // Process violations
  axeResults.violations.forEach(violation => {
    const issue = {
      id: violation.id,
      title: violation.help,
      description: violation.description,
      category: categorizeIssue(violation.id),
      severity: mapSeverity(violation.impact),
      count: violation.nodes.length,
      wcagLevel: getWcagLevel(violation.tags),
      impact: violation.impact,
      suggestion: generateSuggestion(violation.id),
      helpUrl: violation.helpUrl,
      elements: violation.nodes.map(node => ({
        target: node.target[0],
        html: node.html,
        failureSummary: node.failureSummary
      }))
    };
    issues.push(issue);
  });

  // Calculate score based on issues
  const score = calculateAccessibilityScore(axeResults);

  return {
    url: window.location.href,
    score,
    scanTime: new Date().toISOString(),
    totalElements: document.querySelectorAll('*').length,
    testedElements: axeResults.passes.length + axeResults.violations.length + axeResults.incomplete.length,
    issues,
    axeResults // Include raw results for debugging
  };
};

const categorizeIssue = (ruleId) => {
  const categoryMap = {
    'image-alt': 'images',
    'input-image-alt': 'images',
    'area-alt': 'images',
    'color-contrast': 'color',
    'color-contrast-enhanced': 'color',
    'label': 'forms',
    'label-title-only': 'forms',
    'form-field-multiple-labels': 'forms',
    'heading-order': 'text',
    'empty-heading': 'text',
    'p-as-heading': 'text',
    'aria-label': 'aria',
    'aria-labelledby': 'aria',
    'aria-describedby': 'aria',
    'button-name': 'aria',
    'link-name': 'aria'
  };
  
  return categoryMap[ruleId] || 'aria';
};

const mapSeverity = (impact) => {
  const severityMap = {
    'critical': 'critical',
    'serious': 'serious',
    'moderate': 'moderate',
    'minor': 'minor'
  };
  
  return severityMap[impact] || 'moderate';
};

const getWcagLevel = (tags) => {
  if (tags.includes('wcag21aa')) return '2.1 AA';
  if (tags.includes('wcag2aa')) return '2.0 AA';
  if (tags.includes('wcag21a')) return '2.1 A';
  if (tags.includes('wcag2a')) return '2.0 A';
  return '2.1 AA';
};

const generateSuggestion = (ruleId) => {
  const suggestions = {
    'image-alt': 'Add descriptive alt attributes to all informative images. Use alt="" for decorative images.',
    'color-contrast': 'Increase contrast ratio to at least 4.5:1 for normal text and 3:1 for large text.',
    'label': 'Associate labels with form controls using the "for" attribute or wrap inputs in label elements.',
    'heading-order': 'Use heading levels sequentially (H1, H2, H3) to create a logical hierarchy.',
    'aria-label': 'Add aria-label or aria-labelledby attributes to interactive elements without visible text.',
    'button-name': 'Ensure all buttons have accessible names through text content, aria-label, or aria-labelledby.',
    'link-name': 'Provide descriptive text for links, either as content or through aria-label.',
    'keyboard': 'Ensure all interactive elements can be reached and activated using keyboard only.'
  };
  
  return suggestions[ruleId] || 'Review this element for accessibility compliance.';
};

const calculateAccessibilityScore = (axeResults) => {
  const totalTests = axeResults.passes.length + axeResults.violations.length;
  const passedTests = axeResults.passes.length;
  
  if (totalTests === 0) return 100;
  
  // Base score from pass rate
  let score = Math.round((passedTests / totalTests) * 100);
  
  // Penalize based on violation severity
  axeResults.violations.forEach(violation => {
    const penalty = {
      'critical': 15,
      'serious': 10,
      'moderate': 5,
      'minor': 2
    }[violation.impact] || 5;
    
    score -= penalty * violation.nodes.length;
  });
  
  return Math.max(0, Math.min(100, score));
};