import { Component, Input } from '@angular/core';

export interface ILinkComponentConfig {
  text: string;
  linkKey?: string;
  href?: string;
  routerLink?: string;
  overflow?: boolean;
}

@Component({
  selector: 'ircc-cl-lib-breadcrumb-link',
  templateUrl: './link.component.html'
})
export class BreadcrumbLinkComponent {
  @Input() config: ILinkComponentConfig = {
    text: '',
    overflow: false
  };

  constructor() {}
}
