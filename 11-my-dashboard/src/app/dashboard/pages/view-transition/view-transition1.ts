import { Component } from '@angular/core';
import { Title } from "@shared/title/title";

@Component({
  selector: 'app-view-transition-1',
  imports: [Title],
  template: `
    <app-title title="View Transation 1" />

    <section class="flex justify-start">
      <img
        src="https://picsum.photos/id/237/200/300"
        alt="Imagen perrito"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div class="bg-blue-500 w-56 h-56" style="view-transition-name: hero2"></div>
    </section>
  `
})
export default class ViewTransition { }