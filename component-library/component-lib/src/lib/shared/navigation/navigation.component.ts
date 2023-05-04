import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DSSizes } from '../../../shared/constants/jl-components.constants';

export interface INavigationHeaderConfig {
  label: string;
  icon: string;
}

export interface INavigationConfig {
  id: string;
  header: INavigationHeaderConfig;
}

@Component({
  selector: 'ircc-cl-lib-navigation',
  templateUrl: './navigation.component.html'
})
export class navigationComponent implements OnInit {
  @Input() config: INavigationConfig = {
    id: '',
    header: { label: '', icon: '' }
  };

  @Input() id: string = '';
  @Input() header?: INavigationHeaderConfig = {
    label: '',
    icon: ''
  };

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    // this.header.label !== ''
    //   ? (this.config.header.label = this.header.label)
    //   : undefined;

    // this.header.icon !== ''
    //   ? (this.config.header.icon = this.header.icon)
    //   : undefined;
  }
}
