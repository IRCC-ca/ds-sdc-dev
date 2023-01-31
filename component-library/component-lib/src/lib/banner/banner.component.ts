import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { ButtonCategories, ButtonColor } from 'dist/ircc-ds-angular-component-library/public-api';

export enum BannerType {
  generic = 'generic',
  info = 'info',
  critical = 'critical',
  success = 'success',
  warning = 'warning'
};

// export interface ICTAConfig {
//   text: string,
//   category: ButtonCategories,
//   color: ButtonColor
// }

export interface IBannerConfig {
  id: string,
  title?: string,
  content?: string,
  type?: keyof typeof BannerType,
  rounded?: boolean,
  dismissible?: boolean,
  //cta?: ICTAConfig[]
}

@Component({
  selector: 'lib-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {

  closeButtonId = '';

  @Input() config?: IBannerConfig;
  @Input() id?: string;

  @Output() btnEvent? = new EventEmitter();

  eventHandler(emitValue: string){
    this.btnEvent?.emit(emitValue);
  }

  ngOnInit(){
    this.closeButtonId = this.config?.id + '_closeBtn';
  }

}
