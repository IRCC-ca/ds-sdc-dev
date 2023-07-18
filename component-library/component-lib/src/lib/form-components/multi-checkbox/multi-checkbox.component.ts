import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    this.configSub = this.multicheckboxService.multiCheckboxEventObs$.subscribe(
      (response) => {
        if (response.id === this.config.parent.id) {
          this.config.children?.forEach((res) => {
            res.formGroup.get(res.id)?.setValue(response.event);
          });
        } else if (
          this.config.children?.findIndex((child) => {
            child.id === response.id;
          })
        ) {
          console.log('Clicked');
          // this.config.parent.label += 'Child Clicked';
          // this.config.parent.size = 'large';
          this.config.parent.mixed = true;
        }
      }
    );
  }
}
