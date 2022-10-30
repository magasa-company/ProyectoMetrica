import { AppPage } from '../app.po';
import { AlbumsPage } from './albums.po';
import { browser, logging } from 'protractor';

describe('Albums list', () => {
  let page: AppPage;
  let album: AlbumsPage;
  beforeAll(() => {
    page = new AppPage();
    album = new AlbumsPage();
  });

  it('should display title', () => {
    page.navigateTo();
    album.navigateTo();
    expect(album.getTitleText()).toEqual('Álbumes');
  });

  it('should display table headers', () => {
    expect(album.getHeaderCover()).toEqual('PORTADA');
    expect(album.getHeaderAlbums()).toEqual('ÁLBUMES');
    expect(album.getHeaderPerformers()).toEqual('MUSICO');
    expect(album.getHeaderReleaseDate()).toEqual('LANZAMIENTO');
  });

  it('should display albums', () => {
    expect(album.getRowCount()).toBeGreaterThanOrEqual(4);

  });

  it('should display view details buttons', () => {
    const rowCount = album.getRowCount();
    expect(album.getDetailButtonCount()).toEqual(rowCount);

  });

  it('should display add album button', () => {
    expect(album.getAddAlbumButton()).toEqual('Agregar');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
