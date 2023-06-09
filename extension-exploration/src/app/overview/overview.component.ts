import { Component, OnInit } from '@angular/core';

import { IButtonConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  currentLanguage: string = '';
  altLangLink = 'overview'; // ROUTE translation path

  buttonConfig: IButtonConfig = {
    id: 'asd',
    category: 'primary',
    size: 'small',
  };

  constructor() {}

  ngOnInit() {}
}

// id: string;
//     category?: keyof typeof ButtonCategories;
//     size?: keyof typeof ButtonSize;
//     color?: keyof typeof ButtonColor;
//     ariaLabel?: string;
//     disabled?: boolean;
//     icon?: string;
//     iconDirection?: keyof typeof ButtonIconDirection;
//     tabIndex?: number;
