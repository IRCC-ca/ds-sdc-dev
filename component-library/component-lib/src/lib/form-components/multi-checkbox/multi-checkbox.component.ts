import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  ICheckBoxComponentConfig,
  IErrorPairs,
  MultiCheckboxService
} from '../../../public-api';

import {
  IErrorIDs,
  StandAloneFunctions
} from '../../../shared/functions/stand-alone.functions';

export interface IErrorPairsMutltiCheckBox {
  id?: string;
  key: string;
  errorLOV: string;
}

export interface IMultiCheckboxConfig {
  id: string;
  parent?: ICheckBoxComponentConfig;
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
    errorMessages: []
  };

  errorMessages: IErrorPairsMutltiCheckBox[] = [];

  errorMessagesAccumulator: IErrorPairsMutltiCheckBox[] = [];

  constructor(
    private multicheckboxService: MultiCheckboxService,
    public standAloneFunctions: StandAloneFunctions
  ) {}

  ngOnInit() {
    //errorChecking

    this.checkErrorsSubscription();

    this.errorSub = this.multicheckboxService.multiCheckboxErrorobs$.subscribe(
      (response) => {
        if (this.config.children) {
          let children = this.config.children?.findIndex((child) => {
            return child.id === response;
          });

          if (children > -1) {
            this.checkError(
              this.config?.children[children]?.formGroup?.get(response)?.status,
              this.config?.children[children]?.formGroup || new FormGroup({}),
              response
            );
          }
        }
        if (this.config?.parent?.id === response) {
          this.checkError(
            this.config?.parent?.formGroup?.get(response)?.status,
            this.config?.parent?.formGroup || new FormGroup({}),
            response
          );
        }
      }
    );

    if (this.config.parent != undefined) {
      this.configSub =
        this.multicheckboxService.multiCheckboxEventObs$.subscribe(
          (response) => {
            if (this.config.children) {
              if (response.id === this.config.parent?.id) {
                this.config.children?.forEach((res) => {
                  this.multicheckboxService.checkEvent({
                    id: res.id,
                    event: response.event
                  });
                });
                this.config.parent.mixed = false;

                this.checkError(
                  this.config?.parent?.formGroup?.get(this.config.parent?.id)
                    ?.status,
                  this.config?.parent?.formGroup || new FormGroup({}),
                  this.config.parent?.id
                );

                this.config.children?.forEach((res) => {
                  this.checkError(
                    this.config?.parent?.formGroup?.get(res.id)?.status,
                    this.config?.parent?.formGroup || new FormGroup({}),
                    res.id
                  );
                });
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
                  this.config.parent?.formGroup
                    .get(this.config.parent?.id)
                    ?.patchValue(true, { emitEvent: false });
                  this.config!.parent!.mixed = true;
                } else if (positive > 0 && negative == 0) {
                  this.config.parent?.formGroup
                    .get(this.config.parent?.id)
                    ?.patchValue(true, { emitEvent: false });

                  this.config!.parent!.mixed = false;
                } else if (positive == 0 && negative > 0) {
                  this.config.parent?.formGroup
                    .get(this.config.parent?.id)
                    ?.patchValue(false, { emitEvent: false });
                  this.config!.parent!.mixed = false;
                }
              }
            }

            this.checkError(
              this.config?.parent?.formGroup?.get(this.config.parent?.id)
                ?.status,
              this.config.parent?.formGroup || new FormGroup({}),
              this.config.parent?.id || ''
            );

            this.config.children?.forEach((res) => {
              this.checkError(
                this.config?.parent?.formGroup?.get(res.id)?.status,
                this.config?.parent?.formGroup || new FormGroup({}),
                res.id
              );
            });
          }
        );
    } else {
      this.configSub =
        this.multicheckboxService.multiCheckboxEventObs$.subscribe(
          (response) => {
            if (this.config.children) {
              if (
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
                  this.config.children?.forEach((res) => {
                    res.mixed = true;
                  });
                } else if (positive > 0 && negative == 0) {
                  this.config.children?.forEach((res) => {
                    res.mixed = false;
                  });
                } else if (positive == 0 && negative > 0) {
                  this.config.children?.forEach((res) => {
                    res.mixed = false;
                  });
                }
              }
            }
          }
        );
    }
  }

  checkErrorsSubscription() {
    this.config.children?.forEach((res) => {
      res.formGroup?.get(res.id)?.statusChanges.subscribe((value: any) => {
        this.checkError(value, res.formGroup, res.id);
      });
    });

    if (this.config.parent != undefined) {
      console.log('here');
      this.config.parent.formGroup
        ?.get(this.config.parent.id)
        ?.statusChanges.subscribe((value: any) => {
          this.checkError(
            value,
            this.config?.parent?.formGroup || new FormGroup({}),
            this.config?.parent?.id || ''
          );

          this.config.children?.forEach((res) => {
            res.formGroup
              ?.get(res.id)
              ?.statusChanges.subscribe((value: any) => {
                this.checkError(value, res.formGroup, res.id);
              });
          });
        });
    }
  }

  checkError(value: any, group: FormGroup, id: string) {
    if (value != 'VALID') {
      for (const error in group.get(id)?.errors) {
        let errorIndex = this.config.errorMessages?.findIndex((errorPair) => {
          return errorPair.key === error;
        });

        let errorMessagesKeys = this.errorMessages?.findIndex((errorPair) => {
          return errorPair.key === error && id === errorPair.id;
        });

        if (errorIndex > -1 && errorMessagesKeys === -1) {
          this.errorMessages.push({
            id: id,
            key: this.config.errorMessages[errorIndex].key,
            errorLOV: this.config.errorMessages[errorIndex].errorLOV
          });
        }
        this.filterErrorList();
      }
    } else {
      this.errorMessages = this.errorMessages.filter(
        (errorPair) => errorPair.id != id
      );
      this.filterErrorList();
    }
  }

  filterErrorList() {
    this.errorMessagesAccumulator = [];

    this.errorMessages.forEach((error) => {
      let errorIndex = this.errorMessagesAccumulator.findIndex((errorPair) => {
        return errorPair.key === error.key;
      });

      if (errorIndex === -1) {
        this.errorMessagesAccumulator.push(error);
      }
    });
  }

  isValid(checkbox: ICheckBoxComponentConfig) {
    return typeof checkbox !== 'undefined';
  }

  removeResponseFromError(response: any) {
    this.config.errorMessages = this.config.errorMessages.filter((item) => {
      item?.key !== response.id;
    });
  }
}
