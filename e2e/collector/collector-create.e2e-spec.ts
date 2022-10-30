import { CollectorCreate } from './collector-create.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('Collectors create', () => {
  let page: CollectorCreate;

  beforeEach(() => {
    page = new CollectorCreate();
    page.navigateTo();
  });

  it('debe mostrar el título de la página en el encabezado', () => {
    expect(page.getTitleText()).toEqual('Agregar nuevo Coleccionista');
  });

  it('debe mostrar validaciones', () => {
    page.activateName();
    page.activateEmail();
    page.activateTelephone();

    expect(page.getNameRequiredError()).toEqual('Nombre requerido');
    expect(page.getEmailRequiredError()).toEqual('Correo es requerido');
    expect(page.getTelephoneRequiredError()).toEqual('Teléfono es requerido');

    page.fillName(faker.name.firstName(1));
    page.fillEmail(faker.internet.email());
    page.fillTelephone(faker.phone.phoneNumber());

    expect(page.getNamePatternError()).toEqual('Nombre es demasiado corto. Deberían tener al menos 2 caracteres');
    expect(page.getEmailPatternError()).toEqual('Formato de correo incorrecto. Debe incluir un @');
    expect(page.getTelephonePatternError()).toEqual('Formato telefono es demasiado corto. Deberían tener al menos 6 caracteres');

  });


  it('debería limpiar los campos', () => {
    page.fillName(faker.name.firstName());
    page.fillEmail(faker.internet.email());
    page.fillTelephone(faker.phone.phoneNumber());

    expect(page.getName()).toEqual('');
    expect(page.getEmail()).toEqual('');
    expect(page.getTelephone()).toEqual('');
  });


  it('debería guardar un nuevo coleccionista', () => {
    page.fillName(faker.name.firstName());
    page.fillEmail(faker.internet.email());
    page.fillTelephone(faker.phone.phoneNumber());
    page.wait();
    page.clickSubmitButton();
  });

  it('should go back when cancel buttton is clicked', () => {
    page.clickCancelButton();
  });


});
