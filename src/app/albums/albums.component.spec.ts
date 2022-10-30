import { AlbumsComponent } from './albums.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import * as faker from 'faker';
import { Album } from './album';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const ALBUM = new Album(
  faker.lorem.sentence(),
  faker.image.imageUrl(),
  faker.date.recent().toString(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  [],
  [],
  [],
  faker.datatype.number()
);

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let debug: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [AlbumsComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;

    // Intercept and mock outgoing request
    const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/albums');
    req.flush([ALBUM]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create albums component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Álbumes');
  });

  it('should render Album list data', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tbody tr');

    expect(rows.length).toEqual(1);
  });

  it('Album list has image object', () => {
    fixture.detectChanges();

    expect(debug.query(By.css('#table-portada0'))).toBeTruthy();
  });

  it('Album list has name object', () => {
    fixture.detectChanges();

    expect(debug.query(By.css('#table-álbumes0'))).toBeTruthy();
  });

  it('Album list has performers object', () => {
    fixture.detectChanges();

    expect(debug.query(By.css('#table-musico0'))).toBeTruthy();
  });

  it('Album list has release date object', () => {
    fixture.detectChanges();

    expect(debug.query(By.css('#table-lanzamiento0'))).toBeTruthy();
  });
});
