import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordConfirmationValidation(otherField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherFieldValue = control.parent?.get(otherField)?.value;

    return control.value === otherFieldValue ? null : { passwordConfirm: true };
  };
}

export function cepValidator(control: AbstractControl):  ValidationErrors | null {
  const value = control.value?.trim();

  if (value == null || value.length === 0) {
    return null;
  }

  return control.value?.trim().length === 8 ? null : { cep: true };
}
