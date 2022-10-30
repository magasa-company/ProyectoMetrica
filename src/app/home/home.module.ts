import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
