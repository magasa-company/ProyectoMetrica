import { browser, by, element, ExpectedConditions } from 'protractor';

export class AlbumCreatePage {

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

  getPageTitle(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getNameLabel(): Promise<string> {
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

  getCoverLabel(): Promise<string> {
    return element(by.css('#coverLabel')).getText() as Promise<string>;
  }

  getCover(): Promise<string> {
    return element(by.css('#cover')).getText() as Promise<string>;
  }

  setCover(text: string): Promise<unknown> {
    return element(by.css('#cover')).sendKeys(text) as Promise<unknown>;
  }

  activateCover(): Promise<unknown> {
    return element(by.css('#cover')).click() as Promise<unknown>;
  }

  getReleaseDateLabel(): Promise<string> {
    return element(by.css('#releaseDateLabel')).getText() as Promise<string>;
  }

  getReleaseDate(): Promise<string> {
    return element(by.css('#releaseDate')).getText() as Promise<string>;
  }

  setReleaseDate(text: string): Promise<unknown> {
    return element(by.css('#releaseDate')).sendKeys(text) as Promise<unknown>;
  }

  activateReleaseDate(): Promise<unknown> {
    return element(by.css('#releaseDate')).click() as Promise<unknown>;
  }

  getGenreLabel(): Promise<string> {
    return element(by.css('#genreLabel')).getText() as Promise<string>;
  }

  getGenre(): Promise<string> {
    return element(by.css('#genre')).getAttribute('value') as Promise<string>;
  }

  setGenre(text: string): Promise<unknown> {
    element(by.css('#genre')).click();
    return element(by.css('#genre' + text)).click() as Promise<unknown>;
  }

  activateGenre(): Promise<unknown> {
    return element(by.css('#genre')).click() as Promise<unknown>;
  }

  getRecordLabelLabel(): Promise<string> {
    return element(by.css('#recordLabelLabel')).getText() as Promise<string>;

  }

  getRecordLabel(): Promise<string> {
    return element(by.css('#recordLabel')).getAttribute('value') as Promise<string>;
  }

  setRecordLabel(text: string): Promise<unknown> {
    element(by.css('#recordLabel')).click();
    return element(by.css('#recordLabel' + text)).click() as Promise<unknown>;
  }

  activateRecordLabel(): Promise<unknown> {
    return element(by.css('#recordLabel')).click() as Promise<unknown>;
  }

  getDescriptionLabel(): Promise<string> {
    return element(by.css('#descriptionLabel')).getText() as Promise<string>;
  }

  getDescription(): Promise<string> {
    return element(by.css('#description')).getText() as Promise<string>;
  }

  setDescription(text: string): Promise<unknown> {
    return element(by.css('#description')).sendKeys(text) as Promise<unknown>;
  }

  activateDescription(): Promise<unknown> {
    return element(by.css('#description')).click() as Promise<unknown>;
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

  getCoverRequiredError(): Promise<string> {
    return element(by.css('#coverRequiredError')).getText() as Promise<string>;
  }

  getReleaseDateRequiredError(): Promise<string> {
    return element(by.css('#releaseDateRequiredError')).getText() as Promise<string>;
  }

  getGenreRequiredError(): Promise<string> {
    return element(by.css('#genreRequiredError')).getText() as Promise<string>;
  }

  getRecordLabelRequiredError(): Promise<string> {
    return element(by.css('#recordLabelRequiredError')).getText() as Promise<string>;
  }

  getDescriptionRequiredError(): Promise<string> {
    return element(by.css('#descriptionRequiredError')).getText() as Promise<string>;
  }

  getDescriptionMinLengthError(): Promise<string> {
    return element(by.css('#descriptionMinLengthError')).getText() as Promise<string>;
  }

  getCoverPatternError(): Promise<string> {
    return element(by.css('#coverPatternError')).getText() as Promise<string>;
  }

}
