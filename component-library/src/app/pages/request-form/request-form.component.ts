import { Component, OnInit } from '@angular/core';
import {
  slugTitleURLConfig,
  slugTitleURLType,
  slugAnchorType
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { TranslateService } from '@app/share/templates/parent-template.module';
import {
  IBannerConfig,
  IRadioInputComponentConfig
} from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  providers: [SlugifyPipe]
})
export class RequestFormComponent implements OnInit {
  altLangLink = 'requestForm';
  form = new FormGroup({});

  submitRequestTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'RequestForm.Title',
    anchorType: slugAnchorType.primary
  };

  requestCriteriaTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'RequestForm.RequestCriteriaTitle',
    anchorType: slugAnchorType.primary
  };

  requestFormTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
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
    size: 'small',
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
        value: 'Change'
      },
      {
        text: 'RequestForm.urgentOption2',
        value: 'Request'
      }
    ],
    errorMessages: [
      {
        key: 'required',
        errorLOV: 'RequestForm.requiredRadioError'
      }
    ],
    size: 'small',
    disabled: false,
    error: true
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);

    this.form.addControl(
      this.typeOfRequestRadioConfig.id,
      new FormControl('', Validators.required)
    );

    this.form.addControl(
      this.urgentRequestRadioConfig.id,
      new FormControl('', Validators.required)
    );
  }
}
