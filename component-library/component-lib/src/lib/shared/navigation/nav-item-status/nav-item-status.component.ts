import { EventEmitter, Input, Output } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';
import { NavigationStatus } from '../navigation.types';

@Component({
  selector: 'ircc-cl-lib-nav-item-status',
  templateUrl: './nav-item-status.component.html'
})
export class navItemStatusComponent implements OnInit {

  @Input() status : keyof typeof NavigationStatus = 'notStarted';

  ngOnInit() {

  }
}
