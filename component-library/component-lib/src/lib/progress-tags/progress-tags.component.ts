import { Component, OnInit } from '@angular/core';

export enum TagType {
  '' = '',
  // generic = 'generic',
  // info = 'info',
  critical = 'critical', //err
  success = 'success', //completed
  // primary generic (In progress)
  // passive generic (Locked/Not started)
};

export interface IProgressTagsConfig {
  id: string,
  title?: string,
  type?: keyof typeof TagType
}
@Component({
  selector: 'lib-progress-tags',
  templateUrl: './progress-tags.component.html',
  styleUrls: ['./progress-tags.component.css']
})
export class ProgressTagsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
