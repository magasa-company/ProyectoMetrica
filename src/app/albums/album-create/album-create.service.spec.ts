/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AlbumCreateService } from './album-create.service';
import { Album } from '../album';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';

import { environment } from '../../../environments/environment';

describe('Service: AlbumCreate', () => {
  let injector: TestBed;
  let service: AlbumCreateService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'albums';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumCreateService]
    });
    injector = getTestBed();
    service = injector.inject(AlbumCreateService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service...', inject([AlbumCreateService], (albumCreateService: AlbumCreateService) => {
    expect(albumCreateService).toBeTruthy();
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

    service.createAlbum(nuevoAlbum).subscribe((album) => {
      nuevoAlbum.id = album.id;
      expect(album).toEqual(nuevoAlbum);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(nuevoAlbum);
    expect(req.request.method).toBe('POST');
  });
});


