import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StandAloneFunctions } from '../../../shared/functions/stand-alone.functions';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';
import { LabelButtonService } from './label-button.service';

export interface ILabelIconConfig {
  iconClass: string;
  colour?: string; //Default is text primary token
  ariaText: string;
}

export interface ILabelConfig {
  formGroup: FormGroup;
  errorMessages?: IErrorPairs[];
  parentID: string;
  label?: string;
  desc?: string;
  hint?: string;
  required?: boolean;
  iconButton?: ILabelIconConfig;
  topLabel?: string;
  touched?: boolean;
}

export const ERROR_TEXT_STUB_EN = 'Error';
export const ERROR_TEXT_STUB_FR = 'Erreur';

export const HELP_ICON_ALT_EN = ', more information';
export const HELP_ICON_ALT_FR = ", plus d'information";

@Component({
  selector: 'ircc-cl-lib-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit {
  @Input() config: ILabelConfig = {
    formGroup: new FormGroup({}),
    parentID: ''
  };
  labelIconText = '';

  constructor(
    private translate: TranslateService,
    public standAloneFunctions: StandAloneFunctions,
    private labelButton: LabelButtonService
  ) {}

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      // this.errorStubText = ERROR_TEXT_STUB_EN;
      this.labelIconText = HELP_ICON_ALT_EN;
    } else {
      // this.errorStubText = ERROR_TEXT_STUB_FR;
      this.labelIconText = HELP_ICON_ALT_FR;
    }
  }

  /**
   * Output the button press
   * @param id of the button being pressed (same as component ID)
   */
  iconButtonClick() {
    this.labelButton.buttonPress(this.config.parentID);
  }

  returnLabel() {
    return !this.config.topLabel ? this.config.label : this.config.topLabel;
  }
}
