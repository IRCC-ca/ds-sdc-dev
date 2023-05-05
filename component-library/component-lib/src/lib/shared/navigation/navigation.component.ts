import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
export interface INavigationConfig {
  id: string;
  label?: string;
  iconLeading?: string;
  iconTrailing?: string;
  size?: keyof typeof DSSizes;
}

enum NavigationItemType {
  accordion = 'accordion',
  heading = 'heading',
  link = 'link'
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  type: keyof typeof NavigationItemType;
  children: NavigationItem[];
}

interface NavigationItemAccordion extends NavigationItem {
  open: boolean;
}

interface NavigationItemHeading extends NavigationItem {
  customPropForHeader: string;
}

interface NavigationItemLink extends NavigationItem {
  label: string;
  href: string;
  anchor: boolean;
}

interface CustomPropsArray {
  key: string;
  value: string;
}
interface NavigationItemCustom extends NavigationItem {
  component: string;
  componentProps: Array<CustomPropsArray>;
}

interface NavigationConfig {
  items: Array<NavigationItem>;
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
    size: 'small'
  };

  @Input() id: string = '';

  itemAA: NavigationItemLink = {
    label: 'AA',
    href: 'AA',
    anchor: false,
    id: 'AA',
    icon: 'AA',
    type: 'link',
    children: []
  };
  itemAB: NavigationItemLink = {
    label: 'AB',
    href: 'AB',
    anchor: false,
    id: 'AB',
    icon: 'AB',
    type: 'link',
    children: []
  };

  itemACC: NavigationItemLink = {
    label: 'itemACC',
    href: 'itemACC',
    anchor: false,
    id: 'itemACC',
    icon: 'itemACC',
    type: 'link',
    children: []
  };
  itemAC: NavigationItemLink = {
    label: 'AC',
    href: 'AC',
    anchor: false,
    id: 'AC',
    icon: 'AC',
    type: 'link',
    children: [this.itemACC]
  };

  itemA: NavigationItemHeading = {
    id: 'A',
    label: 'A',
    icon: 'a',
    type: 'heading',
    customPropForHeader: 'string',
    children: [this.itemAA, this.itemAB, this.itemAC]
  };

  itemBAA: NavigationItemLink = {
    label: 'itemACC',
    href: 'itemACC',
    anchor: false,
    id: 'itemACC',
    icon: 'itemACC',
    type: 'link',
    children: []
  };

  itemBA: NavigationItemLink = {
    label: 'AA',
    href: 'AA',
    anchor: false,
    id: 'AA',
    icon: 'AA',
    type: 'link',
    children: [this.itemBAA]
  };
  itemBB: NavigationItemLink = {
    label: 'AB',
    href: 'AB',
    anchor: false,
    id: 'AB',
    icon: 'AB',
    type: 'link',
    children: []
  };

  itemBC: NavigationItemLink = {
    label: 'AC',
    href: 'AC',
    anchor: false,
    id: 'AC',
    icon: 'AC',
    type: 'link',
    children: [this.itemACC]
  };

  itemB: NavigationItemHeading = {
    id: 'A',
    label: 'A',
    icon: 'a',
    type: 'heading',
    customPropForHeader: 'string',
    children: [this.itemBA, this.itemBB, this.itemBC]
  };

  navigationObject: NavigationConfig = {
    items: [this.itemA, this.itemB]
  };

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;

    console.log(this.flatten(this.navigationObject));
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

  isArray = (obj: any) => {
    //  console.log(Array.isArray(obj), obj);
    return Array.isArray(obj);
  };

  arrayOfObject = (obj: any) => {
    console.log(Object.keys(obj));
    return Object.keys(obj);
  };
}
