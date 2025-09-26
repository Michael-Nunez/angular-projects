import { Component, computed, signal } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/index";

interface Character {
  id: number,
  name: string,
  power: number
}

@Component({
  templateUrl: './dragonball-page.component.html',
  imports: []
})
export class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 9000 },
    // { id: 4, name: 'Yamcha', power: 500 },
    // { id: 3, name: 'Picoro', power: 3000 },
  ]);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };

    this.characters.update((list) => [...list, newCharacter]);

    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}