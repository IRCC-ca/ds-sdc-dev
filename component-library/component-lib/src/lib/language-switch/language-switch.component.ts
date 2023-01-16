import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { LanguageSwitchButtonService } from './language-switch-button.service';

@Component({
  selector: 'lib-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent {

  @Input() id = '';

  isMobile = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private langToggle: LanguageSwitchButtonService) { }

    /** Listens for screen resizes and sets mobile boolean */
    @HostListener('window:resize', ['$event'])
    handleResize(e: any) {
      if (isPlatformBrowser(this.platformId)) {
        this.isMobile = window.innerWidth <= 893;
      }
    }

    switch() {
      this.langToggle.languageToggleClick();
    } 
}
