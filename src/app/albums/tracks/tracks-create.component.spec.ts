/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';
import { Album } from '../album';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TracksCreateComponent } from './tracks-create.component';
import { Track } from './tracks';

const id = faker.datatype.number();
const albumId = faker.datatype.number();
let seconds: string = faker.datatype.number(59).toString();
const minutes = faker.datatype.number(59);

const TRACK = {
  name: faker.lorem.sentence(),
  duration: minutes + ':' + seconds,
  id: '{id}'
};

const ALBUM = {
  name: faker.name.firstName(),
  cover: faker.image.imageUrl(),
  releaseDate: faker.date.recent().toString(),
  description: faker.lorem.sentence(),
  genre: 'Salsa',
  recordLabel: 'EMI',
  id: albumId
};

const TRACKWRONDATA = {
  name: '',
  duration: faker.datatype.number(),
  id: '{id}'
};


describe('TracksCreateComponent', () => {

  let component: TracksCreateComponent;
  let fixture: ComponentFixture<TracksCreateComponent>;
  let httpTestingController: HttpTestingController;
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);
  let apiURL: string;

  beforeEach(async(() => {
    if (seconds.length === 1) {
      seconds = '0' + seconds;
      TRACK.duration = minutes + ':' + seconds;
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [TracksCreateComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (callback) => callback({ id: albumId })
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
    fixture = TestBed.createComponent(TracksCreateComponent);
    component = fixture.componentInstance;
    component.albumId = albumId;
    fixture.detectChanges();
    apiURL = environment.baseUrl + 'albums/' + albumId + '/tracks';
    // Intercept and mock outgoing request
    httpTestingController.expectNone(apiURL);


    fixture.detectChanges();
  });

  afterEach(() => {

    const req = httpTestingController.expectOne(environment.baseUrl + 'albums/' + albumId);
    expect(req.request.method).toBe('GET');
    req.flush(ALBUM);
    fixture.detectChanges();

    httpTestingController.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();

  });

  it('should render title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toEqual('Agregar nueva canción');
  });

  it('should render components', () => {
    const name = fixture.debugElement.query(By.css('#duration'));
    const duration = fixture.debugElement.query(By.css('#duration'));
    const createButton = fixture.debugElement.query(By.css('#createButton'));
    const cancelButton = fixture.debugElement.query(By.css('#cancelButton'));

    expect(name).toBeTruthy();
    expect(duration).toBeTruthy();
    expect(createButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should show disabled create button', () => {
    const createButton = fixture.debugElement.query(By.css('#createButton'));

    expect(createButton.nativeElement.disabled).toBeTruthy();

  });

  it('should check name validations', () => {
    const form = component.trackForm;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;

    nameInput.setValue(TRACKWRONDATA.name);
    expect(nameInput.errors).toBeDefined();

    nameInput.setValue(TRACK.name);

    expect(form.valid).toBeFalsy();
    expect(nameInput.errors).toBeNull();
  });



  it('should check duration validations', () => {
    const form = component.trackForm;
    expect(form.valid).toBeFalsy();

    const durationInput = form.controls.duration;

    durationInput.setValue(TRACKWRONDATA.duration);
    expect(durationInput.errors).toBeDefined();

    durationInput.setValue(TRACK.duration);

    expect(form.valid).toBeFalsy();
    expect(durationInput.errors).toBeNull();
  });



  it('should save', () => {

    const form = component.trackForm;
    expect(form.valid).toBeFalsy();

    const name = form.controls.name;
    const duration = form.controls.duration;
    const createButton = fixture.debugElement.query(By.css('#createButton'));

    name.setValue(TRACK.name);
    duration.setValue(TRACK.duration);
    fixture.detectChanges();

    expect(form.valid).toBeTrue();

    component.addNewTrack(
      new Track(
        TRACK.name,
        TRACK.duration));
    fixture.detectChanges();

    const req = httpTestingController.expectOne(apiURL);
    expect(req.request.method).toBe('POST');
    req.flush(TRACK);
    fixture.detectChanges();
  });

});
