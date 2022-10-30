/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicianCreateComponent } from './musician-create.component';
import { SharedModule } from '../../shared/shared.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as faker from 'faker';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { createMusicianResponse } from '../fixtures';
import { MusicianService } from '../musician.service';
import { Router } from '@angular/router';

describe('MusicianCreateComponent', () => {
  let component: MusicianCreateComponent;
  let fixture: ComponentFixture<MusicianCreateComponent>;
  let httpTestingController: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MusicianCreateComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [{
        provide: Router,
        useValue: routerSpy
      }, {
        provide: ToastrService,
        useValue: toastrSpy
      }]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should initializa a form group with default values', () => {
      expect(component.musicianForm).toBeDefined();
      expect(component.musicianForm.value).toEqual({
        name: '',
        image: '',
        birthDate: '',
        description: ''
      });
    });
  });

  describe('#name', () => {
    it('should return form control instance', () => {
      expect(component.name).toBeInstanceOf(FormControl);
    });

    it('should return form control value when input changes', () => {
      const input = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;

      input.value = 'Canserbero';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.name.value).toEqual('Canserbero');
      expect(component.name.valid).toBeTrue();
    });

    it('should return invalid form control value when input is empty', () => {
      const input = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;

      input.value = '';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.name.value).toEqual('');
      expect(component.name.invalid).toBeTrue();
    });
  });


  describe('#description', () => {
    it('should return form control instance', () => {
      expect(component.description).toBeInstanceOf(FormControl);
    });

    it('should return form control value when input changes', () => {
      const textarea = fixture.debugElement.query(By.css('textarea[name="description"]')).nativeElement;

      textarea.value = 'This is a description';
      textarea.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.description.value).toEqual('This is a description');
      expect(component.description.valid).toBeTrue();
    });

    it('should return invalid form control value when value is empty', () => {
      const textarea = fixture.debugElement.query(By.css('textarea[name="description"]')).nativeElement;

      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.description.value).toEqual('');
      expect(component.description.invalid).toBeTrue();
    });

    it('should return invalid form control when value is longer than 500 characters', () => {
      const textarea = fixture.debugElement.query(By.css('textarea[name="description"]')).nativeElement;

      textarea.value = faker.lorem.paragraphs(5);
      textarea.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.description.value.length).toBeGreaterThan(500);
      expect(component.description.invalid).toBeTrue();
    });
  });


  describe('#image', () => {
    it('should return form control instance', () => {
      expect(component.image).toBeInstanceOf(FormControl);
    });

    it('should return form control value when value changes', () => {
      const input = fixture.debugElement.query(By.css('input[name="image"]')).nativeElement;

      input.value = 'https://www.example.com/example.jpg';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.image.value).toEqual('https://www.example.com/example.jpg');
      expect(component.image.valid).toBeTrue();
    });

    it('should return invalid form control value when value is empty', () => {
      const input = fixture.debugElement.query(By.css('input[name="image"]')).nativeElement;

      input.value = '';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.image.value).toEqual('');
      expect(component.image.invalid).toBeTrue();
    });

    it('should return invalid form control value when value is not a valid URI', () => {
      const input = fixture.debugElement.query(By.css('input[name="image"]')).nativeElement;

      input.value = 'https://';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.image.value).toEqual('https://');
      expect(component.image.invalid).toBeTrue();
    });
  });


  describe('#birthDate', () => {
    it('should return form control instance', () => {
      expect(component.birthDate).toBeInstanceOf(FormControl);
    });

    it('should return form control value when value changes', () => {
      const input = fixture.debugElement.query(By.css('input[name="birthDate"]')).nativeElement;

      input.value = '1992-05-04';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.birthDate.value).toEqual('1992-05-04');
      expect(component.birthDate.valid).toBeTrue();
    });

    it('should return invalid form control value when value is empty', () => {
      const input = fixture.debugElement.query(By.css('input[name="birthDate"]')).nativeElement;

      input.value = '';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.birthDate.value).toEqual('');
      expect(component.birthDate.invalid).toBeTrue();
    });
  });

  describe('#createMusician', () => {
    beforeEach(() => {
      component.name.setValue('Canserbero');
      component.image.setValue('https://www.example.com/example.jpg');
      component.birthDate.setValue('1992-05-04');
      component.description.setValue('This is a description.');
    });

    it('should build payload and call #createMusian from service', () => {
      const createMusicianSpy = spyOn(MusicianService.prototype, 'createMusician').and.callThrough();

      component.createMusician();

      expect(createMusicianSpy).toHaveBeenCalledWith({
        name: 'Canserbero',
        image: 'https://www.example.com/example.jpg',
        description: 'This is a description.',
        birthDate: '1992-05-04T00:00:00.000Z'
      });

      const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/musicians');
      req.flush(createMusicianResponse);
    });

    it('should call toaster and redirect user on success', fakeAsync(() => {
      component.createMusician();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['musicos']);
        expect(toastrSpy.success as jasmine.Spy).toHaveBeenCalledWith(
          'El músico ha sido creado exitosamente.',
          'Músico creado'
        );
      });


      const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/musicians');
      req.flush(createMusicianResponse);
    }));
  });

  describe('#navigateBack', () => {
    it('should redirect user to /musicos', () => {
      component.navigateBack();

      expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['musicos']);
    });
  });
});
