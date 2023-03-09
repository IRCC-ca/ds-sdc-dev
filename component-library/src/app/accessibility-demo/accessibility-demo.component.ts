import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBannerConfig, ICheckBoxComponentConfig, IDatePickerConfig, IInputComponentConfig, IProgressIndicatorConfig, IRadioInputComponentConfig, ISelectConfig, ISelectOptionsConfig, LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { NavigationEnd, Router } from '@angular/router';
import { requiredTrueValidator } from '@app/@shared/shared-functions/shared-validators';
import { AccessbilityDemoFormStateService } from './accessbility-demo-form-state.service';
import { Subscription } from 'rxjs';



export interface ICityOfBirth {
  lov: string;
  val: string;
};

export const CITIES_OF_BIRTH_LOVS_CANADA: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.OTTAWA', val: 'Ottawa' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.ST_JOHNS', val: "St. John's" },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.VICTORIA', val: 'Victoria' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.CALGARY', val: 'Calgary' }
];
export const CITIES_OF_BIRTH_LOVS_MEXICO: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.MEXICO.MEXICO', val: 'Mexico City' }
];
export const CITIES_OF_BIRTH_LOVS_USA: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.TAMPA', val: 'Tampa Bay' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.WASHINGTON', val: 'Washington' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.NEW_YORK', val: 'New York' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.OAKLAND', val: 'Oakland' }
];
export const CITIES_OF_BIRTH_LOVS_ALL: ICityOfBirth[] = [...CITIES_OF_BIRTH_LOVS_CANADA, ...CITIES_OF_BIRTH_LOVS_MEXICO, ...CITIES_OF_BIRTH_LOVS_USA];

@Component({
  selector: 'app-accessibility-demo',
  templateUrl: './accessibility-demo.component.html',
  styleUrls: ['./accessibility-demo.component.scss']
})
export class AccessibilityDemoComponent implements OnInit {
  altPathKey = '';
  altLangURL = ''
  form = new FormGroup({});
  nextClicked = false;
  showErrorBanner = false;

  routerSub?: Subscription;

  progressIndicatorSub?: Subscription;
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: '',
  }

  errorBannerConfig: IBannerConfig = {
    id: 'error_banner',
    type: 'critical',
    title: 'ACC_DEMO.PERSONAL_INFO.ERROR_BANNER.TITLE',
    content: 'ACC_DEMO.PERSONAL_INFO.ERROR_BANNER.CONTENT',
    rounded: true
  }

  familyNameInputConfig: IInputComponentConfig = {
    id: 'family_name_input',
    formGroup: this.form,
    required: true,
    label: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.LABEL',
    desc: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.DESC',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.FAMILY_NAME_REQUIRED'
      }
    ]
  };

  familyNameInputBannerConfig: IBannerConfig = {
    id: 'family_name_input_info_banner',
    dismissible: true,
    type: 'info',
    content: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.BANNER'
  };

  givenNameInputConfig: IInputComponentConfig = {
    id: 'given_name_input',
    formGroup: this.form,
    label: 'ACC_DEMO.PERSONAL_INFO.GIVEN_NAME_INPUT.LABEL',
    desc: 'ACC_DEMO.PERSONAL_INFO.GIVEN_NAME_INPUT.DESC'
  };

  sexAtBirthRadioConfig: IRadioInputComponentConfig = {
    id: 'sex_at_birth_radio',
    formGroup: this.form,
    required: true,
    label: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.LABEL',
    // labelIconConfig: {
    //   id: 'sex_at_birth_radio_info_button',
    //   category: 'custom',
    //   ariaLabel: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.INFO_BUTTON',
    //   size: 'small',
    //   icon: {
    //     class: 'fa-regular fa-circle-info',
    //     // color: ''
    //   }
    // },
    options: [
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.FEMALE',
        value: 'F'
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.MALE',
        value: 'M'
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.OTHER',
        value: 'X'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED'
      }
    ]
  };

  dateOfBirthDatePickerConfig: IDatePickerConfig = {
    id: 'date_of_birth_date_picker',
    formGroup: this.form,
    label: 'ACC_DEMO.PERSONAL_INFO.DATE_OF_BIRTH.LABEL',
    required: true
  };

  countryOfBirthSelectConfig: ISelectConfig = {
    id: 'contry_of_birth_select',
    formGroup: this.form,
    placeholder: 'SELECT.GENERIC_PLACEHOLDER',
    label: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.LABEL',
    required: true,
    options: [
      {
        text: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.OPTIONS.CANADA',
        value: 'Canada'
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.OPTIONS.USA',
        value: 'USA'
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.OPTIONS.MEXICO',
        value: 'Mexico'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED'
      }
    ]
  };

  cityOfBirthSelectConfig: ISelectConfig = {
    id: 'city_of_birth_select',
    formGroup: this.form,
    label: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.LABEL',
    required: true,
    placeholder: 'SELECT.GENERIC_PLACEHOLDER',
    options: [], //Set in init
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED'
      }
    ]
  };

  declarationCheckboxConfig: ICheckBoxComponentConfig = {
    id: 'declaration_checkbox',
    formGroup: this.form,
    required: true,
    label: 'ACC_DEMO.PERSONAL_INFO.DECLARATION.LABEL',
    inlineLabel: 'ACC_DEMO.PERSONAL_INFO.DECLARATION.INLINE_LABEL',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.DECLARATION_REQUIRED'
      },
      {
        key: 'requiredTrue',
        errorLOV: 'ACC_DEMO.ERRORS.DECLARATION_REQUIRED'
      }
    ]
  }

  constructor(private translate: TranslateService,
    private altLang: LanguageSwitchService,
    private languageSwitchButton: LanguageSwitchButtonService,
    private router: Router,
    private progressIndicator: AccessbilityDemoFormStateService,
  ) { }

  ngOnInit() {
    //if the page has moved to this one via a back or forward browser button, this detects the move and updates the page.
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let tempConfig = this.progressIndicatorConfig;
        tempConfig.selected = 1;
        this.progressIndicator.updateProgressIndicator(tempConfig);
      }
    });

    this.altLang.setAltLangLink('AccessibilityDemo-alt');
    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
      console.log(this.altLangURL);
    });
    this.languageSwitchButton.languageClickObs$.subscribe(response => {
      console.log(response);
      if (response) this.changeLang(); //Has to ignore the first response. 
    });

    this.progressIndicatorSub = this.progressIndicator.progressIndicatorObs$.subscribe(response => {
      this.progressIndicatorConfig = response;
    });

    //Initial pop of cities is all values
    this.setCities(CITIES_OF_BIRTH_LOVS_ALL);

    this.form.addControl(this.familyNameInputConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.givenNameInputConfig.id, new FormControl());
    this.form.addControl(this.sexAtBirthRadioConfig.id, new FormControl('', Validators.required));
    this.form.addControl((this.dateOfBirthDatePickerConfig.id + '_dayControl'), new FormControl('', Validators.required));
    this.form.addControl((this.dateOfBirthDatePickerConfig.id + '_monthControl'), new FormControl('', Validators.required));
    this.form.addControl((this.dateOfBirthDatePickerConfig.id + '_yearControl'), new FormControl('', Validators.required));
    this.form.addControl(this.countryOfBirthSelectConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.cityOfBirthSelectConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.declarationCheckboxConfig.id, new FormControl('', [requiredTrueValidator()]));

    //Watch for changes in the country of birth select:
    this.form.get(this.countryOfBirthSelectConfig.id)?.valueChanges.subscribe(change => {
      switch (change.toLowerCase()) {
        case 'canada':
          this.setCities(CITIES_OF_BIRTH_LOVS_CANADA);
          break;
        case 'usa':
          this.setCities(CITIES_OF_BIRTH_LOVS_USA);
          break;
        case 'mexico':
          this.setCities(CITIES_OF_BIRTH_LOVS_MEXICO);
          break;
        default:
          this.setCities(CITIES_OF_BIRTH_LOVS_ALL);
          break;
      }
    });
  }

  /**
   * Used to add a shadow class to the header when it's moved off the very top of the page
   */
  ngAfterViewInit() {
    window.onscroll = function () { navbarScroll() };

    let header = document.getElementById("outer_header_stepper_container");

    function navbarScroll() {
      (document.documentElement?.scrollTop > 0) ? header?.classList.add('shadow') : header?.classList.remove('shadow');
    }
  }

  /**
   * Set the cities option in the cities dropdown
   * @param cityList list of cities to insert into the dropdown
   */
  setCities(cityList: ICityOfBirth[]) {
    // this.cityOfBirthSelectConfig.options = [];
    let temp: ISelectOptionsConfig[] = [];
    cityList.forEach(city => {
      temp.push({ text: city.lov, value: city.val });
    });
    temp = temp.sort((a, b) => {
      return compare(
        this.translate.instant(a.text),
        this.translate.instant(b.text),
        false
      )
    });
    this.cityOfBirthSelectConfig.options = temp;
  }

  /**
   * Once triggered, this tracks if the form is valid and updates the showErrorBanner variable accordingly
   */
  navButton() {
    this.nextClicked = true;
    this.form.markAllAsTouched();
    this.updateProgressIndicator();
    if (!this.form.valid) {
      this.showErrorBanner = true;
      this.form.valueChanges.subscribe(() => {
        this.showErrorBanner = !this.form.valid;
        this.updateProgressIndicator();
        console.log(this.form.valid, this.showErrorBanner);
      });
    } else {
      let tempConfig = this.progressIndicatorConfig;
      if (tempConfig.steps) {
        tempConfig.steps[1].tagConfig.type = 'success';
        tempConfig.steps[2].tagConfig.type = 'primary';
      }
      this.progressIndicator.updateProgressIndicator(tempConfig);
      this.router.navigateByUrl(this.getNextButtonLink);
    } //NOTE: No need to deal with cases not covered above, since those will result in navigation!
  }

  /**
   * Update the progress indicator status (unlock/lock the next element)
   */
  updateProgressIndicator() {
    if (this.progressIndicatorConfig.steps && ((this.progressIndicatorConfig.steps[2].tagConfig.type === 'locked') || (this.progressIndicatorConfig.steps[2].tagConfig.type === 'notStarted'))) {
      let tempConfig = this.progressIndicatorConfig;
      if (tempConfig.steps) {
        if (this.form.valid) {
          tempConfig.steps[2].tagConfig.type = 'notStarted';
          this.progressIndicator.updateProgressIndicator(tempConfig);
        } else {
          tempConfig.steps[2].tagConfig.type = 'locked';
          this.progressIndicator.updateProgressIndicator(tempConfig);
        }
      }
    }
  }

  progressTabButtonEvent(event: Event) {
    const eventInt = parseInt(event.toString());
    if (this.progressIndicatorConfig.selected !== undefined) {
      if (eventInt !== this.progressIndicatorConfig.selected) {
        switch (eventInt) {
          case 0:
            if (this.router.url !== this.getPreviousButtonLink) this.router.navigateByUrl(this.getPreviousButtonLink);
            break;

          case 1:
            console.log(this.router.url, this.getMainPageLink);
            // if (this.router.url !== this.getMainPageLink) this.router.navigateByUrl(this.getMainPageLink);
            break;

          case 2:
            if (this.router.url !== this.getNextButtonLink) this.router.navigateByUrl(this.getNextButtonLink);
            break;
        }
      }
    }
  }


  /**
   * Getter for the previous page button
   */
  get getPreviousButtonLink() {
    return (this.router.url + '/' + this.translate.instant('ROUTES.AccessibilityDemoPrevious'));
  }

  get getNextButtonLink() {
    return (this.router.url + '/' + this.translate.instant('ROUTES.AccessibilityDemoNext'));
  }

  /**
   * Getter for the main page link
   */
  get getMainPageLink() {
    const curLang = this.translate.currentLang;
    this.translate.use((curLang === 'en-US') || (curLang === 'en') ? 'en-US' : 'fr-FR');
    const lang = ((curLang === 'en-US') || (curLang === 'en') ? 'en' : 'fr');
    return ('/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo'));
  }


  // scrollTo(element: string) {
  //   scrollToElementByID(element, true, true);
  // }

  /*************** LANGUAGE FUNCTIONS ********************/


  /** Toggles language without reloading component */
  //This currently uses both 'en' and 'en-US' language values, sine in some cases, en is provided in initial load
  changeLang() {
    const curLang = this.translate.currentLang;
    this.translate.use((curLang === 'en-US') || (curLang === 'en') ? 'fr-FR' : 'en-US');
    // Changes the html lang attribute
    // console.log((curLang === "en-US") || (curLang === 'en') ? 'fr' : 'en');
    document.documentElement.lang = ((curLang === "en-US") || (curLang === 'en') ? 'fr' : 'en');
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();
    console.log(this.altLangURL, this.altPathKey);
  }

  //Alt-language url key must be in the corresponding language, but have the french work
  setAltLangURL() {
    console.log(this.translate.currentLang);
    this.altLangURL = ((this.translate.currentLang === "en-US") || (this.translate.currentLang === 'en') ? 'fr' : 'en');
    this.getAltLanguageValues();

    if (this.altPathKey) this.altLangURL += '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /**
* Generates an alt-language path based on the current url and the translate values. Currently not the best
* code in the world and should likely be refactored.
*/
  getAltLanguageValues() {
    const urlParts = this.router.url.split('/');
    const translateIndex = Object.keys(this.translate.translations).indexOf(urlParts[1]);
    const translateValues = (Object.values(this.translate.translations)[translateIndex] as any).ROUTES;
    let translatedURLPieces: string[] = [];
    urlParts.forEach((val: string, index: number) => {
      if (index > 1) {
        let i = Object.values((translateValues as any)).indexOf(val);
        translatedURLPieces.push(Object.keys(translateValues as any)[i]);
      }
    });
    translatedURLPieces.forEach(piece => {
      //Operates on the assumption that the alt route is the same as the route, but with '-alt' appended
      let k = this.translate.instant('ROUTES.' + piece + '-alt');
      if (this.translate.instant('ROUTES.' + this.altPathKey) !== k) {
        this.altLangURL += ('/' + k);
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.progressIndicatorSub?.unsubscribe();
  }
}

/**
* Compares two items and returns either -1 or 1, depending on which should come first. Used for .sort()
* @param a Item 1
* @param b Item 2
* @returns 1 or -1, depending which value should come first.
*/
export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (isAsc ? (a < b ? 1 : -1) : (a > b ? 1 : -1));
}

// /** Given an element, scroll to it with an optional delay */
// export function scrollToElement(element: HTMLElement | null, delay: boolean, smooth: boolean = true, focusTo: boolean = false) {
//   if (element) { // Timeout ensures scroll occurs after the view is updated        
//     if (delay) {
//       setTimeout(() => { element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' }); if (focusTo) { element.focus(); } }, 2);
//     } else {
//       element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
//       if (focusTo) { element.focus(); }
//     }
//   }
// }

// /** Finds an element by ID (platformID is used to find document in universal apps) * If document and the elementID are available, scroll to the element */
// export function scrollToElementByID(elementID: string, delay: boolean, smooth: boolean = true, focusTo: boolean = false) {
//   if (elementID) {
//     scrollToElement(document.getElementById(elementID), delay, smooth, focusTo);
//   }
// }