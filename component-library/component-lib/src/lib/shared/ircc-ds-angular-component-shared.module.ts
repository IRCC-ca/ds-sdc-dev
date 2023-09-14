import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProgressTagsComponent } from './progress-tags/progress-tags.component';
import { DropdownComponent } from './dropdown/drop-down.component';
import { LabelComponent } from './label/label.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbLinkComponent } from './breadcrumb/link/link.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DomChangeDirective } from '../../shared/directives/dom-change.directive';
import { FlyoutComponent } from './flyout/flyout.component';
import { FlyoutOptionComponent } from './flyout-option/flyout-option.component';
import { ResponsiveImageComponent } from './responsive-image/responsive-image.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

import { IrccDsAngularPipesdModule } from '../../shared/pipes/pipes.module';

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
  LabelComponent,
  ProgressTagsComponent,
  ProgressIndicatorComponent,
  SpinnerComponent,
  FlyoutComponent,
  FlyoutOptionComponent,
  ResponsiveImageComponent
];

@NgModule({
  declarations: [...IrccDsSharedComponents, DomChangeDirective],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    IrccDsAngularPipesdModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    ...IrccDsSharedComponents
  ]
})
export class IrccDsAngularComponentsSharedModule {}
