import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';


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
export class ErrorComponent implements OnInit {
  @Input() config?: IErrorComponentConfig;
  @Input() id?: string;
  @Input() errorLOV?: string;
  @Input() icon?: IErrorIconConfig;
  @Input() size?: keyof typeof DSSizes;

  constructor() { }
  ngOnInit() {
    //Initial null and override check:
    if (!this.config) this.config = {id: '', errorLOV: ''};
    if (this.id) this.config.id = this.id;
    if (this.errorLOV) this.config.errorLOV = this.errorLOV;
    if (this.icon) this.config.icon = this.icon;
    if (this.size) this.config.size = this.size;
  }
}
