import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  debounceTime = input(300);

  initialValue = input<string>();
  inputValue = linkedSignal(() => this.initialValue() ?? '');

  value = output<string>();

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanUp(() => {
      clearTimeout(timeOut);
    });
  });
}