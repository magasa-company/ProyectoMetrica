import { CommentCreate } from './comment-create.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('Comment create', () => {
  let page: CommentCreate;

  beforeEach(() => {
    page = new CommentCreate();
    page.navigateTo();
  });

  it('should display page title in header', () => {
    expect(page.getTitleText()).toEqual('Agregar comentario');
  });

  it('should display submit disabled', () => {
    expect(page.isSubmitEnabled()).toEqual(false);
  });

  describe('select collector', () => {
    it('should display success state selecting an option', () => {
      page.selectOption(2);

      expect(page.isCollectorValid()).toEqual(true);
    });

    it('should display an error state when value is empty', () => {
      page.selectOption(1);

      expect(page.isCollectorValid()).toEqual(false);
      expect(page.getCollectorInvalidFeedbackText()).toEqual('El coleccionista no puede estar vacio.');
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
      expect(page.getDescriptionRequiredText()).toEqual('El comentario no puede estar vacio.');
    });

    it('should display an error state when value is greater than 500', () => {
      page.fillDescription(faker.lorem.paragraphs(4));

      expect(page.isDescriptionValid()).toEqual(false);
      expect(page.getDescriptionMaxLengthText()).toEqual('El comentario no puede ser mayor a 500 caracteres.');
    });
  });

  describe('rating', () => {
    it('should check option when clicked', () => {
      page.checkRating(1);

      expect(page.isRatingChecked(1)).toEqual(true);
    });
  });

  it('should submit form when submit buttton is clicked', () => {
    page.selectOption(2);
    page.fillDescription(faker.lorem.sentence());
    page.checkRating(1);

    expect(page.isSubmitEnabled()).toEqual(true);

    page.clickSubmitButton();
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}albumes/`);
  });

  it('should go back when cancel buttton is clicked', () => {
    page.clickCancelButton();
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}albumes/`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
