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
import { UtilitiesComponent } from './pages/utilities/utilities.component';

import { Shell } from './shell/shell.service';
import { codeViewComponent } from '@app/pages/code-view/code-view.component';
import { MahsaComponent } from './pages/QA/mahsa/mahsa.component';
import { MichaelComponent } from './pages/QA/michael/michael.component';
import { MikeComponent } from './pages/QA/mike/mike.component';
import { NaseerComponent } from './pages/QA/naseer/naseer.component';
import { AccessibilityDemoComponent } from './pages/QA/accessibility-demo/accessibility-demo.component';
import { AccessibilityDemoPreviousPageComponent } from './pages/QA/accessibility-demo/accessibility-demo-previous-page/accessibility-demo-previous-page.component';
import { AccessibilityDemoNextPageComponent } from './pages/QA/accessibility-demo/accessibility-demo-next-page/accessibility-demo-next-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BannerDocCodeComponent } from './pages/banner-documentation/banner-doc-code.component';
import { ButtonDocCodeComponent } from './pages/button-documentation/button-doc-code.component';
import { AccessibilityDemoModule } from './pages/QA/accessibility-demo/accessibility-demo.module';
import { BobbyComponent } from './pages/QA/bobby/bobby.component';
import { InputDocumentationComponent } from './pages/input-documentation/input-documentation.component';
import { InputDocCodeComponent } from '@app/pages/input-documentation/input-doc-code.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { BannerDocumentationComponent } from './pages/banner-documentation/banner-documentation.component';

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
    {
      path: 'overview',
      component: OverviewComponent,
      title: 'Overview.Heading'
    },
    {
      path: 'designers',
      component: ForDesignersComponent,
      title: 'Designers.Heading'
    },
    {
      path: 'developers',
      component: ForDevelopersComponent,
      title: 'Developers.Title'
    },
    {
      path: 'utilities',
      component: UtilitiesComponent,
      title: 'Utilities.Title'
    },
    {
      path: 'banner-documentation',
      component: BannerDocumentationComponent,
      title: 'Banner.Title'
    },
    {
      path: 'buttons',
      component: ButtonDocCodeComponent,
      title: 'Buttons.Title'
    },
    {
      path: 'input-documentation',
      component: InputDocumentationComponent,
      title: 'Input.Title'
    },
    {
      path: 'request-form',
      component: RequestFormComponent,
      title: 'Request-form.Title'
    },

    // French
    { path: 'aperçu', component: OverviewComponent, title: 'Overview.Heading' },
    {
      path: 'concepteurs',
      component: ForDesignersComponent,
      title: 'Designers.Heading'
    },
    {
      path: 'developpeurs',
      component: ForDevelopersComponent,
      title: 'Developers.Title'
    },
    {
      path: 'utilitaires',
      component: UtilitiesComponent,
      title: 'Utilities.Title'
    },
    {
      path: 'banner-documentation-fr',
      component: BannerDocumentationComponent,
      title: 'Banner.Title'
    },
    {
      path: 'boutons',
      component: ButtonDocCodeComponent,
      title: 'Buttons.Title'
    },
    {
      path: 'documentation dentree',
      component: InputDocumentationComponent,
      title: 'Input.Title'
    },
    {
      path: 'request-form-fr',
      component: RequestFormComponent,
      title: 'Request-form.Title'
    },

    //QA PATHS
    { path: 'mahsa-en', component: MahsaComponent, title: 'ROUTES.mahsa' }, //English
    { path: 'mahsa-fr', component: MahsaComponent, title: 'ROUTES.mahsa' }, //French
    {
      path: 'michael-en',
      component: MichaelComponent,
      title: 'ROUTES.michael'
    }, //English
    {
      path: 'michael-fr',
      component: MichaelComponent,
      title: 'ROUTES.michael'
    }, //French
    { path: 'mike-en', component: MikeComponent, title: 'ROUTES.mike' }, //English
    { path: 'mike-fr', component: MikeComponent, title: 'ROUTES.mike' }, //French
    { path: 'naseer-en', component: NaseerComponent, title: 'ROUTES.naseer' }, //English
    { path: 'naseer-fr', component: NaseerComponent, title: 'ROUTES.naseer' }, //French
    { path: 'bobby-en', component: BobbyComponent, title: 'ROUTES.bobby' }, //English
    { path: 'bobby-fr', component: BobbyComponent, title: 'ROUTES.bobby' }, //French
    {
      path: 'codeview',
      component: codeViewComponent,
      title: 'ROUTES.codeview'
    },
    {
      path: 'codeview-fr',
      component: codeViewComponent,
      title: 'ROUTES.codeview'
    },

    {
      path: 'accessibility-demo',
      component: AccessibilityDemoComponent,
      title: 'Accessibility-demo'
    },
    {
      path: 'accessibility-demo-next',
      component: AccessibilityDemoNextPageComponent,
      title: 'Accessibility-demo-next'
    },
    {
      path: 'accessibility-demo-previous',
      component: AccessibilityDemoPreviousPageComponent,
      title: 'Accessibility-demo-previous'
    },
    {
      path: "démo-d'accessibilité",
      component: AccessibilityDemoComponent,
      title: "Démo-d'accessibilité"
    },
    {
      path: "démo-d'accessibilité-précédent",
      component: AccessibilityDemoPreviousPageComponent,
      title: "démo-d'accessibilité-précédent"
    },
    {
      path: "démo-d'accessibilité-prochaine",
      component: AccessibilityDemoNextPageComponent,
      title: "démo-d'accessibilité-prochaine"
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
export class AppRoutingModule {}
