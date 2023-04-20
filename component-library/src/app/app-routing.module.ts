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
import { ForDevelopersComponent } from './pages/for-developers/for-developers.component';
// import { PageButtonComponent } from './pages/button/button.component';
// import { PageUtilitiesComponent } from './pages/utilities/utilities.component';

import { Shell } from './shell/shell.service';
import { codeViewComponent } from '@app/pages/code-view/code-view.component';
import { MahsaComponent } from './pages/QA/mahsa/mahsa.component';
import { MichaelComponent } from './pages/QA/michael/michael.component';
import { MikeComponent } from './pages/QA/mike/mike.component';
import { NaseerComponent } from './pages/QA/naseer/naseer.component';
import { AccessibilityDemoComponent } from './pages/QA/accessibility-demo/accessibility-demo.component';
import { AccessibilityDemoPreviousPageComponent } from './pages/QA/accessibility-demo/accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoNextPageComponent } from './pages/QA/accessibility-demo/accessibility-demo-next-page/accessibility-demo-next-page.component';
import { BannerDocumentationComponent } from './pages/banner-documentation/banner-documentation.component';
import { AccessibilityDemoModule } from './pages/QA/accessibility-demo/accessibility-demo.module';
import { BobbyComponent } from './pages/QA/bobby/bobby.component';

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
    { path: 'developers', component: ForDevelopersComponent },
    { path: 'banner-doc', component: BannerDocumentationComponent },

    // French
    { path: 'aperçu', component: OverviewComponent },
    { path: 'concepteurs', component: ForDesignersComponent },
    { path: 'developpeurs', component: ForDevelopersComponent },
    { path: 'banner-doc-fr', component: BannerDocumentationComponent },

    //QA PATHS
    { path: 'mahsa-en', component: MahsaComponent }, //English
    { path: 'mahsa-fr', component: MahsaComponent }, //French
    { path: 'michael-en', component: MichaelComponent }, //English
    { path: 'michael-fr', component: MichaelComponent }, //French
    { path: 'mike-en', component: MikeComponent }, //English
    { path: 'mike-fr', component: MikeComponent }, //French
    { path: 'naseer-en', component: NaseerComponent }, //English
    { path: 'naseer-fr', component: NaseerComponent }, //French
    { path: 'bobby-en', component: BobbyComponent }, //English
    { path: 'bobby-fr', component: BobbyComponent }, //French

    { path: 'codeview', component: codeViewComponent },
    { path: 'codeview-fr', component: codeViewComponent },

    { path: 'bobby-en', component: BobbyComponent }, //English
    { path: 'bobby-fr', component: BobbyComponent },

    {
      path: 'accessibility-demo',
      component: AccessibilityDemoComponent
    },
    {
      path: 'accessibility-demo-next',
      component: AccessibilityDemoNextPageComponent
    },
    {
      path: 'accessibility-demo-previous',
      component: AccessibilityDemoPreviousPageComponent
    },
    {
      path: "démo-d'accessibilité",
      component: AccessibilityDemoComponent
    },
    {
      path: "démo-d'accessibilité-précédent",
      component: AccessibilityDemoPreviousPageComponent
    },
    {
      path: "démo-d'accessibilité-prochaine",
      component: AccessibilityDemoNextPageComponent
    },

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
export class AppRoutingModule { }
