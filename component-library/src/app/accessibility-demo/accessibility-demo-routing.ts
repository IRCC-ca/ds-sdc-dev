import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityDemoIntroPageComponent } from './accessibility-demo-intro-page/accessibility-demo-intro-page.component';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoComponent } from './accessibility-demo.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  { path: '', component: AccessibilityDemoComponent, data: {title: marker('TITLES.PersonalInformation')} },
  { path: 'begin', component: AccessibilityDemoPreviousPageComponent, data: {title: marker('TITLES.Begin')} }, //English
  { path: 'commencer', component: AccessibilityDemoPreviousPageComponent, data: {title: marker('TITLES.Begin')} }, //French
  { path: 'completed', component: AccessibilityDemoNextPageComponent, data: {title: marker('TITLES.Completed')} }, //English
  { path: 'complete', component: AccessibilityDemoNextPageComponent, data: {title: marker('TITLES.Completed')} }, //French
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccessibilityDemoRoutingModule { }
