/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentCreateComponent } from './comment-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as faker from 'faker';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlbumsService } from '../../albums.service';
import { ActivatedRoute, Router } from '@angular/router';

const collector = {
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  collectorAlbums: [],
  comments: [],
  email: faker.internet.email(),
  favoritePerformers: [],
  telephone: faker.phone.phoneNumber()
};

describe('CommentCreateComponent', () => {
  let component: CommentCreateComponent;
  let fixture: ComponentFixture<CommentCreateComponent>;
  let httpTestingController: HttpTestingController;
  let albumsService: AlbumsService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentCreateComponent],
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
      }, {
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (callback) => callback({ id: 100 })
          }
        }
      }]
    })
    .compileComponents();

    albumsService = TestBed.inject(AlbumsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/collectors');
    req.flush([collector]);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should initialize a form group with default values', () => {
      expect(component.commentForm).toBeDefined();
      expect(component.commentForm.value).toEqual({
        rating: '',
        collectorId: '',
        description: ''
      });
    });

    it('should get collectors and format select options', () => {
      expect(component.collectorOptions).toBeDefined();
      expect(component.collectorOptions).toEqual([{
        label: collector.name,
        value: collector.id
      }]);
    });

    it('should set albumId from params', () => {
      expect(component.albumId).toBeDefined();
      expect(component.albumId).toEqual(100);
    });
  });

  describe('#collectorId', () => {
    it('should return form control instance', () => {
      expect(component.collectorId).toBeInstanceOf(FormControl);
    });

    it('should return form control value when input changes', () => {
      const select = fixture.debugElement.query(By.css('select')).nativeElement;

      select.value = select.options[1].value;
      select.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(component.collectorId.value).toEqual(collector.id.toString());
      expect(component.collectorId.valid).toBeTrue();
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

  describe('#rating', () => {
    it('should return form control instance', () => {
      expect(component.rating).toBeInstanceOf(FormControl);
    });

    it('should return form control value when input changes', () => {
      const rates = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

      rates[1].nativeElement.checked = true;
      rates[1].nativeElement.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(component.rating.value).toEqual(2);
      expect(component.rating.valid).toBeTrue();
    });
  });

  describe('#createMusician', () => {
    const formValues = {
      collectorId: collector.id,
      rating: faker.datatype.number(5),
      description: faker.lorem.paragraph()
    };

    beforeEach(() => {
      component.collectorId.setValue(formValues.collectorId);
      component.rating.setValue(formValues.rating);
      component.description.setValue(formValues.description);
    });

    it('should build payload and call #createMusian from service', () => {
      const createMusicianSpy = spyOn(albumsService, 'createAlbumComment').and.callThrough();

      component.createComment();

      expect(createMusicianSpy).toHaveBeenCalledWith(100, {
        rating: formValues.rating,
        description: formValues.description,
        collector: {
          id: formValues.collectorId
        }
      });

      const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/albums/100/comments');
      req.flush({});
    });

    it('should call toaster and redirect user on success', fakeAsync(() => {
      component.createComment();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['albumes', 100]);
        expect(toastrSpy.success as jasmine.Spy).toHaveBeenCalledWith(
          'El comentario ha sido creado exitosamente.',
          'Comentario creado'
        );
      });

      const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/albums/100/comments');
      req.flush({});
    }));
  });

  describe('#navigateBack', () => {
    it('should redirect user to /albums/:id', () => {
      component.navigateBack();

      expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['albumes', 100]);
    });
  });
});
