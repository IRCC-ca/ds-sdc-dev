import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDemoRoutingModule } from './accessibility-demo-routing';
import { SharedModule } from '@app/@shared';
import { AccessibilityDemoComponent } from './accessibility-demo.component';
import { IrccDsAngularHeaderFooterModule } from 'ircc-ds-angular-component-library';



@NgModule({
  declarations: [
    AccessibilityDemoComponent
  ],
  imports: [
    CommonModule,
    AccessibilityDemoRoutingModule,
    SharedModule,
    IrccDsAngularHeaderFooterModule
  ]
})
export class AccessibilityDemoModule { }
