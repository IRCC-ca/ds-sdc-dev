import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularComponentLibraryComponent } from './ircc-ds-angular-component-library.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipItemComponent } from './chips/chip-item/chip-item.component';
import { ChipListComponent } from './chips/chip-list/chip-list.component';
import { SecondaryChipsComponent } from './chips/secondary-chips/secondary-chips.component';
import { InputComponent } from './input/input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { BannerComponent } from './banner/banner.component';
import { ErrorComponent } from './error/error.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { ProgressTagsComponent } from './progress-tags/progress-tags.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';



@NgModule({
  declarations: [
    IrccDsAngularComponentLibraryComponent,
    CheckboxComponent,
    ChipItemComponent,
    ChipListComponent,
    SecondaryChipsComponent,
    InputComponent,
    AutocompleteComponent,
    RadioInputComponent,
    DropdownInputComponent,
    DatePickerComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    IconComponent,
    IconButtonComponent,
    LanguageSwitchComponent,
    BannerComponent,
    ErrorComponent,
    TabsComponent,
    ProgressTagsComponent,
    ProgressIndicatorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    IrccDsAngularComponentLibraryComponent,
    CheckboxComponent,
    ChipItemComponent,
    ChipListComponent,
    SecondaryChipsComponent,
    InputComponent,
    AutocompleteComponent,
    RadioInputComponent,
    DropdownInputComponent,
    DatePickerComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    IconComponent,
    IconButtonComponent,
    LanguageSwitchComponent,
    BannerComponent,
    ErrorComponent,
    TabsComponent,
    ProgressTagsComponent,
    ProgressIndicatorComponent
  ]
})
export class IrccDsAngularComponentLibraryModule { }
