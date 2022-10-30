import { MusicianCreate } from './musician-create.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('Musician create', () => {
  let page: MusicianCreate;

  beforeEach(() => {
    page = new MusicianCreate();
    page.navigateTo();
  });

  it('should display page title in header', () => {
    expect(page.getTitleText()).toEqual('Agregar nuevo músico');
  });

  it('should display submit disabled', () => {
    expect(page.isSubmitEnabled()).toEqual(false);
  });

  describe('input name', () => {
    it('should display success state with valid value', () => {
      page.fillName(faker.name.firstName());

      expect(page.isNameValid()).toEqual(true);
    });

    it('should display an error state when value is empty', () => {
      page.fillName('');

      expect(page.isNameValid()).toEqual(false);
      expect(page.getInvalidFeedbackText()).toEqual('El nombre no puede estar vacio.');
    });
  });

  describe('input image', () => {
    it('should fill image with valid url', () => {
      page.fillImage(faker.image.imageUrl());

      expect(page.isImageValid()).toEqual(true);
    });

    it('should display an error state when value is an invalid url', () => {
      page.fillImage('https://');

      expect(page.isImageValid()).toEqual(false);
      expect(page.getInvalidFeedbackText()).toEqual('Por favor introduce una dirección válida. Ej. https://example.com/example.jpg');
    });
  });

  describe('input birth day', () => {
    it('should fill birth day with valid date', () => {
      page.fillBirthDate('05041992');
      page.fillDescription('');
      expect(page.isBirthDateValid()).toEqual(true);
    });
  });

  describe('input description', () => {
    it('should fill description with value lower than 500 characters', () => {
      page.fillDescription(faker.lorem.sentence());

      expect(page.isDescriptionValid()).toEqual(true);
    });

    it('should display an error state when value is empty', () => {
      page.fillDescription('');

      expect(page.isDescriptionValid()).toEqual(false);
      expect(page.getInvalidFeedbackText()).toEqual('La descripción no puede estar vacia.');
    });

    it('should display an error state when value is greater than 500', () => {
      page.fillDescription(faker.lorem.paragraphs(4));

      expect(page.isDescriptionValid()).toEqual(false);
      expect(page.getInvalidFeedbackText()).toEqual('La descripción no puede ser mayor a 500 caracteres.');
    });
  });

  it('should submit form when submit buttton is clicked', () => {
    page.fillName(faker.name.firstName());
    page.fillImage(faker.image.imageUrl());
    page.fillBirthDate('05041992');
    page.fillDescription(faker.lorem.sentence());

    expect(page.isSubmitEnabled()).toEqual(true);

    page.clickSubmitButton();
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}musicos`);
  });

  it('should go back when cancel buttton is clicked', () => {
    page.clickCancelButton();
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}musicos`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
