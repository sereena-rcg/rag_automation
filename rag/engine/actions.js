module.exports = {

  goto: (step, kb, stepNum) => `
  // Step ${stepNum}: ${step.description}
  await page.goto('${step.url}', {
    waitUntil: '${step.waitUntil}'
  });
  console.log('✓ ${step.description}');
  await wait(1000);
`,

  click: (step, kb, stepNum) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const varName = step.locator.charAt(0).toLowerCase() + step.locator.slice(1);
    const hasTextParam = el.text ? `, { hasText: '${el.text}' }` : '';
    const waitTime = step.module === "finance-accounting" ? 2000 : 1000;
    
    return `
  // Step ${stepNum}: ${step.description}
  const ${varName} = page.locator('${safeSelector}'${hasTextParam});
  await expect(${varName}).toBeVisible({ timeout: 10000 });
  await ${varName}.click();
  console.log('✓ ${step.description}');
  await wait(${waitTime});
`;
  },

  fill: (step, kb, stepNum) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const varName = step.locator.charAt(0).toLowerCase() + step.locator.slice(1);
    const waitTime = step.module === "finance-accounting" ? 2000 : 1000;
    
    return `
  // Step ${stepNum}: ${step.description}
  const ${varName} = page.locator('${safeSelector}');
  await expect(${varName}).toBeVisible({ timeout: 10000 });
  await ${varName}.fill(${step.valueFrom});
  console.log('✓ ${step.description}');
  await wait(${waitTime});
`;
  },

  captureText: (step, kb, stepNum) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const nth = el.nth !== undefined ? `.nth(${el.nth})` : "";
    const elementVarName = step.locator.charAt(0).toLowerCase() + step.locator.slice(1).replace('Span', 'Element');
    const waitTime = step.module === "finance-accounting" ? 2000 : 1000;
    
    return `
  // Step ${stepNum}: ${step.description}
  const ${elementVarName} = page.locator('${safeSelector}')${nth};
  await expect(${elementVarName}).toBeVisible({ timeout: 10000 });
  const ${step.var} = (await ${elementVarName}.textContent()).trim();
  console.log('✓ ${step.description}:', ${step.var});
  await wait(${waitTime});
`;
  },

  captureValue: (step, kb, stepNum) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const elementVarName = step.locator.charAt(0).toLowerCase() + step.locator.slice(1);
    const waitTime = step.module === "finance-accounting" ? 2000 : 1000;
    
    return `
  // Step ${stepNum}: ${step.description}
  const ${elementVarName} = page.locator('${safeSelector}');
  await expect(${elementVarName}).toBeVisible({ timeout: 10000 });
  const ${step.var} = await ${elementVarName}.inputValue();
  console.log('✓ ${step.description}:', ${step.var});
  await wait(${waitTime});
`;
  },

  blur: (step, kb, stepNum) => {
    const el = kb[step.locator];
    const safeSelector = el.selector.replace(/'/g, "\\'");
    const waitTime = step.module === "finance-accounting" ? 2000 : 1000;
    
    return `
  await page.locator('${safeSelector}').blur();
  console.log('✓ ${step.description}');
  await wait(${waitTime});
`;
  },

  waitForLoadState: (step, kb, stepNum) => `
  // Step ${stepNum}: Wait for network to be idle
  await page.waitForLoadState('${step.state}');
  console.log('✓ ${step.description}');
  await wait(1000);
`,

  normalizeAmount: (step) => `
  const ${step.outVar} = ${step.var}.replace(/[^0-9.]/g, '');
`,

  assertEqual: (step) => `
  expect(${step.left}).toBe(${step.right});

`
};
