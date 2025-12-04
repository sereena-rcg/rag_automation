
const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

const wait = (ms) => new Promise(r => setTimeout(r, ms));

test('Retrieve booking and capture Total Amount Paid', async ({ page }) => {

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

});
