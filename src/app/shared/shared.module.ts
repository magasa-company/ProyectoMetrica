import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './loading/loading.component';
import { CardComponent } from './card/card.component';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    ListHeaderComponent,
    TableComponent,
    NavbarComponent,
    DetailHeaderComponent,
    BreadcrumbsComponent,
    LoadingComponent,
    CardComponent
  ],
  exports: [
    ListHeaderComponent,
    TableComponent,
    NavbarComponent,
    DetailHeaderComponent,
    LoadingComponent,
    CardComponent
  ]
})
export class SharedModule { }
