/* tslint:disable:no-unused-variable */
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { CollectorsAddAlbumService } from './collectors-add-album.service';
import { ToastrService } from 'ngx-toastr';
import {
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';


describe('Service: CollectorsAddAlbum', () => {
  let injector: TestBed;
  let service: CollectorsAddAlbumService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'collectors';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CollectorsAddAlbumService, ToastrService],
      providers: [CollectorsAddAlbumService]
    });
    injector = getTestBed();
    service = injector.inject(CollectorsAddAlbumService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
