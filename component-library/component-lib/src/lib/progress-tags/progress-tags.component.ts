import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSSizes } from "../../shared/constants/jl-components/jl-components.constants/jl-components.constants";

export const TAG_LABELS_EN = ["In Progress", "Completed", "Error", "Locked", "Not started"];
export const TAG_LABELS_FR = ["In Progress FR", "Completed FR", "Error FR", "Locked FR", "Not started FR"];

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
  text?: string,
  size?: keyof typeof DSSizes
}
@Component({
  selector: 'lib-progress-tags',
  templateUrl: './progress-tags.component.html',
})
export class ProgressTagsComponent implements OnInit {

  @Input() config: IProgressTagsConfig = {
    id: '',
  };
  @Input() type?: keyof typeof TagType = 'primary';
  @Input() text? = TAG_LABELS_EN[0];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.type) this.config.type = this.type;
    if (this.text) this.config.text = this.text;

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
          this.config.text = TAG_LABELS_EN[1];
        break;
        case TagType.critical:
          this.config.text = TAG_LABELS_EN[2];
        break;
        case TagType.locked:
        this.config.text = TAG_LABELS_EN[3];
        break;
        case TagType.notStarted:
        this.config.text = TAG_LABELS_EN[4];
        break;
        default: 
        this.config.text = TAG_LABELS_EN[0];
      }
    } else {
      switch(this.config.type) {
        case TagType.success:
          this.config.text = TAG_LABELS_FR[1];
        break;
        case TagType.critical:
          this.config.text = TAG_LABELS_FR[2];
        break;
        case TagType.locked:
        this.config.text = TAG_LABELS_FR[3];
        break;
        case TagType.notStarted:
        this.config.text = TAG_LABELS_FR[4];
        break;
        default: 
        this.config.text = TAG_LABELS_FR[0];
      }
    }
  };
};
