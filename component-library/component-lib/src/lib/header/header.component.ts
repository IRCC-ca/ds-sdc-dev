import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const ENGLISH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg';
export const FRENCH_BANNER_URL = 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg';

@Component({
    selector: 'lib-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() id = '';

    imageURL = '';

    constructor(private translate: TranslateService) {
     }

    ngOnInit() {
        this.setLang(this.translate.currentLang);
        this.translate.onLangChange.subscribe(change => {
        this.setLang(change.lang);
        });
    }

    setLang(lang: string) {
        lang === 'en-US' ? (this.imageURL = ENGLISH_BANNER_URL)
            : (this.imageURL = FRENCH_BANNER_URL);
    }
}
