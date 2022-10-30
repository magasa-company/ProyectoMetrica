import { browser, by, element, ExpectedConditions } from 'protractor';

export class CollectorDetails {
  navigateTo(): Promise<void> {
    browser.get(`${browser.baseUrl}/coleccionistas`);

    return element(by.css('app-table tbody td button')).click() as Promise<void>;
  }

  /*isNameVisible(): Promise<boolean> {
    return element(by.css('app-detail-heade Home')).isDisplayed() as Promise<boolean>;
  }*/

  getTableHeaders(): Promise<string> {
    return element.all(by.css('app-table thead h2')).getText() as Promise<string>;
  }


  getTitleText(): Promise<string> {
    return element(by.css('app-list-header h2')).getText() as Promise<string>;
  }

  getTableRowSize(): Promise<number> {
    return element.all(by.css('app-table tbody tr')).count() as Promise<number>;
  }
/*
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
  }*/

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

}
