/* tslint:disable:no-unused-variable */
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { CollectorsCreateService } from './collectors-create.service';
import { ToastrService } from 'ngx-toastr';
import {
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('Service: CollectorsCreate', () => {
  let injector: TestBed;
  let service: CollectorsCreateService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'collectors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CollectorsCreateService, ToastrService],
      providers: [CollectorsCreateService]
    });
    injector = getTestBed();
    service = injector.inject(CollectorsCreateService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
