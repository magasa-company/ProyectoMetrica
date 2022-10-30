import { MusicianList } from './musician-list.po';
import { browser, logging } from 'protractor';

describe('Musician list', () => {
  let page: MusicianList;

  beforeEach(() => {
    page = new MusicianList();
  });

  it('should display Músicos in header', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Músicos');
  });

  it('should load musician tables', () => {
    page.navigateTo();
    expect(page.getTableHeaders()).toEqual(['MÚSICO', 'NOMBRE', 'DETALLE']);
    expect(page.getTableRowSize()).toBeGreaterThan(0);
  });

  it('should navigate to new musician form', () => {
    page.navigateTo();
    page.clickNewMusicianButton();

    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}musicos/agregar`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
