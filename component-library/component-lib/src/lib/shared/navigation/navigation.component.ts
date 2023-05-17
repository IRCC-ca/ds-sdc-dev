import { EventEmitter, Input, Output, ViewChild, Type } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';

import { NavigationItem } from './navigation.types';

export interface INavigationConfig {
  id: string;
  label?: string;
  iconLeading?: string;
  iconTrailing?: string;
  size?: keyof typeof DSSizes;
  navigationConfig?: Array<NavigationItem>;
}

@Component({
  selector: 'ircc-cl-lib-navigation',
  templateUrl: './navigation.component.html'
})
export class navigationComponent implements OnInit {
  @Input() config: INavigationConfig = {
    id: '',
    label: '',
    iconLeading: '',
    iconTrailing: '',
    size: 'small',
    navigationConfig: []
  };
  @Input() navigationConfig: Array<NavigationItem> = [];
  @Input() id: string = '';

  flattenNavigation: Array<NavigationItem> = [];

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    this.flattenNavigation = this.flatten(this.config.navigationConfig);
  }

  flatten = (obj: any) => {
    const stack = [obj];
    let stackB = [];
    while (stack?.length > 0) {
      const currentObj = stack.pop();
      if (!Array.isArray(currentObj)) {
        stackB.push(currentObj);
      }
      Object.keys(currentObj).forEach((key) => {
        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          stack.push(currentObj[key]);
        }
      });
    }
    return stackB;
  };

  findByKey = (items: Array<NavigationItem>, key: string, value: string) => {
    let returnItem: NavigationItem = {
      id: '',
      label: '',
      type: 'accordion',
      children: []
    };
    returnItem = items.find((element: any) => element[key] === value) || {
      id: '',
      label: '',
      type: 'accordion',
      children: []
    };
    return returnItem;
  };

  setNavigationItem = (obj: NavigationItem, key: string, value: string) => {
    obj[key] = value;
  };

  isArray = (obj: any) => {
    return Array.isArray(obj);
  };

  arrayOfObject = (obj: any) => {
    return Object.keys(obj);
  };

  getIconsStatus = () => {
    return (
      this.config &&
      (this.config?.iconLeading || '').length > 0 &&
      (this.config?.iconTrailing || '').length > 0
    );
  };

  clickIconLeading = (event: any) => {
    alert(`Insert Service Here. Button id: ${event}`);
  };
  clickIconTrailing = (event: any) => {
    alert(`Insert Service Here. Button id: ${event}`);
  };

  navigationClass = (): string => {
    if (
      ((this.config?.iconLeading?.length || ''.length > 0) &&
        this.config?.iconTrailing?.length) ||
      ''.length > 0
    ) {
      return 'header-full';
    } else if (this.config?.iconLeading?.length || ''.length > 0) {
      return 'header-iconleading';
    } else if (this.config?.iconTrailing?.length || ''.length > 0) {
      return 'header-icontrailing';
    }

    return '';
  };
}
