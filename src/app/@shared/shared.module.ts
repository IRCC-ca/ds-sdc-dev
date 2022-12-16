import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularComponentLibraryModule } from 'ircc-ds-angular-component-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    IrccDsAngularComponentLibraryModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    IrccDsAngularComponentLibraryModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
