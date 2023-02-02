import { Component, Input, OnInit } from '@angular/core';
import { ButtonCategories } from 'ircc-ds-angular-component-library';

export interface ILibraryNavButtons {
  name: string;
  url: string;
  id?: string;
  category?: keyof typeof ButtonCategories;
}

export interface INavButtonComponentConfig {
  id: string;
  buttons: ILibraryNavButtons[];
}

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent implements OnInit {

  @Input() config?: INavButtonComponentConfig;

  constructor() { }

  ngOnInit() {
    this.createButtonIds();
  }

  createButtonIds() {
    this.config?.buttons.forEach(button => {
      button.id = button.name.replace(/\s/g, "");
    });
  }

}
