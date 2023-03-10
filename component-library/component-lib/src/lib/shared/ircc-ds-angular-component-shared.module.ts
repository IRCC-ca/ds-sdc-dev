import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProgressTagsComponent } from "./progress-tags/progress-tags.component";
import { DropdownComponent } from "./dropdown/drop-down.component";
import { ProgressIndicatorComponent } from "./progress-indicator/progress-indicator.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { BreadcrumbLinkComponent } from "./breadcrumb/link/link.component";
import { IndicatorComponent } from './indicator/indicator.component';

const IrccDsSharedComponents = [
  ButtonComponent,
  BreadcrumbComponent,
  BreadcrumbLinkComponent,
  IconComponent,
  IconButtonComponent,
  IndicatorComponent,
  TabsComponent,
  ProgressTagsComponent,
  DropdownComponent,
  ProgressTagsComponent,
  ProgressIndicatorComponent
];

@NgModule({
  declarations: [
    ...IrccDsSharedComponents
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ...IrccDsSharedComponents
  ]
})
export class IrccDsAngularComponentsSharedModule { }
