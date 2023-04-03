import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBannerConfig, ICheckBoxComponentConfig, IDatePickerConfig, IDatePickerErrorMessages, IIconButtonComponentConfig, IInputComponentConfig, IProgressIndicatorConfig, IRadioInputComponentConfig, ISelectConfig, ISelectOptionsConfig, LabelButtonService, LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { NavigationStart, Router } from '@angular/router';
import { requiredTrueValidator } from '@app/@shared/shared-functions/shared-validators';
import { AccessbilityDemoFormStateService } from './accessbility-demo-form-state.service';
import { Subscription } from 'rxjs';
import { FormStateService } from './form-state.service';
import { filter } from 'rxjs/operators';



export interface ICityOfBirth {
  lov: string;
  val: string;
}

export const CITIES_OF_BIRTH_LOVS_CANADA: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.OTTAWA', val: 'Ottawa' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.ST_JOHNS', val: "St. John's" },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.VICTORIA', val: 'Victoria' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.CANADA.CALGARY', val: 'Calgary' },
];
export const CITIES_OF_BIRTH_LOVS_MEXICO: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.MEXICO.MEXICO', val: 'Mexico City' },
];
export const CITIES_OF_BIRTH_LOVS_USA: ICityOfBirth[] = [
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.TAMPA', val: 'Tampa Bay' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.WASHINGTON', val: 'Washington' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.NEW_YORK', val: 'New York' },
  { lov: 'ACC_DEMO.PERSONAL_INFO.CITY_OF_BIRTH.OPTIONS.USA.OAKLAND', val: 'Oakland' },
];
export const CITIES_OF_BIRTH_LOVS_ALL: ICityOfBirth[] = [
  ...CITIES_OF_BIRTH_LOVS_CANADA,
  ...CITIES_OF_BIRTH_LOVS_MEXICO,
  ...CITIES_OF_BIRTH_LOVS_USA,
];

@Component({
  selector: 'app-accessibility-demo',
  templateUrl: './accessibility-demo.component.html',
  styleUrls: ['./accessibility-demo.component.scss'],
})
export class AccessibilityDemoComponent implements OnInit {
  altPathKey = '';
  altLangURL = '';
  form = new FormGroup({});
  nextClicked = false;
  showErrorBanner = false;
  showFamilyNameBanner = false;
  showSexAtBirthBanner = false;

  innerWidth = 0;
  hamburgerMenuState: boolean | undefined = undefined;

  routerSub?: Subscription;
  labelButtonSub?: Subscription;

  progressIndicatorSub?: Subscription;
  progressIndicatorConfig: IProgressIndicatorConfig = {
    id: '',
  };

  hiddenNavConfig = {
    id: 'hidden_nav',
    skipLinks: [
      {
        title: 'Skip to main content',
        href: 'ds-cont'
      },
      {
        title: 'Skip to form',
        href: 'ds-form'
      },
      {
        title: 'Skip to footer',
        href: 'ds-footer'
      }
    ]
  }

  errorBannerConfig: IBannerConfig = {
    id: 'error_banner',
    type: 'critical',
    title: 'ACC_DEMO.PERSONAL_INFO.ERROR_BANNER.TITLE',
    content: 'ACC_DEMO.PERSONAL_INFO.ERROR_BANNER.CONTENT',
    rounded: true,
  };

  familyNameInputConfig: IInputComponentConfig = {
    id: 'family_name_input',
    formGroup: this.form,
    required: true,
    label: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.LABEL',
    desc: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.DESC',
    labelIconConfig: {
      iconClass: 'fa-light fa-circle-info',
      ariaText: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.LABEL_INFO_BUTTON_ARIA'
    },
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.FAMILY_NAME_REQUIRED',
      },
    ],
  };

  familyNameInputBannerConfig: IBannerConfig = {
    id: 'family_name_input_info_banner',
    dismissible: true,
    ariaDissmissible: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.BANNER_CLOSE',
    type: 'info',
    content: 'ACC_DEMO.PERSONAL_INFO.FAMILY_NAME_INPUT.BANNER',
  };

  givenNameInputConfig: IInputComponentConfig = {
    id: 'given_name_input',
    formGroup: this.form,
    label: 'ACC_DEMO.PERSONAL_INFO.GIVEN_NAME_INPUT.LABEL',
    desc: 'ACC_DEMO.PERSONAL_INFO.GIVEN_NAME_INPUT.DESC',
  };

  sexAtBirthRadioConfig: IRadioInputComponentConfig = {
    id: 'sex_at_birth_radio',
    formGroup: this.form,
    required: true,
    label: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.LABEL',
    labelIconConfig: {
      iconClass: 'fa-light fa-circle-info',
      ariaText: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.LABEL_INFO_BUTTON_ARIA'
    },
    options: [
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.FEMALE',
        value: 'F',
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.MALE',
        value: 'M',
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.OTHER',
        value: 'X',
      },
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED',
      },
    ],
  };

  datePickerErrorMessages: IDatePickerErrorMessages = {
    general: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.DOB_REQUIRED',
      },
    ],
  };

  sexAtBirthRadioBannerConfig: IBannerConfig = {
    id: 'sex_at_birth_info_banner',
    dismissible: true,
    ariaDissmissible: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.BANNER_CLOSE',
    type: 'info',
    content: 'ACC_DEMO.PERSONAL_INFO.SEX_AT_BIRTH_RADIO.BANNER'
  };

  dateOfBirthDatePickerConfig: IDatePickerConfig = {
    id: 'date_of_birth_date_picker',
    formGroup: this.form,
    label: 'ACC_DEMO.PERSONAL_INFO.DATE_OF_BIRTH.LABEL',
    required: true,
    errorMessages: this.datePickerErrorMessages,
    unknownDateToggle: {
      dayUnknown: true,
      monthUnknown: true,
      yearUnknown: true
    }
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
        value: 'Canada',
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.OPTIONS.USA',
        value: 'USA',
      },
      {
        text: 'ACC_DEMO.PERSONAL_INFO.COUNTRY_OF_BIRTH.OPTIONS.MEXICO',
        value: 'Mexico',
      },
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED',
      },
    ],
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
        errorLOV: 'ACC_DEMO.ERRORS.SELECTS_RADIO_REQUIRED',
      },
    ],
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
        errorLOV: 'ACC_DEMO.ERRORS.DECLARATION_REQUIRED',
      },
      {
        key: 'requiredTrue',
        errorLOV: 'ACC_DEMO.ERRORS.DECLARATION_REQUIRED',
      },
    ],
  };

  hamburgerDialogXButtonConfig: IIconButtonComponentConfig = {
    id: 'hamburger_dialog_x_button',
    category: 'custom',
    size: 'large',
    ariaLabel: 'ACC_DEMO.HAMBURGER_ARIA',
    icon: {
      class: 'fa-regular fa-x',
      color: 'var(--text-primary)'
    }
  };

  allowedNavItemIds: string[] = ['progress_indicator_step_0', 'progress_indicator_step_1', 'hamburger_dialog_x_button'];
  currentBaseUrl = '';
  baseUrlKey = 'ROUTES.AccessibilityDemo';
  language = '';
  formStateSub = new Subscription;



  constructor(
    private translate: TranslateService,
    private altLang: LanguageSwitchService,
    private router: Router,
    private labelButton: LabelButtonService,
    private formState: FormStateService
  ) { }

  ngOnInit() {
    this.altLang.setAltLangLink('AccessibilityDemo-alt');
    this.setBaseUrl();
    this.getLanguage();

    /** ADD CONTROLS TO FORM GROUP **/
    this.form.addControl(this.familyNameInputConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.givenNameInputConfig.id, new FormControl(''));
    this.form.addControl(this.sexAtBirthRadioConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.dateOfBirthDatePickerConfig.id + '_dayControl', new FormControl('', Validators.required));
    this.form.addControl(
      this.dateOfBirthDatePickerConfig.id + '_monthControl',
      new FormControl('', Validators.required)
    );
    this.form.addControl(
      this.dateOfBirthDatePickerConfig.id + '_yearControl',
      new FormControl('', Validators.required)
    );
    this.form.addControl(this.countryOfBirthSelectConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.cityOfBirthSelectConfig.id, new FormControl('', Validators.required));
    this.form.addControl(this.declarationCheckboxConfig.id, new FormControl('', [requiredTrueValidator()]));

    // const savedFormData = this.getFormData;
    // if (savedFormData) {
    //   this.form.setValue(savedFormData);
    // }

    this.formStateSub = this.formState.formStateObs$.subscribe(response => {
      console.log(response.contains(this.familyNameInputConfig.id));
      if (response.contains(this.familyNameInputConfig.id)) {
        this.form.patchValue(response.value);
      }
    });
    console.log(this.form);


    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.formState.broadcastFormGroup();
        // this.form.updateValueAndValidity();
        // console.log(this.form, "I AM RUNNING!")
        // this.formState.updateFormGroup(this.form);
        // sessionStorage.setItem('form', JSON.stringify(this.form));
      }
    });


    //Handle label button presses
    this.labelButton.buttonPress(''); //reset the button BehaviourSubject
    this.labelButtonSub = this.labelButton.labelButtonClickObs$.subscribe(response => {
      this.iconButtonHandler(response);
    });

    //This is terrible...
    this.form.valueChanges.subscribe(() => {
      this.formState.updateFormGroup(this.form);
    });

    //Initial pop of cities is all values
    if (this.form.get(this.countryOfBirthSelectConfig.id)?.value) {
      switch (this.form.get(this.countryOfBirthSelectConfig.id)?.value.toLowerCase()) {
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
    } else {
      this.setCities(CITIES_OF_BIRTH_LOVS_ALL);
    }

    //Watch for changes in the country of birth select:
    this.form.get(this.countryOfBirthSelectConfig.id)?.valueChanges.subscribe((change) => {
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
   * Set the cities option in the cities dropdown
   * @param cityList list of cities to insert into the dropdown
   */
  setCities(cityList: ICityOfBirth[]) {
    // this.cityOfBirthSelectConfig.options = [];
    let temp: ISelectOptionsConfig[] = [];
    cityList.forEach((city) => {
      temp.push({ text: city.lov, value: city.val });
    });
    temp = temp.sort((a, b) => {
      return compare(this.translate.instant(a.text), this.translate.instant(b.text), false);
    });
    this.cityOfBirthSelectConfig.options = temp;
  }



  /**
   * Event handler for icon button press events
   * @param event string (id of button pressed)
   */
  iconButtonHandler(id: string) {
    switch (id) {
      case this.familyNameInputConfig.id:
        this.showFamilyNameBanner = true;
        break;

      case this.sexAtBirthRadioConfig.id:
        this.showSexAtBirthBanner = true;
        break;

      default:
        break;
    }
  }

  /**
   * Once triggered, this tracks if the form is valid and updates the showErrorBanner variable accordingly
   */
  navButton() {
    this.nextClicked = true;
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.showErrorBanner = true;
      this.form.valueChanges.subscribe(() => {
        this.showErrorBanner = !this.form.valid;
      });
    } else {
      let tempConfig = this.progressIndicatorConfig;
      if (tempConfig.steps) {
        tempConfig.steps[1].tagConfig.type = 'success';
        tempConfig.steps[2].tagConfig.type = 'primary';
      }
      this.router.navigateByUrl(this.getNextButtonLink);
    } //NOTE: No need to deal with cases not covered above, since those will result in navigation!
  }

  /**
   * Event handler for banner close button events
   * @param id
   */
  bannerCloseHandler(id: string) {
    switch (id) {
      case this.familyNameInputBannerConfig.id:
        this.showFamilyNameBanner = false;
        break;

      case this.sexAtBirthRadioBannerConfig.id:
        this.showSexAtBirthBanner = false;
        break;

      default:
        break;
    }
  }

  /************************************Getters for Navigation**************************************/


  /**
   * Getter for the previous page button
   */
  get getPreviousButtonLink() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    return '/' + langKey + '/' + this.translate.instant('ROUTES.AccessibilityDemo') + '/' + this.translate.instant('ROUTES.AccessibilityDemoPrevious');
  }

  get getNextButtonLink() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    return '/' + langKey + '/' + this.translate.instant('ROUTES.AccessibilityDemo') + '/' + this.translate.instant('ROUTES.AccessibilityDemoNext');
  }

  /**
   * Getter for the main page link
   */
  get getMainPageLink() {
    const curLang = this.translate.currentLang;
    this.translate.use(curLang === 'en-US' || curLang === 'en' ? 'en-US' : 'fr-FR');
    const lang = curLang === 'en-US' || curLang === 'en' ? 'en' : 'fr';
    return '/' + lang + '/' + this.translate.instant('ROUTES.AccessibilityDemo');
  }

  /**
 * Use HREF to get the URL. This is used as router.url does not update on language change.
 * @returns the current working url as a string
 */
  getURL() {
    const curLang = this.translate.currentLang;
    let langKey = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
    const i = window.location.href.slice(window.location.href.indexOf(langKey), window.location.href.length);
    return i;
  }

  /**
 * Set the current base url. TODO: Consider moving this into a service for easy re-use elsewhere. 
 */
  setBaseUrl() {
    this.currentBaseUrl = '';
    let i = this.getURL().split('/');
    i.forEach((j: string, index: number) => {
      if (index !== (i.length - 1)) {
        this.currentBaseUrl += ('/' + j);
      } else if (j === this.translate.instant(this.baseUrlKey || '')) {
        this.currentBaseUrl += ('/' + j);
      }
    });
    if (this.currentBaseUrl[this.currentBaseUrl.length] !== '/') this.currentBaseUrl += '/';
  }

  getLanguage() {
    const curLang = this.translate.currentLang;
    this.language = ((curLang === "en-US") || (curLang === 'en') ? 'en' : 'fr');
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.formStateSub.unsubscribe();
  }
}



/**
 * Compares two items and returns either -1 or 1, depending on which should come first. Used for .sort()
 * @param a Item 1
 * @param b Item 2
 * @returns 1 or -1, depending which value should come first.
 */
export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return isAsc ? (a < b ? 1 : -1) : a > b ? 1 : -1;
}
