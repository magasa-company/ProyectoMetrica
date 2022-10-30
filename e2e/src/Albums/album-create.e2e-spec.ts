import { AppPage } from '../app.po';
import { AlbumsPage } from './albums.po';
import { browser, logging } from 'protractor';
import { AlbumCreatePage } from './album-create.po';
import * as faker from 'faker';
import { formatDate } from '@angular/common';

describe('Albums create', () => {
  let page: AppPage;
  let album: AlbumsPage;
  let albumCreate: AlbumCreatePage;
  let albumCount: Promise<number>;

  const ALBUM = {
    name: faker.company.companyName(),
    cover: faker.image.imageUrl(),
    releaseDate: faker.date.recent().toString(),
    description: faker.lorem.sentence(),
    genre: 'Salsa',
    recordLabel: 'EMI'
  };

  const ALBUMWRONGDATA = {
    name: '',
    cover: faker.lorem.sentence(),
    releaseDate: faker.lorem.sentence(),
    description: faker.lorem.word(5),
    genre: faker.lorem.sentence(),
    recordLabel: faker.lorem.sentence()
  };

  beforeAll(() => {
    page = new AppPage();
    album = new AlbumsPage();
    albumCreate = new AlbumCreatePage();
  });

  it('should display all labels', () => {
    page.navigateTo();
    page.wait();
    album.navigateTo();
    album.wait();
    albumCount = album.getRowCount();
    album.navigateToAddAlbum();
    albumCreate.wait();
    expect(albumCreate.getPageTitle()).toEqual('Agregar nuevo álbum');
    expect(albumCreate.getCreateButton()).toEqual('Crear');
    expect(albumCreate.getCancelButton()).toEqual('Cancelar');
    expect(albumCreate.getCleanButton()).toEqual('Limpiar');
    expect(albumCreate.getCoverLabel()).toEqual('Portada');
    expect(albumCreate.getNameLabel()).toEqual('Título');
    expect(albumCreate.getReleaseDateLabel()).toEqual('Lanzamiento');
    expect(albumCreate.getGenreLabel()).toEqual('Género');
    expect(albumCreate.getRecordLabelLabel()).toEqual('Firma Discográfica');
    expect(albumCreate.getDescriptionLabel()).toEqual('Descripción');
  });


  it('should display validations', () => {
    albumCreate.activateCover();
    albumCreate.activateDescription();
    albumCreate.activateGenre();
    albumCreate.activateName();
    albumCreate.activateRecordLabel();
    albumCreate.activateReleaseDate();
    albumCreate.activateCover();

    expect(albumCreate.getCoverRequiredError()).toEqual('URL del cover es requerido');
    expect(albumCreate.getNameRequiredError()).toEqual('Título es requerido');
    expect(albumCreate.getReleaseDateRequiredError()).toEqual('Fecha de lanzamiento es requerida');
    expect(albumCreate.getGenreRequiredError()).toEqual('Género es requerido');
    expect(albumCreate.getRecordLabelRequiredError()).toEqual('Firma es requerida');
    expect(albumCreate.getDescriptionRequiredError()).toEqual('Descripción es requerida');

    albumCreate.setDescription(ALBUMWRONGDATA.description);
    albumCreate.setCover(ALBUMWRONGDATA.cover);

    expect(albumCreate.getCoverPatternError()).toEqual('Texto ingresado no tiene formato de URL');
    expect(albumCreate.getDescriptionMinLengthError()).toEqual('Tamaño mínimo de la descripción son 10 caracterés');

  });

  it('should clean fields', () => {

    albumCreate.setCover(ALBUMWRONGDATA.cover);
    albumCreate.setDescription(ALBUMWRONGDATA.description);
    albumCreate.setGenre(ALBUM.genre);
    albumCreate.setName(ALBUMWRONGDATA.name);
    albumCreate.setRecordLabel(ALBUM.recordLabel);
    albumCreate.setReleaseDate(ALBUMWRONGDATA.releaseDate);
    albumCreate.activateCleanButton();

    expect(albumCreate.getCover()).toEqual('');
    expect(albumCreate.getName()).toEqual('');
    expect(albumCreate.getReleaseDate()).toEqual('');
    expect(albumCreate.getDescription()).toEqual('');

  });



  it('should save new album', () => {
    albumCreate.activateCancelButton();
    album.navigateToAddAlbum();
    albumCreate.setCover(ALBUM.cover);
    albumCreate.setDescription(ALBUM.description);
    albumCreate.setGenre(ALBUM.genre);
    albumCreate.setName(ALBUM.name);
    albumCreate.setRecordLabel(ALBUM.recordLabel);
    albumCreate.setReleaseDate(formatDate(ALBUM.releaseDate, 'MM/dd/yyyy', 'en-US'));
    albumCreate.activateDescription();
    albumCreate.activateCreateButton();
    album.wait();
    expect(album.getRowCount()).toBeGreaterThan(albumCount);

  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
