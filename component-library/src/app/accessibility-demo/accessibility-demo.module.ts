import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDemoRoutingModule } from './accessibility-demo-routing';
import { SharedModule } from '@app/@shared';
import { AccessibilityDemoComponent } from './accessibility-demo.component';
import { IrccDsAngularHeaderFooterModule } from 'ircc-ds-angular-component-library';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';
import { AccessibilityDemoIntroPageComponent } from './accessibility-demo-intro-page/accessibility-demo-intro-page.component';



@NgModule({
  declarations: [
    AccessibilityDemoComponent,
    AccessibilityDemoPreviousPageComponent,
    AccessibilityDemoNextPageComponent,
    AccessibilityDemoIntroPageComponent
  ],
  imports: [
    CommonModule,
    AccessibilityDemoRoutingModule,
    SharedModule,
    IrccDsAngularHeaderFooterModule
  ]
})
export class AccessibilityDemoModule { }
