# 🛒 Ecommerce E2E Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-v1.59.1-2D3748?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?logo=typescript&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-16%2B%20Tests-brightgreen)
![License](https://img.shields.io/badge/License-ISC-blue)

A comprehensive **End-to-End (E2E) automation testing framework** for NopCommerce e-commerce platform using Playwright with TypeScript. Includes data-driven testing, Page Object Model design pattern, and CI/CD integration.

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Framework** | Playwright v1.59.1 |
| **Language** | TypeScript |
| **Test Suites** | 4 |
| **Total Tests** | 16+ |
| **Data-Driven Cases** | 14 |
| **Page Objects** | 8 |
| **Test Coverage** | Login, Registration, Shopping, Checkout |
| **Browsers** | Chromium, Firefox, Safari, Edge |
| **CI/CD** | GitHub Actions ready |
| **Parallel Execution** | ✅ Enabled |
| **Reporting** | HTML, XML (JUnit), Allure |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/KetanChavan0308/Ecommerce-e2e-playwright.git
cd Ecommerce-e2e-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test tests/dataDrivanTesting.spec.ts

# Run with browser visible
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run specific test by name
npx playwright test -g "Login Test"
```

### View Reports

```bash
# HTML Report
npx playwright show-report

# Allure Report (if configured)
npx allure serve reports/allure-results
```

## 📁 Project Structure

```
Ecommerce-e2e-playwright/
│
├── tests/                              # Test files
│   ├── Login.spec.ts                  # Login scenarios
│   ├── dataDrivanTesting.spec.ts      # 14 data-driven test cases
│   ├── purchaseOrder.spec.ts          # E2E purchase workflow (add to cart, checkout)
│   └── AccountRegistration.spec.ts    # User registration tests
│
├── pages/                              # Page Object Models (POM)
│   ├── LoginPage.ts                   # Login form interactions
│   ├── HomePage.ts                    # Home page navigation
│   ├── ProductPage.ts                 # Product browsing & "Add to Cart" with fallback verification
│   ├── ShoppingCartPage.ts            # Cart management & item removal
│   ├── CheckoutPage.ts                # Checkout process & payment
│   ├── MyAccountPage.ts               # User account & orders
│   ├── RegistrationPage.ts            # User registration form
│   └── LogoutPage.ts                  # Logout functionality
│
├── testdata/                           # Test data
│   ├── loginData.json                 # 14 data-driven login test cases (JSON)
│   └── loginData.csv                  # CSV format test data
│
├── utils/                              # Utility functions
│   ├── dataProviders.ts               # JSON/CSV data loaders (sync & async)
│   └── randomDataGenerator.ts         # Faker.js wrapper for random data
│
├── reports/                            # Test reports & artifacts
│   ├── README.md                       # Reports documentation
│   ├── html/                           # HTML test reports
│   ├── xml/                            # JUnit XML reports (CI/CD)
│   ├── allure-results/                 # Allure report data
│   ├── test-results/                   # Videos, screenshots, traces
│   ├── summaries/                      # Executive summaries
│   └── archive/                        # Historical reports
│
├── .github/workflows/                  # GitHub Actions CI/CD
│   └── playwright.yml                  # Automated test execution
│
├── playwright.config.ts                # Playwright configuration
├── test.config.ts                      # Test environment settings
├── package.json                        # Project dependencies
├── package-lock.json                   # Locked dependency versions
├── .gitignore                          # Git ignore rules
├── DATA_DRIVEN_TESTING_GUIDE.md       # Data-driven testing guide
└── README.md                           # This file
```

## 🧪 Test Suites

### 1. Login Tests (`tests/Login.spec.ts`)
User authentication and login workflows with various scenarios.

### 2. Data-Driven Testing (`tests/dataDrivanTesting.spec.ts`)
**14 comprehensive test cases** covering:
- ✅ Valid/Invalid credentials
- ✅ Email format validation
- ✅ Password requirements
- ✅ Empty field validation
- ✅ Security testing (SQL Injection, XSS)
- ✅ Boundary value testing
- ✅ Special character handling

### 3. Purchase Order (`tests/purchaseOrder.spec.ts`)
End-to-end purchase workflow:
- Product browsing
- Add to cart with fallback verification
- Cart management
- Checkout process

### 4. Account Registration (`tests/AccountRegistration.spec.ts`)
User registration and account creation flows.

## 📋 Test Data

### JSON Format (`testdata/loginData.json`)
```json
[
  {
    "testName": "Email Not Registered",
    "username": "unknown@example.com",
    "password": "validPassword123",
    "expectedResult": "failed"
  },
  {
    "testName": "Invalid Password",
    "username": "admin@yourstore.com",
    "password": "wrongPassword",
    "expectedResult": "failed"
  },
  ...
]
```

### CSV Format (`testdata/loginData.csv`)
Headers: `testName`, `username`, `password`, `expectedResult`

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

| Setting | Value | Purpose |
|---------|-------|---------|
| Test Timeout | 120 seconds | Timeout per test |
| Parallel | Enabled | Faster execution |
| Retries | 2 (CI), 1 (Local) | Flaky test handling |
| Screenshot | On failure | Storage optimization |
| Video | On failure | Capture failures |
| Trace | On first retry | Detailed debugging |

### Supported Browsers

- ✅ **Chromium** (Default)
- 🦊 Firefox (Optional)
- 🍎 Safari/WebKit (Optional)
- 🌐 Chrome (Optional)
- 🌐 Edge (Optional)

Enable in `playwright.config.ts`:
```typescript
projects: [
  { name: "Chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "WebKit", use: { ...devices["Desktop Safari"] } },
  { name: "Chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
  { name: "Edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
]
```

## 🔄 CI/CD Integration

### GitHub Actions (Pre-configured)

Tests run automatically on:
- Push to `main` or `master` branches
- Pull requests

Workflow file: `.github/workflows/playwright.yml`

### Manual CI/CD Setup

#### Jenkins
```groovy
pipeline {
  stages {
    stage('Install') {
      sh 'npm ci && npx playwright install'
    }
    stage('Test') {
      sh 'npx playwright test'
    }
  }
  post {
    always {
      junit 'reports/results.xml'
    }
  }
}
```

#### Azure DevOps
```yaml
- script: npm ci && npx playwright install
- script: npx playwright test
- task: PublishTestResults@2
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: 'reports/results.xml'
```

## 📊 Reporting

### HTML Report
Interactive Playwright report with test details, screenshots, videos, and traces.
```bash
npx playwright show-report
```

### Allure Report
Advanced analytics and trend analysis.
```bash
npx allure serve reports/allure-results
```

### JUnit XML
Integration with CI/CD systems:
```bash
cat reports/results.xml
```

For detailed report documentation, see [reports/README.md](reports/README.md)

## 🛠️ Utilities

### DataProvider
Load test data from JSON or CSV:
```typescript
import DataProvider from "./utils/dataProviders";

// Sync loading (module level)
const testData = DataProvider.getDataFromJsonSync("testdata/loginData.json");

// Async loading (in async functions)
const csvData = await DataProvider.getDataFromCsv("testdata/loginData.csv");
```

### Random Data Generator
Generate realistic test data using Faker.js:
```typescript
import DataGenerator from "./utils/randomDataGenerator";

const randomEmail = DataGenerator.randomEmail();     // random@example.com
const randomPassword = DataGenerator.randomPassword();  // Xt9@mK2pL5
const randomPhone = DataGenerator.randomPhone();     // +1-555-123-4567
```

## 🔍 Key Features

✅ **Page Object Model** - Maintainable & scalable test automation  
✅ **Data-Driven Testing** - 14 comprehensive test scenarios  
✅ **Fallback Verification** - Reliable cart verification with UI shortcuts  
✅ **Parallel Execution** - Run tests faster simultaneously  
✅ **Smart Retries** - Reduce flaky test failures  
✅ **Rich Reporting** - HTML, XML, Allure formats  
✅ **Trace Recording** - Debug failures with step-by-step recording  
✅ **CI/CD Ready** - GitHub Actions pre-configured  
✅ **TypeScript Support** - Full type safety & intellisense  
✅ **Random Data Generation** - Faker.js integration  

## 🚨 Troubleshooting

### Browser Not Found
```bash
npx playwright install --with-deps
```

### Tests Timeout
- Check network connectivity
- Increase timeout in `playwright.config.ts`:
  ```typescript
  timeout: 180000  // 3 minutes
  ```

### Report Not Generated
1. Verify `reports/` directory exists
2. Check `playwright.config.ts` reporter configuration
3. Run with verbose logging: `npx playwright test --reporter=verbose`

### Allure Report Empty
```bash
npm install --save-dev allure-playwright
npx allure serve reports/allure-results
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **@playwright/test** | ^1.59.1 | Testing framework |
| **@types/node** | ^25.5.2 | TypeScript Node types |
| **allure-playwright** | ^3.7.0 | Advanced reporting |
| **@faker-js/faker** | ^10.4.0 | Random test data |
| **csv-parse** | ^6.2.1 | CSV parsing |
| **xlsx** | ^0.18.5 | Excel support |

## 📖 Documentation

- [Data-Driven Testing Guide](DATA_DRIVEN_TESTING_GUIDE.md) - Comprehensive data-driven testing documentation
- [Reports Documentation](reports/README.md) - Test reports and CI/CD integration
- [Playwright Official Docs](https://playwright.dev)
- [NopCommerce Documentation](https://www.nopcommerce.com/docs)

## 👤 Author

**Ketan Chavan**  
GitHub: [@KetanChavan0308](https://github.com/KetanChavan0308)

## 📝 License

This project is licensed under the ISC License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🏢 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Apr 15, 2026 | Initial release with 16+ tests |

## 📞 Support

- 🐛 [Report Issues](https://github.com/KetanChavan0308/Ecommerce-e2e-playwright/issues)
- 💬 [Discussions](https://github.com/KetanChavan0308/Ecommerce-e2e-playwright/discussions)
- 📧 Email maintainer for urgent issues

---

**Last Updated**: April 15, 2026  
**Status**: ✅ Active Development  
**Build**: Passing (GitHub Actions)

