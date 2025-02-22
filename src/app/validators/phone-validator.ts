import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}
