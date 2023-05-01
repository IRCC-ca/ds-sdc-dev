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


  /*
   This variable is added to the class of component container,
   it is being used to overrride background color for interactive
   component specifically for Banner in the scss file, since 
   banner has a white background and rest have a grey background.
  */
  @Input() componentType?: keyof typeof ComponentType;

  accordionConfig: IAccordionContainerConfig = {
    id: 'InteractiveDemoComponentAcccordion',
    open: true,
    buttonText: 'DEMO_COMPONENT.ACCORDION_OPEN',
    buttonTextClosed: 'DEMO_COMPONENT.ACCORDION_CLOSED'
  };

  constructor() { }

  ngOnInit() { }

}
