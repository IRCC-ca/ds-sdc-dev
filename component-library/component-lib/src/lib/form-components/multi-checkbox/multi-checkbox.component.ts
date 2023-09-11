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

    this.checkErrors();

    if (this.config.parent != undefined) {
      this.config.parent.formGroup
        ?.get(this.config.parent.id)
        ?.statusChanges.subscribe((value: any) => {});

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
                    ?.patchValue(true);
                  this.config!.parent!.mixed = true;
                } else if (positive > 0 && negative == 0) {
                  this.config.parent?.formGroup
                    .get(this.config.parent?.id)
                    ?.patchValue(true);

                  this.config!.parent!.mixed = false;
                } else if (positive == 0 && negative > 0) {
                  this.config.parent?.formGroup
                    .get(this.config.parent?.id)
                    ?.patchValue(false);
                  this.config!.parent!.mixed = false;
                }
              }
            }
          }
        );

      this.errorSub =
        this.multicheckboxService.multiCheckboxErrorobs$.subscribe(
          (response) => {
            // this.checkErrors();
            // if (response.id === this.config.parent?.id) {
            //   if (
            //     response.event.hasOwnProperty('remove') &&
            //     response.event.remove === true
            //   ) {
            //     this.removeResponseFromError(response);
            //   } else {
            //     this.config?.errorMessages.push(response.event);
            //   }
            // } else if (
            //   this.config.children &&
            //   this.config.children?.findIndex((child) => {
            //     return child.id === response.id;
            //   }) > -1
            // ) {
            //   if (
            //     response.event.hasOwnProperty('remove') &&
            //     response.event.remove === true
            //   ) {
            //     let newErrorMessages = new Array<IErrorPairsMutltiCheckBox>();
            //     this.config.errorMessages.forEach((error) => {
            //       if (error.id != response.id) {
            //         newErrorMessages.push(error);
            //       }
            //     });
            //     this.config.errorMessages = newErrorMessages;
            //   } else {
            //     this.config?.errorMessages.push(response.event);
            //   }
            // }
            // this.config.errorMessages = this.config.errorMessages.filter(
            //   (value, index, self) =>
            //     index ===
            //     self.findIndex((t) => {
            //       return (
            //         t.key === value.key &&
            //         t.errorLOV === value.errorLOV &&
            //         t.id == value.id
            //       );
            //     })
            // );
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

  checkErrors() {
    // if (this.config.parent != undefined) {
    //   this.config.parent.formGroup
    //     ?.get(this.config.parent.id)
    //     ?.statusChanges.subscribe((value: any) => {
    //       if (value != 'VALID') {
    //         for (const error in this.config?.parent?.formGroup?.get(
    //           this.config.parent.id
    //         )?.errors) {
    //           let errorIndex = this.config.errorMessages?.findIndex(
    //             (errorPair) => {
    //               return errorPair.key === error;
    //             }
    //           );

    //           if (errorIndex > -1) {
    //             this.errorMessages.push({
    //               id: this.config.parent?.id,
    //               key: 'required',
    //               errorLOV: this.config.errorMessages[errorIndex].errorLOV
    //             });
    //           }
    //         }
    //       } else {
    //         this.errorMessages = this.errorMessages.filter(
    //           (errorPair) => errorPair.id != this.config.parent?.id
    //         );
    //       }
    //     });
    // }

    this.config.children?.forEach((res) => {
      res.formGroup?.get(res.id)?.statusChanges.subscribe((value: any) => {
        if (value != 'VALID') {
          for (const error in res.formGroup?.get(res.id)?.errors) {
            let errorIndex = this.config.errorMessages?.findIndex(
              (errorPair) => {
                return errorPair.key === error;
              }
            );

            if (errorIndex > -1) {
              this.errorMessages.push({
                id: res.id,
                key: 'required',
                errorLOV: this.config.errorMessages[errorIndex].errorLOV
              });
            }
          }
        } else {
          this.errorMessages = this.errorMessages.filter(
            (errorPair) => errorPair.id != res.id
          );
        }
      });
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
