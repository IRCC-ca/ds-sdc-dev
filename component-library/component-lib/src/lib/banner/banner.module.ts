import { NgModule } from '@angular/core';
import {BannerComponent} from "./banner.component";
import {IrccDsAngularComponentSharedModule} from "../ircc-ds-angular-component-shared.module";
import {IrccDsAngularComponentLibraryModule} from "../ircc-ds-angular-component-library.module";



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    IrccDsAngularComponentSharedModule,
    IrccDsAngularComponentLibraryModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
