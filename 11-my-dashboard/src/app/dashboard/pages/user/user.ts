import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { Title } from "@shared/title/title";
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [Title],
  template: `
    <app-title [title]="titleLabel()" />

    @if (user()) {
      <section>
        <h3>{{ user()!.name }}</h3>
        <p>{{ user()!.email }}</p>
      </section>
    } @else {
      <p>Cargando información...</p>
    }
  `
})
export default class User {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user())
      return `Usuario: ${this.user()!.name} - ${this.user()!.id}`;

    return 'Información del usuario'
  });
}