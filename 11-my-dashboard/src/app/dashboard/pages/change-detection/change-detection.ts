import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Title } from "@shared/title/title";

@Component({
  selector: 'app-change-detection',
  imports: [Title, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `
})
export default class ChangeDetection {
  currentFramework = computed(() => `Change Detection - ${ this.frameworkAsSignal().name }`);

  frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  });

  frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  };

  constructor() {
    setTimeout(() => {
      //this.frameworkAsProperty.name = 'React';
      this.frameworkAsSignal.update((value) => ({
        ...value,
        name: 'React'
      }));
      console.log('Hecho!');
    }, 3_000);
  }
}