import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const ENGLISH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg';
export const FRENCH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg';

export const CANADA_LOGO_ARIA_LABEL_ENGLISH = 'Government of Canada';
export const CANADA_LOGO_ARIA_LABEL_FRENCH = 'Gouvernement du Canada';

@Component({
    selector: 'lib-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() id = '';

    imageURL = '';
    aria = '';

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
        this.setLang(this.translate.currentLang);
        this.translate.onLangChange.subscribe(change => {
            this.setLang(change.lang);
        });
    }

    setLang(lang: string) {
        if((lang === 'en') || (lang === 'en-US')) {
            this.imageURL = ENGLISH_BANNER_URL;
            this.aria = CANADA_LOGO_ARIA_LABEL_ENGLISH;

        } else {
            this.imageURL = FRENCH_BANNER_URL;
            this.aria = CANADA_LOGO_ARIA_LABEL_FRENCH;
        }
    }
}
