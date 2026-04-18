import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { TestConfig } from "../../test.config";
import loginData from "../../testdata/loginData.json";

// ====================================================
// 📊 Data-Driven Testing - Beginner Friendly
// ====================================================

test.describe("Data Driven Testing - Login (Simple)", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  const config = new TestConfig();

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Navigate to application
    await page.goto(config.appUrl);

    // Navigate to login page
    await homePage.clickLoginLink();
  });

  // Loop through JSON data
  for (const data of loginData) {
    test(`Login Test: ${data.testName}`, async ({ page }) => {
      // Enter credentials
      await loginPage.fillLoginForm(data.username, data.password);

      // Submit login form
      await loginPage.submitLoginForm();

      // Wait for response
      await page.waitForLoadState("networkidle");

      // Validate results
      if (data.expectedResult === "success") {
        // Successful login - verify error message is NOT displayed
        const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBeFalsy();
      } else {
        // Failed login - verify error message is displayed
        const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBeTruthy();
      }

      console.log(`✅ Test: ${data.testName} - Verified`);
    });
  }
});
