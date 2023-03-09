import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { ILinkComponentConfig } from "./link/link.component";
import { TranslateService } from "@ngx-translate/core";
import { StandAloneFunctions } from "../../../shared/functions/stand-alone.functions";

export enum LinkType {
  href = 'href',
  routerLink = 'routerLink',
  anchor = 'anchor'
}

export interface IBreadcrumbConfig {
  //TODO: Make an enum for type (i.e. HREF, RouterLink, anchor)
  id: string,
  size?: keyof typeof DSSizes,
  type: keyof typeof LinkType;
  // Translation key of base url segment
  baseUrlKey: string;
  // The mid-layer navigation to the ancestor links, the previous pages that lead to users to the child page
  links?: ILinkComponentConfig[],
  // Child page title
  chilePage?: string,
}

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  @Input() config: IBreadcrumbConfig = {
    id: '',
  };
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    if (this.config?.type !== 'anchor') {
      this.createLinks();
    }
  }

  createLinks() {
    let i = '';
    // this.config?.links.forEach(link => {
      // link.linkKey = (i += '/' + this.trans)
    // })
  }

}
