/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';
import { Album } from '../album';
import { AlbumCreateComponent } from './album-create.component';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

const albumName: string = faker.lorem.sentence();
const albumId: number = faker.datatype.number();

const ALBUM = {
  name: albumName,
  cover: faker.image.imageUrl(),
  releaseDate: faker.date.recent().toString(),
  description: faker.lorem.sentence(),
  genre: 'Salsa',
  recordLabel: 'EMI',
  id: albumId
};

const ALBUMWRONGDATA = {
  name: '',
  cover: faker.lorem.sentence(),
  releaseDate: faker.lorem.sentence(),
  description: faker.lorem.word(5),
  genre: faker.lorem.sentence(),
  recordLabel: faker.lorem.sentence(),
  id: albumId
};

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let httpTestingController: HttpTestingController;
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [AlbumCreateComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (callback) => callback()
          }
        }
      }, {
        provide: ToastrService,
        useValue: toastrSpy
      }]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // Intercept and mock outgoing request
    httpTestingController.expectNone(environment.baseUrl + 'albums/');


    fixture.detectChanges();

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toEqual('Agregar nuevo álbum');
  });

  it('should render components', () => {
    const name = fixture.debugElement.query(By.css('#name'));
    const cover = fixture.debugElement.query(By.css('#cover'));
    const releaseDate = fixture.debugElement.query(By.css('#releaseDate'));
    const genre = fixture.debugElement.query(By.css('#genre'));
    const recordLabel = fixture.debugElement.query(By.css('#recordLabel'));
    const description = fixture.debugElement.query(By.css('#description'));
    const createButton = fixture.debugElement.query(By.css('#createButton'));
    const cancelButton = fixture.debugElement.query(By.css('#cancelButton'));

    expect(name).toBeTruthy();
    expect(cover).toBeTruthy();
    expect(releaseDate).toBeTruthy();
    expect(genre).toBeTruthy();
    expect(recordLabel).toBeTruthy();
    expect(description).toBeTruthy();
    expect(createButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should show disabled create button', () => {
    const createButton = fixture.debugElement.query(By.css('#createButton'));

    expect(createButton.nativeElement.disabled).toBeTruthy();

  });

  it('should check name validations', () => {
    const form = component.albumForm;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;

    nameInput.setValue(ALBUMWRONGDATA.name);
    expect(nameInput.errors).toBeDefined();

    nameInput.setValue(ALBUM.name);

    expect(form.valid).toBeFalsy();
    expect(nameInput.errors).toBeNull();
  });

  it('should check cover validations', () => {
    const form = component.albumForm;
    expect(form.valid).toBeFalsy();

    const coverInput = form.controls.cover;

    coverInput.setValue(ALBUMWRONGDATA.cover);
    expect(coverInput.errors).toBeDefined();

    coverInput.setValue(ALBUM.cover);

    expect(form.valid).toBeFalsy();
    expect(coverInput.errors).toBeNull();

  });

  it('should check form is valid', () => {
    const form = component.albumForm;
    expect(form.valid).toBeFalsy();

    const name = form.controls.name;
    const cover = form.controls.cover;
    const releaseDate = form.controls.releaseDate;
    const genre = form.controls.genre;
    const recordLabel = form.controls.recordLabel;
    const description = form.controls.description;
    const createButton = fixture.debugElement.query(By.css('#createButton'));

    name.setValue(ALBUM.name);
    cover.setValue(ALBUM.cover);
    releaseDate.setValue(ALBUM.releaseDate);
    genre.setValue(ALBUM.genre);
    recordLabel.setValue(ALBUM.recordLabel);
    description.setValue(ALBUM.description);
    fixture.detectChanges();

    expect(form.valid).toBeTrue();
    component.cleanFields();
    fixture.detectChanges();
    expect(form.valid).toBeFalse();

  });

  it('should save', () => {

    const form = component.albumForm;
    expect(form.valid).toBeFalsy();

    const name = form.controls.name;
    const cover = form.controls.cover;
    const releaseDate = form.controls.releaseDate;
    const genre = form.controls.genre;
    const recordLabel = form.controls.recordLabel;
    const description = form.controls.description;
    const createButton = fixture.debugElement.query(By.css('#createButton'));

    name.setValue(ALBUM.name);
    cover.setValue(ALBUM.cover);
    releaseDate.setValue(ALBUM.releaseDate);
    genre.setValue(ALBUM.genre);
    recordLabel.setValue(ALBUM.recordLabel);
    description.setValue(ALBUM.description);
    fixture.detectChanges();

    expect(form.valid).toBeTrue();

    component.createNewAlbum(
      new Album(
        ALBUM.name,
        ALBUM.cover,
        ALBUM.releaseDate,
        ALBUM.description,
        ALBUM.genre,
        ALBUM.recordLabel,
        [], [], []));
    fixture.detectChanges();

    const req = httpTestingController.expectOne(environment.baseUrl + 'albums');
    expect(req.request.method).toBe('POST');
    req.flush(ALBUM);
    fixture.detectChanges();
  });

});
