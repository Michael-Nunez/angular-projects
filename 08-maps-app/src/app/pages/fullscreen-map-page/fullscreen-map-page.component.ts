import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';

config.apiKey = environment.MAPTILE_KEY;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 15px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 10px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 225px;
    }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  map: Map | undefined;
  divElement = viewChild<ElementRef>('map');
  coordinates = signal({
    lng: -69.983750,
    lat: 18.436191
  });

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;
    const { lng, lat } = this.coordinates();

    this.map = new Map({
      container: element,
      style: MapStyle.STREETS,
      center: [lng, lat],
      zoom: 9,
      fullscreenControl: true
    });

    this.map.on('moveend', () => {
      const center = this.map!.getCenter();
      this.coordinates.set(center)
    });
  }
}