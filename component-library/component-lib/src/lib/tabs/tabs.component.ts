import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';

export interface ITabNavConfig {
  id: string;
  formGroup: FormGroup;
  url?: string,
  tab?: ITabConfig[];
  selected?: boolean;
  contentt?: string
};

export interface ITabConfig {
  title?: 'string',
  content?: 'string'
}

@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, ControlValueAccessor {

  title = 'my-app';
  selectedMenu: any = 'Home';

  @Input() config: ITabNavConfig = {
    id: '',
    formGroup: new FormGroup({}),
    // selected: false
  }

  onChange = (formValue: string) => { };
  onTouched = () => { };
  writeValue(formValue: any) {
    // this.form.get('formControl')?.setValue(formValue);
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  constructor() { }

  ngOnInit(): void {
  }

  goTo(paramTxt: string) {
    this.selectedMenu = paramTxt;
    this.config.selected = true;
  }

}
