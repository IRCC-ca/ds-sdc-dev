import { Component, Input, OnInit } from '@angular/core';

export enum TagType {
  primary = 'primary',
  success = 'success',
  critical = 'critical',
  locked = 'locked',
  notStarted = 'notStarted'
};

export enum TagSize {
  large = 'large',
  small = 'small'
}
export interface IProgressTagsConfig {
  id: string,
  type?: keyof typeof TagType,
  size?: keyof typeof TagSize
}
export interface ITagConfig {
  id?: string,
  value?: string
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

  constructor() { }

  ngOnInit(): void {
    if (this.type) this.config.type = this.type;
  }

}
