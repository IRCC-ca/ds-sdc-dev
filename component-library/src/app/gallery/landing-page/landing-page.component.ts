import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ButtonCategories } from 'ircc-ds-angular-component-library';
import { ILibraryNavButtons, INavButtonComponentConfig } from '../nav-buttons/nav-buttons.component';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

   navConfig: INavButtonComponentConfig = {
    id: 'landingPage_buttons',
    baseUrlKey: 'ROUTES.LandingPage',
    buttons: [
    {
      name: 'BUTTONS.FormInputs',
      url: 'FormComponents'
    },
    {
      name: 'BUTTONS.HeaderFooter',
      url: 'HeaderFooter'
    },
    {
      name: 'BUTTONS.Miscellaneous',
      url: 'Miscellaneous'
    },
    {
      name: 'BUTTONS.DevTestPage',
      url: 'DevTest'
    },
    {
      name: 'BUTTONS.QATesting',
      url: 'QATesting'
    }
  ]
};

  ngOnInit() {
    this.altLang.setAltLangLink('LandingPage-alt');   
  }
}