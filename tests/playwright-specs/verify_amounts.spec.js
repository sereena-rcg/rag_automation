
const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

const wait = (ms) => new Promise(r => setTimeout(r, ms));

test('Verify Selling App Total Paid equals Accounting Total Received', async ({ page }) => {

const bookingId = "G22232";

await page.goto('https://sit1.royalx.rccl.com/iTravel/shopping/static/7.0.296/en_US/A5/pages/peacoc-index.html#/', { waitUntil: 'domcontentloaded' });
console.log('✓ Selling App page loaded');
await wait(1000);

await page.locator('a.mt_ret').click();
console.log('✓ Clicked on Retrieve Bookings tab');
await wait(1000);

await page.locator('input[placeholder=\'Booking Ref No/CartID\']').fill(bookingId);
console.log('✓ Booking ID entered');
await wait(1000);

await page.locator('button.btn-primary.pull-right').click();
console.log('✓ Search button clicked');
await wait(1000);

await page.waitForLoadState('networkidle');
console.log('✓ Network idle, results should be loaded');
await wait(1000);

const totalAmountPaid = (await page.locator('div.pass_item >> span.pass_value').nth(3).textContent()).trim();
console.log('✓ Total Amount Paid (Selling App):', totalAmountPaid);
await wait(1000);

await page.goto('https://sit1.royalx.rccl.com/iTravel/production/static/7.0.300/en_US/base/pages/index.html', { waitUntil: 'domcontentloaded' });
console.log('✓ Finance & Accounting page loaded');
await wait(1000);

await page.locator('span.trigger').click();
console.log('✓ Hamburger menu clicked');
await wait(1000);

await page.locator('li:has(span.financial)').click();
console.log('✓ Clicked Finance & Accounting');
await wait(1000);

await page.locator('a.financeandaccounts\.bookingEnquiries').click();
console.log('✓ Clicked Booking Enquiries');
await wait(1000);

await page.locator('a.financeandaccounts\.bookingEnquiries\.bookingFinancialEnquiry').click();
console.log('✓ Clicked Booking Financial Enquiry');
await wait(1000);

await page.locator('input#bookingNumber').fill(bookingId);
console.log('✓ Booking Number entered in Accounting module');
await wait(1000);

await page.locator('input#bookingNumber').blur();
console.log('✓ Triggered blur event to load financial details');
await wait(1000);

await page.waitForLoadState('networkidle');
console.log('✓ Network idle after blur');
await wait(1000);

await page.locator('input.btn.blue[value=\'View Details\']').click();
console.log('✓ Clicked View Details');
await wait(1000);

await page.waitForLoadState('networkidle');
console.log('✓ Network idle after View Details');
await wait(1000);

const accountingAmountPaid = await page.locator('input[name=\'widgetmodel_billingVO_totalReceivedFormat\']').inputValue();
console.log('✓ Total Received (Accounting summary):', accountingAmountPaid);
await wait(1000);

const normalizedSellingAmount = totalAmountPaid.replace(/[^0-9.]/g, '');

const normalizedAccountingAmount = accountingAmountPaid.replace(/[^0-9.]/g, '');

expect(normalizedAccountingAmount).toBe(normalizedSellingAmount);
console.log("✓ Amounts match");

});
