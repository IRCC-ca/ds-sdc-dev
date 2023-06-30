import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const GOV_LOGO_FOOTER =
  'https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg';


export const GOV_LOGO_ALT_TEXT_EN = 'Canada wordmark';
export const GOV_LOGO_ALT_TEXT_FR = 'FR Canada wordmark';

@Component({
  selector: 'ircc-cl-lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() id = '';

  imageURL = '';
  altImage = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
      this.imageURL = GOV_LOGO_FOOTER;
      this.altImage = GOV_LOGO_ALT_TEXT_EN;
    } else {
      this.imageURL = GOV_LOGO_FOOTER;
      this.altImage = GOV_LOGO_ALT_TEXT_FR;
    }
  }
}
