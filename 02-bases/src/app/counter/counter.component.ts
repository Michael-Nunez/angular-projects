import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-counter',
  template: `
  <h3>{{ counter }}</h3>

  <button (click)="increaseBy(+1)">+1</button>
  <button (click)="resetCounter()">Reset</button>
  <button (click)="increaseBy(-1)">-1</button>
  `
})

export class CounterComponent {
  constructor() { }

  public counter: number  = 10;

  increaseBy(value: number): void {
    this.counter += value;
  }

  resetCounter() {
    this.counter = 10;
  }
}