import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './shell/shell.service';

const routes: Routes = [

  Shell.childRoutes([
    {
      path: 'en',
      children: [
        { path: 'accessibility-demo', loadChildren: () => import('./accessibility-demo/accessibility-demo.module').then(m => m.AccessibilityDemoModule) },
        { path: '**', redirectTo: 'accessibility-demo/begin' }
      ]
    },
    {
      path: 'fr',
      children: [
        { path: "démo-d'accessibilité", loadChildren: () => import('./accessibility-demo/accessibility-demo.module').then(m => m.AccessibilityDemoModule) },
        { path: '**', redirectTo: "démo-d'accessibilité/commencer" }
      ]
    },
    //Must be last, as it contains the fallback route when no prior route is matched
    //TODO: Check this
    { path: '**', redirectTo: '/en/accessibility-demo/begin' }
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
