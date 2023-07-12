import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {
  ButtonCategories,
  LanguageHeaderFooterSwitchService
} from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(
    private router: Router,
    private translate: TranslateService,
    private languageSwitchButton: LanguageHeaderFooterSwitchService
  ) {}

  ngOnInit() {
    this.setBaseUrl(); //set initial base url
    this.createButtonIds();

    //Detect language changes to set base url to new language
    this.languageSwitchButton.languageClickObs$.subscribe((response: any) => {
      if (response) {
        this.setBaseUrl();
        this.buttonUrlOverrides();
      }
    });

    //subscribes to route changes or page reload and updates active button
    this.setActiveButtonByUrl();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveButtonByUrl();
      });
  }

  /**
   * Use HREF to get the URL. This is used as router.url does not update on language change.
   * @returns the current working url as a string
   */
  getURL() {
    const curLang = this.translate.currentLang;
    const langKey = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
    const i = window.location.href.slice(
      window.location.href.indexOf(langKey),
      window.location.href.length
    );
    return i;
  }

  /**
   * Set the current base url. TODO: Consider moving this into a service for easy re-use elsewhere.
   */
  setBaseUrl() {
    this.currentBaseUrl = '';
    const i = this.getURL().split('/');
    i.forEach((j: string, index: number) => {
      if (index !== i.length - 1) {
        this.currentBaseUrl += '/' + j;
      } else if (j === this.translate.instant(this.config?.baseUrlKey || '')) {
        this.currentBaseUrl += '/' + j;
      }
    });
    if (this.currentBaseUrl[this.currentBaseUrl.length] !== '/')
      this.currentBaseUrl += '/';
  }

  /**
   * Used to set the button url overrides
   */
  buttonUrlOverrides() {
    if (this.config?.globalBaseUrlOverride) {
      this.config.globalBaseUrlOverride = this.translate.instant(
        this.config.globalBaseUrlOverride
      );
    }

    this.config?.buttons.forEach((button) => {
      if (button.baseUrlOverride) {
        button.baseUrlOverride = this.translate.instant(button.baseUrlOverride);
      }
    });
  }

  createButtonIds() {
    this.config?.buttons.forEach((button) => {
      button.id = button.name.replace(/\s/g, '');
    });
  }

  setActiveButtonByUrl() {
    const lastUrlSegment = this.router.url.split('?')[0].split('/').pop();
    this.config?.buttons.forEach((button) => {
      if (this.translate.instant('ROUTES.' + button.url) === lastUrlSegment) {
        button.category = 'primary';
      } else {
        button.category = 'secondary';
      }
    });
  }
}
