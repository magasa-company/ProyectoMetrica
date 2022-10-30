import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('#welcomeMessage')).getText() as Promise<string>;
  }

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('#welcomeMessage'))), 5000, 'Element taking too long to appear in the DOM');

  }

  getBreadcrumbsCount(): Promise<number> {
    return element.all(by.css('li.breadcrumb-item')).count() as Promise<number>;
  }

  getBreadcrumb(index: number): Promise<string> {
    return element.all(by.css('li.breadcrumb-item>strong'))
      .get(index)
      .getText()
      .then((text) => text.toLowerCase()) as Promise<string>;
  }
}
