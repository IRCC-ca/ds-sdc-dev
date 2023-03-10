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
              public standAloneFunctions: StandAloneFunctions,
              private labelButton: LabelButtonService) { }

  ngOnInit() {
    (this.translate.currentLang === 'en' || this.translate.currentLang === 'en-US') ? this.errorStubText = ERROR_TEXT_STUB_EN : this.errorStubText = ERROR_TEXT_STUB_FR;

    this.translate.onLangChange.subscribe(() => {
    const curLang = this.translate.currentLang;
    (curLang === 'en' || curLang === 'en-US') ? this.errorStubText = ERROR_TEXT_STUB_EN : this.errorStubText = ERROR_TEXT_STUB_FR;
    });
  }

  /**
   * Output the button press 
   * @param id of the button being pressed (same as component ID)
   */
  iconButtonClick() {
    this.labelButton.buttonPress(this.config.parentID);
  }

  // get getIconButtonAriaLabel() {
  //   const aria = (this.translate.instant(this.config.label) + ' ' + this.translate.instant(this.config.iconButton.ariaText));
  //   if (aria) {
  //     return aria;
  //   } return '';
  // }
}
