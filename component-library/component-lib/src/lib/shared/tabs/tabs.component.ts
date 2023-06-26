import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { TranslateService } from '@ngx-translate/core';
export interface ITabNavConfig {
  id: string;
  tab?: ITabConfig[];
  size?: keyof typeof DSSizes;
  selected?: string;
  showContent?: boolean;
}
export interface ITabConfig {
  id?: string;
  title: string;
  value?: string;
}
@Component({
  selector: 'ircc-cl-lib-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
  @Input() config: ITabNavConfig = {
    id: '',
    showContent: true
  };
  @Input() id?: string;
  @Input() tab?: ITabConfig[];
  @Input() size?: keyof typeof DSSizes;
  @Input() selected?: string;
  @Input() showContent?: boolean;

  @Output() valueChange = new EventEmitter<string>();

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    //set config from individual options, if present
    if (this.id) this.config.id = this.id;
    if (this.tab) this.config.tab = this.tab;
    if (this.size) this.config.size = this.size;
    if (this.selected) this.config.selected = this.selected;
    if (this.showContent) this.config.showContent = this.showContent;


    if (this.config.selected === undefined && this.config.tab) {
      this.config.selected = this.config.tab[0].id;
      this.valueChange.emit(this.config.selected);
    }
  }

  setSelected(selectedID: any) {
    if (selectedID) this.config.selected = selectedID; //set the selected tab

    if (this.config?.selected) {
      let tab = document.getElementById(this.config?.selected);
      let x = tab?.getBoundingClientRect().left;
      if (document.querySelector('.page-nav')) {
        let nav = document.querySelector('.page-nav');
        nav && x ? (nav.scrollLeft = x) : null;
      }
      this.valueChange.emit(selectedID);
    }
  }
}
