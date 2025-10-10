
// import express from "express";
// import cors from "cors";
// import puppeteer from "puppeteer";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/scan", async (req, res) => {
//   const { url } = req.body;
//   try {
//     console.log("Starting accessibility scan for:", url);

//     const browser = await puppeteer.launch({
//       headless: "new", // use new headless mode
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//     // Inject axe-core script from CDN
//     await page.addScriptTag({
//       url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js",
//     });

//     // Run axe-core inside the page context
//     const results = await page.evaluate(async () => {
//       return await window.axe.run(document, {
//         runOnly: {
//           type: "tag",
//           values: ["wcag2a", "wcag2aa"],
//         },
//       });
//     });

//     await browser.close();

//     console.log(`Scan complete: Found ${results.violations.length} issues`);
//     res.json({
//       url,
//       totalIssues: results.violations.length,
//       issues: results.violations.map((v) => ({
//         id: v.id,
//         impact: v.impact,
//         description: v.description,
//         helpUrl: v.helpUrl,
//         nodes: v.nodes.map((n) => ({
//           target: n.target,
//           html: n.html,
//         })),
//       })),
//     });
//   } catch (err) {
//     console.error("Scan error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () =>
//   console.log("Accessibility scan server listening on http://localhost:5000")
// );

// // Helper functions (same logic as your frontend utils)
// const categorizeIssue = (ruleId) => {
//   const categoryMap = {
//     'image-alt': 'images',
//     'input-image-alt': 'images',
//     'area-alt': 'images',
//     'color-contrast': 'color',
//     'color-contrast-enhanced': 'color',
//     'label': 'forms',
//     'label-title-only': 'forms',
//     'form-field-multiple-labels': 'forms',
//     'heading-order': 'text',
//     'empty-heading': 'text',
//     'p-as-heading': 'text',
//     'aria-label': 'aria',
//     'aria-labelledby': 'aria',
//     'aria-describedby': 'aria',
//     'button-name': 'aria',
//     'link-name': 'aria'
//   };
//   return categoryMap[ruleId] || 'aria';
// };

// const mapSeverity = (impact) => {
//   const severityMap = {
//     'critical': 'critical',
//     'serious': 'serious',
//     'moderate': 'moderate',
//     'minor': 'minor'
//   };
//   return severityMap[impact] || 'moderate';
// };

// const getWcagLevel = (tags) => {
//   if (!Array.isArray(tags)) return '2.1 AA';
//   if (tags.includes('wcag21aa')) return '2.1 AA';
//   if (tags.includes('wcag2aa')) return '2.0 AA';
//   if (tags.includes('wcag21a')) return '2.1 A';
//   if (tags.includes('wcag2a')) return '2.0 A';
//   return '2.1 AA';
// };

// const generateSuggestion = (ruleId) => {
//   const suggestions = {
//     'image-alt': 'Add descriptive alt attributes to all informative images. Use alt="" for decorative images.',
//     'color-contrast': 'Increase contrast ratio to at least 4.5:1 for normal text and 3:1 for large text.',
//     'label': 'Associate labels with form controls using the "for" attribute or wrap inputs in label elements.',
//     'heading-order': 'Use heading levels sequentially (H1, H2, H3) to create a logical hierarchy.',
//     'aria-label': 'Add aria-label or aria-labelledby attributes to interactive elements without visible text.',
//     'button-name': 'Ensure all buttons have accessible names through text content, aria-label, or aria-labelledby.',
//     'link-name': 'Provide descriptive text for links, either as content or through aria-label.',
//     'keyboard': 'Ensure all interactive elements can be reached and activated using keyboard only.'
//   };
//   return suggestions[ruleId] || 'Review this element for accessibility compliance.';
// };

// const calculateAccessibilityScore = (axeResults) => {
//   const totalTests = (axeResults.passes || []).length + (axeResults.violations || []).length;
//   const passedTests = (axeResults.passes || []).length;

//   if (totalTests === 0) return 100;
//   let score = Math.round((passedTests / totalTests) * 100);

//   (axeResults.violations || []).forEach(violation => {
//     const penalty = {
//       'critical': 15,
//       'serious': 10,
//       'moderate': 5,
//       'minor': 2
//     }[violation.impact] || 5;

//     score -= penalty * (violation.nodes ? violation.nodes.length : 1);
//   });

//   return Math.max(0, Math.min(100, score));
// };

// // POST /api/scan  { url: "https://example.com" }
// app.post('/api/scan', async (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: 'Missing url in body' });

//   let browser;
//   try {
//     // launch puppeteer
//     browser = await puppeteer.launch({
//       // recommended flags for reliability on some hosts
//       args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
//       headless: true, // set to false if you want to see browser
//     });

//     const page = await browser.newPage();

//     // reduce detection and ensure resources load
//     await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');
//     await page.setViewport({ width: 1280, height: 800 });

//     // Set a reasonable navigation timeout
//     await page.setDefaultNavigationTimeout(60000); // 60s

//     // navigate and wait for network to be idle
//     await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

//     // evaluate total elements for reporting
//     const totalElements = await page.evaluate(() => document.querySelectorAll('*').length);

//     // Inject axe-core source into the page
//     const axeSource = axeCore.source; // axe-core package exposes .source
//     await page.evaluate(axeSource);

//     // Run axe on the page with the desired config (you can tweak rules/tags)
//     const axeResults = await page.evaluate(async () => {
//       // eslint-disable-next-line no-undef
//       return await axe.run(document, {
//         // configure rules/tags similar to your browser extension config
//         // you can also pass an empty config to run all default rules
//         runOnly: {
//           type: 'tag',
//           values: ['wcag2a', 'wcag2aa', 'wcag21aa']
//         }
//       });
//     });

//     // Build issues array in your frontend format
//     const issues = (axeResults.violations || []).map(violation => ({
//       id: violation.id,
//       title: violation.help || violation.id,
//       description: violation.description || violation.help,
//       category: categorizeIssue(violation.id),
//       severity: mapSeverity(violation.impact),
//       count: violation.nodes ? violation.nodes.length : 0,
//       wcagLevel: getWcagLevel(violation.tags),
//       impact: violation.impact,
//       suggestion: generateSuggestion(violation.id),
//       helpUrl: violation.helpUrl,
//       elements: (violation.nodes || []).map(node => ({
//         target: Array.isArray(node.target) && node.target.length ? node.target[0] : (node.target || '').toString(),
//         html: node.html,
//         failureSummary: node.failureSummary
//       }))
//     }));

//     const score = calculateAccessibilityScore(axeResults);
//     const testedElements = (axeResults.passes || []).length + (axeResults.violations || []).length + (axeResults.incomplete || []).length;

//     const result = {
//       url,
//       score,
//       scanTime: new Date().toISOString(),
//       totalElements,
//       testedElements,
//       issues,
//       axeResults // optional raw results for debugging
//     };

//     res.json(result);
//   } catch (err) {
//     console.error('Scan error:', err);
//     res.status(500).json({ error: 'Scan failed', details: err.message || '' });
//   } finally {
//     if (browser) {
//       try { await browser.close(); } catch (e) { /* ignore */ }
//     }
//   }
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Accessibility scan server listening on http://localhost:${PORT}`);
// });
import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import axeCore from "axe-core";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper functions
const categorizeIssue = (ruleId) => {
  const map = {
    'image-alt': 'images', 'input-image-alt': 'images', 'area-alt': 'images',
    'color-contrast': 'color', 'color-contrast-enhanced': 'color',
    'label': 'forms', 'label-title-only': 'forms', 'form-field-multiple-labels': 'forms',
    'heading-order': 'text', 'empty-heading': 'text', 'p-as-heading': 'text',
    'aria-label': 'aria', 'aria-labelledby': 'aria', 'aria-describedby': 'aria',
    'button-name': 'aria', 'link-name': 'aria'
  };
  return map[ruleId] || 'aria';
};

const mapSeverity = (impact) => {
  const map = { 'critical': 'critical', 'serious': 'serious', 'moderate': 'moderate', 'minor': 'minor' };
  return map[impact] || 'moderate';
};

const getWcagLevel = (tags) => {
  if (!Array.isArray(tags)) return '2.1 AA';
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

// const calculateAccessibilityScore = (axeResults) => {
//   const totalTests = (axeResults.passes || []).length + (axeResults.violations || []).length;
//   const passedTests = (axeResults.passes || []).length;
//   if (totalTests === 0) return 100;

//   let score = Math.round((passedTests / totalTests) * 100);
//   (axeResults.violations || []).forEach(v => {
//     const penalty = { 'critical': 15, 'serious': 10, 'moderate': 5, 'minor': 2 }[v.impact] || 5;
//     score -= penalty * (v.nodes ? v.nodes.length : 1);
//   });
//   return Math.max(0, Math.min(100, score));
// };
const calculateAccessibilityScore = (axeResults) => {
  const passedNodes = (axeResults.passes || []).reduce((sum, pass) => sum + (pass.nodes?.length || 0), 0);
  const violatedNodes = (axeResults.violations || []).reduce((sum, v) => sum + (v.nodes?.length || 0), 0);

  const totalNodes = passedNodes + violatedNodes;
  if (totalNodes === 0) return 100;

  let score = Math.round((passedNodes / totalNodes) * 100);

  // Apply mild penalty per violation node to reduce score proportionally
  (axeResults.violations || []).forEach(v => {
    const impactFactor = { critical: 0.15, serious: 0.10, moderate: 0.05, minor: 0.02 }[v.impact] || 0.05;
    score -= Math.round(impactFactor * (v.nodes?.length || 1));
  });

  return Math.max(0, Math.min(100, score));
};

// Main API endpoint
app.post("/api/scan", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL in request body" });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const totalElements = await page.evaluate(() => document.querySelectorAll("*").length);

    // Inject axe-core
    await page.evaluate(axeSource => eval(axeSource), axeCore.source);

    console.log("Running axe-core scan...");
    const axeResults = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
      });
    });
    console.log(`Axe scan complete, found ${axeResults.violations.length} issues`);

    const issues = (axeResults.violations || []).map(v => ({
      id: v.id,
      title: v.help || v.id,
      description: v.description || v.help,
      category: categorizeIssue(v.id),
      severity: mapSeverity(v.impact),
      count: v.nodes ? v.nodes.length : 0,
      wcagLevel: getWcagLevel(v.tags),
      impact: v.impact,
      suggestion: generateSuggestion(v.id),
      helpUrl: v.helpUrl,
      elements: (v.nodes || []).map(n => ({
        target: Array.isArray(n.target) && n.target.length ? n.target[0] : n.target?.toString(),
        html: n.html,
        failureSummary: n.failureSummary
      }))
    }));

    // const testedElements = (axeResults.passes || []).length 
    //                     + (axeResults.violations || []).length 
    //                     + (axeResults.incomplete || []).length;
    const testedElements = (axeResults.passes || []).reduce((sum, pass) => sum + (pass.nodes?.length || 0), 0)
                     + (axeResults.violations || []).reduce((sum, v) => sum + (v.nodes?.length || 0), 0)
                     + (axeResults.incomplete || []).reduce((sum, i) => sum + (i.nodes?.length || 0), 0);
    const score = calculateAccessibilityScore(axeResults);

    // Send a single response
    res.json({
      url,
      score,
      scanTime: new Date().toISOString(),
      totalElements,
      testedElements,
      issues,
      axeResults
    });

  } catch (err) {
    console.error("Scan error:", err);
    if (!res.headersSent) res.status(500).json({ error: "Scan failed", details: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => console.log(`Accessibility scan server listening on http://localhost:${PORT}`));