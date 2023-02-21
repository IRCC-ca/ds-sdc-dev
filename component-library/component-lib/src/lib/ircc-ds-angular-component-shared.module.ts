import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ]
})
export class IrccDsAngularComponentSharedModule { }
