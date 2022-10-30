/* tslint:disable:no-unused-variable */
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CollectorsService } from './collectors.service';
import { Collector } from './collector';
import { HttpTestingController, HttpClientTestingModule, } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('Service: GetCollectors', () => {
  let injector: TestBed;
  let service: CollectorsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'collectors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorsService],
    });

    injector = getTestBed();
    service = injector.inject(CollectorsService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCollectors() should return 10 records', inject([CollectorsService], (collectorService: CollectorsService) => {
    const mockPosts: Collector[] = [];

    service.getCollectorsList().subscribe((collectors) => {
      expect(collectors.length).toBe(0);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  }));
});
