import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { Location } from '@angular/common';
import { LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
/** String for storing the URL of the page with the alternative language set */
altLangURL:string =  "";
altPathKey:string = "";

/** Boolean for whether the current window size is mobile or not */
isMobile = false;

  constructor(
    private translate: TranslateService,
    private altLang: LanguageSwitchService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private location: Location,
    private languageSwitchButton: LanguageSwitchButtonService
  ) {}
  
  /** Sets the alt language string and subscribes to language changes that occur if the link is clicked */
  ngOnInit() {
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });
  
    this.languageSwitchButton.languageClickObs$.subscribe(response => {
      console.log(response);
      if (response) this.changeLang(); //Has to ignore the first response. 
    });
  }
  
  /** Toggles language without reloading component */
  changeLang() {
    // // Swaps language
    // let lang = ''
    // switch (this.translate.currentLang) {
    //   case 'en':
    //     lang = 'en-US';
    //     break;
    //   case 'fr': 
    //     lang = 'fr-FR';
    //     break;
    //   default:
    //     lang = this.translate.currentLang;
    // }
    // let test = ''
    // const curLang = lang;
    // console.log(curLang);
    const curLang = this.translate.currentLang;
    this.translate.use(curLang === 'en-US' ? 'fr-FR' : 'en-US');
    // Changes the html lang attribute
    document.documentElement.lang = (curLang === 'en-US' ? 'fr' : 'en'); 
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();
  }
  
  //Alt-language url key must be in the corresponding language, but have the french work
  setAltLangURL() {
    this.altLangURL = this.translate.currentLang === "en-US" ? 'fr' : 'en';
    if (this.altPathKey) this.altLangURL += '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }
  
  /** Required to implement OnDestroy, which triggers the UnitDestroyed function */
  ngOnDestroy() { }
  

}
