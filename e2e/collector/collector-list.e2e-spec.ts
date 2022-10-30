import { CollectorList } from './collector-list.po';
import { browser, logging } from 'protractor';

describe('Collector list', () => {
  let page: CollectorList;

  beforeEach(() => {
    page = new CollectorList();
  });

  it('should display Coleccionistas in header', () => {
    page.navigateTo();
    page.wait();
    expect(page.getTitleText()).toEqual('Coleccionistas');
  }, 50000);

  it('should load collector tables', () => {
    page.navigateTo();
    page.wait();
    expect(page.getTableHeaders()).toEqual(['NOMBRE', 'EMAIL', 'TELEPHONE', 'DETALLE']);
    expect(page.getTableRowSize()).toBeGreaterThan(0);
  });

  it('should navigate to new collector form', () => {
    page.navigateTo();
    page.wait();
    page.clickNewCollectorButton();
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}coleccionistas/agregar`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
