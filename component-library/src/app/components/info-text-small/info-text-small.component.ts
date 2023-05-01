import { Component } from '@angular/core';
import { IIconConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-info-text-small',
  templateUrl: './info-text-small.component.html',
  styleUrls: ['./info-text-small.component.scss']
})
export class InfoTextSmallComponent {
  circleInfoIcon: IIconConfig = {
    FA_keywords: 'f05a',
    ariaLabel: ''
  };

  constructor() { }
}
