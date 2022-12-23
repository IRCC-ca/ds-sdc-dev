import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularComponentLibraryComponent } from './ircc-ds-angular-component-library.component';
import { JLAutocompleteComponent } from './jl-autocomplete/jl-autocomplete.component';
import { JLBannerComponent } from './jl-banner/jl-banner.component';
import { JLCheckboxComponent } from './jl-checkbox/jl-checkbox.component';
import { JlChipItemComponent } from './jl-chips/jl-chip-item/jl-chip-item.component';
import { JlChipListComponent } from './jl-chips/jl-chip-list/jl-chip-list.component';
import { JlSecondaryChipsComponent } from './jl-chips/jl-secondary-chips/jl-secondary-chips.component';
import { JLDropdownComponent } from './jl-dropdown/jl-dropdown.component';
import { JLInputComponent } from './jl-input/jl-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';



@NgModule({
  declarations: [
    IrccDsAngularComponentLibraryComponent,
    JLCheckboxComponent,
    JLDropdownComponent,
    JlChipItemComponent,
    JlChipListComponent,
    JlSecondaryChipsComponent,
    JLInputComponent,
    JLAutocompleteComponent,
    JLBannerComponent,
    RadioInputComponent,
    DropdownInputComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IrccDsAngularComponentLibraryComponent,
    JLCheckboxComponent,
    JLDropdownComponent,
    JlChipItemComponent,
    JlChipListComponent,
    JlSecondaryChipsComponent,
    JLInputComponent,
    JLAutocompleteComponent,
    JLBannerComponent,
    RadioInputComponent,
    DropdownInputComponent,
  ]
})
export class IrccDsAngularComponentLibraryModule { }
