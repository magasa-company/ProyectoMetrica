/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

const ALBUMS = [
  {
    id: 100,
    name: 'Buscando América',
    cover:
      'https://i.pinimg.com/564x/aa/5f/ed/aa5fed7fac61cc8f41d1e79db917a7cd.jpg',
    releaseDate: '1984-08-01T00:00:00.000Z',
    description:
      'Buscando América es el primer álbum de la banda de Rubén Blades y Seis del Solar lanzado en 1984. La producción, bajo el sello Elektra, fusiona diferentes ritmos musicales tales como la salsa, reggae, rock, y el jazz latino. El disco fue grabado en Eurosound Studios en Nueva York entre mayo y agosto de 1983.',
    genre: 'Salsa',
    recordLabel: 'Elektra',
    tracks: [
      {
        id: 100,
        name: 'Decisiones',
        duration: '5:05',
      },
      {
        id: 101,
        name: 'Desapariciones',
        duration: '6:29',
      },
    ],
    performers: [
      {
        id: 100,
        name: 'Rubén Blades Bellido de Luna',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg',
        description:
          'Es un cantante, compositor, músico, actor, abogado, político y activista panameño. Ha desarrollado gran parte de su carrera artística en la ciudad de Nueva York.',
        birthDate: '1948-07-16T00:00:00.000Z',
      },
    ],
    comments: [
      {
        id: 100,
        description: 'The most relevant album of Ruben Blades',
        rating: 5,
      },
    ],
  },
];

const MUSICIANS = [
  {
    id: 100,
    name: 'Rubén Blades Bellido de Luna',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg',
    description:
      'Es un cantante, compositor, músico, actor, abogado, político y activista panameño. Ha desarrollado gran parte de su carrera artística en la ciudad de Nueva York.',
    birthDate: '1948-07-16T05:00:00.000Z',
    albums: [],
    performerPrizes: [],
  },
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      declarations: [HomeComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const reqMusicians = httpTestingController.expectOne(
      'https://musiccollector-api.herokuapp.com/musicians'
    );
    reqMusicians.flush(MUSICIANS);

    const reqAlbums = httpTestingController.expectOne(
      'https://musiccollector-api.herokuapp.com/albums'
    );
    reqAlbums.flush(ALBUMS);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render featured musician', () => {
    const featuredMusician = fixture.debugElement.query(
      By.css('.featured-musician-card')
    );
    const title = featuredMusician.query(By.css('h3'));

    expect(title.nativeElement.textContent).toEqual(component.musician.name);
  });

  it('should render album cards', () => {
    const albumCards = fixture.debugElement.queryAll(
      By.css('.album-cards .card')
    );

    expect(albumCards.length).toEqual(component.albums.length);
  });

  it('should render album name and genre in card', () => {
    const card = fixture.debugElement.query(
      By.css('.album-cards .card')
    );

    const title = card.query(By.css('h5'));
    const genre = card.query(By.css('p'));

    expect(title.nativeElement.textContent).toEqual(ALBUMS[0].name);
    expect(genre.nativeElement.textContent).toContain(ALBUMS[0].genre);
  });

  it('should render musician cards', () => {
    const musicianCards = fixture.debugElement.queryAll(
      By.css('.musician-cards .card')
    );

    expect(musicianCards.length).toEqual(component.musicians.length);
  });

  it('should render musician name and birthday in card', () => {
    const card = fixture.debugElement.query(
      By.css('.musician-cards .card')
    );

    const title = card.query(By.css('h5'));
    const genre = card.query(By.css('p'));

    expect(title.nativeElement.textContent).toEqual(MUSICIANS[0].name);
    expect(genre.nativeElement.textContent).toContain('July 16, 1948');
  });
});
