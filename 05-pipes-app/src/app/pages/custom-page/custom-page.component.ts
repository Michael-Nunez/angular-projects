import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../custom-pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../custom-pipes/can-fly.pipe';
import { HeroColorPipe } from '../../custom-pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../custom-pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../custom-pipes/hero-creator.pipe';
import { HeroSortPipe } from '../../custom-pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from '../../custom-pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortPipe,
    HeroFilterPipe
  ],
  templateUrl: './custom-page.component.html'
})
export default class CustomPageComponent {
  name = signal('Michael Núñez');
  upperCase = signal(true);
  heroes = signal(heroes);
  sortBy = signal<keyof Hero | null>(null);
  searchQuery = signal('');
}