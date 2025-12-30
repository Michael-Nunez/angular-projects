import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from "@shared/title/title";

@Component({
  selector: 'app-view-transition-2',
  imports: [CommonModule, Title],
  template: `
    <app-title title="View Transation 2" />

    <section class="flex justify-end">
      <img
        src="https://picsum.photos/id/237/200/300"
        alt="Imagen perrito"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div
        class="fixed bottom-16 right-10 bg-blue-800 w-32 h-32 rounded"
        style="view-transition-name: hero2">
      </div>
    </section>
  `
})
export default class ViewTransition { }