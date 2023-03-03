import { Component, Input } from '@angular/core';

export interface ILinkComponentConfig {
  text: string,
  href?: string,
  routerLink?: string
}

@Component({
  selector: 'lib-breadcrumb-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input() config?: ILinkComponentConfig

  constructor() { }

}
