import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { RegistrationPage } from "../pages/RegistrationPage";
import { faker } from "@faker-js/faker";
import { generateRandomData } from "../utils/randomDataGenerator";
import { LogoutPage } from "../pages/LogoutPage";

test.describe("Account Registration Tests", () => {
  let homePage: HomePage;
  let registrationPage: RegistrationPage;
  let testConfig: TestConfig;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
    // ✅ Initialize page objects
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    testConfig = new TestConfig();
    logoutPage = new LogoutPage(page);

    // ✅ Open application
    await page.goto(testConfig.appUrl);

    // ✅ Verify home page
    await homePage.isHomePageDisplayed();
  });

  test("TC01: Successful account registration", async ({ page }) => {
    // ✅ Navigate to Register page
    await homePage.clickRegisterLink();

    // ✅ Verify navigation
    await expect(page).toHaveURL(/register/);

    // 🔥 Generate test data
    const user = generateRandomData(faker, 1)[0];
    console.log("Generated User:", user);

    // 🔥 Fill registration form
    await registrationPage.fillRegistrationForm(user);

    // 🔥 Submit form
    await registrationPage.submitRegistrationForm();

    // ✅ Validate success message
    await expect(
      page.locator("h1").filter({ hasText: "Your Account Has Been Created!" }),
    ).toContainText("Your Account Has Been Created!");

    //Logout after registration
    await logoutPage.clickLogoutLink();
  });

  test("TC02: Registration with existing email", async ({ page }) => {
    // ✅ Navigate to Register page
    await homePage.clickRegisterLink();

    // ✅ Verify navigation
    await expect(page).toHaveURL(/register/);

    // 🔥 Generate test data
    const user1 = generateRandomData(faker, 1)[0];
    console.log("Generated User:", user1);

    // 🔥 Use existing email from test config
    registrationPage.fillRegistrationForm(user1);
    await registrationPage.enterFirstName(user1.name);
    await registrationPage.enterLastName(user1.lastName);
    await registrationPage.enterEmail(testConfig.email);
    await registrationPage.enterMobileNumber(user1.phone);
    await registrationPage.enterPassword("Test@123");
    await registrationPage.enterConfirmPassword("Test@123");
    await registrationPage.checkNewsletterSubscription();
    await registrationPage.checkPrivacyPolicy();
    await registrationPage.submitRegistrationForm();

    // ✅ Validate error message for existing email
    await expect(page.locator(".alert-danger")).toContainText(
      "Warning: E-Mail Address is already registered!",
    );
  });
  test("TC03: Register with only Required Fields", async ({ page }) => {
    // ✅ Navigate to Register page
    await homePage.clickRegisterLink();

    // ✅ Verify navigation
    await expect(page).toHaveURL(/register/);

    // 🔥 Generate test data
    const user2 = generateRandomData(faker, 1)[0];
    console.log("Generated User:", user2);

    await registrationPage.enterFirstName(user2.name);
    await registrationPage.enterLastName(user2.lastName);
    await registrationPage.enterEmail(user2.email);
    await registrationPage.enterMobileNumber(user2.phone);
    await registrationPage.enterPassword("Test@123");
    await registrationPage.enterConfirmPassword("Test@123");
    await registrationPage.checkPrivacyPolicy();
    await registrationPage.submitRegistrationForm();

    // ✅ Validate success message
    await expect(
      page.locator("h1").filter({ hasText: "Your Account Has Been Created!" }),
    ).toContainText("Your Account Has Been Created!");

    //Logout after registration
    await logoutPage.clickLogoutLink();
  });
});
