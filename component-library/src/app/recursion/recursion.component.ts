import { Component, OnInit } from '@angular/core';

export interface IRecursionItem {
  id: string;
  label?: string;
  check?: boolean;
  children?: IRecursionItem[];
  type: string;
}

export interface IRecursionItemAccordion extends IRecursionItem {
  value: number;
}

@Component({
  selector: 'app-recursion',
  templateUrl: './recursion.component.html',
  styleUrls: ['./recursion.component.scss']
})
export class RecursionComponent implements OnInit {
  itemAAAA: IRecursionItemAccordion = {
    id: 'aaaa',
    label: 'aaaa',
    children: [],
    check: false,
    type: 'IRecursionItemAccordion',
    value: 123131
  };

  itemAAA: IRecursionItem = {
    id: 'aaa',
    label: 'aaa',
    children: [this.itemAAAA],
    check: false,
    type: 'IRecursionItem'
  };
  itemAAB: IRecursionItem = {
    id: 'aab',
    label: 'aab',
    children: [],
    check: false,
    type: 'IRecursionItem'
  };

  itemAA: IRecursionItem = {
    id: 'aa',
    label: 'aa',
    children: [this.itemAAA, this.itemAAB],
    check: false,
    type: 'IRecursionItem'
  };

  itemAB: IRecursionItem = {
    id: 'ab',
    label: 'ab',
    children: [],
    check: false,
    type: 'IRecursionItem'
  };

  itemA: IRecursionItem = {
    id: 'a',
    label: 'a',
    children: [this.itemAA, this.itemAB],
    check: false,
    type: 'IRecursionItem'
  };

  config: IRecursionItem = {
    id: 'config',
    label: 'config',
    children: [this.itemA],
    check: false,
    type: 'IRecursionItem'
  };

  constructor() {}

  ngOnInit(): void {
    console.log(this.config);
    console.log(this.flatten(this.config.children));
    // console.log(this.findByKey(this.flatten(this.config.children), 'id', 'aa'));
  }

  toggleChildren(event: any) {
    // let newValues: IRecursionItem = {
    //   id: 'a',
    //   check: true,
    //   type: 'IRecursionItem'
    // };

    this.setChildren(
      this.findByKey(this.flatten(this.config.children), 'id', 'aaa')
    );

    console.log(this.flatten(this.config.children));
  }

  setChildren(obj1: IRecursionItem) {
    const newValues: IRecursionItemAccordion = {
      id: obj1.id,
      check: true,
      type: 'IRecursionItemAccordion',
      value: Math.random()
    };

    this.setRecursiveItems(
      this.findByKey(this.flatten(this.config.children), 'id', obj1.id),
      newValues
    );

    console.log(obj1);

    if (obj1.children) {
      for (const children of obj1?.children) {
        this.setChildren(children);
      }
    }
  }

  private setRecursiveItems = (obj1: IRecursionItem, obj2: IRecursionItem) => {
    Object.keys(obj2).forEach((key) => {
      obj1[key] = obj2[key];
    });
  };

  private flatten = (obj: any) => {
    const stack = [obj];
    const stackB = [];
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

  private findByKey = (
    items: Array<IRecursionItem>,
    key: string,
    value: string
  ) => {
    let returnItem: IRecursionItem = {
      id: '',
      label: '',
      children: [],
      check: false,
      type: 'IRecursionItem'
    };
    returnItem = items.find((element: any) => element[key] === value) || {
      id: '',
      label: '',
      children: [],
      check: false,
      type: 'IRecursionItem'
    };
    return returnItem;
  };
}
