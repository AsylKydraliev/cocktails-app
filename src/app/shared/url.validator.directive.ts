import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function urlValidator (): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null => {
    const hasUrl = /^[a-zA-z]$/.test(control.value);

    if(hasUrl) {
      return null;
    }

    return {imageUrl: true};
  }
}

@Directive({
  selector: '[appUrl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UrlValidatorDirective,
    multi: true
  }]
})
export class UrlValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator()(control);
  }
}
