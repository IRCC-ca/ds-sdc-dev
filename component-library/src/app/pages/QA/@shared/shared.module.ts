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
import { InteractiveDemoComponent } from '@app/components/interactive-demo/interactive-demo.component';
import { InfoTextSmallComponent } from '@app/components/info-text-small/info-text-small.component';
import { ComponentPreviewComponent } from '@app/components/component-preview/component-preview.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

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
    IrccDsAngularComponentsSharedModule,
    ClipboardModule
  ],
  declarations: [NavButtonsComponent, PreventTabOutDirective],
  exports: [
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularComponentsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    NavButtonsComponent,
    PreventTabOutDirective,
    IrccDsAngularHeaderFooterModule,
    IrccDsAngularComponentsSharedModule
  ]
})
export class SharedModule {}
