import { MusicianDetails } from './musician-details.po';
import { browser, logging } from 'protractor';

describe('Musician details', () => {
  let page: MusicianDetails;

  beforeEach(() => {
    page = new MusicianDetails();
    page.navigateTo();
  });

  it('should display musician name', () => {
    expect(page.isNameVisible()).toEqual(true);
  });

  it('should display musician description', () => {
    expect(page.isDescriptionVisible()).toEqual(true);
  });

  it('should display musician birthday', () => {
    expect(page.isBirthdayVisible()).toEqual(true);
  });

  it('should display musician image', () => {
    expect(page.isImageVisible()).toEqual(true);
  });

  it('should display musician name in breadcrumbs', async () => {
    const name = await page.getNameText();
    const breadcrumbs = await page.getBreadcrumbsText();

    expect(breadcrumbs[0]).toEqual('HOME');
    expect(breadcrumbs[1]).toEqual('MÚSICOS');
    expect(breadcrumbs[2]).toEqual(name.toUpperCase());
  });

  it('should display musician albums', () => {
    expect(page.getTableHeaders()).toEqual(['PORTADA', 'TÍTULO', 'LANZAMIENTO', 'DETALLE']);
    expect(page.getTableRowSize()).toBeGreaterThan(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
