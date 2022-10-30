/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../../shared/shared.module';
import { MusicianDetailsComponent } from './musician-details.component';

const MUSICIAN = {
  id: 100,
  name: 'Rubén Blades Bellido de Luna',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg',
  description:
    'Es un cantante, compositor, músico, actor, abogado, político y activista panameño. Ha desarrollado gran parte de su carrera artística en la ciudad de Nueva York.',
  birthDate: '1948-07-16T00:00:00.000Z',
  albums: [
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
    },
  ],
  performerPrizes: [],
};

describe('MusicianDetailsComponent', () => {
  let component: MusicianDetailsComponent;
  let fixture: ComponentFixture<MusicianDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [MusicianDetailsComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (callback) => callback({ id: 100 })
          }
        }
      }]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/musicians/100');
    req.flush(MUSICIAN);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#onInit', () => {
    it('should call #getMusician and format breadcrumbs', () => {
      expect(component.breadcrumbs).toEqual(['Home', 'Músicos', 'Rubén Blades Bellido de Luna']);
    });

    it('should call #getMusician and format albumsTable', () => {
      expect(component.albumsTable).toEqual({
        headers: ['Portada', 'Título', 'Lanzamiento'],
        rows: [{
          columns: [
            '<img class="table-avatar" src="https://i.pinimg.com/564x/aa/5f/ed/aa5fed7fac61cc8f41d1e79db917a7cd.jpg" alt="Portada de album" />',
            'Buscando América',
            'August 1, 1984'
          ]
        }],
        tableContentName: 'albumes'
      });
    });

    it('should call #getMusician and format featured', () => {
      expect(component.featured).toEqual([{
        title: 'Cumpleaños',
        subtitle: 'July 16, 1948'
      }]);
    });
  });

  it('should render musician header with information', () => {
    const name = fixture.debugElement.query(By.css('h1'));
    const description = fixture.debugElement.query(By.css('.lead'));
    const thumbnail = fixture.debugElement.query(By.css('.musician-img'));
    const birthday = fixture.debugElement.query(By.css('.featured-text-item dd'));

    expect(name.nativeElement.textContent).toEqual(MUSICIAN.name);
    expect(description.nativeElement.textContent).toEqual(MUSICIAN.description);
    expect(thumbnail.nativeElement.src).toEqual(MUSICIAN.image);
    expect(birthday.nativeElement.textContent).toEqual('July 16, 1948');
  });

  it('should render albums table with musician albums', () => {
    const titulo = fixture.debugElement.query(By.css('#table-título0'));
    const portada = fixture.debugElement.query(By.css('#table-portada0 img'));
    const lanzamiento = fixture.debugElement.query(By.css('#table-lanzamiento0'));

    const [album] = MUSICIAN.albums;

    expect(titulo.nativeElement.textContent).toEqual(album.name);
    expect(portada.nativeElement.src).toEqual(album.cover);
    expect(lanzamiento.nativeElement.textContent).toEqual('August 1, 1984');
  });
});
