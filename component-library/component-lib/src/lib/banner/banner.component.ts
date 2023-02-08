import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIconButtonIconConfig } from '../icon-button/icon-button.component';
import { ButtonCategories, ButtonColor, ButtonIconDirection, IButtonConfig } from '../button/button.component';

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

export enum CTAType {
  link = 'link',
  button = 'button'
}

export interface ICTAConfig {
  text: string,
  type: keyof typeof CTAType,
  linkConfig?: any, //TO-DO: build link component and replace type any with ILinkConfig interface. For now will take url.
  btnConfig?: IButtonConfig
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

  closeButtonId = '';
  iconName = '';
  lineVisible = true;
  textId = '';


  customIcon : IIconButtonIconConfig = {
    class: 'fa-solid fa-xmark'
  }


  @Input() config?: IBannerConfig;
  @Input() id?: string;

  @Output() btnEvent? = new EventEmitter();

  eventHandler(emitValue: string){
    this.btnEvent?.emit(emitValue);
  }

  toggleLine(){
    let containerHeight = document.getElementById(this.textId)?.offsetHeight;
    let el : any = document.querySelector(`#${this.config?.id} .banner-line`);
    if(containerHeight && el && containerHeight > 48){
      el.style.display = 'block';
    }else if(el){
      el.style.display = 'none';
    }
  }

  ngOnInit(){
    this.closeButtonId = this.config?.id + '_closeBtn';
    this.textId = this.config?.id + '_text';
  }

  ngAfterViewInit(){
    this.toggleLine();
  }

  ngAfterViewChecked(){
    this.toggleLine();
  }

}
