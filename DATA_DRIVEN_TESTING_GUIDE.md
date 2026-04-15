# Data-Driven Testing Guide for Playwright

## Overview

Data-Driven Testing (DDT) is a testing methodology where test data is separated from test logic. This approach allows you to run the same test with multiple sets of data, improving test coverage and maintainability.

## Benefits

✅ **Reduced Code Duplication** - Single test runs with multiple datasets  
✅ **Easy Test Maintenance** - Update data without changing test code  
✅ **Comprehensive Coverage** - Test multiple scenarios systematically  
✅ **Parallel Execution** - Run tests concurrently with different data  
✅ **Easy Onboarding** - Non-technical users can add test data

## File Structure

```
testdata/
├── loginData.json           # Basic login test data
├── loginDataExtended.json   # Comprehensive login test data
└── [other data files]

tests/
└── dataDrivanTesting.spec.ts  # Data-driven test implementation
```

## Test Data Format

### Basic Format (loginData.json)

```json
[
  {
    "test Name": "valid login",
    "username": "testproject@gmail.com",
    "password": "test@1234",
    "expectedResult": "Login successful"
  },
  {
    "test Name": "Invalid login",
    "username": "testproject@gmail.com",
    "password": "wrongPassword",
    "expectedResult": "Login failed"
  }
]
```

### Extended Format (loginDataExtended.json)

```json
[
  {
    "testName": "Valid Login - Happy Path",
    "testID": "LOGIN_001",
    "username": "testproject@gmail.com",
    "password": "test@1234",
    "expectedResult": "Login successful",
    "expectedURL": "account/account",
    "expectedErrorMessage": "",
    "tags": ["smoke", "critical"]
  }
]
```

## Implementation

### 1. Load Test Data Synchronously

```typescript
const loadLoginTestData = (): any[] => {
  const jsonFilePath = path.resolve(__dirname, "../testdata/loginData.json");
  const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
  return JSON.parse(fileContent);
};

const loginTestData = loadLoginTestData();
```

### 2. Create Tests with forEach Loop

```typescript
loginTestData.forEach((testData) => {
  test(`Login Test: ${testData["test Name"]}`, async ({ page }) => {
    // Fill login form with data from JSON
    await loginPage.fillLoginForm(testData.username, testData.password);

    // Submit login form
    await loginPage.submitLoginForm();

    // Verify based on expected result
    if (testData.expectedResult.includes("successful")) {
      // Verify successful login
      await page.waitForLoadState("networkidle");
      const currentUrl = page.url();
      expect(currentUrl).not.toContain("login");
    } else if (testData.expectedResult.includes("failed")) {
      // Verify failed login
      const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
      expect(isErrorDisplayed).toBeTruthy();
    }
  });
});
```

### 3. Run Tests

```bash
# Run all data-driven tests
npx playwright test tests/dataDrivanTesting.spec.ts

# Run with specific tag
npx playwright test --grep @smoke

# Run in headed mode
npx playwright test tests/dataDrivanTesting.spec.ts --headed

# Run with specific browser
npx playwright test tests/dataDrivanTesting.spec.ts --project=chromium
```

## Advanced Patterns

### Pattern 1: Filtering Data by Tags

```typescript
const smokeTests = loginTestData.filter((test) => test.tags?.includes("smoke"));

smokeTests.forEach((testData) => {
  test(`Smoke: ${testData.testName}`, async ({ page }) => {
    // Test implementation
  });
});
```

### Pattern 2: Parameterized Testing

```typescript
const testCases = [
  { username: "user@example.com", password: "pass123", expectError: false },
  { username: "invalid", password: "", expectError: true },
];

testCases.forEach((testCase, index) => {
  test(`Login Test #${index + 1}`, async ({ page }) => {
    // Test implementation
  });
});
```

### Pattern 3: Dynamic Test Names

```typescript
loginTestData.forEach((testData) => {
  const testName = `${testData.testID} - ${testData.testName}`;

  test(testName, async ({ page }) => {
    // Test with clear identification
  });
});
```

## Best Practices

✅ **Keep Data Separate from Logic** - Store all test data in JSON files  
✅ **Use Descriptive Field Names** - Make data fields self-explanatory  
✅ **Add Metadata** - Include testID, tags, description fields  
✅ **Validate Data Schema** - Ensure consistent structure across all records  
✅ **Use Relative Paths** - Handle different working directories gracefully  
✅ **Handle Edge Cases** - Test with empty strings, special characters, etc.  
✅ **Document Data Purpose** - Add comments explaining what each dataset tests

## Common Pitfalls to Avoid

❌ **Async/Await Issues** - Use `readFileSync` for data loading in describe blocks  
❌ **File Path Issues** - Always use `path.resolve(__dirname, ...)` for absolute paths  
❌ **Large Data Sets** - Keep JSON files reasonable in size (< 1MB)  
❌ **Hardcoding Paths** - Store paths as constants for maintainability  
❌ **Missing Error Handling** - Always handle file read errors gracefully

## Running Data-Driven Tests

### Current Status

✅ Basic Login Data-Driven Tests: **4 tests passed**

- Valid Login Test
- Invalid Login Test
- 2 Concurrent Variants Testing

### Test Output Example

```
Running 4 tests using 4 workers

  ✓ Data Driven Testing - Login › Login Test: valid login (8.7s)
  ✓ Data Driven Testing - Login › Login Test: Invalid login (7.0s)
  ✓ Data Driven Testing - Concurrent Login › Concurrent Login: Invalid login (10.7s)
  ✓ Data Driven Testing - Concurrent Login › Concurrent Login: valid login (13.1s)

  4 passed (13.9s)
```

## Adding New Test Cases

To add new test cases:

1. **Edit JSON file** - Add new object to the array in `loginData.json` or `loginDataExtended.json`
2. **Follow format** - Match the existing field structure
3. **Add tags** - Use tags for filtering (optional)
4. **Run tests** - New tests will automatically be generated

Example:

```json
{
  "testName": "Case Sensitivity Test",
  "testID": "LOGIN_007",
  "username": "TestProject@Gmail.com",
  "password": "test@1234",
  "expectedResult": "Login successful",
  "tags": ["regression"]
}
```

## Files Reference

- **dataDrivanTesting.spec.ts** - Main test file with data-driven implementation
- **loginData.json** - Basic login test data
- **loginDataExtended.json** - Extended test data with metadata
- **dataProviders.ts** - Utility class for reading test data
