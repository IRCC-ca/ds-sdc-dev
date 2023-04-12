import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [{ path: '', component: LandingComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [LandingComponent]
})
export class LandingModule {}
