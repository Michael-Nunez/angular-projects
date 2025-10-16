import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeEsDO from '@angular/common/locales/es-DO';
import localeGER from '@angular/common/locales/de';
import { LocaleService } from './services/locale.service';

registerLocaleData(localeEsDO, 'es');
registerLocaleData(localeGER, 'de');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale
    }
  ]
};