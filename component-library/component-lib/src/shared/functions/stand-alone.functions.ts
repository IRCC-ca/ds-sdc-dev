import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ILabelConfig, ILabelIconConfig } from '../../lib/shared/label/label.component';
import { IErrorPairs } from '../interfaces/component-configs';

export interface IErrorIDs {
  id?: string;
  key: string;
  errorLOV: string;
}

@Injectable({
  providedIn: 'root'
})
export class StandAloneFunctions {
  constructor(private translate: TranslateService) {}

  getErrorAria(formGroup: FormGroup, id: string, errorMessages: IErrorPairs[]) {
    let returnError = '';
    if (formGroup.get(id)?.dirty && formGroup.get(id)?.invalid) {
      errorMessages?.forEach((error) => {
        if (formGroup.get(id)?.errors?.[error.key]) {
          returnError === ''
            ? (returnError += this.translate.instant(error.errorLOV))
            : (returnError += ', ' + this.translate.instant(error.errorLOV));
        }
      });
      returnError += '.';
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
    errorMessages?.forEach((message) => {
      errorIds.push({ key: message.key, errorLOV: message.errorLOV });
    });

    //Code block to get errors that have occurred before the statusChange obs is activated
    let i = 0;
    errorIds.forEach((error) => {
      if (formGroup.get(id)?.errors?.[error.key]) {
        error.id = id + '_error' + i;
        i++;
      }
    });

    formGroup.get(id)?.statusChanges.subscribe((change) => {
      let i = 0;
      errorIds.forEach((error) => {
        if (formGroup.get(id)?.errors?.[error.key]) {
          error.id = id + '_error' + i;
          i++;
        }
      });
    });
    return errorIds;
  }

  /**
   * Create a label config - for use inside form input components
   * @param formGroup
   * @param id
   * @param parentID
   * @param errorMessages
   * @param label
   * @param desc
   * @param hint
   * @param required
   */
  makeLabelConfig(
    formGroup: FormGroup,
    parentID: string,
    errorMessages?: IErrorPairs[],
    label?: string,
    desc?: string,
    hint?: string,
    required?: boolean,
    iconButton?: ILabelIconConfig,
    topLabel?: string
  ) {
    const config: ILabelConfig = {
      formGroup: formGroup,
      parentID: parentID,
      errorMessages: errorMessages,
      label: label,
      desc: desc,
      hint: hint,
      required: required,
      iconButton: iconButton,
      topLabel: topLabel
    };
    return config;
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

  /**
   * Get the current base url.
   * @param baseUrl
   * @param baseUrlKey Translation key of base url
   */
  getBaseUrl(baseUrl: string = '', baseUrlKey?: string): string {
    const curLang = this.translate.currentLang;
    const langKey = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
    let i: string | string[] = window.location.href.slice(
      window.location.href.indexOf(langKey),
      window.location.href.length
    );
    i = i.split('/');

    let index = 0;
    for (const j of i) {
      if (j === this.translate.instant(baseUrlKey ?? '')) {
        baseUrl += '/' + j;
        // Should halt when find the base url segment
        break;
      } else if (index !== i.length - 1) {
        baseUrl += '/' + j;
        index += 1;
      }
    }
    if (baseUrl[baseUrl.length] !== '/') baseUrl += '/';

    return baseUrl;
  }
}
