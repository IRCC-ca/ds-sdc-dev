import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { IErrorPairs } from "../interfaces/component-configs";

export interface IErrorIDs {
    id?: string;
    key: string;
    errorLOV: string;
}

@Injectable({
    providedIn: 'root'
})
export class StandAloneFunctions {
    constructor(private translate: TranslateService) { }

    getErrorAria(formGroup: FormGroup, id: string, errorMessages: IErrorPairs[]) {
        let returnError = '';
        if (formGroup.get(id)?.dirty && formGroup.get(id)?.invalid) {
            errorMessages?.forEach(error => {
                if (formGroup.get(id)?.errors?.[error.key]) {
                    (returnError === '') ? (returnError += this.translate.instant(error.errorLOV)) :
                        (returnError += (', ' + this.translate.instant(error.errorLOV)));
                }
            });
        }
        return returnError;
    }

    /**
     * When run, returns an IErrorIds object. It generates IDs based on the errorMessages object
     * and which errors are currently in effect, thereby ensuring that the first element is given 
     * an id ending in _error0
     * @param formGroup 
     * @param id of the parent (input) component
     * @param errorMessages: IErrorPairs[]
     * @returns errorIds: IErrorIDs[]
     */
    getErrorIds(formGroup: FormGroup, id: string, errorMessages: IErrorPairs[]) {
        let errorIds: IErrorIDs[] = [];
        errorMessages?.forEach(message => {
            errorIds.push({ key: message.key, errorLOV: message.errorLOV });
        });

        //Code block to get errors that have occurred before the statusChange obs is activated
        let i = 0;
        errorIds.forEach(error => {
            if (formGroup.get(id)?.errors?.[error.key]) {
                error.id = (id + '_error' + i);
                i++;
            }
        });

        formGroup.get(id)?.statusChanges.subscribe((change) => {
            let i = 0;
            errorIds.forEach(error => {
                if (formGroup.get(id)?.errors?.[error.key]) {
                    error.id = (id + '_error' + i);
                    i++;
                }
            });
        });
        return errorIds;

    }


    /**
     * A function designed to deal with how AWFUL Safari is. Safari does not consider touched to be a valid state in <body>,
     * therefore this is needed to force it to acknowledge the state.
     * @param formGroup 
     * @param id of the parent (input) component
     */
    wasTouched(formGroup: FormGroup, id: string) {
        formGroup.get(id)?.markAsTouched();
      }
}