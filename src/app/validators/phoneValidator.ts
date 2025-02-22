import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}
