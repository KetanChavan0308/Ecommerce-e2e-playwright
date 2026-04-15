import { test, expect, Locator, Page } from "@playwright/test";

export class MyAccountPage {
  private readonly page: Page;
  private readonly accountHeader: Locator;
  private readonly editAccountLink: Locator;
  private readonly changePasswordLink: Locator;
  private readonly orderHistoryLink: Locator;
  private readonly logoutLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.accountHeader = page.locator('h2:has-text("My Account")');
    this.editAccountLink = page.getByText("Edit Account", { exact: true });
    this.changePasswordLink = page
      .locator("a")
      .filter({ hasText: "Password" })
      .last();
    this.orderHistoryLink = page.getByText("Order History", { exact: true });
    this.logoutLink = page.getByText("Logout", { exact: true });
  }
  //actions and assertions for My Account page
  async isAccountHeaderVisible(): Promise<boolean> {
    return await this.accountHeader.isVisible();
  }
  async clickEditAccount() {
    await this.editAccountLink.click();
  }
  async clickChangePassword() {
    await this.changePasswordLink.click();
  }
  async clickOrderHistory() {
    await this.orderHistoryLink.click();
  }
  async clickLogout() {
    await this.logoutLink.click();
  }

  async getAccountHeaderText(): Promise<string> {
    return (await this.accountHeader.textContent()) || "";
  }
}
