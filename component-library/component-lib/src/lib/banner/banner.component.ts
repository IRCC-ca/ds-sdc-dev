import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  type?: BannerType,
  rounded?: boolean,
  dismissible?: boolean,
  //cta?: ICTAConfig[]
}

@Component({
  selector: 'lib-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent{

  @Input() config: IBannerConfig = {
    id: '',
  };
  @Input() id = '';

  @Output() closeItem? = new EventEmitter();

}
