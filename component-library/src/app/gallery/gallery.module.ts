import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryRoutingModule } from './gallery-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { FormInputComponent } from './form-input/form-input.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    TestPageComponent,
    FormInputComponent,
    HeaderFooterComponent,
    MiscellaneousComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    SharedModule,
    GalleryRoutingModule
  ],
  exports: []
})
export class GalleryModule {}
