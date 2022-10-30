import { CollectorDetails } from './collector-details.po';
import { browser, logging } from 'protractor';

describe('coleccionistas details', () => {
  let page: CollectorDetails;

  beforeEach(() => {
    page = new CollectorDetails();
    page.navigateTo();
  });

  it('should display Coleccionistas in header', () => {
    page.navigateTo();
    page.wait();
    expect(page.getTitleText()).toEqual('Colecciones');
  }, 50000);


  it('should load collector tables', () => {
    page.navigateTo();
    page.wait();
    expect(page.getTableHeaders()).toEqual(['PORTADA', 'ÁLBUMES', 'LANZAMIENTO', 'PRECIO', 'DETALLE', 'MÚSICO', 'NOMBRE', 'DETALLE']);
    expect(page.getTableRowSize()).toBeGreaterThan(0);
  });
/*
  it('debe mostrar el nombre del coleccionista', () => {
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
  });*/
});
