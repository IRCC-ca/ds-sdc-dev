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
import { DatePickerDocumentationComponent } from './pages/date-picker-documentation/date-picker-documentation.component';

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
    { path: 'overview', component: OverviewComponent, title: 'Overview' },
    { path: 'designers', component: ForDesignersComponent, title: 'Designers' },
    {
      path: 'developers',
      component: ForDevelopersComponent,
      title: 'Developers'
    },
    { 
      path: 'utilities',
      component: UtilitiesComponent,
      title: 'Utilities'
    },
    {
      path: 'banner-documentation',
      component: BannerDocumentationComponent,
      title: 'Banner-documentation'
    },
    {
      path: 'buttons',
      component: ButtonDocCodeComponent,
      title: 'Buttons'
    },
    {
      path: 'input-documentation',
      component: InputDocumentationComponent,
      title: 'Input-documentation'
    },
    {
      path: 'request-form',
      component: RequestFormComponent,
      title: 'Request-form'
    },
    {
      path: 'datePicker-doc',
      component: DatePickerDocumentationComponent,
      title: 'DatePicker-doc'
    },

    // French
    { path: 'aperçu', component: OverviewComponent, title: 'Aperçu' },
    {
      path: 'concepteurs',
      component: ForDesignersComponent,
      title: 'Concepteurs'
    },
    {
      path: 'developpeurs',
      component: ForDevelopersComponent,
      title: 'Developpeurs'
    },
    { 
      path: 'utilitaires',
      component: UtilitiesComponent,
      title: 'Utilitaires'
    },
    {
      path: 'banner-documentation-fr',
      component: BannerDocumentationComponent,
      title: 'Banner-documentation'
    },
    {
      path: 'boutons',
      component: ButtonDocCodeComponent,
      title: 'Boutons'
    },
    {
      path: 'documentation dentree',
      component: InputDocumentationComponent,
      title: 'Documentation dentree'
    },
    {
      path: 'request-form-fr',
      component: RequestFormComponent,
      title: 'Request-form-fr'
    },
    {
      path: 'datePicker-doc-fr',
      component: DatePickerDocumentationComponent,
      title: 'DatePicker-doc-fr'
    },

    //QA PATHS
    { path: 'mahsa-en', component: MahsaComponent, title: 'Mahsa-en' }, //English
    { path: 'mahsa-fr', component: MahsaComponent, title: 'Mahsa-fr' }, //French
    { path: 'michael-en', component: MichaelComponent, title: 'Michael-en' }, //English
    { path: 'michael-fr', component: MichaelComponent, title: 'Michael-fr' }, //French
    { path: 'mike-en', component: MikeComponent, title: 'Mike-en' }, //English
    { path: 'mike-fr', component: MikeComponent, title: 'Mike-fr' }, //French
    { path: 'naseer-en', component: NaseerComponent, title: 'Naseer-en' }, //English
    { path: 'naseer-fr', component: NaseerComponent, title: 'Naseer-fr' }, //French
    { path: 'bobby-en', component: BobbyComponent, title: 'Bobby-en' }, //English
    { path: 'bobby-fr', component: BobbyComponent, title: 'Bobby-fr' }, //French
    { path: 'codeview', component: codeViewComponent, title: 'Codeview' },
    { path: 'codeview-fr', component: codeViewComponent, title: 'Codeview-fr' },

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
