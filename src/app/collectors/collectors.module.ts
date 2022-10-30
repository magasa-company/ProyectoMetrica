import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorsComponent } from './collectors.component';
import { CollectorsDetailsComponent } from './collectors-details/collectors-details.component';
import { CollectorsService } from './collectors.service';
import { SharedModule } from '../shared/shared.module';
import { CollectorRoutes } from './collector.routing';
import { CollectorsCreateComponent } from './collectors-create/collectors-create.component';
import { CollectorsAddMusicanComponent } from './collectors-add-musican/collectors-add-musican.component';
import { CollectorsAddAlbumComponent } from './collectors-add-album/collectors-add-album.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [CollectorsService],
  imports: [
    CommonModule,
    CollectorRoutes,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    CollectorsComponent,
    CollectorsDetailsComponent,
    CollectorsCreateComponent,
    CollectorsAddMusicanComponent,
    CollectorsAddAlbumComponent
  ],
  exports: [
    CollectorsComponent,
    CollectorsCreateComponent,
    CollectorsDetailsComponent,
    CollectorsAddMusicanComponent,
    CollectorsAddAlbumComponent
  ]
})
export class CollectorsModule { }
