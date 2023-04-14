import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {
  LocalizeRouterModule,
  LocalizeParser,
  CacheMechanism,
  LocalizeRouterSettings
} from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { OverviewComponent } from './pages/overview/overview.component';
import { ForDesignersComponent } from './pages/for-designers/for-designers.component';
// import { PageForDevelopersComponent } from './pages/for-developers/for-developers.component';
// import { PageButtonComponent } from './pages/button/button.component';
// import { PageUtilitiesComponent } from './pages/utilities/utilities.component';

import { Shell } from './shell/shell.service';

export function HttpLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
) {
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    { ...settings, alwaysSetPrefix: true },
    http
  );
}

const routes: Routes = [
  Shell.childRoutes([
    // English
    { path: 'overview', component: OverviewComponent },
    { path: 'designers', component: ForDesignersComponent },
    // { path: 'developers', component: PageForDevelopersComponent },
    // { path: 'utilities', component: PageUtilitiesComponent },
    // { path: 'buttons', component: PageButtonComponent },
    // French
    { path: 'aperçu', component: OverviewComponent },
    { path: 'concepteurs', component: ForDesignersComponent },
    // { path: 'developpeurs', component: PageForDevelopersComponent },
    // { path: 'utilitaires', component: PageUtilitiesComponent },
    // { path: 'boutons', component: PageButtonComponent },
    { path: '', redirectTo: '/overview', pathMatch: 'full' }
  ]),
  { path: '**', redirectTo: '/overview', pathMatch: 'full' }
];

// scrolling options set
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 200],
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      },
      cacheMechanism: CacheMechanism.Cookie,
      cookieFormat: '{{value}};{{expires:20}};path=/'
    })
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {}
