import { Component, inject, Inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { Character } from '../../interfaces/character.interface';
import { CharacterAddComponent } from "../../components/dragonball/character-list/character-add/character-add.component";
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent]
})
export class DragonballSuperPageComponent {
  dragonBallService = inject(DragonBallService);
}