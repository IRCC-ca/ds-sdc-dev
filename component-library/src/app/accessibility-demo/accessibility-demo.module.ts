import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDemoRoutingModule } from './accessibility-demo-routing';
import { SharedModule } from '@app/@shared';
import { AccessibilityDemoComponent } from './accessibility-demo.component';



@NgModule({
  declarations: [
    AccessibilityDemoComponent
  ],
  imports: [
    CommonModule,
    AccessibilityDemoRoutingModule,
    SharedModule
  ]
})
export class AccessibilityDemoModule { }
