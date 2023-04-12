import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import {
  ICheckBoxComponentConfig,
  ISelectConfig,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';

// Parent components imports
import {
  ParentTemplateComponent,
  TranslateService,
  StandAloneFunctions,
  Router
} from '../../@shared/templates/parent-template.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss']
})
export class NotFoundComponent extends ParentTemplateComponent {
  constructor(
    altLang: LanguageSwitchService,
    translate: TranslateService,
    standAloneFunctions: StandAloneFunctions,
    router: Router
  ) {
    super(altLang, translate, standAloneFunctions, router);
  }

  ngOnInit() {
    this.altLang.setAltLangLink('not-found');
  }
}
