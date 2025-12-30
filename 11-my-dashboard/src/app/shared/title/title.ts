import { booleanAttribute, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <h1 class="text-3xl mb-5">{{ title() }}</h1>
  `
})
export class Title {
  title = input.required();
  @Input({ transform: booleanAttribute }) withShadow: boolean = true;
}