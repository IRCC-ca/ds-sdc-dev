import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IIconButtonIconConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { IAccordionContainerConfig } from '../accordion-panel/accordion-container.component';
import { EventService } from './event-service.service';

export enum ComponentType {
  banner = 'banner'
}

export interface IInteractiveDemoConfig {
  id: string;
  tabsConfig: ITabNavConfig;
  componentType?: keyof typeof ComponentType;
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

  @Input() config: IInteractiveDemoConfig = {
    id: '',
    tabsConfig: {
      id: ''
    }
  };

  /*
   This variable is added to the class of component container,
   it is being used to override background color for interactive
   component specifically for Banner in the scss file, since 
   banner has a white background and rest have a grey background.
  */
  @Input() componentType?: keyof typeof ComponentType;
  @Input() id = '';
  @Input() tabsConfig?: ITabNavConfig;

  accordionConfig: IAccordionContainerConfig = {
    id: 'InteractiveDemoComponentAccordion',
    open: true,
    buttonText: 'DEMO_COMPONENT.ACCORDION_OPEN',
    buttonTextClosed: 'DEMO_COMPONENT.ACCORDION_CLOSED'
  };

  constructor(private eventService: EventService) {}

  tabEvent(event: string) {
    this.eventService.onButtonClick(this.config.id + '_' + event);
  }

  ngOnInit() {
    if (this.componentType) this.config.componentType = this.componentType;
    if (this.id) this.config.id = this.id;
    if (this.tabsConfig) this.config.tabsConfig = this.tabsConfig;
    this.accordionConfig.id = this.id + '_' + this.accordionConfig.buttonText;
  }
}
