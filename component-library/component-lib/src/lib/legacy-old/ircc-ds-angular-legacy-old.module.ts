import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ChipListComponent } from './chips/chip-list/chip-list.component';
import { SecondaryChipsComponent } from './chips/secondary-chips/secondary-chips.component';
import { ChipItemComponent } from './chips/chip-item/chip-item.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AutocompleteComponent,
    ChipListComponent,
    SecondaryChipsComponent,
    ChipItemComponent,
    DatePickerComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AutocompleteComponent,
    ChipListComponent,
    SecondaryChipsComponent,
    ChipItemComponent,
    DatePickerComponent,
    SearchInputComponent
  ]
})
export class IrccDsAngularLegacyOldModule { }
