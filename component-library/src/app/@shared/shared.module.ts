import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IrccDsAngularComponentLibraryModule } from 'ircc-ds-angular-component-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavButtonsComponent } from '@app/gallery/nav-buttons/nav-buttons.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    IrccDsAngularComponentLibraryModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NavButtonsComponent
  ],
  exports: [
    IrccDsAngularComponentLibraryModule,
    ReactiveFormsModule,
    FormsModule,
    NavButtonsComponent
  ]
})
export class SharedModule { }
