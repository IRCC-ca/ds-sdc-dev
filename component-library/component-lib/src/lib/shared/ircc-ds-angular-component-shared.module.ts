import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProgressTagsComponent } from "./progress-tags/progress-tags.component";
import { DropdownComponent } from "./dropdown/drop-down.component";

const IrccDsSharedComponents = [
  ButtonComponent,
  IconComponent,
  IconButtonComponent,
  TabsComponent,
  ProgressTagsComponent,
  DropdownComponent
];

@NgModule({
  declarations: [
    ...IrccDsSharedComponents
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ...IrccDsSharedComponents
  ]
})
export class IrccDsAngularComponentsSharedModule { }
