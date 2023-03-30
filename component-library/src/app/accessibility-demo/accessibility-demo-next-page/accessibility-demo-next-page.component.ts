import { Component, OnInit } from '@angular/core';
import { IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-accessibility-demo-next-page',
  templateUrl: './accessibility-demo-next-page.component.html',
  styleUrls: ['./accessibility-demo-next-page.component.scss']
})
export class AccessibilityDemoNextPageComponent implements OnInit {
  routerSub?: Subscription;
  progressIndicatorSub?: Subscription;
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: '',
  }
  altPathKey = '';
  altLangURL = ''

  constructor(private translate: TranslateService,
              private altLang: LanguageSwitchService,) { }

  ngOnInit() {
    this.altLang.setAltLangLink('AccessibilityDemoNext-alt');
  }

  /**
   * Getter for the previous page button
   */
  get getPreviousButtonLink() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    return ('/' + langKey + '/' + this.translate.instant('ROUTES.AccessibilityDemo') + '/' + this.translate.instant('ROUTES.AccessibilityDemoPrevious'));
  }
}