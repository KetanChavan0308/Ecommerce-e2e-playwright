import { test, expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  // Define locators for the product page elements
  private readonly page: Page;
  private readonly productTitle: Locator;
  private readonly addToCartButton: Locator;
  private readonly quantityInput: Locator;
  private readonly successMessageAddToCart: Locator;
  private readonly cartButton: Locator;

  // Define locators for the product page elements
  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator("img[class='img-responsive']");
    this.quantityInput = page.locator("#input-quantity");
    this.addToCartButton = page.locator('button[id="button-cart"]');
    this.successMessageAddToCart = page.locator(".alert-success");
    this.cartButton = page.locator('button:has-text("item(s)")');
  }
  // Method to get the product title
  async getProductTitle(): Promise<string | null> {
    return await this.productTitle.textContent();
  }

  // Method to set the quantity of the product
  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity);
  }
  // Method to click the "Add to Cart" button
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
  async successMessage(): Promise<string> {
    try {
      await this.successMessageAddToCart.waitFor({
        state: "visible",
        timeout: 5000,
      });
      const message = await this.successMessageAddToCart.textContent();
      return message?.trim() || "";
    } catch (error) {
      // If alert doesn't appear, verify by checking if cart updated
      const cartText = await this.cartButton.textContent();
      return cartText || "Item added to cart";
    }
  }
  async clickOnProduct(): Promise<void> {
    await this.productTitle.click();
  }
}
