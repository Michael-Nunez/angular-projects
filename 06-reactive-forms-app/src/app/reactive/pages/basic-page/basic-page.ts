import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html'
})
export class BasicPage {
  private formBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
    //* Posiciones del arreglo: 0 -> Valor por defecto del input, 1 -> Validadores síncronos 2 -> Validadores asíncronos
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  isValidField(fieldName: string): boolean | null {
    return !! (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched);
  }

  getFieldErrors(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

          case 'minlength':
            return `El texto debe contener al menos ${ errors['minlength'].requiredLength } caracteres`

          case 'min':
            return `El valor mínimo debe ser ${ errors['min'].min }`
      }
    }

    return null;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }
}