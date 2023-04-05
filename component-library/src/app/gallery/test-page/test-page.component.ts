import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownConfig, IFlyoutConfig, IFlyoutOptionConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {

  swap() {
    console.log('here');
    let cont = document.querySelector('.icon-container') as HTMLElement;
    cont.innerHTML = `<span class="fa-regular fa-check"></span>`
  }

  testFlyoutConfig : IFlyoutConfig = {
    id: '',
    options : [
      {
        value: 'test'
      },
      {
        value: 'anotha test'
      },
      {
        value: 'yet anotha test3'
      },
      {
        value: 'yet anotha test2'
      },
      {
        value: 'yet anotha test1'
      },
      {
        value: 'yet anotha test5'
      },
      {
        value: 'yet anotha test4'
      }
      ]
  };

  dropdownConfig : IDropdownConfig = {
    id: 'dropdown_1',
    category: 'secondary',
    flyout: {
      id: '',
      options : [
      {
        value: 'test'
      },
      {
        value: 'anotha test'
      },
      {
        value: 'yet anotha test3'
      },
      {
        value: 'yet anotha test2'
      },
      {
        value: 'yet anotha test1'
      },
      {
        value: 'yet anotha test5'
      },
      {
        value: 'yet anotha test4'
      }
      ]
    }
  }

  constructor(private altLang: LanguageSwitchService) {}

  ngOnInit() {
  }
}
