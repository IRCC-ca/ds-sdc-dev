import { Component, OnInit } from '@angular/core';
import { IIconButtonIconConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-interactive-demo',
  templateUrl: './interactive-demo.component.html',
  styleUrls: ['./interactive-demo.component.scss']
})
export class InteractiveDemoComponent implements OnInit {
  iconConfig: IIconButtonIconConfig = {
    class: 'fa-light fa-chevron-down'
  };

  accordionText: string =
    'DEMO_COMPONENT.ACCORDION_OPEN' || 'DEMO_COMPONENT.ACCORDION_CLOSED';
  isOpen: boolean = true;

  constructor() {}

  ngOnInit() {}

  toggle(accordianOpen: any) {
    this.isOpen = accordianOpen;
  }
}
