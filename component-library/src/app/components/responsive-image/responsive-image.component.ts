import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface IResponsiveImageComponentConfig {
  id: string;
  altText: string;
  defaultSrc: string;
  desktopSrc: string;
  mobileSrc: string;
  maxWidth?: number | null;
  lazyLoad?: boolean | null;
}
@Component({
  selector: 'app-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss']
})
export class ResponsiveImageComponent {
  @Input() config: IResponsiveImageComponentConfig = {
    id: '',
    altText: '',
    defaultSrc: '',
    desktopSrc: '',
    mobileSrc: '',
    maxWidth: 0,
    lazyLoad: false
  };

  constructor(private translate: TranslateService) {}
}
