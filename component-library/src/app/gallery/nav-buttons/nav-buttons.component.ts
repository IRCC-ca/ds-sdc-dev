import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCategories, LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';


export interface ILibraryNavButtons {
  name: string;
  url: string;
  id?: string;
  category?: keyof typeof ButtonCategories;
  baseUrlOverride?: string;
}

export interface INavButtonComponentConfig {
  id: string;
  buttons: ILibraryNavButtons[];
  globalBaseUrlOverride?: string;
  baseUrlKey: string;
}

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent implements OnInit {

  @Input() config?: INavButtonComponentConfig;

  currentBaseUrl = '';

  constructor(private router: Router,
    private translate: TranslateService,
    private languageSwitchButton: LanguageSwitchButtonService) { }

  ngOnInit() {
    this.setBaseUrl(); //set initial base url
    this.createButtonIds();

    //Detect language changes to set base url to new language
    this.languageSwitchButton.languageClickObs$.subscribe(response => {
      if (response) {
        this.setBaseUrl();
        this.buttonUrlOverrides();
      }
    });


  }

  /**
   * Use HREF to get the URL. This is used as router.url does not update on language change.
   * @returns the current working url as a string
   */
  getURL() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? '/en/' : '/fr/');
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
      } else if (j === this.translate.instant(this.config?.baseUrlKey || '')) {
        this.currentBaseUrl += ('/' + j);
      }
    });
    if (this.currentBaseUrl[this.currentBaseUrl.length] !== '/') this.currentBaseUrl += '/';
  }

  /**
   * Used to set the button url overrides
   */
  buttonUrlOverrides() {
    if (this.config?.globalBaseUrlOverride) {
      this.config.globalBaseUrlOverride = this.translate.instant(this.config.globalBaseUrlOverride);
    }

    this.config?.buttons.forEach(button => {
      if (button.baseUrlOverride) {
        button.baseUrlOverride = (this.translate.instant(button.baseUrlOverride));
      }
    });
  }

  createButtonIds() {
    this.config?.buttons.forEach(button => {
      button.id = button.name.replace(/\s/g, "");
    });
  }

}
