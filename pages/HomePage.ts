import { test, expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  //locators
  private readonly myAccountLink: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly wishlistLink: Locator;
  private readonly searchProductInput: Locator;
  private readonly searchButton: Locator;
  private readonly checkoutLink: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.locator('span:has-text("My Account")');
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.shoppingCartLink = page.getByText("Shopping Cart", { exact: true });
    this.wishlistLink = page.getByText("Wish List (0)", { exact: true });
    this.searchProductInput = page.getByRole("textbox", { name: /Search/i });
    this.searchButton = page.locator("i.fa.fa-search:visible");
    this.checkoutLink = page.locator('span:has-text("Checkout")');
  }

  //methods
  async isHomePageDisplayed() {
    await expect(this.myAccountLink).toBeVisible();
  }
  // Click on My Account link and then click on Login link
  async clickLoginLink() {
    await this.myAccountLink.click();
    await this.loginLink.click();
  }

  // Click on My Account link and then click on Register link
  async clickRegisterLink() {
    await this.myAccountLink.click();
    await this.registerLink.click();
  }
  // Click on Shopping Cart link
  async clickShoppingCartLink() {
    await this.shoppingCartLink.click();
  }
  // Click on Wish List link
  async clickWishlistLink() {
    await this.wishlistLink.click();
  }
  // Search for a product using the search input and button
  async searchProduct(productName: string) {
    await this.searchProductInput.fill(productName);
    await this.searchButton.click();
  }
  // Click on Checkout link
  async clickCheckoutLink() {
    await this.checkoutLink.click();
  }
  async clickSearchButton() {
    await this.searchButton.click();
  }
}
