import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe],
  templateUrl: './dynamic-page.html'
})
export class DynamicPage { }
