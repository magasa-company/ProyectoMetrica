import { AppPage } from '../app.po';
import { AlbumsPage } from './albums.po';
import { browser, logging } from 'protractor';
import { TrackCreatePage } from './track.po';
import * as faker from 'faker';
import { formatDate } from '@angular/common';
import { AlbumDetailsPage } from './album-details.po';

describe('Albums create', () => {
  let page: AppPage;
  let album: AlbumsPage;
  let trackCreate: TrackCreatePage;
  let albumDetails: AlbumDetailsPage;
  let seconds: string = faker.datatype.number(59).toString();
  const minutes = faker.datatype.number(59);

  const TRACK = {
    name: faker.lorem.sentence(),
    duration: minutes + ':' + seconds,
    id: '{id}'
  };

  const TRACKWRONDATA = {
    name: '',
    duration: faker.datatype.number().toString(),
    id: '{id}'
  };
  if (seconds.length === 1) {
    seconds = '0' + seconds;
    TRACK.duration = minutes + ':' + seconds;
  }
  let albumName: Promise<string>;

  beforeAll(() => {
    page = new AppPage();
    album = new AlbumsPage();
    trackCreate = new TrackCreatePage();
    albumDetails = new AlbumDetailsPage();
  });



  it('should display breadcrumbs', () => {
    page.navigateTo();
    page.wait();
    album.navigateTo();
    album.wait();
    album.navigateToFirstAlbum();
    albumDetails.wait();
    albumName = albumDetails.getAlbumTitle();
    albumDetails.navigateToAddTrack();
    trackCreate.wait();
    expect(page.getBreadcrumbsCount()).toEqual(4);
    expect(page.getBreadcrumb(0)).toEqual('home');
    expect(page.getBreadcrumb(1)).toEqual('álbumes');
    expect(page.getBreadcrumb(2)).toEqual(albumName);
    expect(page.getBreadcrumb(3)).toEqual('agregar nueva canción');
  });

  it('should display all labels', () => {

    expect(trackCreate.getPageTitle()).toEqual('agregar nueva canción');
    expect(trackCreate.getAlbumTitle()).toContain(albumName);
    expect(trackCreate.getCreateButton()).toContain('Crear');
    expect(trackCreate.getCancelButton()).toEqual('Cancelar');
    expect(trackCreate.getCleanButton()).toEqual('Limpiar');
    expect(trackCreate.getnameLabel()).toEqual('Título');
    expect(trackCreate.getDurationLabel()).toEqual('Duración');
  });


  it('should display validations', () => {
    trackCreate.activateDuration();
    trackCreate.activateName();
    trackCreate.activateDuration();

    expect(trackCreate.getDurationRequiredError()).toEqual('La duración es requerida');
    expect(trackCreate.getNameRequiredError()).toEqual('Título es requerido');

    trackCreate.setDuration(TRACKWRONDATA.duration);

    expect(trackCreate.getDurationPatternError()).toEqual('La duración debe tener este formato: ##:##, por ejemplo 15:05 o 3:54');

  });

  it('should clean fields', () => {

    trackCreate.setName(TRACKWRONDATA.name);
    trackCreate.setDuration(TRACKWRONDATA.duration);
    trackCreate.activateCleanButton();

    expect(trackCreate.getName()).toEqual('');
    expect(trackCreate.getDuration()).toEqual('');

  });



  it('should save new track', () => {
    trackCreate.activateCancelButton();
    albumDetails.navigateToAddTrack();
    trackCreate.setName(TRACK.name);
    trackCreate.setDuration(TRACK.duration);
    trackCreate.activateName();
    trackCreate.activateCreateButton();
    albumDetails.wait();
    expect(albumDetails.getLastTrackName()).toEqual(TRACK.name);
    expect(albumDetails.getLastTrackDuration()).toEqual(TRACK.duration);

  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
