import { browser, by, element, ExpectedConditions } from 'protractor';

export class AlbumsPage {
  navigateTo(): Promise<unknown> {
    return element(by.css('a[href="/albumes"]')).click() as Promise<unknown>;
  }

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.tagName('h1'))), 5000, 'Element taking too long to appear in the DOM');

  }

  getTitleText(): Promise<string> {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.tagName('h1'))), 5000, 'Element taking too long to appear in the DOM');
    return element(by.tagName('h1')).getText() as Promise<string>;
  }

  getHeaderCover(): Promise<string> {
    return element(by.css('#tableHeadersPortada')).getText() as Promise<string>;
  }

  getHeaderAlbums(): Promise<string> {
    return element(by.css('#tableHeadersÁlbumes')).getText() as Promise<string>;
  }

  getHeaderPerformers(): Promise<string> {
    return element(by.css('#tableHeadersMusico')).getText() as Promise<string>;
  }

  getHeaderReleaseDate(): Promise<string> {
    return element(by.css('#tableHeadersLanzamiento')).getText() as Promise<string>;
  }

  getRowCount(): Promise<number> {
    return element.all(by.css('.dataRowalbumes')).count() as Promise<number>;
  }

  getDetailButtonCount(): Promise<number> {
    return element.all(by.css('button[aria-label="Ver detalle"]')).count() as Promise<number>;

  }
  navigateToFirstAlbum(): Promise<unknown> {
    return element(by.css('#viewDetailsalbumesButton-0')).click() as Promise<unknown>;
  }

  getFirstAlbumCoverURL(): Promise<string> {
    return element(by.css('#table-portada0>img')).getAttribute('src') as Promise<string>;
  }

  getLastAlbumCoverUrl(): Promise<string> {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('.dataRowalbumes'))), 5000, 'Element taking too long to appear in the DOM');
    return element.all(by.css('.dataRowalbumes'))
      .last()
      .element(by.css('.field-portada>img'))
      .getAttribute('src') as Promise<string>;
  }

  getFirstAlbumTitle(): Promise<string> {
    return element(by.css('#table-álbumes0')).getText().then((text) => text.toLowerCase()) as Promise<string>;
  }

  getLastAlbumTitle(): Promise<string> {
    return element.all(by.css('.dataRowalbumes'))
                  .last()
                  .element(by.css('.field-álbumes'))
                  .getText()  as Promise<string>;
  }

  getFirstAlbumPerformers(): Promise<string> {
    return element(by.css('#table-musico0')).getText() as Promise<string>;
  }

  getLastAlbumPerformers(): Promise<string> {
    return element.all(by.css('.dataRowalbumes'))
                  .last()
                  .element(by.css('.field-musico'))
                  .getText()  as Promise<string>;
  }

  getFirstAlbumReleaseDate(): Promise<string> {
    return element(by.css('#table-lanzamiento0')).getText() as Promise<string>;
  }

  getLastAlbumReleaseDate(): Promise<string> {
    return element.all(by.css('.dataRowalbumes'))
                  .last()
                  .element(by.css('.field-lanzamiento'))
                  .getText() as Promise<string>;
  }

  getAddAlbumButton(): Promise<string> {
    return element(by.css('button[aria-label="Agregar item"]')).getText() as Promise<string>;

  }

  navigateToAddAlbum(): Promise<unknown> {
    return element(by.css('button[aria-label="Agregar item"]')).click() as Promise<unknown>;
  }

}
