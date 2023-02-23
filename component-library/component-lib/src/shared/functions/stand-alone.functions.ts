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

    getErrorIds(formGroup: FormGroup, id: string, errorMessages: IErrorPairs[]) {
        let errorIds: IErrorIDs[] = [];
        errorMessages?.forEach(message => {
            errorIds.push({ key: message.key, errorLOV: message.errorLOV });
        });
        formGroup.get(id)?.statusChanges.subscribe(() => {
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
}