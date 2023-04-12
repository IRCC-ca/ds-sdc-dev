import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityDemoNextPageComponent } from './accessibility-demo-next-page/accessibility-demo-next-page.component';
import { AccessibilityDemoPreviousPageComponent } from './accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoComponent } from './accessibility-demo.component';

const routes: Routes = [
  { path: '', component: AccessibilityDemoComponent },
  { path: 'previous', component: AccessibilityDemoPreviousPageComponent }, //English
  { path: 'précédent', component: AccessibilityDemoPreviousPageComponent }, //French
  { path: 'next', component: AccessibilityDemoNextPageComponent }, //English
  { path: 'prochaine', component: AccessibilityDemoNextPageComponent } //French
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccessibilityDemoRoutingModule {}
