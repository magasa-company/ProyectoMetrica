import { browser, by, element } from 'protractor';

export class CollectorDetails {
  navigateTo(): Promise<unknown> {
    browser.get(`${browser.baseUrl}/coleccionistas`);
    return element(by.css('app-table tbody td button')).click() as Promise<void>;
  }

  isNameVisible(): Promise<boolean> {
    return element(by.css('app-detail-header h1')).isDisplayed() as Promise<boolean>;
  }

  getTitleColleText(): Promise<string> {
    return element(by.css('#colectionTitle')).getText() as Promise<string>;
  }

  getTitleMusiText(): Promise<string> {
    return element(by.css('#musicianTitle')).getText() as Promise<string>;
  }

  getTableHeaders(): Promise<string> {
    return element.all(by.css('app-table thead th')).getText() as Promise<string>;
  }

  getTableRowSize(): Promise<number> {
    return element.all(by.css('app-table tbody tr')).count() as Promise<number>;
  }

  clickNewCollectionsButton(): Promise<unknown> {
    return element(by.css('button[id="colectionadd"]')).click() as Promise<unknown>;
  }

  clickNewMusiciansButton(): Promise<unknown> {
    return element(by.css('button[id="musicianadd"]')).click() as Promise<unknown>;
  }

  clickAtrasButton(): Promise<unknown> {
    return element(by.css('button[id="returnCollertor"]')).click() as Promise<unknown>;
  }



}
