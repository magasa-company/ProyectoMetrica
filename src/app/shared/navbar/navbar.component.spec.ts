/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.nav-item'));

    expect(buttons.length).toEqual(5);
  });

  it('should collapse navbar when collapse button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.nav-link'));
    const event = { preventDefault: () => true };
    spyOn(event, 'preventDefault');

    buttons[4].triggerEventHandler('click', event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.collapsed).toBe(true);
  });
});
