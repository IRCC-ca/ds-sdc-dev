import { Component, Input, OnInit } from '@angular/core';

export enum TagType {
  '' = '',
  generic = 'generic',// In progress
  primaryGeneric = 'primaryGeneric',
  success = 'success', //completed
  critical = 'critical', //err
  locked = 'locked', // passive generic
  notStarted = 'notStarted'  // passive generic
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
export interface ITagConfig {
  id?: string,
  value?: string
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
    // this.config?.title?.forEach(x => {
    //   this.config?.type
    // }) 
  }

}
