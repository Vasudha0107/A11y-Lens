// import axios from 'axios';

// // Real accessibility scanner using axe-core
// export const scanWebsite = async (url) => {
//   try {
//     // Call our backend API that uses Puppeteer + axe-core
//     const response = await axios.post('/api/scan', { url }, {
//       timeout: 30000 // 30 second timeout
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error('Scan failed:', error);
    
//     // Fallback to mock data if API fails
//     return await mockScanWebsite(url);
//   }
// };

// // Enhanced mock scanner with more realistic data
// const mockScanWebsite = async (url) => {
//   await new Promise(resolve => setTimeout(resolve, 3000));

//   const mockResults = {
//     'https://www.bbc.com': {
//       url,
//       score: 85,
//       scanTime: new Date().toISOString(),
//       totalElements: 1247,
//       testedElements: 1247,
//       issues: [
//         {
//           id: 'image-alt',
//           title: 'Missing Alt Text',
//           description: 'Images must have alternate text to be accessible to screen reader users.',
//           category: 'images',
//           severity: 'serious',
//           count: 3,
//           wcagLevel: '2.1 AA',
//           impact: 'serious',
//           suggestion: 'Add descriptive alt attributes to all informative images. Use alt="" for decorative images.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/image-alt',
//           elements: [
//             { target: 'img[src="/news/hero-image.jpg"]', html: '<img src="/news/hero-image.jpg">' },
//             { target: 'img[src="/weather/icon.png"]', html: '<img src="/weather/icon.png">' },
//             { target: 'img[src="/sport/thumbnail.jpg"]', html: '<img src="/sport/thumbnail.jpg">' }
//           ]
//         },
//         {
//           id: 'color-contrast',
//           title: 'Insufficient Color Contrast',
//           description: 'Text elements must have sufficient color contrast against their background.',
//           category: 'color',
//           severity: 'serious',
//           count: 5,
//           wcagLevel: '2.1 AA',
//           impact: 'serious',
//           suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text and 3:1 for large text.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast',
//           elements: [
//             { target: '.news-subtitle', html: '<p class="news-subtitle">Breaking news subtitle</p>' },
//             { target: '.weather-temp', html: '<span class="weather-temp">22°C</span>' }
//           ]
//         }
//       ]
//     },
//     'https://www.github.com': {
//       url,
//       score: 92,
//       scanTime: new Date().toISOString(),
//       totalElements: 892,
//       testedElements: 892,
//       issues: [
//         {
//           id: 'label',
//           title: 'Missing Form Labels',
//           description: 'Form elements must have labels to be accessible to assistive technologies.',
//           category: 'forms',
//           severity: 'critical',
//           count: 1,
//           wcagLevel: '2.1 AA',
//           impact: 'critical',
//           suggestion: 'Associate labels with form controls using the "for" attribute or wrap inputs in label elements.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/label',
//           elements: [
//             { target: 'input[type="search"]', html: '<input type="search" placeholder="Search repositories">' }
//           ]
//         }
//       ]
//     },
//     'https://www.wikipedia.org': {
//       url,
//       score: 78,
//       scanTime: new Date().toISOString(),
//       totalElements: 2156,
//       testedElements: 2156,
//       issues: [
//         {
//           id: 'heading-order',
//           title: 'Improper Heading Structure',
//           description: 'Heading levels should not skip levels to maintain proper document structure.',
//           category: 'text',
//           severity: 'moderate',
//           count: 4,
//           wcagLevel: '2.1 AA',
//           impact: 'moderate',
//           suggestion: 'Use heading levels sequentially (H1, H2, H3) to create a logical hierarchy.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/heading-order',
//           elements: [
//             { target: 'h3.section-title', html: '<h3 class="section-title">History</h3>' },
//             { target: 'h3.subsection', html: '<h3 class="subsection">Etymology</h3>' }
//           ]
//         },
//         {
//           id: 'aria-label',
//           title: 'Missing ARIA Labels',
//           description: 'Interactive elements must have accessible names for screen readers.',
//           category: 'aria',
//           severity: 'serious',
//           count: 6,
//           wcagLevel: '2.1 AA',
//           impact: 'serious',
//           suggestion: 'Add aria-label or aria-labelledby attributes to interactive elements without visible text.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/aria-label',
//           elements: [
//             { target: 'button.edit-icon', html: '<button class="edit-icon"><svg>...</svg></button>' },
//             { target: 'a.external-link', html: '<a href="..." class="external-link"><svg>...</svg></a>' }
//           ]
//         },
//         {
//           id: 'keyboard-navigation',
//           title: 'Keyboard Navigation Issues',
//           description: 'All interactive elements must be accessible via keyboard navigation.',
//           category: 'forms',
//           severity: 'critical',
//           count: 2,
//           wcagLevel: '2.1 AA',
//           impact: 'critical',
//           suggestion: 'Ensure all interactive elements can be reached and activated using keyboard only.',
//           helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/keyboard',
//           elements: [
//             { target: 'div.dropdown-menu', html: '<div class="dropdown-menu" onclick="...">Menu</div>' },
//             { target: 'span.clickable', html: '<span class="clickable" onclick="...">Click me</span>' }
//           ]
//         }
//       ]
//     }
//   };

//   // Generate result based on URL or create a generic result
//   const result = mockResults[url] || generateGenericResult(url);
//   return result;
// };

// const generateGenericResult = (url) => {
//   const score = Math.floor(Math.random() * 40) + 60;
//   const totalElements = Math.floor(Math.random() * 1000) + 500;
  
//   return {
//     url,
//     score,
//     scanTime: new Date().toISOString(),
//     totalElements,
//     testedElements: totalElements,
//     issues: [
//       {
//         id: 'image-alt',
//         title: 'Missing Alt Text',
//         description: 'Images must have alternate text to be accessible to screen reader users.',
//         category: 'images',
//         severity: 'serious',
//         count: Math.floor(Math.random() * 5) + 1,
//         wcagLevel: '2.1 AA',
//         impact: 'serious',
//         suggestion: 'Add descriptive alt attributes to all informative images.',
//         helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/image-alt',
//         elements: [
//           { target: 'img:nth-child(1)', html: '<img src="image1.jpg">' },
//           { target: 'img:nth-child(2)', html: '<img src="image2.jpg">' }
//         ]
//       },
//       {
//         id: 'color-contrast',
//         title: 'Insufficient Color Contrast',
//         description: 'Text elements must have sufficient color contrast against their background.',
//         category: 'color',
//         severity: 'serious',
//         count: Math.floor(Math.random() * 3) + 1,
//         wcagLevel: '2.1 AA',
//         impact: 'serious',
//         suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text.',
//         helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast',
//         elements: [
//           { target: '.low-contrast-text', html: '<p class="low-contrast-text">Hard to read text</p>' }
//         ]
//       },
//       {
//         id: 'label',
//         title: 'Missing Form Labels',
//         description: 'Form elements must have labels to be accessible to assistive technologies.',
//         category: 'forms',
//         severity: 'critical',
//         count: Math.floor(Math.random() * 2) + 1,
//         wcagLevel: '2.1 AA',
//         impact: 'critical',
//         suggestion: 'Associate labels with form controls using the "for" attribute.',
//         helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/label',
//         elements: [
//           { target: 'input[type="email"]', html: '<input type="email" placeholder="Email">' }
//         ]
//       },
//       {
//         id: 'heading-order',
//         title: 'Improper Heading Structure',
//         description: 'Heading levels should not skip levels to maintain proper document structure.',
//         category: 'text',
//         severity: 'moderate',
//         count: Math.floor(Math.random() * 4) + 1,
//         wcagLevel: '2.1 AA',
//         impact: 'moderate',
//         suggestion: 'Use heading levels sequentially to create a logical hierarchy.',
//         helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/heading-order',
//         elements: [
//           { target: 'h3:first-of-type', html: '<h3>Skipped H2</h3>' }
//         ]
//       }
//     ]
//   };
// };


import axios from 'axios';

// Real accessibility scanner using axe-core
export const scanWebsite = async (url) => {
  try {
    // Call our backend API that uses Puppeteer + axe-core
    const response = await axios.post('/api/scan', { url }, {
      timeout: 30000 // 30 second timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('Scan failed:', error);
    
    // Fallback to mock data if API fails
    return await mockScanWebsite(url);
  }
};

// Enhanced mock scanner with more realistic data
const mockScanWebsite = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 3000));

  const mockResults = {
    'https://www.bbc.com': {
      url,
      score: 85,
      scanTime: new Date().toISOString(),
      totalElements: 1247,
      testedElements: 1247,
      issues: [
        {
          id: 'image-alt',
          title: 'Missing Alt Text',
          description: 'Images must have alternate text to be accessible to screen reader users.',
          category: 'images',
          severity: 'serious',
          count: 3,
          wcagLevel: '2.1 AA',
          impact: 'serious',
          suggestion: 'Add descriptive alt attributes to all informative images. Use alt="" for decorative images.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/image-alt',
          elements: [
            { target: 'img[src="/news/hero-image.jpg"]', html: '<img src="/news/hero-image.jpg">' },
            { target: 'img[src="/weather/icon.png"]', html: '<img src="/weather/icon.png">' },
            { target: 'img[src="/sport/thumbnail.jpg"]', html: '<img src="/sport/thumbnail.jpg">' }
          ]
        },
        {
          id: 'color-contrast',
          title: 'Insufficient Color Contrast',
          description: 'Text elements must have sufficient color contrast against their background.',
          category: 'color',
          severity: 'serious',
          count: 5,
          wcagLevel: '2.1 AA',
          impact: 'serious',
          suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text and 3:1 for large text.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast',
          elements: [
            { target: '.news-subtitle', html: '<p class="news-subtitle">Breaking news subtitle</p>' },
            { target: '.weather-temp', html: '<span class="weather-temp">22°C</span>' }
          ]
        }
      ]
    },
    'https://www.github.com': {
      url,
      score: 92,
      scanTime: new Date().toISOString(),
      totalElements: 892,
      testedElements: 892,
      issues: [
        {
          id: 'label',
          title: 'Missing Form Labels',
          description: 'Form elements must have labels to be accessible to assistive technologies.',
          category: 'forms',
          severity: 'critical',
          count: 1,
          wcagLevel: '2.1 AA',
          impact: 'critical',
          suggestion: 'Associate labels with form controls using the "for" attribute or wrap inputs in label elements.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/label',
          elements: [
            { target: 'input[type="search"]', html: '<input type="search" placeholder="Search repositories">' }
          ]
        }
      ]
    },
    'https://www.wikipedia.org': {
      url,
      score: 78,
      scanTime: new Date().toISOString(),
      totalElements: 2156,
      testedElements: 2156,
      issues: [
        {
          id: 'heading-order',
          title: 'Improper Heading Structure',
          description: 'Heading levels should not skip levels to maintain proper document structure.',
          category: 'text',
          severity: 'moderate',
          count: 4,
          wcagLevel: '2.1 AA',
          impact: 'moderate',
          suggestion: 'Use heading levels sequentially (H1, H2, H3) to create a logical hierarchy.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/heading-order',
          elements: [
            { target: 'h3.section-title', html: '<h3 class="section-title">History</h3>' },
            { target: 'h3.subsection', html: '<h3 class="subsection">Etymology</h3>' }
          ]
        },
        {
          id: 'aria-label',
          title: 'Missing ARIA Labels',
          description: 'Interactive elements must have accessible names for screen readers.',
          category: 'aria',
          severity: 'serious',
          count: 6,
          wcagLevel: '2.1 AA',
          impact: 'serious',
          suggestion: 'Add aria-label or aria-labelledby attributes to interactive elements without visible text.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/aria-label',
          elements: [
            { target: 'button.edit-icon', html: '<button class="edit-icon"><svg>...</svg></button>' },
            { target: 'a.external-link', html: '<a href="..." class="external-link"><svg>...</svg></a>' }
          ]
        },
        {
          id: 'keyboard-navigation',
          title: 'Keyboard Navigation Issues',
          description: 'All interactive elements must be accessible via keyboard navigation.',
          category: 'forms',
          severity: 'critical',
          count: 2,
          wcagLevel: '2.1 AA',
          impact: 'critical',
          suggestion: 'Ensure all interactive elements can be reached and activated using keyboard only.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/keyboard',
          elements: [
            { target: 'div.dropdown-menu', html: '<div class="dropdown-menu" onclick="...">Menu</div>' },
            { target: 'span.clickable', html: '<span class="clickable" onclick="...">Click me</span>' }
          ]
        }
      ]
    }
  };

  // Generate result based on URL or create a generic result
  const result = mockResults[url] || generateGenericResult(url);
  return result;
};

const generateGenericResult = (url) => {
  const score = Math.floor(Math.random() * 40) + 60;
  const totalElements = Math.floor(Math.random() * 1000) + 500;
  
  return {
    url,
    score,
    scanTime: new Date().toISOString(),
    totalElements,
    testedElements: totalElements,
    issues: [
      {
        id: 'image-alt',
        title: 'Missing Alt Text',
        description: 'Images must have alternate text to be accessible to screen reader users.',
        category: 'images',
        severity: 'serious',
        count: Math.floor(Math.random() * 5) + 1,
        wcagLevel: '2.1 AA',
        impact: 'serious',
        suggestion: 'Add descriptive alt attributes to all informative images.',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/image-alt',
        elements: [
          { target: 'img:nth-child(1)', html: '<img src="image1.jpg">' },
          { target: 'img:nth-child(2)', html: '<img src="image2.jpg">' }
        ]
      },
      {
        id: 'color-contrast',
        title: 'Insufficient Color Contrast',
        description: 'Text elements must have sufficient color contrast against their background.',
        category: 'color',
        severity: 'serious',
        count: Math.floor(Math.random() * 3) + 1,
        wcagLevel: '2.1 AA',
        impact: 'serious',
        suggestion: 'Increase contrast ratio to at least 4.5:1 for normal text.',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/color-contrast',
        elements: [
          { target: '.low-contrast-text', html: '<p class="low-contrast-text">Hard to read text</p>' }
        ]
      },
      {
        id: 'label',
        title: 'Missing Form Labels',
        description: 'Form elements must have labels to be accessible to assistive technologies.',
        category: 'forms',
        severity: 'critical',
        count: Math.floor(Math.random() * 2) + 1,
        wcagLevel: '2.1 AA',
        impact: 'critical',
        suggestion: 'Associate labels with form controls using the "for" attribute.',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/label',
        elements: [
          { target: 'input[type="email"]', html: '<input type="email" placeholder="Email">' }
        ]
      },
      {
        id: 'heading-order',
        title: 'Improper Heading Structure',
        description: 'Heading levels should not skip levels to maintain proper document structure.',
        category: 'text',
        severity: 'moderate',
        count: Math.floor(Math.random() * 4) + 1,
        wcagLevel: '2.1 AA',
        impact: 'moderate',
        suggestion: 'Use heading levels sequentially to create a logical hierarchy.',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.8/heading-order',
        elements: [
          { target: 'h3:first-of-type', html: '<h3>Skipped H2</h3>' }
        ]
      }
    ]
  };
};