import { browser, by, element, ExpectedConditions } from 'protractor';

export class AlbumDetailsPage {

  wait(): void {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('li.breadcrumb-item'))), 5000, 'Element taking too long to appear in the DOM');

  }

  getAlbumTitle(): Promise<string> {
    return element(by.css('.featured-title')).getText().then((text) => text.toLowerCase()) as Promise<string>;
  }

  getAlbumCoverURL(): Promise<string> {
    return element(by.css('.musician-img')).getAttribute('src') as Promise<string>;
  }
  getAlbumPerformers(): Promise<string> {
    return element(by.css('.featured-subtitle')).getText() as Promise<string>;
  }
  getAlbumReleaseDate(): Promise<string> {
    return element(by.css('#featureLanzamiento')).getText() as Promise<string>;
  }
  getAlbumGenre(): Promise<string> {
    return element(by.css('#featureGénero')).getText() as Promise<string>;
  }
  getAlbumLabel(): Promise<string> {
    return element(by.css('#featureFirma')).getText() as Promise<string>;
  }
  getAlbumReleaseDateTitle(): Promise<string> {
    return element(by.css('#featureTitleLanzamiento')).getText() as Promise<string>;
  }
  getAlbumGenreTitle(): Promise<string> {
    return element(by.css('#featureTitleGénero')).getText() as Promise<string>;
  }
  getAlbumLabelTitle(): Promise<string> {
    return element(by.css('#featureTitleFirma')).getText() as Promise<string>;
  }
  getAlbumDescription(): Promise<string> {
    return element(by.css('.lead')).getText() as Promise<string>;
  }
  getAddCommentsButton(): Promise<string> {
    return element(by.css('#addCommentButton')).getText() as Promise<string>;
  }
  getaddTrackButton(): Promise<string> {
    return element(by.css('#addTrackButton')).getText() as Promise<string>;
  }
  getCommentsTitle(): Promise<string> {
    return element(by.css('#commentsTitle')).getText() as Promise<string>;
  }
  getTracksTitle(): Promise<string> {
    return element(by.css('#tracksTitle')).getText() as Promise<string>;
  }

  getTracksCount(): Promise<number> {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('.dataRowcanciones'))), 5000, 'Element taking too long to appear in the DOM');
    return element.all(by.css('.dataRowcanciones')).count() as Promise<number>;
  }

  getCommentsCount(): Promise<number> {
    const until = ExpectedConditions;
    browser.wait(until.presenceOf(element(by.css('.card-body'))), 5000, 'Element taking too long to appear in the DOM');
    return element.all(by.css('.card-body')).count() as Promise<number>;
  }

  getCommentsTitlesCount(): Promise<number> {
    return element.all(by.css('.card-title')).count() as Promise<number>;
  }

  getCommentsRatingsCount(): Promise<number> {
    return element.all(by.css('.card-footer')).count() as Promise<number>;
  }
  navigateToAddTrack(): Promise<unknown> {
    return element(by.css('#addTrackButton')).click() as Promise<unknown>;

  }

  getLastTrackName(): Promise<string> {
    return element.all(by.css('.dataRowcanciones'))
      .last()
      .element(by.css('.field-título'))
      .getText() as Promise<string>;
  }

  getLastTrackDuration(): Promise<string> {
    return element.all(by.css('.dataRowcanciones'))
      .last()
      .element(by.css('.field-duración'))
      .getText() as Promise<string>;
  }



}
