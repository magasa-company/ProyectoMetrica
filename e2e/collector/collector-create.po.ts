import { browser, by, element, ExpectedConditions, $ } from 'protractor';


export class CollectorCreate {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/coleccionistas/agregar`) as Promise<unknown>;
  }

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

  getTitleText(): Promise<string> {
    return element(by.css('app-list-header h1')).getText() as Promise<string>;
  }

  activateName(): Promise<unknown> {
    return element(by.css('#name')).click() as Promise<unknown>;
  }

  activateEmail(): Promise<unknown> {
    return element(by.css('#email')).click() as Promise<unknown>;
  }

  activateTelephone(): Promise<unknown> {
    return element(by.css('#telephone')).click() as Promise<unknown>;
  }

  setName(text: string): Promise<unknown> {
    return element(by.css('#name')).sendKeys(text) as Promise<unknown>;
  }

  clickSubmitButton(): Promise<void> {
      return element.all(by.css('button[type="submit"]')).click() as Promise<void>;
  }

  clickCancelButton(): Promise<void> {
      return element.all(by.css('button[type="button"]')).click() as Promise<void>;
  }

  getNameRequiredError(): Promise<string> {
    return element(by.css('.nameRequiredError')).getText() as Promise<string>;
  }

  getEmailRequiredError(): Promise<string> {
    return element(by.css('.emailRequiredError')).getText() as Promise<string>;
  }

  getTelephoneRequiredError(): Promise<string> {
    return element(by.css('.telephoneRequiredError')).getText() as Promise<string>;
  }

  getNamePatternError(): Promise<string> {
     return element(by.css('.namePatternError')).getText() as Promise<string>;
  }

  getEmailPatternError(): Promise<string> {
    return element(by.css('#emailPatternError')).getText() as Promise<string>;
  }

  getTelephonePatternError(): Promise<string> {
    return element(by.css('#telephonePatternError')).getText() as Promise<string>;
  }


















  fillName(name: string): void {
    element(by.css('input[id="name"]')).sendKeys(name);
    $('body').click();
  }

  fillEmail(email: string): void {
    element(by.css('input[id="email"]')).sendKeys(email);
    $('body').click();
  }

  fillTelephone(telephone: string): void {
    element(by.css('input[id="telephone"]')).sendKeys(telephone);
    $('body').click();
  }

  getName(): Promise<string> {
    return element(by.css('#name')).getText() as Promise<string>;
  }

  getEmail(): Promise<string> {
    return element(by.css('#email')).getText() as Promise<string>;
  }

  getTelephone(): Promise<string> {
    return element(by.css('#telephone')).getText() as Promise<string>;
  }



  isNameValid(): Promise<boolean> {
    return element(by.css('input[id="name"]'))
      .getAttribute('class')
      .then((className) => className.includes('is-valid')) as Promise<boolean>;
  }
/*
  isImageValid(): Promise<boolean> {
    return element(by.css('input[name="image"]'))
      .getAttribute('class')
      .then((className) => className.includes('is-valid')) as Promise<boolean>;
  }

  isBirthDateValid(): Promise<boolean> {
    return element(by.css('input[name="birthDate"]'))
      .getAttribute('class')
      .then((className) => className.includes('is-valid')) as Promise<boolean>;
  }

  isDescriptionValid(): Promise<boolean> {
    return element(by.css('textarea[name="description"]'))
      .getAttribute('class')
      .then((className) => className.includes('is-valid')) as Promise<boolean>;
  }
*/

/*
  fillImage(url: string): void {
    element(by.css('input[name="image"]')).sendKeys(url);
    $('body').click();
  }

  fillBirthDate(date: string): void {
    element(by.css('input[name="birthDate"]')).sendKeys(date);
    $('body').click();
  }

  fillDescription(description: string): void {
    element(by.css('textarea[name="description"]')).sendKeys(description);
    $('body').click();
  }

  isSubmitEnabled(): Promise<boolean> {
    return element(by.css('#submitBtn')).isEnabled() as Promise<boolean>;
  }

  clickSubmitButton(): Promise<void> {
    return element(by.css('#submitBtn')).click() as Promise<void>;
  }

  clickCancelButton(): Promise<void> {
    return element(by.css('#cancelBtn')).click() as Promise<void>;
  }*/
}
