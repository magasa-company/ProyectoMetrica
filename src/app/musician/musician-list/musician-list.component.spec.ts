/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../../shared/shared.module';
import { MusicianListComponent } from './musician-list.component';

const MUSICIANS = [
  {
    id: 1,
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

describe('MusicianListComponent', () => {
  let component: MusicianListComponent;
  let fixture: ComponentFixture<MusicianListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [MusicianListComponent]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/musicians');
    req.flush(MUSICIANS);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render the header with page name', () => {
    const musicianList = fixture.debugElement.nativeElement;
    const title = musicianList.querySelector('h1');

    expect(title.textContent).toContain('Músicos');
  });

  it('should render the table with default headers', () => {
    const musicianList = fixture.debugElement.nativeElement;
    const table = musicianList.querySelector('table');
    const headers = table.querySelectorAll('th');

    expect(headers[0].textContent).toEqual('Músico');
    expect(headers[1].textContent).toEqual('Nombre');
  });

  it('should render the table with musicians picture', () => {
    const musicianList = fixture.debugElement.nativeElement;
    const columns = musicianList.querySelectorAll('tbody td');
    const picture = columns[0].querySelector('img');

    expect(picture).toBeDefined();
    expect(picture.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg');
  });

  it('should render the table with musicians name', () => {
    const musicianList = fixture.debugElement.nativeElement;
    const columns = musicianList.querySelectorAll('tbody td');

    expect(columns[1].textContent).toEqual('Rubén Blades Bellido de Luna');
  });
});
