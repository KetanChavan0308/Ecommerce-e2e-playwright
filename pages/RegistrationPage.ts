import { Page, Locator } from "@playwright/test";
import { UserData } from "../utils/randomDataGenerator";

export class RegistrationPage {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly newsletterRadioBtn: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByLabel("Last Name");
    this.emailInput = page.getByRole("textbox", { name: "E-Mail" });
    this.mobileNumberInput = page.getByLabel("Telephone", { exact: true });
    this.newsletterRadioBtn = page.locator(
      "input[name='newsletter'][value='1']",
    );
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.confirmPasswordInput = page.getByLabel("Password Confirm", {
      exact: true,
    });
    this.privacyPolicyCheckbox = page.locator("input[name='agree']");
    this.registerButton = page.locator("input.btn.btn-primary");
  }

  // 🔥 Fill registration form
  async fillRegistrationForm(user: UserData) {
    await this.firstNameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.mobileNumberInput.fill(user.phone);

    await this.newsletterRadioBtn.check();

    await this.passwordInput.fill("Test@123");
    await this.confirmPasswordInput.fill("Test@123");

    await this.privacyPolicyCheckbox.check();
  }

  // 🔥 Submit form
  async submitRegistrationForm() {
    await this.registerButton.click();
  }
  // enter email separately for negative test case
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }
  //enter password and confirm password separately for negative test case
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  //enter different confirm password for negative test case
  async enterConfirmPassword(password: string) {
    await this.confirmPasswordInput.fill(password);
  }

  //enter first name and last name separately for negative test case
  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }
  //enter last name separately for negative test case
  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  //enter mobile number separately for negative test case
  async enterMobileNumber(mobileNumber: string) {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  //check newsletter subscription for negative test case
  async checkNewsletterSubscription() {
    await this.newsletterRadioBtn.check();
  }

  //check privacy policy for negative test case
  async checkPrivacyPolicy() {
    await this.privacyPolicyCheckbox.check();
  }
}
