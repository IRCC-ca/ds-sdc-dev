import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IIconButtonComponentConfig,
  IIconButtonIconConfig
} from '../../shared/icon-button/icon-button.component';
import { IButtonConfig } from '../../shared/button/button.component';

export enum BannerType {
  '' = '',
  generic = 'generic',
  info = 'info',
  critical = 'critical',
  success = 'success',
  warning = 'warning'
}

export enum BannerSize {
  large = 'large',
  small = 'small'
}

export enum CTAType {
  link = 'link',
  button = 'button'
}

export interface ICTAConfig {
  text: string;
  type: keyof typeof CTAType;
  linkConfig?: any; //TO-DO: build link component and replace type any with ILinkConfig interface. For now will take url.
  btnConfig?: IButtonConfig;
  ariaLabel?: string;
}

export interface IBannerConfig {
  id: string;
  title?: string;
  content?: string;
  type?: keyof typeof BannerType;
  rounded?: boolean;
  dismissible?: boolean;
  cta?: ICTAConfig[];
  size?: keyof typeof BannerSize;
  ariaDissmissible?: string;
}

@Component({
  selector: 'ircc-cl-lib-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  lineVisible = true;
  textId = '';

  @Input() config: IBannerConfig = {
    id: ''
  };
  @Input() id?: string;
  @Input() title?: string;
  @Input() content?: string;
  @Input() type?: keyof typeof BannerType;
  @Input() rounded?: boolean;
  @Input() dismissible?: boolean;
  @Input() cta?: ICTAConfig[];
  @Input() size?: keyof typeof BannerSize;
  @Input() ariaDissmissible?: string;

  @Output() btnEvent = new EventEmitter();

  iconConfig: IIconButtonComponentConfig = {
    id: '', //id is set in ngOnInit
    category: 'custom',
    icon: {
      class: 'fa-solid fa-xmark',
      color: 'var(--text-primary)'
    }
  };

  eventHandler(emitValue: string) {
    console.log(emitValue);
    if (this.config?.id) {
      let banner = document.getElementById(this.config?.id);
      banner?.classList.add('bannerDismissed');
      setTimeout(function () {
        banner?.classList.add('noDisplay');
        banner?.classList.remove('bannerDismissed');
      }, 700);
      this.btnEvent?.emit(this.config.id);
      banner?.classList.remove('noDisplay');
    }
  }

  toggleLine() {
    let containerHeight = document.getElementById(this.textId)?.offsetHeight;
    let el: any = document.querySelector(`#${this.config?.id} .banner-line`);
    let ctas: any = document.querySelector(`#${this.config?.id} .banner-ctas`);
    if (
      (containerHeight && el && containerHeight > 35) ||
      (el && containerHeight && containerHeight > 23 && ctas)
    ) {
      el.style.display = 'block';
    } else if (el) {
      el.style.display = 'none';
    }
  }

  ngOnInit() {
    //set config from individual options, if present
    if (this.id) this.config.id = this.id;
    if (this.title) this.config.title = this.title;
    if (this.content) this.config.content = this.content;
    if (this.type) this.config.type = this.type;
    if (this.rounded) this.config.rounded = this.rounded;
    if (this.dismissible) this.config.dismissible = this.dismissible;
    if (this.cta) this.config.cta = this.cta;
    if (this.size) this.config.size = this.size;
    if (this.ariaDissmissible) this.config.ariaDissmissible = this.ariaDissmissible;

    this.iconConfig.id = this.config?.id + '_closeBtn';
    this.textId = this.config?.id + '_text';

    if (this.config?.cta) {
      this.config?.cta.forEach((item) => {
        if (item.ariaLabel && item.btnConfig)
          item.btnConfig.ariaLabel = item.ariaLabel;
      });
    }


    if (!this.config.ariaDissmissible || this.config.ariaDissmissible === '') {
      if (this.config.dismissible) {
        this.config.ariaDissmissible = 'close';
      }
    }
  }

  ngAfterViewInit() {
    this.toggleLine();
  }

  ngAfterViewChecked() {
    this.toggleLine();
  }
}
