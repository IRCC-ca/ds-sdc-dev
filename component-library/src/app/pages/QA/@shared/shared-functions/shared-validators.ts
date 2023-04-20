import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredTrueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    return value === true ? null : { requiredTrue: { value } };
  };
}
