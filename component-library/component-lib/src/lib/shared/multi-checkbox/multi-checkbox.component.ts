import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICheckBoxComponentConfig } from "../../../public-api";
import { MultiCheckboxService } from './multi-checkbox.service';

export interface IMultiCheckboxConfig {
  id: string,
  parent?: ICheckBoxComponentConfig;
  children?: ICheckBoxComponentConfig[];
}

@Component({
  selector: 'ircc-cl-lib-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css']
})
export class MultiCheckboxComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  configSub?: Subscription;

  config: IMultiCheckboxConfig = {
    id: '',
    parent: {
      id: '',
      formGroup: this.form
    },
    children: [
      {
        id: '',
        formGroup: this.form
      }
    ]
  }
  constructor(
    private multicheckboxService: MultiCheckboxService
  ) { 

  }

  ngOnInit() {
    this.configSub = this.multicheckboxService.multiCheckboxEventObs$.subscribe((res) => {
      this.config = res;
    })
  }

}
