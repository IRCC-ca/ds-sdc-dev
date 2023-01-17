import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum AlertType {
  generic = 'generic',
  info = 'info',
  critical = 'critical',
  success = 'success',
  warning = 'warning'
};

export interface IAlertConfig {
  id: string,
  title: string,
  body: string,
  type?: AlertType,
  rounded?: boolean
}

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  @Input() config: IAlertConfig = {
    id: '',
    title: '',
    body: ''
  };
  @Input() id = '';
  @Input() title = '';
  @Input() body = '';

  @Output() closeItem? = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log('it is', this.config.type);
  }
}
