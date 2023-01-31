import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaComponent } from './qa.component';
import { SharedModule } from '@app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { QARoutingModule } from './qa-routing.module';
import { KrisComponent } from './kris/kris.component';
import { MahsaComponent } from './mahsa/mahsa.component';
import { NaseerComponent } from './naseer/naseer.component';
import { MichaelComponent } from './michael/michael.component';
import { MikeComponent } from './mike/mike.component';



@NgModule({
  declarations: [
    QaComponent,
    KrisComponent,
    MahsaComponent,
    NaseerComponent,
    MichaelComponent,
    MikeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    QARoutingModule
  ]
})
export class QaModule { }
