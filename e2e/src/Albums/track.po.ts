import { browser, by, element, ExpectedConditions } from 'protractor';

export class TrackCreatePage {

  getPageTitle(): Promise<string> {
    return element(by.css('.featured-title')).getText().then((text) => text.toLowerCase()) as Promise<string>;
  }

  getAlbumTitle(): Promise<string> {
    return element(by.css('.featured-subtitle')).getText().then((text) => text.toLowerCase()) as Promise<string>;
  }

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.tagName('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

  //////
  getnameLabel(): Promise<string> {
    return element(by.css('#nameLabel')).getText() as Promise<string>;
  }

  getName(): Promise<string> {
    return element(by.css('#name')).getText() as Promise<string>;
  }

  setName(text: string): Promise<unknown> {
    return element(by.css('#name')).sendKeys(text) as Promise<unknown>;
  }

  activateName(): Promise<unknown> {
    return element(by.css('#name')).click() as Promise<unknown>;
  }


  /////
  getDurationLabel(): Promise<string> {
    return element(by.css('#durationLabel')).getText() as Promise<string>;
  }

  getDuration(): Promise<string> {
    return element(by.css('#duration')).getText() as Promise<string>;
  }

  setDuration(text: string): Promise<unknown> {
    return element(by.css('#duration')).sendKeys(text) as Promise<unknown>;
  }

  activateDuration(): Promise<unknown> {
    return element(by.css('#duration')).click() as Promise<unknown>;
  }

  getCancelButton(): Promise<string> {
    return element(by.css('#cancelButton')).getText() as Promise<string>;
  }

  getCleanButton(): Promise<string> {
    return element(by.css('#cleanButton')).getText() as Promise<string>;
  }

  getCreateButton(): Promise<string> {
    return element(by.css('#createButton')).getText() as Promise<string>;
  }

  activateCancelButton(): Promise<unknown> {
    return element(by.css('#cancelButton')).click() as Promise<unknown>;
  }

  activateCleanButton(): Promise<unknown> {
    return element(by.css('#cleanButton')).getText() as Promise<unknown>;
  }

  activateCreateButton(): Promise<unknown> {
    return element(by.css('#createButton')).click() as Promise<unknown>;
  }

  getNameRequiredError(): Promise<string> {
    return element(by.css('#nameRequiredError')).getText() as Promise<string>;
  }

  getDurationRequiredError(): Promise<string> {
    return element(by.css('#durationRequiredError')).getText() as Promise<string>;
  }

  getDurationPatternError(): Promise<string> {
    return element(by.css('#durationPatternError')).getText() as Promise<string>;
  }

}
