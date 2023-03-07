import { Component, Input } from '@angular/core';

export interface ILinkComponentConfig {
  text: string,
  //TODO: Delete below and make input field "linkKey"
  linkKey?: string;
  

  // href?: string,
  // routerLink?: string
}

@Component({
  selector: 'lib-breadcrumb-link',
  templateUrl: './link.component.html',
})
export class BreadcrumbLinkComponent {
  @Input() config?: ILinkComponentConfig

  constructor() { }

}
