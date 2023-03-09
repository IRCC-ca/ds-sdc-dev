import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components/jl-components.constants/jl-components.constants';


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
  selector: 'lib-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() config?: IErrorComponentConfig;
  @Input() id?: string;
  @Input() errorLOV?: string;
  @Input() icon?: IErrorIconConfig;
  @Input() size?: keyof typeof DSSizes;

  constructor() { }
  ngOnInit() {
    //Initial null and override check:
    if (!this.config) this.config = {id: '', errorLOV: ''};
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
    }
  }
}
