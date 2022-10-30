import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianListComponent } from './musician-list/musician-list.component';
import { MusicianDetailsComponent } from './musician-details/musician-details.component';
import { MusicianCreateComponent } from './musician-create/musician-create.component';
import { MusicianService } from './musician.service';
import { SharedModule } from '../shared/shared.module';
import { MusicianRoutes } from './musician.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [MusicianService],
  imports: [
    CommonModule,
    MusicianRoutes,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    MusicianListComponent,
    MusicianDetailsComponent,
    MusicianCreateComponent
  ],
  exports: [
    MusicianListComponent
  ]
})
export class MusicianModule { }
