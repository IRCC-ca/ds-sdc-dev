import { Component, OnInit } from '@angular/core';
import { IIconButtonComponentConfig, IProgressIndicatorConfig } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';


@Component({
  selector: 'app-accessibility-demo-previous-page',
  templateUrl: './accessibility-demo-previous-page.component.html',
  styleUrls: ['./accessibility-demo-previous-page.component.scss']
})
export class AccessibilityDemoPreviousPageComponent implements OnInit {
  routerSub?: Subscription;
  progressIndicatorSub?: Subscription;
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: '',
  }

  hamburgerDialogXButtonConfig: IIconButtonComponentConfig = {
    id: 'hamburger_dialog_x_button',
    category: 'custom',
    size: 'large',
    icon: {
      class: 'fa-regular fa-x',
      color: 'var(--text-primary)'
    }
  };
  
  altPathKey = '';
  altLangURL = '';

  innerWidth = 0;
  hamburgerMenuState: boolean | undefined = undefined;
  allowedNavItemIds: string[] = ['progress_indicator_step_0', 'progress_indicator_step_1', 'hamburger_dialog_x_button'];

  constructor(private translate: TranslateService,
              private altLang: LanguageSwitchService,
  ) { }

  ngOnInit() {
    this.altLang.setAltLangLink('AccessibilityDemoPrevious-alt');
  }


  get getNextButtonLink() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    return ('/' + langKey + '/' + this.translate.instant('ROUTES.AccessibilityDemo'));
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.progressIndicatorSub?.unsubscribe();
  }
}
