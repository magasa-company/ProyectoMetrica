import { browser, by, element } from 'protractor';

export class MusicianDetails {
  navigateTo(): Promise<void> {
    browser.get(`${browser.baseUrl}/musicos`);

    return element(by.css('app-table tbody td button')).click() as Promise<void>;
  }

  isImageVisible(): Promise<boolean> {
    return element(by.css('app-detail-header img')).isDisplayed() as Promise<boolean>;
  }

  isNameVisible(): Promise<boolean> {
    return element(by.css('app-detail-header h1')).isDisplayed() as Promise<boolean>;
  }

  isDescriptionVisible(): Promise<boolean> {
    return element(by.css('app-detail-header p.lead')).isDisplayed() as Promise<boolean>;
  }

  isBirthdayVisible(): Promise<boolean> {
    return element(by.css('app-detail-header dd.h5')).isDisplayed() as Promise<boolean>;
  }

  getNameText(): Promise<string> {
    return element(by.css('app-detail-header h1')).getText() as Promise<string>;
  }

  getBreadcrumbsText(): Promise<string> {
    return element.all(by.css('app-breadcrumbs li')).getText() as Promise<string>;
  }

  getTableHeaders(): Promise<string> {
    return element.all(by.css('app-table thead th')).getText() as Promise<string>;
  }

  getTableRowSize(): Promise<number> {
    return element.all(by.css('app-table tbody tr')).count() as Promise<number>;
  }
}
