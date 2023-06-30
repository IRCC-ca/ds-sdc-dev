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

export const ERROR_TEXT_STUB = {
  en: 'Error',
  fr: 'Erreur'
};

export const HELP_ICON_ALT = {
  en: ', more information',
  fr: ", plus d'information"
};

@Component({
  selector: 'ircc-cl-lib-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit {
  @Input() config: ILabelConfig = {
    formGroup: new FormGroup({}),
    parentID: ''
  };
  @Input() formGroup?: FormGroup;
  @Input() errorMessages?: IErrorPairs[];
  @Input() parentID?: string;
  @Input() label?: string;
  @Input() desc?: string;
  @Input() hint?: string;
  @Input() required?: boolean;
  @Input() iconButton?: ILabelIconConfig;
  @Input() topLabel?: string;
  @Input() touched?: boolean;

  labelIconText = '';

  constructor(
    private translate: TranslateService,
    public standAloneFunctions: StandAloneFunctions,
    private labelButton: LabelButtonService
  ) {}

  ngOnInit() {
    //set config from individual options, if present
    if (this.formGroup) this.config.formGroup = this.formGroup;
    if (this.errorMessages) this.config.errorMessages = this.errorMessages;
    if (this.parentID) this.config.parentID = this.parentID;
    if (this.label) this.config.label = this.label;
    if (this.desc) this.config.desc = this.desc;
    if (this.hint) this.config.hint = this.hint;
    if (this.required) this.config.required = this.required;
    if (this.iconButton) this.config.iconButton = this.iconButton;
    if (this.topLabel) this.config.topLabel = this.topLabel;
    if (this.touched) this.config.touched = this.touched;


    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      // this.errorStubText = ERROR_TEXT_STUB_EN;
      this.labelIconText = HELP_ICON_ALT.en;
    } else {
      // this.errorStubText = ERROR_TEXT_STUB_FR;
      this.labelIconText = HELP_ICON_ALT.fr;
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
