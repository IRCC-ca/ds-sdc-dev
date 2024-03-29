import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  DSSizes,
  ICheckBoxComponentConfig,
  ILabelConfig,
  MultiCheckboxService
} from '../../../public-api';

import {
  IErrorIDs,
  StandAloneFunctions
} from '../../../shared/functions/stand-alone.functions';

export interface IErrorPairsMultiCheckBox {
  id?: string;
  key: string;
  errorLOV: string;
}

export interface IMultiCheckboxConfig {
  id: string;
  label: ILabelConfig;
  parent?: ICheckBoxComponentConfig;
  children?: ICheckBoxComponentConfig[];
  errorMessages: IErrorPairsMultiCheckBox[];
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
    label: {
      parentID: '',
      formGroup: this.form
    },
    errorMessages: []
  };

  @Input() id = '';
  @Input() parent? : ICheckBoxComponentConfig;
  @Input() children? : ICheckBoxComponentConfig[];
  @Input() errorMessages?: IErrorPairsMultiCheckBox[];

  /**
   * Accumulates all the errors on parents and children checkboxes
   * @type IErrorPairsMultiCheckBox[]
   */
  errorMessagesAccumulator: IErrorPairsMultiCheckBox[] = [];

  /**
   * Accumulates unique error types and used in the frontend to display
   * @type IErrorPairsMultiCheckBox[]
   */
  errorMessagesAccumulatorUniqueType: IErrorPairsMultiCheckBox[] = [];
  disabledStatus: boolean = false;
  groupCheckbox: boolean = true;

  // returns size depending on if its group or multicheckbox

  get size() : keyof typeof DSSizes {
    if(this.groupCheckbox && this.config.children) {
      return this.config?.children[0]?.size || 'large'

    }
    return this.config.parent?.size || 'large';
  }

  constructor(
    private multiCheckboxService: MultiCheckboxService,
    public standAloneFunctions: StandAloneFunctions
  ) {
    if (this.id !== '') this.config.id = this.id;
    if (this.parent) this.config.parent = this.parent;
    if (this.children) this.config.children = this.children;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;
  }

  ngOnInit() {
    //errorChecking

    this.checkErrorsSubscription();

    this.errorSub = this.multiCheckboxService.multiCheckboxErrorObs$.subscribe(
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


    if (this.config.parent !== undefined) {
      this.groupCheckbox = false
      this.configSub =
        this.multiCheckboxService.multiCheckboxEventObs$.subscribe(
          (response) => {
            if (this.config.children) {
              if (response.id === this.config.parent?.id) {
                this.config.children?.forEach((res) => {
                  this.multiCheckboxService.checkEvent({
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
            }
          }
        );
    }
  }

  checkErrorsSubscription() {
    this.config.children?.forEach((res) => {
      res.formGroup?.get(res.id)?.statusChanges.subscribe((value: any) => {
        this.checkError(value, res.formGroup, res.id);
        value === 'DISABLED'
          ? (this.disabledStatus = true)
          : (this.disabledStatus = false);
      });
    });

    if (this.config.parent !== undefined) {
      this.config.parent.formGroup
        ?.get(this.config.parent.id)
        ?.statusChanges.subscribe((value: any) => {
          this.checkError(
            value,
            this.config?.parent?.formGroup || new FormGroup({}),
            this.config?.parent?.id || ''
          );
          value === 'DISABLED'
            ? (this.disabledStatus = true)
            : (this.disabledStatus = false);

          this.config.children?.forEach((res) => {
            res.formGroup
              ?.get(res.id)
              ?.statusChanges.subscribe((value: any) => {
                this.checkError(value, res.formGroup, res.id);
                value === 'DISABLED'
                  ? (this.disabledStatus = true)
                  : (this.disabledStatus = false);
              });
          });
        });
    }
  }

  /**
   * Will check the status of a formcontrol.  If the control is not in a valid status, it will loop through the errors
   * and add them to this.errorMessages.
   * @param value Status of the formcontrol
   * @param group - Formgroup to be checked
   * @param id - ID of the control that is being checked for error in the formgroup
   */
  checkError(value: FormControlStatus | undefined, group: FormGroup, id: string) {
    if (value !== 'VALID') {
      for (const error in group.get(id)?.errors) {
        let errorIndex = this.config.errorMessages?.findIndex((errorPair) => {
          return errorPair.key === error;
        });

        let errorMessagesKeys = this.errorMessagesAccumulator?.findIndex((errorPair) => {
          return errorPair.key === error && id === errorPair.id;
        });

        if (errorIndex > -1 && errorMessagesKeys === -1) {
          this.errorMessagesAccumulator.push({
            id: id,
            key: this.config.errorMessages[errorIndex].key,
            errorLOV: this.config.errorMessages[errorIndex].errorLOV
          });
        }
        this.filterErrorList();
      }
    } else {

      this.errorMessagesAccumulator = this.errorMessagesAccumulator.filter(
        (errorPair) => 
        {
          return (errorPair.id)?.replace('_error0', '') !== id
        }
      );
      this.filterErrorList();
    }
  }

  /**
   * Will loop through the errors in the variable errorMessages.
   * It will then add a copy in errorMessagesAccumulator for each unique error type.
   * THe first error in errorMessagesAccumulator will get _error0 appended to it's ID to display the icon
   */
  filterErrorList() {
    this.errorMessagesAccumulatorUniqueType = [];

    this.errorMessagesAccumulator.forEach((error) => {
      let errorIndex = this.errorMessagesAccumulatorUniqueType.findIndex((errorPair) => {
        return errorPair.key === error.key;
      });

      if (errorIndex === -1) {
        this.errorMessagesAccumulatorUniqueType.push(error);
      }
    });


    if(this.errorMessagesAccumulatorUniqueType[0]){
      if(this.errorMessagesAccumulatorUniqueType[0].id && !this.errorMessagesAccumulatorUniqueType[0].id.endsWith("_error0")) {
        this.errorMessagesAccumulatorUniqueType[0].id = this.errorMessagesAccumulatorUniqueType[0].id + "_error0"
      }
    }
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
