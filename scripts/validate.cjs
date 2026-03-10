const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
let errors = 0;

console.log("=== EnterRank Pre-Flight Validation ===\n");

// 1. Check build compiles
console.log("1. Checking build...");
const { execSync } = require('child_process');
try {
  execSync('npx vite build 2>&1', { timeout: 60000 });
  console.log("   \u2713 Build passes\n");
} catch(e) {
  console.log("   \u2717 BUILD FAILED \u2014 fix before pushing\n");
  console.log(e.stdout?.toString().slice(-500));
  errors++;
}

// 2. Check runRealAudit return object variables are all declared
console.log("2. Checking runRealAudit variable declarations...");
const runRealAuditMatch = code.match(/async\s+function\s+runRealAudit[\s\S]*?(?=\nasync\s+function\s|\nfunction\s|\nconst\s+\w+\s*=\s*async)/);
if (runRealAuditMatch) {
  const fn = runRealAuditMatch[0];

  // Find all variables used in the return statement
  const returnMatch = fn.match(/return\s*\{[\s\S]*?\n\s*\};?\s*\}\s*catch/);
  if (returnMatch) {
    const returnBlock = returnMatch[0];
    const varRefs = returnBlock.match(/typeof\s+(\w+)/g) || [];
    const varNames = varRefs.map(v => v.replace('typeof ', ''));

    varNames.forEach(v => {
      if (!fn.includes('let ' + v) && !fn.includes('const ' + v) && !fn.includes('var ' + v)) {
        console.log("   \u2717 Variable '" + v + "' used in return but may not be declared at function scope");
        errors++;
      }
    });

    if (varNames.length > 0 && errors === 0) {
      console.log("   \u2713 All return variables appear to be declared (" + varNames.length + " checked)\n");
    }
  }

  // Check for suspicious undeclared variable patterns
  const lines = fn.split('\n');
  let suspiciousFound = 0;

  // Check for cname used outside of proper scope
  lines.forEach((line, i) => {
    if (line.trim().startsWith('//')) return;
    if (/\bcname\b/.test(line)) {
      if (line.includes('const cname=') || line.includes('map(cname=>')) return;
      const prevLines = lines.slice(Math.max(0, i - 15), i).join('\n');
      if (prevLines.includes('map(cname=>') || prevLines.includes('const cname=')) return;
      console.log("   \u26a0 Suspicious 'cname' at offset line " + i + ": " + line.trim().slice(0, 80));
      suspiciousFound++;
    }
    if (/\bundefined\s*\./.test(line)) {
      console.log("   \u26a0 'undefined.' access at offset line " + i + ": " + line.trim().slice(0, 80));
      suspiciousFound++;
    }
  });

  if (suspiciousFound === 0) {
    console.log("   \u2713 No suspicious variable patterns found\n");
  } else {
    console.log("");
  }

  console.log("   \u2713 runRealAudit found (" + fn.length + " chars)\n");
} else {
  console.log("   \u2717 Could not find runRealAudit function\n");
  errors++;
}

// 3. Check all API route files exist
console.log("3. Checking API routes...");
const routes = ['api/openai-search.js', 'api/gemini.js', 'api/perplexity.js', 'api/openai.js', 'api/crawl.js'];
routes.forEach(r => {
  if (fs.existsSync(r)) {
    console.log("   \u2713 " + r + " exists");
  } else {
    console.log("   \u2717 " + r + " MISSING");
    errors++;
  }
});
console.log("");

// 4. Check for env var references in API routes
console.log("4. Checking env var references...");
const envVars = {
  'api/openai-search.js': 'OPENAI_API_KEY',
  'api/openai.js': 'OPENAI_API_KEY',
  'api/gemini.js': 'GEMINI_API_KEY',
  'api/perplexity.js': 'PERPLEXITY_API_KEY'
};
Object.entries(envVars).forEach(([file, envVar]) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(envVar)) {
      console.log("   \u2713 " + file + " references " + envVar);
    } else {
      console.log("   \u26a0 " + file + " does NOT reference " + envVar);
    }
  }
});
console.log("");

// 5. Check engines array has 3 entries
console.log("5. Checking engine configuration...");
const engineMatches = code.match(/engines:\s*\[[\s\S]*?\]/g) || [];
const returnEngines = engineMatches.find(m => m.includes('chatgpt') && m.includes('gemini'));
if (returnEngines) {
  const hasPerplexity = returnEngines.includes('perplexity');
  console.log("   " + (hasPerplexity ? "\u2713" : "\u2717") + " Perplexity in engines array: " + hasPerplexity);
  if (!hasPerplexity) errors++;
} else {
  console.log("   \u26a0 Could not find engines array in return");
}
console.log("");

// 6. Check for common runtime error patterns
console.log("6. Checking for common runtime error patterns...");
const opens = (code.match(/{/g) || []).length;
const closes = (code.match(/}/g) || []).length;
const diff = opens - closes;
console.log("   " + (Math.abs(diff) <= 1 ? "\u2713" : "\u2717") + " Brace balance: { = " + opens + ", } = " + closes + ", diff = " + diff);
if (Math.abs(diff) > 1) errors++;
console.log("   \u2713 Pattern check complete\n");

// Summary
console.log("=== RESULT: " + (errors === 0 ? "\u2713 ALL CHECKS PASSED" : "\u2717 " + errors + " ERROR(S) FOUND \u2014 FIX BEFORE PUSHING") + " ===");
process.exit(errors > 0 ? 1 : 0);
