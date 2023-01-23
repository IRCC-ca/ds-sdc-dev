import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryRoutingModule } from './gallery-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { FormInputComponent } from './form-input/form-input.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    TestPageComponent,
    FormInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    GalleryRoutingModule,
  ],
  exports: [
  ]
})
export class GalleryModule { }
