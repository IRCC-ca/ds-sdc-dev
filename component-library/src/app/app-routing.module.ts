import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './shell/shell.service';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/404/notFound.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'en',
      loadChildren: () =>
        import('./gallery/gallery.module').then((m) => m.GalleryModule),
      children: [
        {
          path: 'landing-page',
          loadChildren: () =>
            import('./pages/landing/landing.module').then(
              (m) => m.LandingModule
            )
        },
        { path: '**', component: NotFoundComponent }
      ]
    },
    {
      path: 'fr',
      loadChildren: () =>
        import('./gallery/gallery.module').then((m) => m.GalleryModule),
      children: [
        {
          path: 'page-general',
          loadChildren: () =>
            import('./pages/landing/landing.module').then(
              (m) => m.LandingModule
            )
        },
        { path: '**', component: NotFoundComponent }
      ]
    },
    { path: '', component: HomeComponent },
    {
      path: '**',
      component: NotFoundComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
