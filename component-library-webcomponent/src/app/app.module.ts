import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

// import { ButtonComponent } from './components/button/button.component';
// import { IconComponent } from './components/icon/icon.component';
// import { IconButtonComponent } from './components/icon-button/icon-button.component';

import { ErrorComponent } from './components/lib/form-components/error/error.component';
import { InputComponent } from './components/lib/form-components/input/input.component';
import { LabelComponent } from './components/lib/shared/label/label.component';
// import { RadioInputComponent } from './components/lib/form-components/radio-input/radio-input.component';
import { IrccDsAngularFormComponentsModule } from '../app/components/lib/form-components/ircc-ds-angular-form-components.module';
// import { CheckboxComponent } from './components/lib/form-components/checkbox/checkbox.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DatePickerComponent } from './components/lib/form-components/date-picker/date-picker.component';
// import { TextareaComponent } from './components/lib/form-components/textarea/textarea.component';
// import { SelectComponent } from './components/lib/form-components/select/select.component';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-loading',
  template: '<h1>Hello<h1>',
})
export class LoadingComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IrccDsAngularFormComponentsModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [TranslateService],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [],
})
export class AppModule {
  constructor(private injector: Injector, public translate: TranslateService) {}

  ngDoBootstrap() {
    const inputComponent = createCustomElement(InputComponent, {
      injector: this.injector,
    });
    customElements.define('ircc-cl-lib-input', inputComponent);
    // const buttonComponent = createCustomElement(ButtonComponent, {
    //   injector: this.injector,
    // });
    // customElements.define('ircc-cl-lib-button', buttonComponent);
    // const iconButtonComponent = createCustomElement(IconButtonComponent, {
    //   injector: this.injector,
    // });
    // customElements.define('ircc-cl-lib-icon-button', iconButtonComponent);
  }
}
