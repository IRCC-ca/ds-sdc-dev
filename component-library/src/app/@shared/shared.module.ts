import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularBannerModule, IrccDsAngularComponentsSharedModule, IrccDsAngularFormComponentsModule, IrccDsAngularLegacyOldModule } from 'ircc-ds-angular-component-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavButtonsComponent } from '@app/gallery/nav-buttons/nav-buttons.component';
import { RouterModule } from '@angular/router';
import { IrccDsAngularHeaderFooterModule } from 'component-lib/src/public-api';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularHeaderFooterModule
  ],
  declarations: [
    NavButtonsComponent
  ],
  exports: [
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularComponentsSharedModule,
    IrccDsAngularHeaderFooterModule,
    ReactiveFormsModule,
    FormsModule,
    NavButtonsComponent
  ]
})
export class SharedModule { }
