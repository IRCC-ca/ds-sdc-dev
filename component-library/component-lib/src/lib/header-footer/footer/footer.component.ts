import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GOV_CANADA_LOGOS } from '../header-footer-const.component';
import { ThemeSwitchService } from '../theme-switch/theme-switch.service';

export const GOV_LOGO_ALT_TEXT_EN = 'Canada wordmark';
export const GOV_LOGO_ALT_TEXT_FR = 'FR Canada wordmark';

@Component({
  selector: 'ircc-cl-lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() id = '';
  altImage = '';
  footerLightLogo = GOV_CANADA_LOGOS.footerLightLogo
  footerDarkLogo = GOV_CANADA_LOGOS.footerDarkLogo
  logo: string = this.footerLightLogo;

  constructor(private translate: TranslateService, private themeService: ThemeSwitchService) { }

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.updateFooterImage();
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });

    this.themeService.themeChanged.subscribe((darkModeEnabled: boolean) => {
      this.updateFooterImage();
    });
  }

  updateFooterImage() {
      this.logo = this.themeService.darkModeEnabled
        ? this.footerDarkLogo
        : this.footerLightLogo;
    
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.altImage = GOV_LOGO_ALT_TEXT_EN;
    } else {
      this.altImage = GOV_LOGO_ALT_TEXT_FR;
    }
  }
}
