/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { TracksCreateService } from './tracks-create.service';
import { Track } from './tracks';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';

import { environment } from '../../../environments/environment';

describe('Service: TracksCreate', () => {

  let injector: TestBed;
  let service: TracksCreateService;
  let httpMock: HttpTestingController;
  const albumId: number = faker.datatype.number();
  const apiUrl = environment.baseUrl + 'albums/' + albumId + '/tracks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TracksCreateService]
    });
    injector = getTestBed();
    service = injector.inject(TracksCreateService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service...', inject([TracksCreateService], (albumCreateService: TracksCreateService) => {
    expect(albumCreateService).toBeTruthy();
  }));

  it('create tracks() should return the album searched', () => {

    const id = faker.datatype.number();

    const nuevoTrack = new Track(
      faker.lorem.sentence(),
      faker.datatype.number(59) + ':' + faker.datatype.number(59),
      id
    );

    service.addTrack(nuevoTrack, albumId).subscribe((track) => {
      nuevoTrack.id = track.id;
      expect(track).toEqual(nuevoTrack);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(nuevoTrack);
    expect(req.request.method).toBe('POST');
  });

});
