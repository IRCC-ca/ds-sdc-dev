import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { ILinkComponentConfig } from "./link/link.component";
import { TranslateService } from "@ngx-translate/core";
import { StandAloneFunctions } from "../../../shared/functions/stand-alone.functions";
import { IIconButtonComponentConfig } from "../icon-button/icon-button.component";

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
  separatorIcon: IIconButtonComponentConfig = {
    id: 'breadcrumb_separator',
    category: 'custom',
    size: this.config?.size,
    icon: {
      class: 'fa-solid fa-ellipsis',
      color: 'var(--text-primary)'
    }
  };
  overflowLinks?: ILinkComponentConfig[];
  normalLinks?: ILinkComponentConfig[]; // Links that are not overflow
  displayOverflow = false;
  constructor(private translate: TranslateService, private standalone: StandAloneFunctions) {}

  ngOnInit() {
    this.createLinks();
    this.separatorIcon.size = this.config.size;
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
    this.separatorIcon.size = this.config.size;
  }

  /**
   * Create href or routerLinks
   */
  createLinks() {
    this.baseUrl = this.standalone.getBaseUrl('', this.config.baseUrlKey);
    if (this.config.links && this.config.links.length > 1) {
      let prev: string | undefined;
      const linksLength = this.config.links.length;
      this.config?.links.forEach((link, i) => {
        if (i === 0) {
          link[this.config.type] = this.baseUrl;
          prev = link[this.config.type]
        } else if (link.linkKey) {
          link[this.config.type] = prev + this.translate.instant(link.linkKey) + '/'
          prev = link[this.config.type]
        }
        // To be removed
        if (i > 0 && i < linksLength - 2) {
          link.overflow = true;
        }
      })

      this.overflowLinks = this.config?.links.filter(link => link.overflow);
      this.normalLinks = this.config?.links.filter(link => !link.overflow);
    }
  }

  flipOverflow(buttonId: string) {
    this.displayOverflow = !this.displayOverflow;
  }
}
