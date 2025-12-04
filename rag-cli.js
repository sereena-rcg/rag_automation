const fs = require('fs');
const path = require('path');
const { retrieveFlow } = require('./rag/engine/retriever');
const { generateTest } = require('./rag/engine/generator');

const flowName = process.argv[2];

if (!flowName) {
  console.error("❌ Please provide flow name.\nExample: npm run gen retrieve_bookings");
  process.exit(1);
}

const flow = retrieveFlow(flowName);

const outputDir = path.join(__dirname, 'tests', 'playwright-specs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const filePath = path.join(outputDir, `${flow.intent}.spec.js`);

const code = generateTest(flow);
fs.writeFileSync(filePath, code);

console.log(`\n✅ Test generated: ${filePath}\n`);
