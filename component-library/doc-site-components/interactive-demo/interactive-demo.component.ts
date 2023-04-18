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
  }

  accordionText = 'DEMO_COMPONENT.ACCORDION_OPEN';
  isOpen = true;

  constructor() { }


  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;

    this.isOpen ?
      this.accordionText = 'DEMO_COMPONENT.ACCORDION_OPEN' :
      this.accordionText = 'DEMO_COMPONENT.ACCORDION_CLOSED';
  }
}
