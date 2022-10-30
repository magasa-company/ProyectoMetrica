import { AppComponent } from './app.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumsModule } from './albums/albums.module';
import { MusicianModule } from './musician/musician.module';
import { SharedModule } from './shared/shared.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AlbumsModule,
        MusicianModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Musik Geeks'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Musik Geeks');
  });

  it('Component has main content container', () => {
    expect(debug.query(By.css('#mainContent'))).toBeTruthy(0);
  });

  it('Component has menu container', () => {
    expect(debug.query(By.css('#lateralMenu'))).toBeTruthy(0);
  });
});
