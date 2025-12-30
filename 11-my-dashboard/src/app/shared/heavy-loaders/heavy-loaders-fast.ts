import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  imports: [CommonModule, NgClass],
  template: `
    <section [ngClass]="['w-full', cssClass]">
      <ng-content />
    </section>
  `
})
export class HeavyLoadersFast {
  @Input ({ required: true }) cssClass!: string;

  constructor() {
    console.log('Heavy Loader Fast Creado');
  }
}