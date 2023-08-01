import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GOV_CANADA_LOGOS } from '../header-footer-const.component';

import { Subscription } from 'rxjs';
import { LanguageHeaderFooterSwitchService } from '../language-switch/language-header-footer-switch.service';

export const GOV_LOGO_ALT_TEXT_EN = 'Canada wordmark';
export const GOV_LOGO_ALT_TEXT_FR = 'FR Canada wordmark';

@Component({
  selector: 'ircc-cl-lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() id = '';
  altImage = '';
  logo: string = encodeURIComponent(GOV_CANADA_LOGOS.footerLightLogo);
  isDarkMode: boolean = false;
  private subscription: Subscription;

  constructor(private translate: TranslateService, private languageHeaderFooterSwitch: LanguageHeaderFooterSwitchService) {
    this.subscription = this.languageHeaderFooterSwitch.isDarkMode$.subscribe((response) => {
      this.updateFooterImage(response)
      this.isDarkMode = response
    });
  }

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
      this.updateFooterImage(this.isDarkMode);
    });
  }

  updateFooterImage(res: boolean) {
    this.logo = res
      ? encodeURIComponent(GOV_CANADA_LOGOS.footerDarkLogo)
      : encodeURIComponent(GOV_CANADA_LOGOS.footerLightLogo);
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.altImage = GOV_LOGO_ALT_TEXT_EN;
    } else {
      this.altImage = GOV_LOGO_ALT_TEXT_FR;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
