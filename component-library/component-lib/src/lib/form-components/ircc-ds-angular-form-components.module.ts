import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { MultiCheckboxComponent } from './multi-checkbox/multi-checkbox.component';
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';

import { IrccDsAngularPipesdModule } from '../../shared/pipes/pipes.module';

const IrccDsAngularFormComponents = [
  CheckboxComponent,
  ErrorComponent,
  InputComponent,
  RadioInputComponent,
  DatePickerComponent,
  TextareaComponent,
  SelectComponent,
  MultiCheckboxComponent,
  AutoCompleteComponent
];

@NgModule({
  declarations: [...IrccDsAngularFormComponents],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    IrccDsAngularPipesdModule
  ],
  exports: [...IrccDsAngularFormComponents]
})
export class IrccDsAngularFormComponentsModule {}
