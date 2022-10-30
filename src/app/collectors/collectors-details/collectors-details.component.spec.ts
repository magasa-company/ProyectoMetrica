/* tslint:disable:no-unused-variable */
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { HttpTestingController, HttpClientTestingModule, } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CollectorsService } from '../collectors.service';
import { CollectorsDetailsComponent } from './collectors-details.component';
import { DebugElement } from '@angular/core';
import * as faker from 'faker';
import { of } from 'rxjs';
import { Collector } from '../collector';
import {delay} from 'rxjs/operators';
const collectorId: number = faker.datatype.number();
const collector: Collector = {
  id: 1,
  cantidad: 10,
  name: 'Name',
  collectorAlbums: [],
  comments: [],
  email: 'email',
  favoritePerformers: [],
  telephone: '1'
};
describe('CollectorsDetailsComponent', () => {
  let component: CollectorsDetailsComponent;
  let fixture: ComponentFixture<CollectorsDetailsComponent>;
  let debug: DebugElement;
  let httpTestingController: HttpTestingController;
  let collectorService: CollectorsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorsDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [CollectorsService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsDetailsComponent);
    component = fixture.componentInstance;
    collectorService = TestBed.inject(CollectorsService);
    fixture.detectChanges();
    debug = fixture.debugElement;
    component.collectorId = collectorId;
  });
  it('should create Collectors Details component', () => {
    expect(component).toBeTruthy();
  });
  it('should call #getCollectors and format featured', () => {
    expect(component.featured).toEqual([{
      title: 'Email',
      subtitle: ''
    },
    {
      title: 'Teléfono',
      subtitle: ''
    } ]);
  });
  it('should call #getCollector and format breadcrumbs', () => {
    expect(component.breadcrumbs).toEqual(['Home', 'Coleccionistas']);
  });
  it('get collector', fakeAsync(() => {
    spyOn(collectorService, 'getCollector').and.returnValue(of(collector).pipe(delay(1)));
    component.getCollector(1);
    tick(1);
    expect(component.collector).toBe(collector);
    expect(component.breadcrumbs.indexOf(collector.name)).toBeGreaterThanOrEqual(0);
  }));
});
