import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const IrccDsAngularFormComponents = [
  CheckboxComponent,
  ErrorComponent,
  InputComponent,
  RadioInputComponent,
  DatePickerComponent,
  TextareaComponent,
  SelectComponent
];

@NgModule({
  declarations: [...IrccDsAngularFormComponents],
  imports: [CommonModule, IrccDsAngularComponentsSharedModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [...IrccDsAngularFormComponents]
})
export class IrccDsAngularFormComponentsModule {}
