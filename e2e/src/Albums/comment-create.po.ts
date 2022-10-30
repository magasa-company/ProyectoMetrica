import { browser, by, element, $ } from 'protractor';

export class CommentCreate {
  navigateTo(): Promise<void> {
    browser.get(`${browser.baseUrl}/albumes`);
    element(by.css('app-table tbody td button')).click();
    return element(by.css('#addCommentButton')).click() as Promise<void>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-list-header h1')).getText() as Promise<string>;
  }

  getDescriptionRequiredText(): Promise<string> {
    browser.sleep(100);
    return element(by.css('#emptyDescriptionMessage')).getText() as Promise<string>;
  }

  getDescriptionMaxLengthText(): Promise<string> {
    browser.sleep(100);
    return element(by.css('#maxLengthMessage')).getText() as Promise<string>;
  }

  getCollectorInvalidFeedbackText(): Promise<string> {
    browser.sleep(100);
    return element(by.css('#emptyCollectorIdMessage')).getText() as Promise<string>;
  }

  isCollectorValid(): Promise<boolean> {
    browser.sleep(100);
    return element(by.name('collectorId')).getAttribute('class').then((className) => className.includes('is-valid')) as Promise<boolean>;
  }

  isRatingChecked(option: number): Promise<boolean> {
    return element.all(by.css('input[type="radio"]'))
      .get(option - 1)
      .isSelected() as Promise<boolean>;
  }

  isDescriptionValid(): Promise<boolean> {
    browser.sleep(100);
    return element(by.name('description')).getAttribute('class').then((className) => className.includes('is-valid')) as Promise<boolean>;
  }

  selectOption(option: number): void {
    element(by.name('collectorId')).click();
    element.all(by.css('select[name="collectorId"] option'))
      .get(option - 1)
      .click();

    $('body').click();
  }

  fillDescription(description: string): void {
    element(by.name('description')).sendKeys(description);
    element(by.name('collectorId')).click();
    $('body').click();
  }

  checkRating(option: number): void {
    element.all(by.css('label.btn'))
      .get(option - 1)
      .click();
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
