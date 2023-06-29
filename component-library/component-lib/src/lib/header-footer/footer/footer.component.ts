import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GOV_CANADA_LOGOS } from '../header-footer-const.component';
import { ThemeSwitchService } from '../theme-switch/theme-switch.service';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription;

  constructor(private translate: TranslateService, private themeService: ThemeSwitchService) {
    this.subscription = this.themeService.isDarkMode$.subscribe((response) => {
      this.updateFooterImage(response)
    });  
   }

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
      // this.updateFooterImage();
    });
  }

  updateFooterImage(res: boolean) {
      this.logo = res
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
