import { Injectable, signal } from '@angular/core';

type AvailableLocales = 'es' | 'en' | 'de';

@Injectable({providedIn: 'root'})
export class LocaleService {
  private currentLocale = signal<AvailableLocales>('es');

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocales) {
    this.currentLocale.set(locale);
  }
}