import { Routes, RouterModule } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { TracksCreateComponent } from './tracks/tracks-create.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';

const routes: Routes = [{
  path: 'albumes/agregar', component: AlbumCreateComponent,
}, {
  path: 'albumes/:id', component: AlbumDetailsComponent
}, {
  path: 'albumes/:id/canciones/agregar', component: TracksCreateComponent
}, {
  path: 'albumes/:id/comentarios/agregar', component: CommentCreateComponent
}];

export const AlbumsRoutingModule = RouterModule.forChild(routes);
