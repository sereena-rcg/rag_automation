const actions = require('./actions');

function generateTest(flow) {
  let code = `const { test, expect } = require('@playwright/test');
test.setTimeout(100000); // 2 minutes

// Wait helper
const wait = (ms) => new Promise(r => setTimeout(r, ms));

test('${flow.name}', async ({ page }) => {
`;

  // Add inputs as variables
  if (flow.inputs && flow.inputs.bookingId) {
    code += `  // Step 0: Define booking ID\n`;
    code += `  const bookingId = '${flow.inputs.bookingId}';\n`;
  }
  
  let stepCounter = 1;

  flow.steps.forEach(step => {
    const kb =
      step.module === "selling-app"
        ? flow.sellingKb
        : step.module === "finance-accounting"
        ? flow.accountingKb
        : null;

    const actionFn = actions[step.action];
    code += actionFn(step, kb, stepCounter);
    
    // Increment step counter for actions that are visible user steps
    if (!['normalizeAmount', 'assertEqual'].includes(step.action)) {
      stepCounter++;
    }
  });

  code += `
});
`;

  return code;
}

module.exports = { generateTest };
