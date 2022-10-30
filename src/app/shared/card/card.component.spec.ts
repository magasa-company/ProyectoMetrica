/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import * as faker from 'faker';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create card component', () => {
    expect(component).toBeTruthy();
  });

  it('should render img when provided', () => {
    component.imgSrc = faker.image.imageUrl();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));

    expect(img.nativeElement.src).toBe(component.imgSrc);
  });

  it('should add alt attr when provided', () => {
    component.imgSrc = faker.image.imageUrl();
    component.imgAlt = 'alt text';

    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));

    expect(img.nativeElement.getAttribute('alt')).toBe(component.imgAlt);
  });
});
