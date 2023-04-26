import { Component, OnInit } from '@angular/core';
import { IIconButtonIconConfig } from 'ircc-ds-angular-component-library';
import { IAccordionContainerConfig } from '../accordion-panel/accordion-container.component';

@Component({
  selector: 'app-interactive-demo',
  templateUrl: './interactive-demo.component.html',
  styleUrls: ['./interactive-demo.component.scss']
})
export class InteractiveDemoComponent implements OnInit {
  iconConfig: IIconButtonIconConfig = {
    class: 'fa-light fa-chevron-down'
  };

  accordionConfig: IAccordionContainerConfig = {
    id: 'InteractiveDemoComponentAcccordion',
    open: true,
    buttonText: 'DEMO_COMPONENT.ACCORDION_OPEN',
    buttonTextClosed: 'DEMO_COMPONENT.ACCORDION_CLOSED'
  };

  constructor() {}

  ngOnInit() {}
}
