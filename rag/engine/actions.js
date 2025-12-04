module.exports = {

  goto: (step) => `
await page.goto('${step.url}', { waitUntil: '${step.waitUntil}' });
console.log('✓ ${step.description}');
await wait(1000);
`,

  click: (step, kb) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    return `
await page.locator('${safeSelector}').click();
console.log('✓ ${step.description}');
await wait(1000);
`;
  },

  fill: (step, kb) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    return `
await page.locator('${safeSelector}').fill(${step.valueFrom});
console.log('✓ ${step.description}');
await wait(1000);
`;
  },

  captureText: (step, kb) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const nth = el.nth !== undefined ? `.nth(${el.nth})` : "";
    return `
const ${step.var} = (await page.locator('${safeSelector}')${nth}.textContent()).trim();
console.log('✓ ${step.description}:', ${step.var});
await wait(1000);
`;
  },

  captureValue: (step, kb) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    return `
const ${step.var} = await page.locator('${safeSelector}').inputValue();
console.log('✓ ${step.description}:', ${step.var});
await wait(1000);
`;
  },

  blur: (step, kb) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    return `
await page.locator('${safeSelector}').blur();
console.log('✓ ${step.description}');
await wait(1000);
`;
  },

  waitForLoadState: (step) => `
await page.waitForLoadState('${step.state}');
console.log('✓ ${step.description}');
await wait(1000);
`,

  normalizeAmount: (step) => `
const ${step.outVar} = ${step.var}.replace(/[^0-9.]/g, '');
`,

  assertEqual: (step) => `
expect(${step.left}).toBe(${step.right});
console.log("✓ Amounts match");
`
};
