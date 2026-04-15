import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LogoutPage } from "../pages/LogoutPage";

test.describe("Login Page", () => {
  let loginPage: LoginPage;
  let testConfig: TestConfig;
  let homePage: HomePage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    testConfig = new TestConfig();
    homePage = new HomePage(page);
    logoutPage = new LogoutPage(page);
    await page.goto(testConfig.appUrl);
    await homePage.clickLoginLink();
  });

  test("TC01: should display error message for invalid password", async () => {
    await loginPage.login(testConfig.email, "invalidPassword");
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });
  test("TC02: should display error message for invalid email", async () => {
    await loginPage.login("invalidEmail@example.com", testConfig.password);
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });

  test("TC03: should login successfully with valid credentials", async ({
    page,
  }) => {
    await loginPage.login(testConfig.email, testConfig.password);
    await expect(page).toHaveURL(
      `${testConfig.appUrl}index.php?route=account/account`,
    );
    await logoutPage.clickLogoutLink();
  });
  test("TC04: should empty email and password fields", async () => {
    await loginPage.fillLoginForm("", "");
    await loginPage.submitLoginForm();
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });

  test("TC05: should empty email field", async () => {
    await loginPage.fillLoginForm("", testConfig.password);
    await loginPage.submitLoginForm();
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });

  test("TC06: should empty password field", async () => {
    await loginPage.fillLoginForm(testConfig.email, "");
    await loginPage.submitLoginForm();
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });

  test("TC07: should display error message for wrong email format", async () => {
    await loginPage.fillLoginForm("invalidEmailFormat", testConfig.password);
    await loginPage.submitLoginForm();
    expect(await loginPage.getErrorMessage()).toBe(
      "Warning: No match for E-Mail Address and/or Password.",
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
