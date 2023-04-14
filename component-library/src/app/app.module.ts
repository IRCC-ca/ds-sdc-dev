import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  SecurityContext
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SlugifyPipe } from './share/pipe-slugify.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { SafeHtmlPipe } from './share/safe-html.pipe';
import { LangSwitchComponent } from './share/lan-switch/lang-switch.component';
import { ShellComponent } from './shell/shell.component';

// Design system modules
import { IrccDsAngularComponentsSharedModule } from 'ircc-ds-angular-component-library';
import { IrccDsAngularHeaderFooterModule } from 'ircc-ds-angular-component-library';

// Components
// import { SideNavComponent } from './side-nav/side-nav.component';
// import { SideNavConfig } from './side-nav/side-nav.config';
import { TitleSlugUrlComponent } from './title-slug-url/title-slug-url.component';
// import {InfoTextSmallComponent} from './info-text-small/info-text-small.component';
// import {ComponentPreviewComponent} from './component-preview/component-preview.component';
import { TestComponent } from './test/test.component';

//Pages
import { OverviewComponent } from './pages/overview/overview.component';
import { ForDesignersComponent } from './pages/for-designers/for-designers.component';
// import {PageButtonComponent} from './pages/button/button.component';
// import {PageUtilitiesComponent} from './pages/utilities/utilities.component';
// import {PageForDevelopersComponent} from './pages/for-developers/for-developers.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ForDesignersComponent,
    SlugifyPipe,
    SafeHtmlPipe,
    LangSwitchComponent,
    ShellComponent,
    // SideNavComponent,
    TitleSlugUrlComponent,
    TestComponent
  ],
  imports: [
    IrccDsAngularHeaderFooterModule,
    BrowserModule,
    BrowserAnimationsModule,
    IrccDsAngularComponentsSharedModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      // Disable html sanitize to allow generating id
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          headerIds: true
        }
      }
    }),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ClipboardModule
  ],
  // providers: [SideNavConfig],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
