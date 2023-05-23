import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const ENGLISH_BANNER_URL =
  'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg';
export const FRENCH_BANNER_URL =
  'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg';
export const HEADER_IMG_LINK_EN = 'https://www.canada.ca/en.html';
export const HEADER_IMG_LINK_FR = 'https://www.canada.ca/fr.html';
export const HEADER_LINK_ATL_EN = 'Government of Canada logo';
export const HEADER_LINK_ALT_FR = 'Gouvernement du Canada logo';
export const CANADA_LOGO_ARIA_LABEL_ENGLISH =
  'Symbol of the Government of Canada';
export const CANADA_LOGO_ARIA_LABEL_FRENCH =
  'Symbole du gouvernement du Canada';

@Component({
  selector: 'ircc-cl-lib-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /**
   * This is the ID of the header component. Will be applied as the ID of the header Element within the custom element.
   *
   * All IDs must be unique and can be used to specifically target an element within your project.
   */
  @Input() id = '';
  imageURL = '';
  alt = '';
  govCanadaLink = '';
  govCanadaAlt = '';

  constructor(private translate: TranslateService) {}

  /**
  * ngOnInit() lifecycle method run immediately when the component is initialized. c
  *
  * For Header Component the ngOnInit() checks for current url Language and subscribes to changes. Appropriate translations
  * will be pulled as a result and content will be displayed in the users selected language.
  */
  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  /**
  * setLang(lang: string) if a function which accepts a string value.
  * This value currently needs to be 'en' or 'en-US' to trigger English translations otherwise
  * french translations will be triggered.
  */
  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.imageURL = ENGLISH_BANNER_URL;
      this.alt = CANADA_LOGO_ARIA_LABEL_ENGLISH;
      this.govCanadaLink = HEADER_IMG_LINK_EN;
      this.govCanadaAlt = HEADER_LINK_ATL_EN;
    } else {
      this.imageURL = FRENCH_BANNER_URL;
      this.alt = CANADA_LOGO_ARIA_LABEL_FRENCH;
      this.govCanadaLink = HEADER_IMG_LINK_FR;
      this.govCanadaAlt = HEADER_LINK_ALT_FR;
    }
  }
}
