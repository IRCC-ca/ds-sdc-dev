import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';
export interface ITabNavConfig {
  id: string;
  tab?: ITabConfig[];
  size?: keyof typeof DSSizes;
  selected?: string;
};
export interface ITabConfig {
  id?: string,
  title: string,
  value?: string
}
@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {

  @Input() config: ITabNavConfig = {
    id: '',
    size: 'large'
  }

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.config.selected === undefined && this.config.tab) {
      this.config.selected = (this.config.tab[0].id);
    }
  }

  setSelected(selectedID: any) {
    if (selectedID) this.config.selected = selectedID //set the selected tab
  }
}
