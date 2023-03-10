import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularBannerModule, IrccDsAngularComponentsSharedModule, IrccDsAngularFormComponentsModule, IrccDsAngularLegacyOldModule } from 'ircc-ds-angular-component-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavButtonsComponent } from '@app/gallery/nav-buttons/nav-buttons.component';
import { RouterModule } from '@angular/router';
import { PreventOutsideClickDirective } from './directives/prevent-outside-click.directive';


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
  ],
  declarations: [
    NavButtonsComponent,
    PreventOutsideClickDirective
  ],
  exports: [
    IrccDsAngularBannerModule,
    IrccDsAngularFormComponentsModule,
    IrccDsAngularLegacyOldModule,
    IrccDsAngularComponentsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    NavButtonsComponent,
    PreventOutsideClickDirective
  ]
})
export class SharedModule { }
