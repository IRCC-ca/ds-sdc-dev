import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ChipListComponent } from './chips/chip-list/chip-list.component';
import { SecondaryChipsComponent } from './chips/secondary-chips/secondary-chips.component';
import { ChipItemComponent } from './chips/chip-item/chip-item.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const IrccDsLegacyOldComponents = [
  AutocompleteComponent,
  ChipListComponent,
  SecondaryChipsComponent,
  ChipItemComponent,
  SearchInputComponent
];

@NgModule({
  declarations: [
    ...IrccDsLegacyOldComponents
  ],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...IrccDsLegacyOldComponents
  ]
})
export class IrccDsAngularLegacyOldModule { }
