import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIconButtonIconConfig } from 'ircc-ds-angular-component-library';
import { IAccordionContainerConfig } from '../accordion-panel/accordion-container.component';


export enum ComponentType {
  banner = 'banner',
}

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
    'InteractiveDemo.ConfigAccordionOpen' ||
    'InteractiveDemo.ConfigAccordionClosed';
  isOpen: boolean = true;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.isOpen = !this.isOpen;

    this.isOpen
      ? (this.accordionText = 'InteractiveDemo.ConfigAccordionOpen')
      : (this.accordionText = 'InteractiveDemo.ConfigAccordionClosed');
  }
}
