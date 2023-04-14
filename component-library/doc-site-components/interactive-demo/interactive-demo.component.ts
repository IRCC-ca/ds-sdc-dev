import { Component, OnInit } from '@angular/core';
import { IButtonConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-interactive-demo',
  templateUrl: './interactive-demo.component.html',
  styleUrls: ['./interactive-demo.component.scss']
})
export class InteractiveDemoComponent implements OnInit {

  accordionButtonOpenConfig: IButtonConfig = {
    id: 'accordionButton',
    category: 'plain',
    icon: 'fa-light fa-chevron-up'
  };

  accordionButtonClosedConfig: IButtonConfig = {
    id: 'accordionButton',
    category: 'plain',
    icon: 'fa-light fa-chevron-down'
  };

  accordionOpen = 'DEMO_COMPONENT.ACCORDION_OPEN';
  accordionClosed = 'DEMO_COMPONENT.ACCORDION_CLOSED';

  isOpen = true;

  constructor() {}


  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
