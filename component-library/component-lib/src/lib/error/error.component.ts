import { Component, Input, OnInit } from '@angular/core';


export interface IErrorIconConfig {
  class: string; // Fontawesome icon class
  color?: string; // icon color
}

export interface IErrorComponentConfig {
  id: string;
  errorLOV: string;
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

  constructor() { }

  ngOnInit() {
    //Initial null and override check:
    if (!this.config) this.config = {id: '', errorLOV: ''};
    if (this.id) this.config.id = this.id;
    if (this.errorLOV) this.config.errorLOV = this.errorLOV;
    if (this.icon) this.config.icon = this.icon;
  }

}
