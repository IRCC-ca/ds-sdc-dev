import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components/jl-components.constants/jl-components.constants";
import { ILinkComponentConfig } from "./link/link.component";

export interface IBreadcrumbConfig {
  id: string,
  size?: keyof typeof DSSizes,
  // The first link always links back to homepage, or in some use case, the original starting point
  root: ILinkComponentConfig,
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
    root: {
      text: 'Home'
    }
  };
  constructor() {}

  ngOnInit(): void {
  }

}
