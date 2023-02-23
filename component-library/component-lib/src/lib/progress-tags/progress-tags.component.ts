import { Component, Input, OnInit } from '@angular/core';

export enum TagType {
  '' = '',
  // generic = 'generic',
  info = 'info',
  success = 'success', //completed
  critical = 'critical', //err
  // primary generic (In progress)
  // passive generic (Locked/Not started)
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
  styleUrls: ['./progress-tags.component.css']
})
export class ProgressTagsComponent implements OnInit {

  @Input() config?: IProgressTagsConfig;
  @Input() id?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
