/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AlbumDetailsService } from './album-details.service';
import { Album } from '../album';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';

import { environment } from '../../../environments/environment';

describe('Service: AlbumDetails', () => {
  let injector: TestBed;
  let service: AlbumDetailsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'albums';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumDetailsService]
    });
    injector = getTestBed();
    service = injector.inject(AlbumDetailsService);
    httpMock = injector.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should create service...', inject([AlbumDetailsService], (albumDetailssService: AlbumDetailsService) => {
    expect(albumDetailssService).toBeTruthy();
  }));

  it('getAlbumDetails() should return the album searched', () => {

    const id = faker.datatype.number();

    const nuevoAlbum = new Album(
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.date.recent().toString(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      [],
      [],
      [],
      id
    );



    service.getAlbumDetails(id).subscribe((album) => {
      expect(album).toEqual(nuevoAlbum);
    });

    const req = httpMock.expectOne(apiUrl + '/' + id);
    req.flush(nuevoAlbum);
    expect(req.request.method).toBe('GET');
  });
});


