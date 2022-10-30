import { CollectorsComponent } from './collectors.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';

const COLLECTORS = [
  {
    id: 1,
    name: 'Manolo Bellon',
    telephone: '3502457896',
    email: 'manollo@caracol.com.co',
    comments: [],
    favoritePerformers: [],
    collectorAlbums: [],
  },
];


describe('CollectorsComponent', () => {
  let component: CollectorsComponent;
  let fixture: ComponentFixture<CollectorsComponent>;
  let debug: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorsComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    const req = httpTestingController.expectOne('https://musiccollector-api.herokuapp.com/collectors');
    req.flush(COLLECTORS);
    fixture.detectChanges();
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create Collectors component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Coleccionistas');
  });

  it('should render the header with page name', () => {
    const collectorsList = fixture.debugElement.nativeElement;
    const title = collectorsList.querySelector('h1');

    expect(title.textContent).toEqual('Coleccionistas');
  });

  it('should render the table with default headers', () => {
    const collectorsList = fixture.debugElement.nativeElement;
    const table = collectorsList.querySelector('table');
    const headers = table.querySelectorAll('th');

    expect(headers[0].textContent).toEqual('Nombre');
    expect(headers[1].textContent).toEqual('Email');
  });

  it('should render the table with Collectors name', () => {
    const collectorsList = fixture.debugElement.nativeElement;
    const columns = collectorsList.querySelectorAll('tbody td');

    expect(columns[0].textContent).toEqual('Manolo Bellon');
  });

});
