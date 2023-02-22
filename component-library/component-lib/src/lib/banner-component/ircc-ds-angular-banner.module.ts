import { NgModule } from '@angular/core';
import {BannerComponent} from "./banner/banner.component";
import {IrccDsAngularComponentsSharedModule} from "../shared/ircc-ds-angular-component-shared.module";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    IrccDsAngularComponentsSharedModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    BannerComponent
  ]
})
export class IrccDsAngularBannerModule { }
