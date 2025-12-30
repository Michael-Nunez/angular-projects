import { Component } from '@angular/core';
import { HeavyLoadersSlow } from '@shared/heavy-loaders/heavy-loaders-slow';
import { Title } from "@shared/title/title";

@Component({
  selector: 'app-defer-views',
  imports: [HeavyLoadersSlow, Title],
  templateUrl: './defer-views.html',
  styles: ``,
})
export default class DeferViews { }
