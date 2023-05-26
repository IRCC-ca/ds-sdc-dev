import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IIconButtonIconConfig } from 'ircc-ds-angular-component-library';
import { IAccordionContainerConfig, mobileBehaviourType } from '../accordion-panel/accordion-container.component';

export enum InteractiveComponentType {
  banner = 'banner'
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
  @Input() hasTabs: boolean = true;
  @Input() componentType?: keyof typeof InteractiveComponentType;
  mobile = false;
  accordionConfig: IAccordionContainerConfig = {
    id: 'InteractiveDemoComponentAcccordion',
    open: true,
    buttonText: 'DEMO_COMPONENT.ACCORDION_OPEN',
    buttonTextClosed: 'DEMO_COMPONENT.ACCORDION_CLOSED',
    mobileBehaviour: mobileBehaviourType.fullWidth
  };

  /** Listens for screen resizes and sets mobile-tablet boolean */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobile = window.innerWidth <= 360;
    if(this.mobile){
      this.accordionConfig.open = false;
    } else {
      this.accordionConfig.open = true;
    }
  }
  constructor() {}

  ngOnInit() {
    this.onResize()
  }
}