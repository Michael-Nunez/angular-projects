import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html'
})
export class BasicPage {
  private formBuilder = inject(FormBuilder);

  myForm = this.formBuilder.group({
    //* Posiciones del arreglo: 0 -> Valor por defecto del input, 1 -> Validadores síncronos 2 -> Validadores asíncronos
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });
}