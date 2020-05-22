import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[whiteSpaceValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: WhiteSpaceValidator, multi: true}]
})
export class WhiteSpaceValidator implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    if(control==null || control.value==null || control.value.trim()==""){
        return {forbiddenName: {value: "Error"}};
    }
    return null;
  }
}
