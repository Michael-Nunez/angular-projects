import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocales, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html'
})
export default class BasicPageComponent {
  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameToLower = signal('michael');
  nameToUpper = signal('MICHAEL');
  fullName = signal('miChaEl nuÑeZ');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1_000);

    onCleanUp(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvailableLocales) {
    this.localeService.changeLocale(locale);
  }
}