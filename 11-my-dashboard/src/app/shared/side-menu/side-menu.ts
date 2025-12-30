import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule],
  templateUrl: './side-menu.html'
})
export class SideMenu {
  menuItems = routes
      .map((route) => route.children ?? [])
      .flat()
      .filter((route) => route && route.path)
      .filter((route) => !route.path?.includes(':'));
}