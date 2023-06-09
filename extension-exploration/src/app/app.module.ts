import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DsPageModule } from './ds-pages.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DsPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
