import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { UsersResponse } from '@interfaces/JSONPlaceholdersUser';
import { map, Observable } from 'rxjs';

interface State {
  users: UsersResponse[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);

  // ? El simbolo '#' significa que la propiedad es privada
  #state = signal<State>({
    loading: true,
    users: []
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.httpClient.get<UsersResponse[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((response) => {
        this.#state.set({
          loading: false,
          users: response
        });
      });
  }

  getUserById(id: number) {
    return this.httpClient.get<UsersResponse>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .pipe(
        map((response) => response)
      );
  }
}