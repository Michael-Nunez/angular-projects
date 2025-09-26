import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  characters = signal<Character[]>(loadFromLocalStorage());

  addCharacter(newCharacter: Character) {
    this.characters.update((list) => [...list, newCharacter]);
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });
}

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}