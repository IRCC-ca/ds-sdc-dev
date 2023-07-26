import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICheckBoxComponentConfig, IErrorPairs, MultiCheckboxService } from '../../../public-api';

import {
  IErrorIDs,
  StandAloneFunctions
} from '../../../shared/functions/stand-alone.functions';

export interface IErrorPairsMutltiCheckBox {
  id: string;
  key: string;
  errorLOV: string;
}

export interface IMultiCheckboxConfig {
  id: string;
  parent: ICheckBoxComponentConfig;
  children?: ICheckBoxComponentConfig[];
  errorMessages: IErrorPairsMutltiCheckBox[];
}

@Component({
  selector: 'ircc-cl-lib-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css']
})
export class MultiCheckboxComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  configSub?: Subscription;
  errorSub?: Subscription;
  errorIds: IErrorIDs[] = [];

  @Input() config: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: '',
      formGroup: this.form,
      label: 'Parent',
      size: 'small'
    },
    children: [
      {
        id: '',
        formGroup: this.form,
        label: 'Child',
        size: 'small'
      }
    ],
    errorMessages: []
  };
  constructor(
    private multicheckboxService: MultiCheckboxService,
    public standAloneFunctions: StandAloneFunctions
  ) {
    this.configSub = this.multicheckboxService.multiCheckboxEventObs$.subscribe(
      (response) => {
        if (this.config.children) {
          if (response.id === this.config.parent.id) {
            this.config.children?.forEach((res) => {
              this.multicheckboxService.checkEvent({
                id: res.id,
                event: response.event
              });
            });
            this.config.parent.mixed = false;
          } else if (
            this.config.children?.findIndex((child) => {
              return child.id === response.id;
            }) > -1
          ) {
            let positive = 0;
            let negative = 0;

            this.config.children?.forEach((res) => {
              res.formGroup.get(res.id)?.value === true
                ? positive++
                : negative++;
            });

            if (positive > 0 && negative > 0) {
              this.config.parent.formGroup
                .get(this.config.parent.id)
                ?.patchValue(true, { emitEvent: false });
              this.config.parent.mixed = true;
            } else if (positive > 0 && negative == 0) {
              this.config.parent.formGroup
                .get(this.config.parent.id)
                ?.patchValue(true, { emitEvent: false });
              this.config.parent.mixed = false;
            } else if (positive == 0 && negative > 0) {
              this.config.parent.formGroup
                .get(this.config.parent.id)
                ?.patchValue(false, { emitEvent: false });
              this.config.parent.mixed = false;
            }
          }
        }
      }
    );

    this.errorSub = this.multicheckboxService.multiCheckboxErrorobs$.subscribe(
      (response) => {
        if (response.id === this.config.parent.id) {
          if (
            response.event.hasOwnProperty('remove') &&
            response.event.remove === true
          ) {
            this.removeResponseFromError(response);
          } else {
            this.config?.errorMessages.push(response.event);
          }
        } else if (
          this.config.children &&
          this.config.children?.findIndex((child) => {
            return child.id === response.id;
          }) > -1
        ) {
          if (
            response.event.hasOwnProperty('remove') &&
            response.event.remove === true
          ) {
            let newErrorMessages = new Array<IErrorPairsMutltiCheckBox>();

            this.config.errorMessages.forEach((error) => {
              if (error.id != response.id) {
                newErrorMessages.push(error);
              }
            });

            this.config.errorMessages = newErrorMessages;
          } else {
            this.config?.errorMessages.push(response.event);
          }
        }

        this.config.errorMessages = this.config.errorMessages.filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => {
              return (
                t.key === value.key &&
                t.errorLOV === value.errorLOV &&
                t.id == value.id
              );
            })
        );
      }
    );
  }

  ngOnInit() {}

  removeResponseFromError(response: any) {
    this.config.errorMessages = this.config.errorMessages.filter((item) => {
      item?.key !== response.id;
    });
  }
}
