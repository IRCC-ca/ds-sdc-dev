import { Component, Input, OnInit } from '@angular/core';

export enum TagType {
  '' = '',
  // generic = 'generic',
  info = 'info', // In progress
  success = 'success', //completed
  critical = 'critical', //err
  locked = 'locked', // primary generic (In progress)
  notStarted = 'notStarted'  // passive generic (Locked/Not started)
};

export enum TagSize {
  large = 'large',
  small = 'small'
}

export interface IProgressTagsConfig {
  id: string,
  title?: string,
  type?: keyof typeof TagType,
  size?: keyof typeof TagSize
}
@Component({
  selector: 'lib-progress-tags',
  templateUrl: './progress-tags.component.html',
})
export class ProgressTagsComponent implements OnInit {

  @Input() config?: IProgressTagsConfig;
  @Input() id?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
