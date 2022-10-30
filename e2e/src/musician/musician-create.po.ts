import { browser, by, element, $ } from 'protractor';

export class MusicianCreate {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/musicos/agregar`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-list-header h1')).getText() as Promise<string>;
  }

  getInvalidFeedbackText(): Promise<string> {
    return element(by.css('.invalid-feedback')).getText() as Promise<string>;
  }

  isNameValid(): Promise<boolean> {
    return element(by.css('input[name="name"]'))
      .getAttribute('class')
      .then((className) => className.includes('is-valid')) as Promise<boolean>;
  }

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

  fillName(name: string): void {
    element(by.css('input[name="name"]')).sendKeys(name);
    $('body').click();
  }

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
  }
}
