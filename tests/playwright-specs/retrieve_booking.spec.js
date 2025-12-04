const { test, expect } = require('@playwright/test');
test.setTimeout(100000); // 2 minutes

// Wait helper
const wait = (ms) => new Promise(r => setTimeout(r, ms));

test('Retrieve booking and capture Total Amount Paid', async ({ page }) => {
  // Step 0: Define booking ID
  const bookingId = 'G22232';

  // Step 1: Navigate to the Selling App page
  await page.goto('https://sit1.royalx.rccl.com/iTravel/shopping/static/7.0.296/en_US/A5/pages/peacoc-index.html#/', {
    waitUntil: 'domcontentloaded'
  });
  console.log('✓ Navigate to the Selling App page');
  await wait(1000);

  // Step 2: Click on Retrieve Bookings tab
  const retrieveBookingsTab = page.locator('a.mt_ret', { hasText: 'Retrieve Bookings' });
  await expect(retrieveBookingsTab).toBeVisible({ timeout: 10000 });
  await retrieveBookingsTab.click();
  console.log('✓ Click on Retrieve Bookings tab');
  await wait(1000);

  // Step 3: Fill in the Booking ID
  const bookingIdInput = page.locator('input[placeholder=\'Booking Ref No/CartID\']');
  await expect(bookingIdInput).toBeVisible({ timeout: 10000 });
  await bookingIdInput.fill(bookingId);
  console.log('✓ Fill in the Booking ID');
  await wait(1000);

  // Step 4: Click the Search button
  const searchButton = page.locator('button.btn-primary.pull-right', { hasText: 'Search' });
  await expect(searchButton).toBeVisible({ timeout: 10000 });
  await searchButton.click();
  console.log('✓ Click the Search button');
  await wait(1000);

  // Step 5: Wait for network to be idle
  await page.waitForLoadState('networkidle');
  console.log('✓ Network idle, results should be loaded');
  await wait(1000);

  // Step 6: Capture the Total Amount Paid
  const totalAmountPaidElement = page.locator('div.pass_item >> span.pass_value').nth(3);
  await expect(totalAmountPaidElement).toBeVisible({ timeout: 10000 });
  const totalAmountPaid = (await totalAmountPaidElement.textContent()).trim();
  console.log('✓ Capture the Total Amount Paid:', totalAmountPaid);
  await wait(1000);

});
