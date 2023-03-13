import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './shell/shell.service';

const routes: Routes = [

  {
    path: 'en',
    children: [
      { path: 'accessibility-demo', loadChildren: () => import('./accessibility-demo/accessibility-demo.module').then(m => m.AccessibilityDemoModule) },
    ]
  },
  {
    path: 'fr',
    children: [
      { path: "démo-d'accessibilité", loadChildren: () => import('./accessibility-demo/accessibility-demo.module').then(m => m.AccessibilityDemoModule) },
    ]
  },

  Shell.childRoutes([
    {
      path: 'en',
      children: [
        { path: 'landing-page', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },
        { path: '**', redirectTo: 'landing-page' }
      ]
    },
    {
      path: 'fr',
      children: [
        { path: 'page-general', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },
        { path: '**', redirectTo: 'page-general' }
      ]
    },
    //Must be last, as it contains the fallback route when no prior route is matched
    //TODO: Check this
    { path: '**', redirectTo: '/en/landing-page' }
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
