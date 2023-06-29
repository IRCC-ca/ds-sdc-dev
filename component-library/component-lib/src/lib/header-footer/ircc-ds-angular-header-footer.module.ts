import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HiddenNavComponent } from './hidden-nav/hidden-nav.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';


const IrccDsHeaderFooterComponents = [
  HeaderComponent,
  FooterComponent,
  LanguageSwitchComponent,
  HiddenNavComponent,
  ThemeSwitchComponent
];

@NgModule({
  declarations: [...IrccDsHeaderFooterComponents],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...IrccDsHeaderFooterComponents]
})
export class IrccDsAngularHeaderFooterModule { }
