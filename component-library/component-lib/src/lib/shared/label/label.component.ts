import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { IIconButtonComponentConfig } from '../icon-button/icon-button.component';

export interface ILabelConfig {
  formGroup: FormGroup;
  errorMessages?: IErrorPairs[];
  parentID: string;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean; 
  iconButton?: IIconButtonComponentConfig;
  topLabel?:string;
}

export const ERROR_TEXT_STUB_EN = 'Error';
export const ERROR_TEXT_STUB_FR = 'Erreur';

@Component({
  selector: 'lib-label',
  templateUrl: './label.component.html',
})
export class LabelComponent implements OnInit {

  @Input() config: ILabelConfig = {
    formGroup: new FormGroup({}),
    parentID: ''
  } 

  errorStubText = '';

  constructor(private translate: TranslateService,
              public standAloneFunctions: StandAloneFunctions) { }

  ngOnInit() {
    (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') ? this.errorStubText = ERROR_TEXT_STUB_EN : this.errorStubText = ERROR_TEXT_STUB_FR;

    this.translate.onLangChange.subscribe(() => {
    const curLang = this.translate.currentLang;
    (curLang === 'en' || curLang === 'en-US') ? this.errorStubText = ERROR_TEXT_STUB_EN : this.errorStubText = ERROR_TEXT_STUB_FR;
    });
  }
}
