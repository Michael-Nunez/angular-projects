import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Michael',
  gender: 'male',
  age: 29,
  address: 'Santo Domingo, Dominican Republic'
};

const client2 = {
  name: 'Juana',
  gender: 'female',
  age: 25,
  address: 'San Juan, Dominican Republic'
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './uncommon-page.component.html'
})
export default class UncommonPageComponent {
  //* I18nSelectPipe
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  //* I18nPluralPipe
  clients = signal([
    'Juan', 'Pedro', 'Maria', 'José']);

  clientsMap = signal({
    '=0': 'no hay clientes en espera...',
    '=1': 'hay 1 cliente en espera...',
    other: 'hay # clientes esperando...'
  });

  deleteClient() {
    this.clients.update(previous => previous.slice(1));
  }

  //* KeyValuePipe
  profile = {
    name: 'Michael',
    age: 29,
    address: 'Santo Domingo, Dominican Republic'
  };

  //* AsyncPipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa!')
      console.log('Promesa resuelta!');
    }, 3_500);
  });

  myObservable = interval(2_000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap: ', value))
  );
}