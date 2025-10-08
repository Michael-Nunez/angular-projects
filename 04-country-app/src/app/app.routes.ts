import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];