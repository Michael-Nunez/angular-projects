import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html'
})
export class RegisterPage {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      this.formUtils.checkingServerResponseAsync
    ],
    userName: [
      '',
      [
        Validators.required, Validators.minLength(6),
        Validators.pattern(this.formUtils.notSpacesPattern),
        this.formUtils.userNameHelloWorlsNotAllowed
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: [
      this.formUtils.isFieldOneEqualsToFieldTow('password', 'confirmPassword')
    ]
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}