import { EventEmitter, Input, Output } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DSSizes } from 'component-lib/src/shared/constants/jl-components/jl-components.constants/jl-components.constants';
export interface ITabNavConfig {
  id: string;
  formGroup: FormGroup;
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
    formGroup: new FormGroup({}),
  }

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {}

  ngAfterViewInit(){
    // setTimeout(() => { // to make the update async
      this.config?.tab?.forEach((item, index) => {
        if(!item.id) {
          item.id = this.config.id + '_' + item.id
        }
        if (index === 0) {
          document.getElementById(item.id)?.setAttribute("selected", '');
          this.previousID = item.id;
        }
      });
      // Tells Angular to check the view and it's children in which case
      // it will notice our loading state has changed
      this.cd.detectChanges();
    // }, 0);
  }

  buttonClick(id: any) {
    if (id !== this.previousID) {
      // add "selected" to new id
      document.getElementById(id)?.setAttribute("selected", '');
      //remove "selected" from prev id
      document.getElementById(this.previousID)?.removeAttribute("selected");
      this.click.emit(id);
      this.previousID = id;
    }
  };
}
