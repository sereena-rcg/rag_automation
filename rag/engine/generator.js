const actions = require('./actions');

function generateTest(flow) {
  let code = `
const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

const wait = (ms) => new Promise(r => setTimeout(r, ms));

test('${flow.name}', async ({ page }) => {

const bookingId = "${flow.inputs.bookingId}";
`;

  flow.steps.forEach(step => {
    const kb =
      step.module === "selling-app"
        ? flow.sellingKb
        : step.module === "finance-accounting"
        ? flow.accountingKb
        : null;

    const actionFn = actions[step.action];
    code += actionFn(step, kb);
  });

  code += `
});
`;

  return code;
}

module.exports = { generateTest };
