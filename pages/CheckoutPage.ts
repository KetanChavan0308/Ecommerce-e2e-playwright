import { test, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  // Define locators for the checkout page elements
  private readonly page: Page;
  private readonly checkoutHeader: Locator;
  private readonly checkoutButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly countrySelect: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    // Initialize locators for the checkout page elements
    this.page = page;
    // Define locators for the checkout page elements
    this.checkoutHeader = page.getByRole("heading", { name: "Checkout" });
    this.checkoutButton = page.locator("a.btn.btn-primary");
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.addressInput = page.getByLabel("Address");
    this.cityInput = page.getByLabel("City");
    this.postalCodeInput = page.getByLabel("Postal Code");
    this.countrySelect = page.getByLabel("Country");
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }
  // Method to check if the checkout page is displayed
  async isCheckoutPageDisplayed(): Promise<boolean> {
    return await this.checkoutHeader.isVisible();
  }
}
