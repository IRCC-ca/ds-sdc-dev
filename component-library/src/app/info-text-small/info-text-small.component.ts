import {Component} from '@angular/core';
import {IIconConfig} from '@ircc-ca/ds-sdc-angular/icon';

@Component({
  selector: 'app-info-text-small',
  templateUrl: './info-text-small.component.html',
  styleUrls: ['./info-text-small.component.scss']
})
export class InfoTextSmallComponent {
  circleInfoIcon: IIconConfig = {
    unicode: 'f05a',
    fontFamily: 'fa-regular',
  }

  constructor() {
  }

}
