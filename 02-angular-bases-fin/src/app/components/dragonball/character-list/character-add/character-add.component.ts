import { Component, output, signal } from '@angular/core';
import type { Character } from '../../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const character: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power()
    };

    this.newCharacter.emit(character);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}