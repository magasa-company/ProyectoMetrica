import { CollectorDetails } from './collector-details.po';
import { browser, logging } from 'protractor';

describe('Collector list', () => {
  let page: CollectorDetails;

  beforeEach(() => {
    page = new CollectorDetails();
  });

  it('should display collections title', () => {
    page.navigateTo();
    expect(page.getTitleColleText()).toEqual('Colecciones');
  });

  it('should display musicians title', () => {
    page.navigateTo();
    expect(page.getTitleMusiText()).toEqual('Músicos favoritos');
  });

  it('should display collections name', () => {
    expect(page.isNameVisible()).toEqual(true);
  });

  it('should load collections musicians tables', () => {
    page.navigateTo();
    expect(page.getTableHeaders()).toEqual(['PORTADA', 'ÁLBUMES', 'LANZAMIENTO', 'PRECIO', 'DETALLE', 'MÚSICO', 'NOMBRE', 'DETALLE']);
    expect(page.getTableRowSize()).toBeGreaterThan(0);
  });

  it('should navigate to new collections form', () => {
    page.navigateTo();
    page.clickNewCollectionsButton();
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}agregar-coleccion-coleccionista/100`);
  });

  it('should navigate to new musicians form', () => {
    page.navigateTo();
    page.clickNewMusiciansButton();
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}agregar-musicos-coleccionista/100`);
  });

  it('should return to collectors', () => {
    page.navigateTo();
    page.clickNewMusiciansButton();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
