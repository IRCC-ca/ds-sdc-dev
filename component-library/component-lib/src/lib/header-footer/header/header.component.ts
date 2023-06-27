import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GOV_CANADA_LOGOS } from '../header-footer-const.component'
import { ThemeSwitchService } from '../theme-switch/theme-switch.service';

export const HEADER_IMG_LINK_EN = 'https://www.canada.ca/en.html';
export const HEADER_IMG_LINK_FR = 'https://www.canada.ca/fr.html';
export const CANADA_LOGO_ARIA_LABEL_ENGLISH =
  'Symbol of the Government of Canada';
export const CANADA_LOGO_ARIA_LABEL_FRENCH =
  'Symbole du gouvernement du Canada';

@Component({
  selector: 'ircc-cl-lib-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  /**
   * This is the ID of the header component. Will be applied as the ID of the header Element within the custom element.
   *
   * All IDs must be unique and can be used to specifically target an element within your project.
   */
  @Input() id = '';
  @Input() themeToggle?= false;
  alt = '';
  govCanadaLink = '';
  headerLightLogo = GOV_CANADA_LOGOS.headerLightLogo
  headerLightLogoFrench = GOV_CANADA_LOGOS.headerLightLogoFrench
  headerDarkLogo = GOV_CANADA_LOGOS.headerDarkLogo
  headerDarkLogoFrench = GOV_CANADA_LOGOS.headerDarkLogoFrench

  logo: string = this.headerLightLogo;

  constructor(private translate: TranslateService,
    private themeService: ThemeSwitchService) { }

  /**
  * ngOnInit() lifecycle method run immediately when the component is initialized. c
  *
  * For Header Component the ngOnInit() checks for current url Language and subscribes to changes. Appropriate translations
  * will be pulled as a result and content will be displayed in the users selected language.
  */
  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.updateHeaderImage();
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
      this.updateHeaderImage();
    });

    this.themeService.themeChanged.subscribe((darkModeEnabled: boolean) => {
      this.updateHeaderImage();
    });
  }

  updateHeaderImage() {
    let locale = this.translate.currentLang
    if (locale === 'en' || locale === 'en-US') {
      this.logo = this.themeService.darkModeEnabled
        ? this.headerDarkLogo
        : this.headerLightLogo;
    } else {
      this.logo = this.themeService.darkModeEnabled
      ? this.headerDarkLogoFrench
      : this.headerLightLogoFrench;
    }
  }

  /**
  * setLang(lang: string) if a function which accepts a string value.
  * This value currently needs to be 'en' or 'en-US' to trigger English translations otherwise
  * french translations will be triggered.
  */
  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.alt = CANADA_LOGO_ARIA_LABEL_ENGLISH;
      this.govCanadaLink = HEADER_IMG_LINK_EN;
    } else {
      this.alt = CANADA_LOGO_ARIA_LABEL_FRENCH;
      this.govCanadaLink = HEADER_IMG_LINK_FR;
    }
  }
}
