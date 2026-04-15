import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator("#input-password");
    this.loginButton = page.locator("input[value='Login']");
    this.forgotPasswordLink = page.getByRole("link", {
      name: "Forgotten Password",
    });
    this.errorMessage = page.locator(".alert.alert-danger");
  }

  // 🔥 Fill login form with email and password
  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  // 🔥 Submit login form
  async submitLoginForm() {
    await this.loginButton.click();
  }

  // 🔥 Login with email and password
  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.submitLoginForm();
  }

  // 🔥 Click forgot password link
  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
  }

  // 🔥 Get error message text
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  // 🔥 Check if error message is displayed
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  // 🔥 Clear email input
  async clearEmailInput() {
    await this.emailInput.clear();
  }

  // 🔥 Clear password input
  async clearPasswordInput() {
    await this.passwordInput.clear();
  }
}
