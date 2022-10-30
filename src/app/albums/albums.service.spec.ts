/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AlbumsService } from './albums.service';
import { Album } from './album';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';

import { environment } from '../../environments/environment';

describe('Service: GetAlbums', () => {
  let injector: TestBed;
  let service: AlbumsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'albums';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumsService],
    });

    injector = getTestBed();
    service = injector.inject(AlbumsService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service...', inject([AlbumsService], (albumsService: AlbumsService) => {
    expect(albumsService).toBeTruthy();
  }));

  it('getAlbums() should return 10 records', () => {
    const mockPosts: Album[] = [];

    for (let i = 0; i < 10; i++) {
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
        faker.datatype.number()
      );
      mockPosts.push(nuevoAlbum);
    }

    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  describe('#createComment', () => {
    it('should call create comment endpoint', () => {
      const payload = {
        rating: faker.datatype.number(5),
        description: faker.lorem.paragraph(),
        collector: {
          id: faker.datatype.number()
        }
      };

      service.createAlbumComment(100, payload).subscribe((comment) => {
        expect(comment).toBeDefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/${100}/comments`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });
});
