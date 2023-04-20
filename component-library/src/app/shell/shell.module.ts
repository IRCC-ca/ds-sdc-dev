import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IrccDsAngularComponentsSharedModule,
  IrccDsAngularHeaderFooterModule
} from 'ircc-ds-angular-component-library';
import { TranslateModule } from '@ngx-translate/core';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    IrccDsAngularHeaderFooterModule,
    TranslateModule
  ],
  exports: [
    IrccDsAngularComponentsSharedModule,
    IrccDsAngularHeaderFooterModule,
    TranslateModule
  ]
})
export class ShelldModule {}
