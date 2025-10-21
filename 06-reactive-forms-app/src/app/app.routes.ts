import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    // ? Hay que agregar el .then() ya que el modulo no exporta por default
    loadChildren: () => import('./reactive/reactive.routes').then((module => module.reactiveRoutes))
  },
  {
    path: 'auth',
    // ? No hay que agregar el .then() ya que el modulo sí exporta por default
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then((module => module.countryRoutes))
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];