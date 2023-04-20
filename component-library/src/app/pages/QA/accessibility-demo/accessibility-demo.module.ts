import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDemoRoutingModule } from './accessibility-demo-routing';
import { SharedModule } from '../@shared';
import { AccessibilityDemoComponent } from './accessibility-demo.component';
import {
  IrccDsAngularComponentsSharedModule,
  IrccDsAngularHeaderFooterModule
} from 'ircc-ds-angular-component-library';
import { TranslateModule } from '@ngx-translate/core';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';

@NgModule({
  declarations: [
    AccessibilityDemoComponent,
    AccessibilityDemoPreviousPageComponent,
    AccessibilityDemoNextPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AccessibilityDemoRoutingModule,
    SharedModule,
    IrccDsAngularHeaderFooterModule,
    IrccDsAngularComponentsSharedModule
  ]
})
export class AccessibilityDemoModule {}
