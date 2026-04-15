import { test, expect, Page, Locator } from "@playwright/test";
export class ShoppingCartPage {
  //Define Locator for Shopping Cart Page
  private readonly page: Page;
  private readonly shoppingCartHeader: Locator;
  private readonly removeButton: Locator;
  private readonly emptyShoppingCartMassage: Locator;
  //Define Locator
  constructor(page: Page) {
    this.page = page;
    this.shoppingCartHeader = page.locator("#content");
    this.removeButton = page.locator("button.btn.btn-danger:visible");
    this.emptyShoppingCartMassage = page
      .locator("p")
      .filter({ hasText: "Your shopping cart is empty!" })
      .first();
  }
  //Define Methods

  async isShoppingCartHeaderDisplay(): Promise<boolean> {
    return await this.shoppingCartHeader.isVisible();
  }

  async clickRemoveButton() {
    await this.removeButton.click();
  }
  async isShoppingCartEmpty(): Promise<boolean> {
    return await this.emptyShoppingCartMassage.isVisible();
  }
}
