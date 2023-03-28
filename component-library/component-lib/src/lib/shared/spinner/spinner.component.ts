import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSFullSizes, DSOrientations } from '../../../shared/constants/jl-components.constants';

export const SPINNER_LABELS_EN = ["Loading", "Success", "Error"];
export const SPINNER_LABELS_FR = ["Chargement", "Succès", "Erreur"];

export enum SpinnerType {
  active = 'active',
  success = 'success',
  critical = 'critical'
};
export interface ISpinnerConfig {
  id: string,
  type?: keyof typeof SpinnerType,
  size?: keyof typeof DSFullSizes,
  orientation?: keyof typeof DSOrientations,
  label?: string,
  description?: string
}
@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  text: string[] = [];

  @Input() config: ISpinnerConfig = {
    id: '',
  };
  @Input() id = '';
  @Input() type?: keyof typeof SpinnerType | SpinnerType;
  @Input() size?: keyof typeof DSFullSizes | DSFullSizes;
  @Input() orientation?: keyof typeof DSOrientations | DSOrientations;
  @Input() label?: '';
  @Input() description?: '';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (!this.config.orientation) this.config.orientation = 'horizontal';
    if (!this.config.size) this.config.size = 'large';
    
    if (this.id) this.config.id = this.id;
    if (this.type) this.config.type = this.type;
    if (this.size) this.config.size = this.size;
    if (this.orientation) this.config.orientation = this.orientation;
    this.removeVertical();

    this.setTypeTitle();
    this.translate.onLangChange.subscribe(() => {
      this.setTypeTitle();
    });
  };

  ngOnChanges() {
    this.setTypeTitle();
  };

  setTypeTitle() {
    if ((this.translate.currentLang === 'en') || (this.translate.currentLang === 'en-US')) {
      this.text = SPINNER_LABELS_EN;
    } else {
      this.text = SPINNER_LABELS_FR;
    }
  };

  removeVertical() {
    if (this.config.size !== 'large' && this.config.orientation === 'vertical') {
      this.config.orientation = 'horizontal';
    }
  };
};