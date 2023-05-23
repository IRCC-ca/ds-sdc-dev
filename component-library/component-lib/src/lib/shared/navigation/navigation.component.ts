import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { NavigationItem, INavigationConfig } from './navigation.types';
import { Subscription } from 'rxjs';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'ircc-cl-lib-navigation',
  templateUrl: './navigation.component.html'
})
export class navigationComponent implements OnInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconLeading: string = '';
  @Input() iconTrailing: string = '';
  @Input() size: keyof typeof DSSizes | undefined;
  //TODO: NavigationItem and all other interfaces must be renamed starting with 'I'
  @Input() navigationConfig: Array<NavigationItem> = [];

  flattenNavigation: Array<NavigationItem> = [];
  config: INavigationConfig = {
    id: '',
    label: '',
    iconLeading: '',
    iconTrailing: '',
    size: 'small',
    navigationConfig: []
  };
  configSub?: Subscription;

  constructor (private navService: NavigationService) { }

  ngOnInit() {
    this.configSub = this.navService.navConfigObs$.subscribe(response => {
      this.config = response;
    });
  }

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

//These are in THIS component, not in it's own. I.e. the buttons in the actual
//header are not in a child component.
  clickIconLeading = (event: any) => {
    this.navService.navEvent({id: this.config.id, event: event});
  };
  clickIconTrailing = (event: any) => {
    this.navService.navEvent({id: this.config.id, event: event});
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
