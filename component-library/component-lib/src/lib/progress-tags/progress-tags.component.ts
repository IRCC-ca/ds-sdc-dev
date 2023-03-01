import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSSizes } from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export const TAG_LABELS_EN = ["In Progress", "Completed", "Error", "Locked", "Not started"];
export const TAG_LABELS_FR = ["En cours", "Complété", "Erreur", "Verrouillé", "Pas commencé"];

export enum TagType {
  primary = 'primary',
  success = 'success',
  critical = 'critical',
  locked = 'locked',
  notStarted = 'notStarted'
};
export interface IProgressTagsConfig {
  id: string,
  type?: keyof typeof TagType,
  size?: keyof typeof DSSizes
}
@Component({
  selector: 'lib-progress-tags',
  templateUrl: './progress-tags.component.html',
})
export class ProgressTagsComponent implements OnInit {

  text: string = '';
  
  @Input() config: IProgressTagsConfig = {
    id: '',
  };

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
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
      switch(this.config.type) {
        case TagType.success:
          this.text = TAG_LABELS_EN[1];
        break;
        case TagType.critical:
          this.text = TAG_LABELS_EN[2];
        break;
        case TagType.locked:
          this.text = TAG_LABELS_EN[3];
        break;
        case TagType.notStarted:
          this.text = TAG_LABELS_EN[4];
        break;
        default: 
          this.text = TAG_LABELS_EN[0];
      }
    } else {
      switch(this.config.type) {
        case TagType.success:
          this.text = TAG_LABELS_FR[1];
        break;
        case TagType.critical:
          this.text = TAG_LABELS_FR[2];
        break;
        case TagType.locked:
          this.text = TAG_LABELS_FR[3];
        break;
        case TagType.notStarted:
          this.text = TAG_LABELS_FR[4];
        break;
        default: 
          this.text = TAG_LABELS_FR[0];
      }
    }
  };
};
