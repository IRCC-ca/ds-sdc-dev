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



@NgModule({
  declarations: [
    CheckboxComponent,
    DropdownInputComponent,
    ErrorComponent,
    InputComponent,
    RadioInputComponent
  ],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CheckboxComponent,
    DropdownInputComponent,
    ErrorComponent,
    InputComponent,
    RadioInputComponent
  ]
})
export class IrccDsAngularFormComponentsModule { }
