import { AuthService } from '@/auth/services/auth.services';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'store-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-front-navbar.html',
})
export class StoreFrontNavbar {
  authService = inject(AuthService);
}
