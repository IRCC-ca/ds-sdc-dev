import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IrccDsAngularComponentsSharedModule,
  IrccDsAngularHeaderFooterModule,
  IrccDsAngularNavigationModule
} from 'ircc-ds-angular-component-library';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    IrccDsAngularHeaderFooterModule,
    IrccDsAngularNavigationModule,
    TranslateModule
  ],
  exports: [
    IrccDsAngularComponentsSharedModule,
    IrccDsAngularHeaderFooterModule,
    TranslateModule
  ]
})
export class ShelldModule {}
