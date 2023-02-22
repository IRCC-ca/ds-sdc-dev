import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LanguageSwitchComponent
  ],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LanguageSwitchComponent
  ]
})
export class IrccDsAngularHeaderFooterModule { }
