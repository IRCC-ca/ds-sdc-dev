import { Input } from '@angular/core';
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
  contentt?: string;
  size?: keyof typeof DSSizes;
};

export interface ITabConfig {
  title: string,
  value?: string
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
    // this.config?.tab?.forEach(x => {
    //   console.log("X: ", x)
    //   x.title = paramTxt
    // })
  }

}
