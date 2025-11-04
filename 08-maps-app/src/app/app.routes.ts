import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { HousesPageComponent } from './pages/houses-page.component/houses-page.component';
import { MarkersPageComponent } from './pages/markers-page.component/markers-page.component';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMapPageComponent,
    title: 'Pantalla completa del mapa'
  },
  {
    path: 'markers',
    component: MarkersPageComponent,
    title: 'Marcadores'
  },
  {
    path: 'houses',
    component: HousesPageComponent,
    title: 'Propiedades disponibles'
  },
  {
    path: '**',
    redirectTo: 'fullscreen'
  }
];