import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ITabNavConfig } from 'dist/ircc-ds-angular-component-library/lib/tabs/tabs.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  form = new FormGroup({});

  tabsConfig: ITabNavConfig = {
    id: 'testTabs',
    formGroup: this.form,
    tab: [
      // { 'Home': 'Home' },
      // { 'Profile': 'Profile' },
      { id: 'home', title: 'Home', value: 'This is Home' },
      { id: 'profile', title: 'Profile', value: 'This is Profile' },
      { id: 'contact', title: 'Contact', value: 'This is Contact' },
      { id: 'products', title: 'Products', value: 'This is Products' },
      { id: 'login', title: 'Login', value: 'This is Login' },
    ]
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.form.addControl(this.tabsConfig.id, new FormControl());
  }


}
