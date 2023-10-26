import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './modules/shared.module';
import { ButtonComponent } from 'ircc-ds-angular-component-library';
import { InputComponent } from 'ircc-ds-angular-component-library';
import { LabelComponent } from 'ircc-ds-angular-component-library';
import { IconComponent } from 'ircc-ds-angular-component-library';
import { IconButtonComponent } from 'ircc-ds-angular-component-library';

import {
  TranslateModule,
  TranslateService,
  TranslateStore,
  TranslateLoader
} from '@ngx-translate/core';
import { StandAloneFunctions } from 'ircc-ds-angular-component-library';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService, TranslateStore, StandAloneFunctions]
})
export class ElementModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    if (!customElements.get('ircc-cl-lib-button-web')) {
      const buttonComponent = createCustomElement(ButtonComponent, {
        injector: this.injector
      });
      customElements.define('ircc-cl-lib-button-web', buttonComponent);
    }

    if (!customElements.get('ircc-cl-lib-icon-web')) {
      const iconComponent = createCustomElement(IconComponent, {
        injector: this.injector
      });
      customElements.define('ircc-cl-lib-icon-web', iconComponent);
    }

    if (!customElements.get('ircc-cl-lib-icon-button-web')) {
      const iconButtonComponent = createCustomElement(IconButtonComponent, {
        injector: this.injector
      });
      customElements.define('ircc-cl-lib-icon-button-web', iconButtonComponent);
    }

    if (!customElements.get('ircc-cl-lib-label-web')) {
      const labelComponent = createCustomElement(LabelComponent, {
        injector: this.injector
      });
      customElements.define('ircc-cl-lib-label-web', labelComponent);
    }

    if (!customElements.get('ircc-cl-lib-input-web')) {
      const inputComponent = createCustomElement(InputComponent, {
        injector: this.injector
      });
      customElements.define('ircc-cl-lib-input-web', inputComponent);
    }
  }
}
