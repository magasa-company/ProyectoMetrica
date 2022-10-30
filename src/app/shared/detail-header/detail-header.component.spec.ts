/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as faker from 'faker';
import { DetailHeaderComponent } from './detail-header.component';
import { SharedModule } from '../shared.module';

describe('DetailHeaderComponent', () => {
  let component: DetailHeaderComponent;
  let fixture: ComponentFixture<DetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DetailHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when input is provided', () => {
    component.title = 'My title';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h1'));

    expect(title.nativeElement.textContent).toBe('My title');
  });

  it('should render subtitle when input is provided', () => {
    component.subtitle = 'My subtitle';
    fixture.detectChanges();

    const subtitle = fixture.debugElement.nativeElement.querySelector('h2');

    expect(subtitle.textContent).toBe('My subtitle');
  });

  it('should render description when input is provided', () => {
    component.description = 'My description';
    fixture.detectChanges();

    const description = fixture.debugElement.query(By.css('.lead'));

    expect(description.nativeElement.textContent).toBe('My description');
  });

  it('should render image when input is provided', () => {
    component.imgSrc = faker.image.imageUrl();
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.musician-img'));

    expect(img.nativeElement.src).toBe(component.imgSrc);
  });

  it('should render breadcrumbs when input is provided', () => {
    component.breadcrumbs = ['Breadcrumb 1', 'Breadcrumb 2'];
    fixture.detectChanges();

    const breadcrumbs = fixture.debugElement.queryAll(By.css('.breadcrumb-item'));

    expect(breadcrumbs.length).toBe(2);
    breadcrumbs.forEach((breadcrumb, idx) => {
      expect(breadcrumb.nativeElement.textContent).toBe(component.breadcrumbs[idx]);
    });
  });

  it('should render featured when input is provided', () => {
    component.featured = [{ title: 'header1', subtitle: 'subtitle1' }, { title: 'header2', subtitle: 'subtitle2' }];
    fixture.detectChanges();

    const featuredTexts = fixture.debugElement.queryAll(By.css('.featured-text-item'));

    expect(featuredTexts.length).toBe(2);
    featuredTexts.forEach((featured, idx) => {
      expect(featured.children[0].nativeElement.textContent).toBe(component.featured[idx].title);
      expect(featured.children[1].nativeElement.textContent).toBe(component.featured[idx].subtitle);
    });
  });
});
