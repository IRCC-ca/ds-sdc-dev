import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  IButtonConfig,
  ITabNavConfig,
  ITabConfig
} from 'ircc-ds-angular-component-library';

import { IAccordionContainerConfig, mobileBehaviourType } from '../accordion-panel/accordion-container.component';

export interface ICodeViewerConfig {
  id: string;
  openAccordion?: boolean;
  tab?: ITabConfig[];
  selected?: string;
}

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss']
})
export class codeViewerComponent implements OnInit, OnChanges {
  @Input() config: ICodeViewerConfig = {
    id: ''
  };
  @Output() getSelected = new EventEmitter<string>();

  tabConfig: ITabNavConfig = {
    id: 'codeViewerTabs',
    showContent: false
  };
  selectedTab: any = {
    title: ''
  };

  accordionConfig: IAccordionContainerConfig = {
    id: 'codeViewerTabsCccordion',
    open: this.config.openAccordion,
    mobileBehaviour: mobileBehaviourType.column
  };

  openAccordion: boolean = false;
  minHeightResizeContainer = 150;
  height: number = 150;

  buttonConfigCopy: IButtonConfig = {
    id: 'accordion-button',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to copy the code'
  };

  ngOnInit() {
    this.setupComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.config = changes['config'].currentValue;
      this.setupComponent();
    }
  }

  setupComponent() {
    if (this.config.openAccordion !== undefined) {
      this.openAccordion = this.config.openAccordion;
    }

    if (this.config.selected) {
      this.tabConfig.selected = this.config.selected;
    }

    if (this.config.tab) {
      this.tabConfig.tab = this.config.tab;
    } else {
      this.tabConfig.tab = [];
    }

    if (this.config.tab && this.config.selected) {
      this.selectedTab = this.config.tab.find(
        (tab) => tab.id === this.config.selected
      );
    } else if (this.config.tab) {
      this.selectedTab = this.config.tab[0];
    } else {
      this.selectedTab = {};
    }
  }

  getSelectedTab(selected: any) {
    if (this.config.tab) {
      this.selectedTab = this.config.tab.find(
        (element) => element.id === selected
      );
      this.config.selected = selected;
      this.getSelected.emit(selected);
    }
  }

  getHeight(height: number) {
    this.height = height;
  }
}

/**
 * Convert config object to string
 */
export function stringify(object: any): string {
  // Remove entries of empty string in value
  // https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
  const obj = Object.fromEntries(
    Object.entries(object).filter(([k, v]) => v != '')
  );
  return (
    JSON.stringify(obj, null, 4)
      // 'key:' => key:
      .replace(/"([^"]+)":/g, '$1:')
      // "new Class()" => new Class()
      .replace(/"new /g, 'new ')
      .replace(/\)"/g, ')')
  );
}
