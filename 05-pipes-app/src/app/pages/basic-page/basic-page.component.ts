import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html'
})
export default class BasicPageComponent {
  nameToLower = signal('michael');
  nameToUpper = signal('MICHAEL');
  fullName = signal('miChaEl nuÑeZ');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log(interval);
    }, 1_000);

    onCleanUp(() => {
      clearInterval(interval);
    });
  });
}