/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../../shared/shared.module';
import { Album } from '../album';
import { Track } from '../tracks/tracks';
import { Comment } from '../comments/comments';
import { AlbumDetailsComponent } from './album-details.component';
import * as faker from 'faker';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';




const albumName: string = faker.lorem.sentence();
const albumId: number = faker.datatype.number();

const MUSICIANS = [
  {
    id: faker.datatype.number(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    image: faker.image.imageUrl(),
    description: faker.lorem.sentence(),
    birthDate: faker.date.recent().toString(),
    albums: [],
    performerPrizes: []
  },
  {
    id: faker.datatype.number(),
    name: faker.name.title + ' ' + faker.name.lastName(),
    image: faker.image.imageUrl(),
    description: faker.lorem.sentence(),
    birthDate: faker.date.recent().toString(),
    albums: [],
    performerPrizes: []
  }
];

const TRACKS = [{
  name: faker.name.jobTitle(),
  duration: faker.datatype.number().toString(),
  id: faker.datatype.number()
}];
const COMMENTS = [{
  description: faker.lorem.paragraph(),
  rating: faker.datatype.number(),
  id: faker.datatype.number()
}];

const ALBUM = {
  name: albumName,
  cover: faker.image.imageUrl(),
  releaseDate: faker.date.recent().toString(),
  description: faker.lorem.sentence(),
  genre: faker.lorem.sentence(),
  recordLabel: faker.lorem.sentence(),
  performers: MUSICIANS,
  tracks: TRACKS,
  comments: COMMENTS,
  id: albumId
};


describe('AlbumDetailsComponent', () => {
  let component: AlbumDetailsComponent;
  let fixture: ComponentFixture<AlbumDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [AlbumDetailsComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (callback) => callback({ id: albumId })
          }
        }
      }]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // Intercept and mock outgoing request
    const req = httpTestingController.expectOne(environment.baseUrl + 'albums/' + albumId.toString());
    req.flush(ALBUM);

    fixture.detectChanges();

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create album details component', () => {
    expect(component).toBeTruthy();
  });

  it('should call #getAlbum and format breadcrumbs', () => {
    expect(component.breadcrumbs).toEqual(['Home', 'Álbumes', ALBUM.name]);
  });


  it('should render album header with information', () => {
    const name = fixture.debugElement.query(By.css('h1'));
    const performers = fixture.debugElement.query(By.css('.featured-subtitle'));
    const description = fixture.debugElement.query(By.css('.lead'));
    const thumbnail = fixture.debugElement.query(By.css('.musician-img'));
    const releaseDate = fixture.debugElement.queryAll(By.css('.featured-text-item dd'));

    expect(name.nativeElement.textContent).toEqual(ALBUM.name);
    expect(description.nativeElement.textContent).toEqual(ALBUM.description);
    expect(performers.nativeElement.textContent).toEqual(component.album.listaPerformers);
    expect(thumbnail.nativeElement.src).toEqual(ALBUM.cover);
    expect(releaseDate[0].nativeElement.textContent).toEqual(ALBUM.genre);
    expect(releaseDate[1].nativeElement.textContent).toEqual(formatDate(ALBUM.releaseDate, 'longDate', 'en-MX', '+0'));
    expect(releaseDate[2].nativeElement.textContent).toEqual(ALBUM.recordLabel);
  });

  it('should call #getAlbums and format featured', () => {
    expect(component.featured).toEqual([{
      title: 'Género',
      subtitle: ALBUM.genre
    },
    {
      title: 'Lanzamiento',
      subtitle: formatDate(ALBUM.releaseDate, 'longDate', 'en-MX', '+0')
    },
    {
      title: 'Firma',
      subtitle: ALBUM.recordLabel
    }]);
  });

  it('should call #getAlbums and format cancionesTable', () => {
    expect(component.cancionesTable).toEqual({
      headers: ['#',
        'Título',
        'Duración'],
      rows: [{
        columns: [
          1,
          ALBUM.tracks[0].name,
          ALBUM.tracks[0].duration
        ]
      }],
      tableContentName: 'canciones'
    });
  });


  it('should render comments table with albums comments', () => {
    const description = fixture.debugElement.query(By.css('.comment-description'));
    const rating = fixture.debugElement.query(By.css('.comment-rating'));

    const [comment] = ALBUM.comments;
    expect(description).toBeTruthy();
    expect(rating).toBeTruthy();
    expect(description.nativeElement.textContent).toContain(comment.description);
    expect(rating.nativeElement.textContent).toContain(comment.rating + '/5');
  });


  it('should render tracks table with albums tracks', () => {
    const titulo = fixture.debugElement.query(By.css('#table-título0'));
    const duracion = fixture.debugElement.query(By.css('#table-duración0'));

    const [track] = ALBUM.tracks;

    expect(titulo.nativeElement.textContent).toEqual(track.name);
    expect(duracion.nativeElement.textContent).toEqual(track.duration);
  });

});
