import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { I18nService } from '@app/i18n';
import enUS from '../../src/translations/en-US.json';
import frFR from '../../src/translations/fr-FR.json';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {
    translateService.setTranslation('en', enUS);
    translateService.setTranslation('fr', frFR);
    /**
     * Subscribe to router events because the init cycle for this component happens
     * before the router functionality
     */
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.translateService.use(
          this.router.url.includes('/fr') ? 'fr' : 'en'
        );
        //Sets the html language attribute to current language
        document.documentElement.lang =
          this.translateService.currentLang.substring(0, 2);
      }
    });
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    // this.router.events.subscribe(event => {
    //   console.log(this.router.url)
    //   console.log(event);
    // });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
