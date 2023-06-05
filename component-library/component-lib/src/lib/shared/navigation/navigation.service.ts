//TODO: Add detailed readme listing how this actually works. People will be SOOOO confused.
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  INavigationConfig,
  INavigationItem,
  INavigationItemAccordion,
  INavigationItemHeading,
  INavigationItemLink
} from './navigation.types';

export interface INavItemEvent {
  id: string;
  event: any;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  //Used entirely as a workaround for the change detection limitations
  private itemChangeSubj = new Subject<string>();
  itemChangeObs$ = this.itemChangeSubj.asObservable();

  private navEventSubj = new Subject<INavItemEvent>();
  navEventObs$ = this.navEventSubj.asObservable(); //Use this for any events we need propagated up to parents

  private navConfigSubj = new BehaviorSubject<INavigationConfig>({
    id: '',
    label: '',
    iconLeading: '',
    iconTrailing: '',
    height: '',
    size: 'small',
    navigationConfig: []
  });
  navConfigObs$ = this.navConfigSubj.asObservable();

  flattenedNavigation: Array<INavigationItem> = [];

  /**
   * Broadcast the config object of the value and flatten the array
   * @param update: INavigationConfig
   */
  setNavConfig(update: INavigationConfig) {
    this.navConfigSubj.next(update);
    this.flattenedNavigation = this.flatten(update);
  }

  /**
   * General broadcast of an element update
   * @param event
   */
  setNavItem(
    update:
      | INavigationItemLink
      | INavigationItemAccordion
      | INavigationItemHeading
  ) {
    this.setNavItemFields(
      this.findByKey(this.flattenedNavigation, 'id', update.id),
      update
    );
    this.itemChangeSubj.next(update.id); //This is used to get around a change detection problem in the various child components
  }

  /**
   * Broadcast element events
   * @param event: INavItemEvent where id is the id of the component broadcasting and event is the Event
   */
  navEvent(event: INavItemEvent) {
    this.navEventSubj.next(event);
  }

  /**
   * Flatten an object into a simple array
   * @param obj object being flattened
   * @returns flattened array
   */
  private flatten = (obj: any) => {
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

  /**
   *
   * @param items flattened array
   * @param key of the key value pair ('id')
   * @param value id of the piece being searched for (update.id)
   * @returns
   */
  private findByKey = (
    items: Array<INavigationItem>,
    key: string,
    value: string
  ) => {
    let returnItem: INavigationItem = {
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

  /**
   * Replace the contents of one object with those of another. This is done to keep our
   * memory trick going
   * @param obj1 object being updated
   * @param obj2 values to put in obj1
   */
  private setNavItemFields = (obj1: INavigationItem, obj2: INavigationItem) => {
    Object.keys(obj2).forEach((key) => {
      obj1[key] = obj2[key];
    });
  };
}
