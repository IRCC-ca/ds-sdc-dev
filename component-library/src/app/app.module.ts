import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestPageComponent } from './test-page/test-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, TestPageComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiPrefixInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true
      },
      {
        provide: RouteReuseStrategy,
        useClass: RouteReusableStrategy
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
