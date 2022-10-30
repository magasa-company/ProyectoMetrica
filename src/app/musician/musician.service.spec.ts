/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MusicianService } from './musician.service';
import * as MusicianFixture from './fixtures';

describe('Service: MusicianService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getMusicians', () => {
    it('should call the API and return musicians', inject([MusicianService], (service: MusicianService) => {
      service.getMusicians().subscribe((musicians) => {
        expect(musicians.length).toEqual(1);
        expect(musicians).toEqual(MusicianFixture.getMusiciansResponse);
      });

      const req = httpTestingController.expectOne(service.apiUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(MusicianFixture.getMusiciansResponse);
    }));
  });

  describe('#getMusician', () => {
    it('should call the API and return musician', inject([MusicianService], (service: MusicianService) => {
      service.getMusician(100).subscribe((musician) => {
        expect(musician).toEqual(MusicianFixture.getMusicianResponse);
      });

      const req = httpTestingController.expectOne(service.apiUrl + '/100');
      expect(req.request.method).toEqual('GET');

      req.flush(MusicianFixture.getMusicianResponse);
    }));
  });

  describe('#createMusician', () => {
    it('should call the API and return new musician', inject([MusicianService], (service: MusicianService) => {
      const payload = {
        name: MusicianFixture.createMusicianResponse.name,
        birthDate: MusicianFixture.createMusicianResponse.birthDate,
        description: MusicianFixture.createMusicianResponse.description,
        image: MusicianFixture.createMusicianResponse.image
      };

      service.createMusician(payload).subscribe((musician) => {
        expect(musician).toEqual(MusicianFixture.createMusicianResponse);
      });

      const req = httpTestingController.expectOne(service.apiUrl);
      expect(req.request.method).toEqual('POST');

      req.flush(MusicianFixture.createMusicianResponse);
    }));
  });
});
