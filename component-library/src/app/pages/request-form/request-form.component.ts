import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IBannerConfig,
  IButtonConfig,
  IDatePickerConfig,
  IDatePickerErrorMessages,
  IRadioInputComponentConfig,
  ITextareaComponentConfig
} from 'ircc-ds-angular-component-library';
import {
  IRequestFormDataInterface,
  RequestFormService
} from './request-form.service';
import {
  slugAnchorType,
  slugTitleURLConfig,
} from '@app/components/title-slug-url/title-slug-url.component';

import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';

import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@app/share/templates/parent-template.module';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  providers: [SlugifyPipe]
})
export class RequestFormComponent implements OnInit, AfterViewInit {
  altLangLink = 'requestForm';
  form = new FormGroup({});
  showUseCase: boolean = false;
  requestUrgent: boolean = false;
  requestFormData: IRequestFormDataInterface = {};

  // email = 'IRCC.JLDS-JLSDC.IRCC@cic.gc.ca'
  email = 'ds-form-request@padye.com';

  submitRequestTitleSlugConfig: slugTitleURLConfig = {
    title: 'RequestForm.Title',
    heading: 'h1',
    anchorType: slugAnchorType.primary
  };

  requestCriteriaTitleSlugConfig: slugTitleURLConfig = {
    title: 'RequestForm.RequestCriteriaTitle',
    anchorType: slugAnchorType.primary
  };

  requestFormTitleSlugConfig: slugTitleURLConfig = {
    title: 'RequestForm.RequestFormTitle',
    anchorType: slugAnchorType.primary
  };

  bannerConfig: IBannerConfig = {
    id: 'request-form-banner',
    content: 'RequestForm.BannerDesc',
    type: 'info',
    rounded: false,
    dismissible: false,
    size: 'small',
    cta: []
  };

  typeOfRequestRadioConfig: IRadioInputComponentConfig = {
    id: 'radio-request-type',
    formGroup: this.form,
    label: 'RequestForm.typeOfRequestRadio',
    required: true,
    options: [
      {
        text: 'RequestForm.radioOption1',
        value: 'Change'
      },
      {
        text: 'RequestForm.radioOption2',
        value: 'Request'
      },
      {
        text: 'RequestForm.radioOption3',
        value: 'Bug'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredRadioError'
      }
    ],
    size: 'large',
    disabled: false,
    error: true
  };

  urgentRequestRadioConfig: IRadioInputComponentConfig = {
    id: 'radio-request-urgent',
    formGroup: this.form,
    label: 'RequestForm.urgentRequestRadio',
    required: true,
    options: [
      {
        text: 'RequestForm.urgentOption1',
        value: 'Y'
      },
      {
        text: 'RequestForm.urgentOption2',
        value: 'N'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredRadioError'
      }
    ],
    size: 'large',
    disabled: false,
    error: true
  };

  requestTitleTextAreaConfig: ITextareaComponentConfig = {
    formGroup: this.form,
    id: 'request-title-text-area',
    label: 'RequestForm.requestTitleLabel',
    desc: 'RequestForm.requestTitleDesc',
    required: true,
    charLimit: '50',
    resizable: 'vertical',
    size: 'large',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredTextAreaError'
      },
      {
        key: 'maxLength',
        errorLOV: 'RequestForm.fieldExceededMaxLength'
      }
    ]
    // errorIcon?: IErrorIconConfig;
  };

  requestDetailsTextAreaConfig: ITextareaComponentConfig = {
    formGroup: this.form,
    id: 'request-details-text-area',
    label: 'RequestForm.requestDetailsLabel',
    desc: 'RequestForm.requestDetailsDesc',
    required: true,
    resizable: 'vertical',
    size: 'large',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredTextAreaError'
      }
      // {
      //   key: 'maxLength',
      //   errorLOV: 'RequestForm.fieldExceededMaxLength'
      // }
    ]
    // errorIcon?: IErrorIconConfig;
  };

  useCaseTextAreaConfig: ITextareaComponentConfig = {
    formGroup: this.form,
    id: 'use-case-text-area',
    label: 'RequestForm.useCaseLabel',
    desc: 'RequestForm.useCaseDesc',
    required: true,
    resizable: 'vertical',
    size: 'large',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredTextAreaError'
      }
      // {
      //   key: 'maxLength',
      //   errorLOV: 'RequestForm.fieldExceededMaxLength'
      // }
    ]
    // errorIcon?: IErrorIconConfig;
  };

  referencesTextAreaConfig: ITextareaComponentConfig = {
    formGroup: this.form,
    id: 'references-text-area',
    label: 'RequestForm.referencesLabel',
    desc: 'RequestForm.referencesCaseDesc',
    hint: 'RequestForm.referencesHint',
    resizable: 'vertical',
    size: 'large'
    // errorMessages?: IErrorPairs[];
    // errorIcon?: IErrorIconConfig;
  };

  urgentDetailsTextAreaConfig: ITextareaComponentConfig = {
    formGroup: this.form,
    id: 'urgent-details-text-area',
    label: 'RequestForm.urgentDetailsLabel',
    required: true,
    resizable: 'vertical',
    size: 'large',
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredTextAreaError'
      }
      // {
      //   key: 'maxLength',
      //   errorLOV: 'RequestForm.fieldExceededMaxLength'
      // }
    ]
    // errorIcon?: IErrorIconConfig;
  };

  datePickerErrorMessages: IDatePickerErrorMessages = {
    general: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredDateError'
      }
    ]
  };

  requestedDateDatePickerConfig: IDatePickerConfig = {
    id: 'date-requested-datepicker',
    formGroup: this.form,
    label: 'RequestForm.requestedDateLabel',
    desc: 'RequestForm.requestedDateDesc',
    required: true,
    size: 'large',
    errorMessages: this.datePickerErrorMessages,
    minYear: 2023
  };

  buttonConfig: IButtonConfig = {
    id: 'submit-request-btn',
    category: 'primary',
    size: 'small',
    ariaLabel: ''
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private requestFormService: RequestFormService
  ) {}
  ngAfterViewInit(): void {
    /**
     * Set local storage form data when form values change after init so we're not setting and getting at the same time
     *
     */
    this.form.valueChanges.subscribe((val) => {
      this.setFormData(val);
    });
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);

    this.form.addControl(
      this.typeOfRequestRadioConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.requestTitleTextAreaConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.requestDetailsTextAreaConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.useCaseTextAreaConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.referencesTextAreaConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.urgentRequestRadioConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.urgentDetailsTextAreaConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.requestedDateDatePickerConfig.id + '_dayControl',
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.requestedDateDatePickerConfig.id + '_monthControl',
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.requestedDateDatePickerConfig.id + '_yearControl',
      new FormControl('', Validators.required)
    );
    /**
     * Get local storage form data on page reload
     */
    this.getFormDataFromService();
  }

  /**
   * Get local storage form data on page reload from the RequestFormService
   */
  getFormDataFromService() {
    this.requestFormService
      .getFormData()
      .pipe(first()) //take only the first to avoid infinite loop
      .subscribe((val) => {
        this.requestFormData = val;
        this.form.patchValue(this.requestFormData);
        this.form.updateValueAndValidity();
        /**
         * If the data in local storage contains a value that would trigger fields to show/hide, we set it here separately because there won't be a change event to toggle the boolean like radioButtonChanged($event)
         */
        if (
          this.requestFormData[this.typeOfRequestRadioConfig.id] === 'Change' ||
          this.requestFormData[this.typeOfRequestRadioConfig.id] === 'Request'
        )
          this.showUseCase = true;
        if (this.requestFormData[this.urgentRequestRadioConfig.id] === 'Y')
          this.requestUrgent = true;
      });
  }

  /**
   * Set local storage form data on page reload with the service
   */
  setFormData(requestFormData: IRequestFormDataInterface): void {
    return this.requestFormService.setFormData(requestFormData);
  }

  /**
   * Event handler for radio events
   * @param $event id string of radio pressed)
   */
  radioButtonChanged($event: any) {
    switch ($event.target['id']) {
      case this.typeOfRequestRadioConfig.id + '0':
        this.showUseCase = true;
        break;
      case this.typeOfRequestRadioConfig.id + '1':
        this.showUseCase = true;
        break;
      case this.typeOfRequestRadioConfig.id + '2':
        this.showUseCase = false;
        break;
      case this.urgentRequestRadioConfig.id + '0':
        this.requestUrgent = true;
        break;
      case this.urgentRequestRadioConfig.id + '1':
        this.requestUrgent = false;
        break;
      default:
        break;
    }
  }

  submitForm() {
    const data = localStorage.getItem('requestFormData');
    this.requestFormService.sendRequestForm(this.email, data);
  }
}
