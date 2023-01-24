import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const ENGLISH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg';
export const FRENCH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg';

@Component({
    selector: 'lib-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() id = '';

    imageURL = '';

    constructor(private translate: TranslateService) {
    }

    ngOnInit() {
        this.setLang(this.translate.currentLang);
        this.translate.onLangChange.subscribe(change => {
            console.log(change, 'headeru');
            this.setLang(change.lang);
        });
        console.log(this.translate.currentLang);
    }

    setLang(lang: string) {
        (lang === 'en') || (lang === 'en-US') ? (this.imageURL = ENGLISH_BANNER_URL)
            : (this.imageURL = FRENCH_BANNER_URL);
    }
}
