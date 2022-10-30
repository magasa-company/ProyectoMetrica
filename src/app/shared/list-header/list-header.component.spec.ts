/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderComponent } from './list-header.component';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;

    component.title = 'Titulo de prueba';

    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should render list header with provided title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('h1');

    expect(title.textContent).toEqual('Titulo de prueba');
  });
});
