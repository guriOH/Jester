import { FormControl } from '@angular/forms';

export class NumberValidator {

    static isValidNumbrFormat(control: FormControl): any{

        let regExp = /^\d+$/;

        if (!regExp.test(control.value)) {
            console.log('true' + control.value);
            return { "invalid PhoneNumber": true };
        }

        console.log('null' + control.value);
        return null;
    }

}