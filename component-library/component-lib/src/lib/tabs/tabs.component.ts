import { EventEmitter, Input, Output } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';
export interface ITabNavConfig {
  id: string;
  tab?: ITabConfig[];
  size?: keyof typeof DSSizes;
};
export interface ITabConfig {
  id?: string,
  title: string,
  value?: string
}
@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterViewInit {

  previousID = '';

  @Input() config: ITabNavConfig = {
    id: '',
    size: 'large'
  }

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.config?.tab?.forEach((item, index) => {
      if(!item.id) {
        item.id = this.config.id + '_' + item.id
      }
      if (index === 0) {
        document.getElementById(item.id)?.setAttribute("selected", '');
        this.previousID = item.id;
      }
    });
    this.cd.detectChanges();
  }

  buttonClick(id: any) {
    if (id !== this.previousID) {
      document.getElementById(id)?.setAttribute("selected", '');
      document.getElementById(this.previousID)?.removeAttribute("selected");
      this.click.emit(id);
      this.previousID = id;
    }
  };
}
