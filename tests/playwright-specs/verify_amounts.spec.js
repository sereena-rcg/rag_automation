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
  console.log('✓ Wait for network to be idle');
  await wait(1000);

  // Step 6: Capture the Total Amount Paid
  const totalAmountPaidElement = page.locator('div.pass_item >> span.pass_value').nth(3);
  await expect(totalAmountPaidElement).toBeVisible({ timeout: 10000 });
  const totalAmountPaid = (await totalAmountPaidElement.textContent()).trim();
  console.log('✓ Capture the Total Amount Paid:', totalAmountPaid);
  await wait(1000);

  // Step 7: Navigate to Accounting module
  await page.goto('https://sit1.royalx.rccl.com/iTravel/production/static/7.0.300/en_US/base/pages/index.html', {
    waitUntil: 'domcontentloaded'
  });
  console.log('✓ Navigate to Accounting module');
  await wait(1000);

  // Step 8: Click hamburger menu
  const hamburgerMenu = page.locator('span.trigger');
  await expect(hamburgerMenu).toBeVisible({ timeout: 10000 });
  await hamburgerMenu.click();
  console.log('✓ Click hamburger menu');
  await wait(2000);

  // Step 9: Click Finance & Accounting menu item
  const financeMenuItem = page.locator('li:has(span.financial)');
  await expect(financeMenuItem).toBeVisible({ timeout: 10000 });
  await financeMenuItem.click();
  console.log('✓ Click Finance & Accounting menu item');
  await wait(2000);

  // Step 10: Click Booking Enquiries link
  const bookingEnquiriesLink = page.locator('a.financeandaccounts\.bookingEnquiries');
  await expect(bookingEnquiriesLink).toBeVisible({ timeout: 10000 });
  await bookingEnquiriesLink.click();
  console.log('✓ Click Booking Enquiries link');
  await wait(2000);

  // Step 11: Click Booking Financial Enquiry link
  const bookingFinancialEnquiryLink = page.locator('a.financeandaccounts\.bookingEnquiries\.bookingFinancialEnquiry');
  await expect(bookingFinancialEnquiryLink).toBeVisible({ timeout: 10000 });
  await bookingFinancialEnquiryLink.click();
  console.log('✓ Click Booking Financial Enquiry link');
  await wait(2000);

  // Step 12: Fill in booking number in Accounting module
  const bookingSearchInput = page.locator('input#bookingNumber');
  await expect(bookingSearchInput).toBeVisible({ timeout: 10000 });
  await bookingSearchInput.fill(bookingId);
  console.log('✓ Fill in booking number in Accounting module');
  await wait(2000);

  await page.locator('input#bookingNumber').blur();
  console.log('✓ Trigger blur event to load financial details');
  await wait(2000);

  // Step 14: Wait for network to be idle
  await page.waitForLoadState('networkidle');
  console.log('✓ Wait for network idle after blur');
  await wait(1000);

  // Step 15: Click View Details button
  const viewDetailsButton = page.locator('input.btn.blue[value=\'View Details\']');
  await expect(viewDetailsButton).toBeVisible({ timeout: 10000 });
  await viewDetailsButton.click();
  console.log('✓ Click View Details button');
  await wait(2000);

  // Step 16: Wait for network to be idle
  await page.waitForLoadState('networkidle');
  console.log('✓ Wait for network idle after View Details');
  await wait(1000);

  // Step 17: Capture Total Received from Accounting
  const totalReceivedInput = page.locator('input[name=\'widgetmodel_billingVO_totalReceivedFormat\']');
  await expect(totalReceivedInput).toBeVisible({ timeout: 10000 });
  const accountingAmountPaid = await totalReceivedInput.inputValue();
  console.log('✓ Capture Total Received from Accounting:', accountingAmountPaid);
  await wait(2000);

  const normalizedSellingAmount = totalAmountPaid.replace(/[^0-9.]/g, '');

  const normalizedAccountingAmount = accountingAmountPaid.replace(/[^0-9.]/g, '');

  expect(normalizedAccountingAmount).toBe(normalizedSellingAmount);


});
