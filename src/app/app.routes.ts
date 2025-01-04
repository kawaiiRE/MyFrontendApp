import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, },

  {
    path: 'bootstrap',
    loadChildren: () => import(`./features/tutorials/example-bootstrap/tutorial.routes`)
    .then(routes => routes.routes)
  },
  {
    path: 'components',
    loadComponent: () => import('./features/tutorials/example-components/tutorial.component')
      .then(mod => mod.TutorialComponent)
  },
  {
    path: 'forms',
    loadChildren: () => import(`./features/tutorials/example-forms/tutorial.routes`)
    .then(routes => routes.routes)
  },
  {
    path: 'services',
    loadComponent: () => import('./features/tutorials/example-services/tutorial.component')
      .then(mod => mod.TutorialComponent)
  },

  { path: '**', component: NotFoundComponent }
];