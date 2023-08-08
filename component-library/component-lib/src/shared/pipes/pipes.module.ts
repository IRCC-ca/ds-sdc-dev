import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { autocompletePipe } from './autocomplete.pipe';

const IrccDsSharedComponents = [autocompletePipe];

@NgModule({
  declarations: [...IrccDsSharedComponents],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ...IrccDsSharedComponents
  ]
})
export class IrccDsAngularPipesdModule {}
