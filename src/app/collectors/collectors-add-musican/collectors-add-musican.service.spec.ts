/* tslint:disable:no-unused-variable */
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { CollectorsAddMusicanService } from './collectors-add-musican.service';
import { ToastrService } from 'ngx-toastr';
import {
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('Service: CollectorsAddMusican', () => {
  let injector: TestBed;
  let service: CollectorsAddMusicanService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'collectors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CollectorsAddMusicanService, ToastrService],
      providers: [CollectorsAddMusicanService]
    });
    injector = getTestBed();
    service = injector.inject(CollectorsAddMusicanService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
