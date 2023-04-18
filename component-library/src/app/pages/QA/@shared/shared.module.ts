import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  IrccDsAngularBannerModule,
  IrccDsAngularComponentsSharedModule,
  IrccDsAngularFormComponentsModule,
  IrccDsAngularLegacyOldModule,
  IrccDsAngularHeaderFooterModule
} from 'ircc-ds-angular-component-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';
import { RouterModule } from '@angular/router';
import { PreventTabOutDirective } from './directives/prevent-tab-out.directive';
import { InteractiveDemoComponent } from 'doc-site-components/interactive-demo/interactive-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularHeaderFooterModule,
    IrccDsAngularComponentsSharedModule
  ],
  declarations: [
    NavButtonsComponent,
    PreventTabOutDirective,
    InteractiveDemoComponent
  ],
  exports: [
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularComponentsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NavButtonsComponent,
    PreventTabOutDirective,
    IrccDsAngularHeaderFooterModule,
    IrccDsAngularComponentsSharedModule,
    InteractiveDemoComponent
  ]
})
export class SharedModule {}
