import { Component, Input } from '@angular/core';

export interface ILinkComponentConfig {
  text: string,
  linkKey?: string;
  //TODO: Delete below and make input field "linkKey"
  href?: string,
  routerLink?: string,
  anchor?: string
}

@Component({
  selector: 'lib-breadcrumb-link',
  templateUrl: './link.component.html',
})
export class BreadcrumbLinkComponent {
  @Input() config?: ILinkComponentConfig

  constructor() { }

  /**
   * Scroll smoothly to the anchored element
   * @param anchor anchor tag that was clicked
   */
  anchorClicked(anchor?: string) {
    const el = document.getElementById(anchor || '');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
