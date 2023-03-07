import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ISearchInputConfig {
  placeholderText?: string;
  customIcon?: string;
  searchButton?: ISearchInputButtonConfig;
}

export interface ISearchInputButtonConfig {
  text?: string;
  colour?: string;
}

@Component({
  selector: 'lib-search-input',
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements OnInit {
  @Input() config?: ISearchInputConfig;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter()


  searchInputControl = new FormControl;
  constructor() { }

  ngOnInit(): void {
    console.log('testing');
  }

}
