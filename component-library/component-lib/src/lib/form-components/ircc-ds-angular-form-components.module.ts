import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';
import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from "./date-picker/date-picker.component";

const IrccDsAngularFormComponents = [
  CheckboxComponent,
  DropdownInputComponent,
  ErrorComponent,
  InputComponent,
  RadioInputComponent,
  DatePickerComponent
];

@NgModule({
  declarations: [
    ...IrccDsAngularFormComponents
  ],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...IrccDsAngularFormComponents
  ]
})
export class IrccDsAngularFormComponentsModule { }
