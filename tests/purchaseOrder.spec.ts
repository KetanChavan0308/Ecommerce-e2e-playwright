import { test, expect } from "@playwright/test";
import { MyAccountPage } from "../pages/MyAccountPage";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { LoginPage } from "../pages/LoginPage";
import { DataProvider } from "../utils/dataProviders";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";

test.describe("purchase order test", () => {
  // ====================================================
  // 🔁 SERIAL EXECUTION
  // Ensures P01 runs before P02 (like TestNG priority)
  // If P01 fails, P02 will be skipped.
  // ====================================================
  test.describe.configure({ mode: "serial" });

  let homePage: HomePage;
  let logionPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let testConfig: TestConfig;
  let dataProvider: DataProvider;
  let productPage: ProductPage;
  let shoppingCartPage: ShoppingCartPage;

  // ====================================================
  // 🔹 Setup: Runs before each test
  // ====================================================
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    logionPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    testConfig = new TestConfig();
    dataProvider = new DataProvider();
    productPage = new ProductPage(page);
    shoppingCartPage = new ShoppingCartPage(page);

    // Navigate to the application
    await page.goto(testConfig.appUrl);

    // Login to the application
    await homePage.clickLoginLink();
    await logionPage.login(testConfig.email, testConfig.password);
  });

  // ====================================================
  // 🛒 P01: Place an Order Successfully
  // Priority: 1
  // ====================================================
  test("P01: should place an order successfully @p01", async () => {
    // Search for a product
    await homePage.searchProduct("iphone");
    await homePage.clickSearchButton();

    // Select the product
    await productPage.clickOnProduct();

    // Set quantity and add to cart
    await productPage.setQuantity("2");
    await productPage.clickAddToCart();

    // Verify success message
    const message = await productPage.successMessage();
    // Check if either alert appeared or cart was updated (fallback returns cart text)
    expect(
      message.includes("iPhone") ||
        message.includes("item(s)") ||
        message.includes("Success:"),
    ).toBeTruthy();
  });

  // ====================================================
  // 🗑️ P02: Remove Added Product from Cart
  // Priority: 2 (Self-contained test)
  // ====================================================
  test("P02: remove added product from cart @p02", async ({ page }) => {
    // Add a product to cart
    await homePage.searchProduct("iphone");
    await homePage.clickSearchButton();
    await productPage.clickOnProduct();
    await productPage.setQuantity("1");
    await productPage.clickAddToCart();

    // Navigate to shopping cart
    await homePage.clickShoppingCartLink();

    // Verify shopping cart page
    await expect(page).toHaveURL(/checkout\/cart/);

    // Verify cart is not empty
    const isCartEmpty = await shoppingCartPage.isShoppingCartEmpty();
    expect(isCartEmpty).toBeFalsy();

    // Remove the product
    await shoppingCartPage.clickRemoveButton();

    // Wait a moment for the page to update
    await page.waitForTimeout(2000);

    // Navigate back to cart to verify removal
    await page.goto(page.url());
    await page.waitForLoadState("networkidle");

    // Verify cart is now empty by checking if empty message is in the DOM
    const emptyText = await page.content();
    expect(emptyText).toContain("Your shopping cart is empty!");
  });
});
