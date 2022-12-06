import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularComponentLibraryModule } from 'ircc-ds-angular-component-library';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    IrccDsAngularComponentLibraryModule
  ],
  declarations: [
  ],
  exports: [
    IrccDsAngularComponentLibraryModule
  ]
})
export class SharedModule { }
