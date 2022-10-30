import { browser, by, element } from 'protractor';

export class MusicianList {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/musicos`) as Promise<unknown>;
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

  clickNewMusicianButton(): Promise<void> {
    return element(by.css('app-list-header button')).click() as Promise<void>;
  }
}
