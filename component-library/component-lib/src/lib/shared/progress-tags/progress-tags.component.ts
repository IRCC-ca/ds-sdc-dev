import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSSizes } from "../../../shared/constants/jl-components.constants";

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

  text: string[] = [];

  @Input() config: IProgressTagsConfig = {
    id: '',
  };
  @Input() id = '';
  @Input() type?: keyof typeof TagType | TagType;
  @Input() size?: keyof typeof DSSizes | DSSizes;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.id) this.config.id = this.id;
    if (this.type) this.config.type = this.type;
    if (this.size) this.config.size = this.size;
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
      this.text = TAG_LABELS_EN;
    } else {
      this.text = TAG_LABELS_FR;
    }
  };
};
