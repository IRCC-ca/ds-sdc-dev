import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum AlertType {
  generic = 'generic',
  info = 'info',
  critical = 'critical',
  success = 'success',
  warning = 'warning'
};

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  test = 'test';

  @Input() id = '';
  @Input() title = '';
  @Input() body = '';
  @Input() type? = AlertType.generic;
  @Input() rounded? = false;

  @Output() closeItem? = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.id);
    console.log(this.title);
    console.log(this.body);
    console.log(this.type);
    console.log(this.rounded);
  }
}
