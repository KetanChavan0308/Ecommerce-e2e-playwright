import { test, expect, Locator, Page } from "@playwright/test";

export class LogoutPage {
  private readonly page: Page;
  //locators
  private readonly myAccountLink: Locator;
  private readonly logoutLink: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.locator('span:has-text("My Account")');
    this.logoutLink = page.locator("a").filter({ hasText: "Logout" }).last();
  }
  //methods
  async clickLogoutLink() {
    await this.myAccountLink.click();
    await this.logoutLink.click();
  }
}
