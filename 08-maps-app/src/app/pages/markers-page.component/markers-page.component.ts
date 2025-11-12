import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../environments/environment.development';

maptilersdk.config.apiKey = environment.MAPTILE_KEY;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  coordinates = signal({
    lng: -69.983750,
    lat: 18.436191
  });

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;
    const { lng, lat } = this.coordinates();

    const map = new maptilersdk.Map({
      container: element,
      style: maptilersdk.MapStyle.STREETS,
      center: [lng, lat],
      zoom: 9,
      fullscreenControl: true
    });

    map.on('moveend', () => {
      const center = map!.getCenter();
      this.coordinates.set(center)
    });

    const marker = new maptilersdk.Marker({
      draggable: false,
      color: 'red'
    })
      .setLngLat([-69.98259468245564, 18.435393801006285])
      .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    });
  }
}