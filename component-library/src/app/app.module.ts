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
import { ClipboardModule } from '@angular/cdk/clipboard';

import { LangSwitchComponent } from './share/lan-switch/lang-switch.component';
import { DsPageModule } from './modules/ds-pages.module';

import { APP_BASE_HREF } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LangSwitchComponent
  ],
  imports: [
    BrowserModule,
    DsPageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
