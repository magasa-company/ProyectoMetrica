import { browser, by, element, ExpectedConditions } from 'protractor';

export class CollectorList {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/coleccionistas`) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-list-header h1')).getText() as Promise<string>;
  }

  getTableHeaders(): Promise<string> {
    return element.all(by.css('app-table thead th')).getText() as Promise<string>;
  }

  getTableRowSize(): Promise<number> {
    return element.all(by.css('app-table tbody tr')).count() as Promise<number>;
  }

  clickNewCollectorButton(): Promise<unknown> {
    return element(by.css('button[aria-label="Agregar item"]')).click() as Promise<unknown>;
  }

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

}
