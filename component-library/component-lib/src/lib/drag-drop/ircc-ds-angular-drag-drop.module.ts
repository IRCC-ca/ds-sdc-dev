import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrccDsAngularComponentsSharedModule } from '../shared/ircc-ds-angular-component-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { dragDropContainerComponent } from './drag-drop-container/drag-drop-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const IrccDsDragDropComponents = [dragDropContainerComponent];

@NgModule({
  declarations: [...IrccDsDragDropComponents],
  imports: [
    CommonModule,
    IrccDsAngularComponentsSharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [...IrccDsDragDropComponents]
})
export class IrccDsDragDropModule {}
