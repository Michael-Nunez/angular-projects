import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuItem {
  title: string,
  route: string
}

const reactiveRouteItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html'
})
export class SideMenu {
  reactiveMenu: MenuItem[] = reactiveRouteItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    }));

  authMenu: MenuItem[] = [{ title: 'Registro', route: './auth' }];
  countryMenu: MenuItem[] = [{ title: 'Países', route: './country' }];
}