import { Routes, RouterModule } from '@angular/router';
import { MusicianDetailsComponent } from './musician-details/musician-details.component';
import { MusicianCreateComponent } from './musician-create/musician-create.component';

const routes: Routes = [{
  path: 'musicos/agregar', component: MusicianCreateComponent,
}, {
  path: 'musicos/:id', component: MusicianDetailsComponent
}];

export const MusicianRoutes = RouterModule.forChild(routes);
