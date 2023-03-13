import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ButtonCategories, LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { ILibraryNavButtons, INavButtonComponentConfig } from '../nav-buttons/nav-buttons.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  currentBaseUrl = '';
  baseUrlKey = 'ROUTES.LandingPage';
  language = '';

  constructor(private altLang: LanguageSwitchService,
    private translate: TranslateService,
    private languageSwitchButton: LanguageSwitchButtonService) { }

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
    this.setBaseUrl(); //set initial base url
    this.getLanguage();

    this.languageSwitchButton.languageClickObs$.subscribe(response => {
      if (response) {
    this.getLanguage();
      }
    });

    console.log(this.currentBaseUrl);
  }

  getLanguage() {
    const curLang = this.translate.currentLang;
    this.language = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
  }

  /**
   * Use HREF to get the URL. This is used as router.url does not update on language change.
   * @returns the current working url as a string
   */
  getURL() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    const i = window.location.href.slice(window.location.href.indexOf(langKey), window.location.href.length);
    return i;
  }

  /**
   * Set the current base url. TODO: Consider moving this into a service for easy re-use elsewhere. 
   */
  setBaseUrl() {
    this.currentBaseUrl = '';
    let i = this.getURL().split('/');
    i.forEach((j: string, index: number) => {
      if (index !== (i.length - 1)) {
        this.currentBaseUrl += ('/' + j);
      } else if (j === this.translate.instant(this.baseUrlKey || '')) {
        this.currentBaseUrl += ('/' + j);
      }
    });
    if (this.currentBaseUrl[this.currentBaseUrl.length] !== '/') this.currentBaseUrl += '/';
  }
}