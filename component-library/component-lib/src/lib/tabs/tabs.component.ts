import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';
export interface ITabNavConfig {
  id: string;
  formGroup: FormGroup;
  url?: string,
  tab?: ITabConfig[];
  title?: string;
  selected?: string;
  addContent?: string;
  size?: keyof typeof DSSizes;
};

export interface ITabConfig {
  // [title: string] : string
  id?: string,
  title: string,
  value?: string
}

@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  selectedMenu: any = 'Home';
  previousID = 0;

  @Input() config: ITabNavConfig = {
    id: '',
    formGroup: new FormGroup({}),
    // selected: false
  }

  @Output() click: EventEmitter<any> = new EventEmitter();

  buttonClick(id: any) {
    id ? this.click.emit(id) : '';
    console.log("here", id);
    document.getElementById(id)?.setAttribute("selected", '');
    document.getElementById(id)?.remove()
  }

  constructor() { }

  ngOnInit() {
    let tab = this.config?.tab?.length;
    // this.config?.tab?.forEach(x => {
    //   if(!x.id) {
    //     x.id = this.config.id + '_' + x.title
    //   } 
    // });

    // 1. index 0 is set to selected
  }

  goTo(paramTxt?: string) {
    this.selectedMenu = paramTxt;
    // this.config?.tab?.forEach(x => {
    //   console.log("X: ", x)
    //   x.title = paramTxt
    // })

    // this.config?.tab?.forEach(x => {
    //   // console.log("X key:", Object.keys(x));
    //   // console.log("X val:", Object.values(x));
    //   Object.keys(x) = paramTxt;
    // });
  };

}
