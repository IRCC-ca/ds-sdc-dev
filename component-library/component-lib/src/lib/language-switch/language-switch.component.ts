import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitchButtonService } from './language-switch-button.service';

export const LANGUAGE_SWITCH_TEXT_ENGLISH = 'Français';
export const LANGUAGE_SWITCH_TEXT_ENGLISH_MOBILE = 'FR';
export const LANGUAGE_SWITCH_ARIA_ENGLISH = 'Changer la langue à français'

export const LANGUAGE_SWITCH_TEXT_FRENCH = 'English';
export const LANGUAGE_SWITCH_TEXT_FRENCH_MOBILE = 'EN';
export const LANGUAGE_SWITCH_ARIA_FRENCH = 'Switch language to English'


@Component({
  selector: 'lib-language-switch',
  templateUrl: './language-switch.component.html',
})
export class LanguageSwitchComponent implements OnInit {

  @Input() id = '';

  isMobile = false;

  text = '';
  aria = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private langToggle: LanguageSwitchButtonService,
    private translate: TranslateService) { }

  /** Listens for screen resizes and sets mobile boolean */
  @HostListener('window:resize', ['$event'])
  handleResize(e: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 893;
    }
  }

  ngOnInit() {
    let lang = this.translate.currentLang;
    this.setText(lang);
    this.translate.onLangChange.subscribe(newLang => {
      console.log(newLang.lang, 'switch');
      this.setText(newLang.lang);      
    });
  }

  switch() {
    this.langToggle.languageToggleClick();
  }

  setText(lang: string) {
    if ((lang === 'en') || (lang === 'en-US')) {
      this.isMobile ? (this.text = LANGUAGE_SWITCH_TEXT_ENGLISH_MOBILE) : (this.text = LANGUAGE_SWITCH_TEXT_ENGLISH);
      this.aria = LANGUAGE_SWITCH_ARIA_ENGLISH;
    } else {
      this.isMobile ? (this.text = LANGUAGE_SWITCH_TEXT_FRENCH_MOBILE) : (this.text = LANGUAGE_SWITCH_TEXT_FRENCH);
      this.aria = LANGUAGE_SWITCH_ARIA_FRENCH;
    }
  }
}
