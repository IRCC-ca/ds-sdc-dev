import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IBannerConfig } from 'ircc-ds-angular-component-library';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  // config1 : IBannerConfig = {
  //   id: 'banner_1',
  //   title: 'The title',
  //   content: 'This is the content of the..',
  //   type: 'critical',
  //   rounded: true,
  //   dismissible: true,
  //   cta: [
  //     {
  //       text: 'This button',
  //       category: 'primary',
  //       color: 'critical',
  //       icon: 'fa-regular fa-mustache'
  //     },
  //     {
  //       text: 'This button',
  //       category: 'secondary',
  //       color: 'critical'
  //     },
  //     {
  //       text: 'This button',
  //       category: 'plain',
  //       color: 'critical'
  //     }
  //   ]
  // }

  config2 : IBannerConfig = {
    id: 'banner_2',
    content: 'Content numero dos Content numero dos Content numero dos Content numero dos Content numero dos Content numero dos Content numero dos Content numero dos Content',
    type: 'info',
    rounded: true,
    dismissible: true
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
  }


}
