/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorInterceptor } from './http-error-interceptor.service';


describe('Service: HttpErrorInterceptor', () => {
  let toaster: ToastrService;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ToastrService, useValue: toaster }, HttpErrorInterceptor]
    });
    injector = getTestBed();
    toaster = injector.inject(ToastrService);
  });

  /*it('should ...', inject([HttpErrorInterceptor], (service: HttpErrorInterceptor) => {
    expect(service).toBeTruthy();
  }));*/
});
