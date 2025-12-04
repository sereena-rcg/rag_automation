# Quick Workflow Reference

## 🚀 Complete Test Automation Workflow

### Prerequisites
- Node.js installed
- Dependencies installed (`npm install`)

---

## Step-by-Step Execution

### **STEP 0: Authenticate (Required First Time / When Session Expires)**

```bash
node login.js
```

**Actions:**
1. Browser window opens automatically
2. Navigate through login page
3. Complete Multi-Factor Authentication (MFA)
4. Wait for full login to complete
5. Script saves session to `auth.json` after 60 seconds
6. Browser closes automatically

**Expected Output:**
```
Session saved to auth.json
```

**When to re-run:**
- First time setup
- Session expired (authentication errors in tests)
- Switching test environments

---

### **STEP 1: Generate Feature Files from Excel**

```bash
node generateFeatures.js
```

**Input:** `jira_input.xlsx`  
**Output:** `tests/features/*.feature` files

**Expected Output:**
```
=== Previewing Excel Input ===
Row 1:
  Gap: GAP-101
  TestCaseID: TC001
  ...

✅ Generated 1 .feature files in /workspace/tests/features
```

---

### **STEP 2: Generate Retrieve Booking Test**

```bash
npm run gen retrieve_bookings
```

**Alternative:**
```bash
node rag-cli.js retrieve_bookings
```

**What it does:**
- Reads `rag/flows/retrieve_bookings.json`
- Loads selectors from `rag/kb/selling-app.json`
- Generates `tests/playwright-specs/retrieve_booking.spec.js`

**Expected Output:**
```
✅ Test generated: /workspace/tests/playwright-specs/retrieve_booking.spec.js
```

**Generated test includes:**
- Navigate to Selling App
- Click Retrieve Bookings tab
- Search for booking by ID
- Capture Total Amount Paid

---

### **STEP 3: Run Retrieve Booking Test**

```bash
npx playwright test retrieve_booking.spec.js
```

**What happens:**
- Uses saved authentication from `auth.json`
- Opens browser (non-headless by default)
- Executes test steps with visibility checks
- Captures booking amount

**Expected Output:**
```
Running 1 test using 1 worker
  ✓ Retrieve booking and capture Total Amount Paid (30s)

1 passed (30s)
```

---

### **STEP 4: Generate Verify Amounts Test**

```bash
npm run gen verify_amounts
```

**Alternative:**
```bash
node rag-cli.js verify_amounts
```

**What it does:**
- Reads `rag/flows/verify_amounts.json`
- Loads selectors from both KB files
- Generates `tests/playwright-specs/verify_amounts.spec.js`

**Expected Output:**
```
✅ Test generated: /workspace/tests/playwright-specs/verify_amounts.spec.js
```

**Generated test includes:**
- All steps from retrieve_booking
- Plus: Navigate to Finance & Accounting
- Navigate through accounting menus
- Capture Total Received amount
- Compare Selling App vs Accounting amounts

---

### **STEP 5: Run Full Test Suite**

```bash
npx playwright test
```

**Runs all tests in `tests/playwright-specs/`**

**Expected Output:**
```
Running 2 tests using 1 worker
  ✓ Retrieve booking and capture Total Amount Paid (30s)
  ✓ Verify Selling App Total Paid equals Accounting Total Received (60s)

2 passed (1.5m)
```

**Generated artifacts:**
- `playwright-report/index.html` - HTML test report
- `test-results/` - Screenshots, traces, videos (on failure)

---

## 📊 Visual Workflow

```
┌─────────────────────────────────────────────────────────┐
│  STEP 0: Authentication (One-time)                      │
│  $ node login.js                                        │
│  → Saves auth.json                                      │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STEP 1: Generate Feature Files                         │
│  $ node generateFeatures.js                             │
│  → Creates tests/features/*.feature                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STEP 2: Generate First Test                            │
│  $ npm run gen retrieve_bookings                        │
│  → Creates retrieve_booking.spec.js                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STEP 3: Execute First Test                             │
│  $ npx playwright test retrieve_booking.spec.js         │
│  → Validates booking retrieval works                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STEP 4: Generate Comparison Test                       │
│  $ npm run gen verify_amounts                           │
│  → Creates verify_amounts.spec.js                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  STEP 5: Execute Full Suite                             │
│  $ npx playwright test                                  │
│  → Runs all tests and generates report                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Command Quick Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `node login.js` | Authenticate & save session | `auth.json` |
| `node generateFeatures.js` | Excel → Gherkin | `.feature` files |
| `npm run gen <flow_name>` | Generate test spec | `.spec.js` file |
| `npx playwright test` | Run all tests | Test results + report |
| `npx playwright test <file>` | Run specific test | Individual test result |
| `npx playwright show-report` | View HTML report | Opens browser |

---

## 🔧 Configuration Locations

| File | Purpose |
|------|---------|
| `playwright.config.js` | Test timeout, browser settings, auth |
| `rag/flows/*.json` | Test step definitions |
| `rag/kb/*.json` | Element selectors and locators |
| `auth.json` | Saved authentication session |
| `jira_input.xlsx` | Test case input data |

---

## ⚠️ Common Issues & Solutions

### Authentication Error
**Problem:** Tests fail with login redirect  
**Solution:** Run `node login.js` to refresh session

### Element Not Found
**Problem:** `TimeoutError: Locator not found`  
**Solution:** Update selector in appropriate `rag/kb/*.json` file

### Test Timeout
**Problem:** Test exceeds 100 second limit  
**Solution:** Check network speed or increase timeout in test

### Excel Parse Error
**Problem:** `generateFeatures.js` fails  
**Solution:** Verify Excel has correct columns: Gap, TestCaseID, Test Case, Action, Data, Expected Result

---

## 📈 Success Indicators

✅ **Authentication successful:**
```
Session saved to auth.json
```

✅ **Feature generation successful:**
```
✅ Generated 1 .feature files in /workspace/tests/features
```

✅ **Test generation successful:**
```
✅ Test generated: /workspace/tests/playwright-specs/retrieve_booking.spec.js
```

✅ **Test execution successful:**
```
1 passed (30s)
```

---

## 🎓 Tips

1. **Always authenticate first** - No tests will work without valid `auth.json`
2. **Test incrementally** - Generate and run each test individually first
3. **Check console output** - Each step logs progress with ✓ markers
4. **Review HTML reports** - Screenshots and traces available on failure
5. **Keep KB updated** - Update selectors when UI changes

---

## 🔄 Daily Usage Pattern

**Typical daily workflow:**

```bash
# Morning - Check authentication
node login.js

# Generate new test from Excel
node generateFeatures.js
npm run gen <your_new_test>

# Test individual spec
npx playwright test <your_new_test>.spec.js

# Once validated, run full suite
npx playwright test

# Review results
npx playwright show-report
```

---

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review test output for specific error messages
- Verify `auth.json` exists and is recent
- Check `rag/kb/*.json` for correct selectors
- Review `playwright-report/` for failure screenshots
