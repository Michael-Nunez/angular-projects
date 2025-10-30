import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2_500);
  });
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notSpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !! (form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

          case 'minlength':
            return `El texto debe contener al menos ${ errors['minlength'].requiredLength } caracteres`;

          case 'min':
            return `El valor mínimo debe ser ${ errors['min'].min }`;

          case 'emailTaken':
            return `El correo electrónico ingresado está en uso`;

          case 'notHelloWorld':
            return `No se puede usar el Username 'holamundo' en la app`;

          case 'pattern':
            if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
              return 'El valor ingresado no es un correo electrónico válido';
            }

            return 'Error de patrón contra una expresión regular';

          default:
            return `Error de validación no controlado ${key}`;
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

  static isFieldOneEqualsToFieldTow(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;

      return fieldOneValue === fieldTwoValue ? null : { fieldsAreNotEqual: true };
    };
  }

  static async checkingServerResponseAsync(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }

    return null;
  }

  static userNameHelloWorlsNotAllowed(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value === 'holamundo' ? { notHelloWorld: true } : null;
  }
}