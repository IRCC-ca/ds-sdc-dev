import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuickDemoComponent } from '@app/@shared/quick-demo/quick-demo.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
  HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    QuickDemoComponent
  ]
})
export class HomeModule { }
