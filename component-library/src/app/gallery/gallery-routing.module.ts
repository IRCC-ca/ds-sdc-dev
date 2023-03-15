import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormInputComponent } from './form-input/form-input.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPage } from './landing-page/landing-page.service';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'dev-test', component: TestPageComponent }, //English
    { path: 'test-dev', component: TestPageComponent }, //French

    { path: 'qa', loadChildren: () => import('./QA/qa.module').then(m => m.QaModule) }, //English
    { path: 'aq', loadChildren: () => import('./QA/qa.module').then(m => m.QaModule) }, //French


        //TODO: all other components will be going through another router outlet inside the gallery component.
        //TODO: Check for another way to route through router-outlet (see how app-component does it).
    LandingPage.childRoutes([
      { path: 'form-components', component: FormInputComponent }, //English
      { path: 'components-formulaire', component: FormInputComponent }, //French

      { path: 'header-footer', component: HeaderFooterComponent }, //English
      { path: 'en-tête-pied-de-page', component: HeaderFooterComponent }, //French

      { path: 'miscellaneous', component: MiscellaneousComponent }, //English
      { path: 'divers', component: MiscellaneousComponent }, //French

    ])



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GalleryRoutingModule { }
