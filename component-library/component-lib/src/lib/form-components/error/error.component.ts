import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { IIconConfig } from '../../shared/icon/icon.component';

export interface IErrorIconConfig {
  class: string; // Fontawesome icon class
  color?: string; // icon color
}

export interface IErrorComponentConfig {
  id: string;
  errorLOV: string;
  size?: keyof typeof DSSizes;
  icon?: IErrorIconConfig;
}

@Component({
  selector: 'ircc-cl-lib-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() config?: IErrorComponentConfig;
  @Input() id?: string;
  @Input() errorLOV?: string;
  @Input() icon?: IErrorIconConfig;
  @Input() size?: keyof typeof DSSizes;
  iconConfig?: IIconConfig;

  constructor() {}
  ngOnInit() {
    //Initial null and override check:
    if (!this.config)
      this.config = {
        id: '',
        errorLOV: ''
      };
    this.portInputValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.portInputValues();
  }

  private portInputValues() {
    if (this.config) {
      if (this.id) this.config.id = this.id;
      if (this.errorLOV) this.config.errorLOV = this.errorLOV;
      if (this.icon) this.config.icon = this.icon;
      if (this.size) this.config.size = this.size;

      this.iconConfig = {
        FA_keywords:
          this.config.icon?.class ?? 'fa-light fa-circle-exclamation',
        size: this.config.size
      };
    }
  }
}
