import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !! (form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getTextErrors(errors: ValidationErrors) {
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

  static getFieldErrors(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }

  static getFieldErrorsInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }
}