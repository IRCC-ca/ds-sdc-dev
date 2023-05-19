import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityDemoIntroPageComponent } from './accessibility-demo-intro-page/accessibility-demo-intro-page.component';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoComponent } from './accessibility-demo.component';

const routes: Routes = [
  { path: '', component: AccessibilityDemoComponent, title: 'Personal information' },
  { path: 'intro', component: AccessibilityDemoIntroPageComponent}, //English
  { path: 'introduction', component: AccessibilityDemoIntroPageComponent}, //French
  { path: 'begin', component: AccessibilityDemoPreviousPageComponent, title: 'Begin task' }, //English
  { path: 'commencer', component: AccessibilityDemoPreviousPageComponent, title: 'Commencer la tâche' }, //French
  { path: 'completed', component: AccessibilityDemoNextPageComponent, title: 'Task complete' }, //English
  { path: 'complete', component: AccessibilityDemoNextPageComponent, title: 'Tâche complète' }, //French
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccessibilityDemoRoutingModule { }
