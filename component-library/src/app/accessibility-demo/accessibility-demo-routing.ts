import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoComponent } from './accessibility-demo.component';

const routes: Routes = [
  { path: '', component: AccessibilityDemoComponent, title:'TITLES.PersonalInformation'},
  { path: 'begin', component: AccessibilityDemoPreviousPageComponent, title: 'TITLES.Begin'}, //English
  { path: 'commencer', component: AccessibilityDemoPreviousPageComponent, title: 'TITLES.Begin' }, //French
  { path: 'completed', component: AccessibilityDemoNextPageComponent, title: 'TITLES.Completed' }, //English
  { path: 'complete', component: AccessibilityDemoNextPageComponent, title: 'TITLES.Completed' }, //French
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccessibilityDemoRoutingModule { }
