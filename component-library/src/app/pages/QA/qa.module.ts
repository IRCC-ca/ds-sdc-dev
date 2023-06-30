import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaComponent } from './qa.component';
import { SharedModule } from './@shared';
import { TranslateModule } from '@ngx-translate/core';
import { MahsaComponent } from './mahsa/mahsa.component';
import { NaseerComponent } from './naseer/naseer.component';
import { MichaelComponent } from './michael/michael.component';
import { MikeComponent } from './mike/mike.component';
import { AutoTesterComponent } from './auto-tester/auto-tester.component';
import { IrccDsAngularFormComponentsModule } from 'ircc-ds-angular-component-library';
import { BobbyComponent } from './bobby/bobby.component';

@NgModule({
  declarations: [
    QaComponent,
    MahsaComponent,
    NaseerComponent,
    MichaelComponent,
    MikeComponent,
    AutoTesterComponent,
    BobbyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    IrccDsAngularFormComponentsModule
  ]
})
export class QaModule {}
