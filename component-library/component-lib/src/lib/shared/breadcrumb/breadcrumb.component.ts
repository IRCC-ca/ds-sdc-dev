import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components.constants";
import { ILinkComponentConfig } from "./link/link.component";
import { TranslateService } from "@ngx-translate/core";
import { StandAloneFunctions } from "../../../shared/functions/stand-alone.functions";

export enum LinkType {
  href = 'href',
  routerLink = 'routerLink',
}

export interface IBreadcrumbConfig {
  id: string,
  size?: keyof typeof DSSizes,
  type: keyof typeof LinkType;
  // Translation key of base url segment
  baseUrlKey: string;
  // The mid-layer navigation to the ancestor links, the previous pages that lead to users to the child page
  links?: ILinkComponentConfig[],
}

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() config: IBreadcrumbConfig = {
    id: '',
    baseUrlKey: '',
    type: 'href'
  };
  baseUrl = '';
  constructor(private translate: TranslateService, private standalone: StandAloneFunctions) {}

  ngOnInit() {
    this.createLinks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.config?.links && this.config?.links.length > 0) {
      if (this.config.type == 'routerLink') {
        this.config?.links.forEach(link => {
          delete link.href;
        })
      } else {
        this.config?.links.forEach(link => {
          delete link.routerLink;
        })
      }
    }
    this.createLinks();
  }

  /**
   * Create href or routerLinks
   */
  createLinks() {
    this.baseUrl = this.standalone.getBaseUrl('', this.config.baseUrlKey);
    if (this.config.links && this.config.links.length > 1) {
      let prev: string | undefined;
      this.config?.links.forEach((link, i) => {
        if (i === 0) {
          link[this.config.type] = this.baseUrl;
          prev = link[this.config.type]
        } else if (link.linkKey) {
          link[this.config.type] = prev + this.translate.instant(link.linkKey) + '/'
          prev = link[this.config.type]
        }
      })
    }
  }
}
