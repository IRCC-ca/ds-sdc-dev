import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICheckBoxComponentConfig } from '../../../public-api';
import { MultiCheckboxService } from './multi-checkbox.service';

export interface IMultiCheckboxConfig {
  id: string;
  parent: ICheckBoxComponentConfig;
  children?: ICheckBoxComponentConfig[];
}

@Component({
  selector: 'ircc-cl-lib-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css']
})
export class MultiCheckboxComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  configSub?: Subscription;

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
    ]
  };
  constructor(private multicheckboxService: MultiCheckboxService) {}

  ngOnInit() {
    this.config.parent.formGroup.addControl(
      this.config.parent.id,
      new FormControl('', Validators.required)
    );

    this.config.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl('', Validators.required)
      );
    });

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
  }
}
