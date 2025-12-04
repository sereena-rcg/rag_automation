const fs = require('fs');
const path = require('path');

function retrieveFlow(name) {
  const flowFile = path.join(__dirname, '..', 'flows', `${name}.json`);
  if (!fs.existsSync(flowFile)) throw new Error(`Flow not found: ${name}`);

  const flow = JSON.parse(fs.readFileSync(flowFile, 'utf-8'));

  const sellingKb = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'kb', 'selling-app.json'))
  );

  const accountingKb = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'kb', 'finance-accounting.json'))
  );

  return { ...flow, sellingKb, accountingKb };
}

module.exports = { retrieveFlow };
