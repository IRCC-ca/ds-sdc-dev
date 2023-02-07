import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonCategories, ButtonColor, ButtonIconDirection } from '../button/button.component';
import { IIconButtonIconConfig } from '../icon-button/icon-button.component';
;

export enum BannerType {
  '' = '',
  generic = 'generic',
  info = 'info',
  critical = 'critical',
  success = 'success',
  warning = 'warning'
};

export enum BannerSize {
  large = 'large',
  small = 'small'
}

 export interface ICTAConfig {
   text: string,
   category?: keyof typeof ButtonCategories,
   color?: keyof typeof ButtonColor,
   ariaLabel?: string,
   disabled?: boolean,
   icon?: string,
   iconDirection?: keyof typeof ButtonIconDirection,
   link?: boolean
 }

export interface IBannerConfig {
  id: string,
  title?: string,
  content?: string,
  type?: keyof typeof BannerType,
  rounded?: boolean,
  dismissible?: boolean,
  cta?: ICTAConfig[],
  size?: keyof typeof BannerSize
}

@Component({
  selector: 'lib-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {

  closeIcon : IIconButtonIconConfig = {class: 'fa-solid fa-xmark'}

  closeButtonId = '';
  iconName = '';
  lineVisible = true;

  @Input() config?: IBannerConfig;
  @Input() id?: string;

  @Output() btnEvent? = new EventEmitter();

  eventHandler(emitValue: string){
    this.btnEvent?.emit(emitValue);
  }

  // getElement(){

  // }

  ngOnInit(){
    this.closeButtonId = this.config?.id + '_closeBtn';
  }

  ngOnCheck(){

  }

  ngAfterViewInit(){
    let containerHeight = document.getElementById(this.config?.id || '')?.offsetHeight;
    console.log('height ', containerHeight);
    if(containerHeight && containerHeight <= 10){
      let el : any = document.querySelector(`#${this.config?.id} .banner-line`);
      el.style.display = 'none';
    }
  }

}
