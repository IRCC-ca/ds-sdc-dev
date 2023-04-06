import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components.constants";
export interface ITabNavConfig {
  id: string;
  tab?: ITabConfig[];
  size?: keyof typeof DSSizes;
  selected?: string;
}
export interface ITabConfig {
  id?: string,
  title: string,
  value?: string
}
@Component({
  selector: 'ircc-cl-lib-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {

  @Input() config: ITabNavConfig = {
    id: '',
  }

  ngOnInit() {
    if (this.config.selected === undefined && this.config.tab) {
      this.config.selected = (this.config.tab[0].id);
    }
  }

  setSelected(selectedID: any) {
    if (selectedID) this.config.selected = selectedID //set the selected tab

    if (this.config?.selected) {
      let tab = document.getElementById(this.config?.selected)
      let x = tab?.getBoundingClientRect().left;
      if (document.querySelector('.page-nav')) {
        let nav = document.querySelector('.page-nav');
        nav && x ? nav.scrollLeft = x : null;
      }
    }
  }
}
